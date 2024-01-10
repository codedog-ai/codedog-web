<template>
	<div>
		<h1 class="text-3xl font-bold">{{ t('auth.signup.title') }}</h1>
		<p class="text-muted-foreground mb-6 mt-2">
			{{ t('auth.signup.message') }}
		</p>

		<SaasTeamInvitationInfo v-if="invitationCode" class="mb-6" />

		<form @submit.prevent="onSubmit" class="flex flex-col items-stretch gap-6">
			<Alert v-if="serverError" variant="error">
				<Icon name="warning" class="h-4 w-4" />
				<template #title>{{ serverError.title }}</template>
				<template #description>{{ serverError.message }}</template>
			</Alert>

			<FormItem>
				<FormLabel for="name" required> {{ t('auth.signup.name') }} </FormLabel>
				<Input v-bind="name" type="text" id="name" required autocomplete="name" />
			</FormItem>

			<FormItem>
				<FormLabel for="email" required> {{ t('auth.signup.email') }} </FormLabel>
				<Input v-bind="email" type="email" id="email" required autocomplete="email" />
			</FormItem>

			<div>
				<FormItem>
					<FormLabel for="password" required> {{ t('auth.signup.password') }} </FormLabel>
					<SaasPasswordInput :fieldData="password" id="password" autocomplete="new-password" required />
				</FormItem>

				<p class="mt-1 text-xs italic opacity-50">
					{{ t('auth.signup.passwordHint') }}
				</p>
			</div>

			<Button :loading="isSubmitting" type="submit"> {{ t('auth.signup.submit') }} &rarr; </Button>

			<p>
				<span class="text-muted-foreground"> {{ t('auth.signup.alreadyHaveAccount') }}&nbsp;</span>
				<NuxtLinkLocale
					:to="`/auth/login${invitationCode ? `?invitationCode=${invitationCode}&email=${email.value}` : ''}`">
					{{ t('auth.signup.signIn') }} &rarr;
				</NuxtLinkLocale>
			</p>
		</form>
	</div>
</template>

<script setup lang="ts">
	import { joinURL } from 'ufo'

	const runtimeConfig = useRuntimeConfig()
	const { apiCaller } = useApiCaller()
	const { t } = useTranslations()
	const localePath = useLocalePath()

	const { z, toTypedSchema, useForm } = formUtils

	const formSchema = toTypedSchema(
		z.object({
			email: z.string().email(),
			password: z.string().min(8),
			name: z.string().min(2),
		})
	)

	const { searchQuery: invitationCode } = useRouteSearchQuery({ name: 'invitationCode', replace: true })
	const { searchQuery: redirectToParam } = useRouteSearchQuery({ name: 'redirectTo', replace: true })
	const { searchQuery: emailParam } = useRouteSearchQuery({ name: 'email', replace: true })

	const redirectTo = computed(() => {
		return invitationCode.value
			? `/team/invitation?code=${invitationCode.value}`
			: `/team/redirect?redirectTo=${encodeURIComponent(redirectToParam.value || '')}`
	})

	type ServerErrorType = {
		title: string
		message: string
	}
	const serverError = ref<null | ServerErrorType>(null)

	const { defineInputBinds, handleSubmit, setFieldValue, isSubmitting } = useForm({
		validationSchema: formSchema,
		initialValues: {
			email: '',
			password: '',
			name: '',
		},
	})

	watchEffect(() => {
		if (emailParam.value) {
			setFieldValue('email', emailParam.value)
		}
	})

	const email = defineInputBinds('email')
	const password = defineInputBinds('password')
	const name = defineInputBinds('name')

	const onSubmit = handleSubmit(async values => {
		serverError.value = null

		try {
			await apiCaller.auth.signup.mutate({
				email: values.email,
				password: values.password,
				name: values.name,
				callbackUrl: joinURL(runtimeConfig.public.siteUrl, '/auth/verify'),
			})

			const redirectSearchParams = new URLSearchParams()
			redirectSearchParams.set('type', 'SIGNUP')
			if (!redirectTo.value.startsWith('/team/redirect')) {
				redirectSearchParams.set('redirectTo', redirectTo.value)
			}
			if (invitationCode) {
				redirectSearchParams.set('invitationCode', invitationCode.value)
			}
			if (values.email) {
				redirectSearchParams.set('identifier', values.email)
			}

			navigateTo(localePath(`/auth/otp?${redirectSearchParams.toString()}`), {
				replace: true,
			})
		} catch (e) {
			serverError.value = {
				title: t('auth.signup.hints.signupFailed.title'),
				message: t('auth.signup.hints.signupFailed.message'),
			}
		}
	})
</script>
