<template>
	<SaasActionBlock @submit="onSubmit" :isSubmitting="isSubmitting" :isSubmitDisabled="isSubmitDisabled">
		<template #title>{{ t('settings.account.changePassword.title') }}</template>
		<div>
			<SaasPasswordInput :fieldData="password" id="password" autocomplete="new-password" required />
		</div>
	</SaasActionBlock>
</template>

<script setup lang="ts">
	const { t } = useTranslations()
	const { apiCaller } = useApiCaller()
	const { toast } = useToast()

	const { z, toTypedSchema, useForm } = formUtils

	const formSchema = toTypedSchema(
		z.object({
			password: z.string().min(8),
		})
	)

	const { defineInputBinds, handleSubmit, isSubmitting, setFieldValue } = useForm({
		validationSchema: formSchema,
		initialValues: {
			password: '',
		},
	})

	const password = defineInputBinds('password')

	const isSubmitDisabled = computed(() => {
		return !password.value.value || password.value.value.length < 8
	})

	const onSubmit = handleSubmit(async values => {
		try {
			await apiCaller.auth.changePassword.mutate({
				password: values.password,
			})

			setFieldValue('password', '')

			toast({
				variant: 'success',
				title: t('settings.notifications.passwordUpdated'),
			})
		} catch (error) {
			toast({
				variant: 'error',
				title: t('settings.notifications.passwordNotUpdated'),
			})
		}
	})
</script>
