<template>
	<div>
		<h1 class="text-3xl font-bold">{{ t('auth.forgotPassword.title') }}</h1>
		<p class="text-muted-foreground mb-6 mt-2">
			{{ t('auth.forgotPassword.message') }}
			<NuxtLinkLocale to="/auth/login" class="text-gray-700">
				{{ t('auth.forgotPassword.backToSignin') }} &rarr;
			</NuxtLinkLocale>
		</p>

		<form @submit.prevent="onSubmit" class="flex flex-col items-stretch gap-6">
			<Alert v-if="serverError" variant="error">
				<Icon name="warning" class="h-4 w-4" />
				<template #title>{{ serverError.title }}</template>
				<template #description>{{ serverError.message }}</template>
			</Alert>

			<FormItem>
				<FormLabel for="email" required> {{ t('auth.forgotPassword.email') }} </FormLabel>
				<Input v-bind="email" type="email" id="email" required autocomplete="email" />
			</FormItem>

			<Button :loading="isSubmitting" type="submit">
				<Icon name="submit" class="mr-2 h-4 w-4" />
				{{ t('auth.forgotPassword.submit') }} &rarr;
			</Button>
		</form>
	</div>
</template>

<script setup lang="ts">
	import { joinURL } from 'ufo'

	const { apiCaller } = useApiCaller()
	const runtimeConfig = useRuntimeConfig()
	const { t } = useTranslations()
	const localePath = useLocalePath()

	const { z, toTypedSchema, useForm } = formUtils

	const formSchema = toTypedSchema(
		z.object({
			email: z.string().email(),
		})
	)

	type ServerErrorType = {
		title: string
		message: string
	}
	const serverError = ref<null | ServerErrorType>(null)

	const { defineInputBinds, handleSubmit, isSubmitting } = useForm({
		validationSchema: formSchema,
		initialValues: {
			email: '',
		},
	})

	const email = defineInputBinds('email')

	const onSubmit = handleSubmit(async values => {
		serverError.value = null

		try {
			await apiCaller.auth.forgotPassword.mutate({
				email: values.email,
				callbackUrl: joinURL(runtimeConfig.public.siteUrl, '/auth/verify'),
			})

			const redirectSearchParams = new URLSearchParams()
			redirectSearchParams.set('type', 'PASSWORD_RESET')
			if (values.email) {
				redirectSearchParams.set('identifier', values.email)
			}
			redirectSearchParams.set('redirectTo', '/[teamSlug]/settings/account/general')

			navigateTo(localePath(`/auth/otp?${redirectSearchParams.toString()}`), {
				replace: true,
			})
		} catch (error) {
			serverError.value = {
				title: t('auth.forgotPassword.hints.linkNotSent.title'),
				message: t('auth.forgotPassword.hints.linkNotSent.message'),
			}
		}
	})
</script>
