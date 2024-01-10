<template>
	<div>
		<h1 class="text-3xl font-bold">{{ t('auth.verifyOtp.title') }}</h1>
		<p class="text-muted-foreground mb-6 mt-2">
			{{ t('auth.verifyOtp.message') }}
		</p>

		<SaasTeamInvitationInfo v-if="invitationCode" class="mb-6" />

		<form @submit.prevent="onSubmit" class="flex flex-col items-stretch gap-6">
			<Alert v-if="serverError" variant="error">
				<Icon name="warning" class="h-4 w-4" />
				<template #title>{{ serverError.title }}</template>
				<template #description>{{ serverError.message }}</template>
			</Alert>

			<FormItem>
				<FormLabel for="code" required> {{ t('auth.verifyOtp.otp') }} </FormLabel>
				<Input v-bind="code" type="text" id="code" required autocomplete="name" />
			</FormItem>

			<Button :loading="isSubmitting" type="submit"> {{ t('auth.verifyOtp.submit') }} &rarr; </Button>
		</form>
	</div>
</template>

<script setup lang="ts">
	import type { UserOneTimePasswordType } from 'database'

	const { apiCaller } = useApiCaller()
	const { t } = useTranslations()
	const localePath = useLocalePath()
	const { user, loaded } = useUser()

	const { z, toTypedSchema, useForm } = formUtils

	const formSchema = toTypedSchema(
		z.object({
			code: z.string().min(6).max(6),
		})
	)

	const { searchQuery: invitationCode } = useRouteSearchQuery({ name: 'invitationCode', replace: true })
	const { searchQuery: redirectToParam } = useRouteSearchQuery({ name: 'redirectTo', replace: true })
	const { searchQuery: identifier } = useRouteSearchQuery({ name: 'identifier', replace: true })
	const { searchQuery: typeParam } = useRouteSearchQuery({ name: 'type', replace: true })

	const type = computed(() => {
		return typeParam.value as UserOneTimePasswordType
	})

	const redirectTo = computed(() => {
		const path = invitationCode.value
			? `/team/invitation?code=${invitationCode.value}`
			: `/team/redirect?redirectTo=${encodeURIComponent(redirectToParam.value || '')}`
		return localePath(path)
	})

	const handleRedirect = () => {
		if (!process.client || typeof window === 'undefined') {
			return
		}

		// Hard redirect to reset all states after signup
		window.location.href = localePath(redirectTo.value)
	}

	// Redirect if user is already logged in
	watchEffect(() => {
		if (user.value && loaded.value) {
			// Only redirect a user that already has a team.
			if (user.value.teamMemberships?.length) {
				handleRedirect()
			}
		}
	})

	type ServerErrorType = {
		title: string
		message: string
	}
	const serverError = ref<null | ServerErrorType>(null)

	const { defineInputBinds, handleSubmit, isSubmitting } = useForm({
		validationSchema: formSchema,
		initialValues: {
			code: '',
		},
	})

	const code = defineInputBinds('code')

	const onSubmit = handleSubmit(async values => {
		serverError.value = null

		try {
			await apiCaller.auth.verifyOtp.mutate({
				code: values.code,
				type: type.value,
				identifier: identifier.value,
			})

			handleRedirect()
		} catch (error) {
			serverError.value = {
				title: t('auth.verifyOtp.hints.verificationFailed.title'),
				message: t('auth.verifyOtp.hints.verificationFailed.message'),
			}
		}
	})
</script>
