<template>
	<SaasActionBlock @submit="onSubmit" :isSubmitting="isSubmitting" :isSubmitDisabled="isSubmitDisabled">
		<template #title>{{ t('settings.account.changeName.title') }}</template>
		<div>
			<Input v-bind="name" type="text" id="name" required autocomplete="name" />
		</div>
	</SaasActionBlock>
</template>

<script setup lang="ts">
	const props = defineProps<{
		initialValue: string
	}>()

	const { t } = useTranslations()
	const { apiCaller } = useApiCaller()
	const { toast } = useToast()
	const { reloadUser } = useUser()

	const { z, toTypedSchema, useForm } = formUtils

	const formSchema = toTypedSchema(
		z.object({
			name: z.string().min(3),
		})
	)

	const { defineInputBinds, handleSubmit, isSubmitting } = useForm({
		validationSchema: formSchema,
		initialValues: {
			name: props.initialValue || '',
		},
	})

	const name = defineInputBinds('name')

	const isSubmitDisabled = computed(() => {
		return !name.value.value || name.value.value.length < 3 || name.value.value === props.initialValue
	})

	const onSubmit = handleSubmit(async values => {
		try {
			await apiCaller.auth.changeName.mutate({
				name: values.name,
			})

			toast({
				variant: 'success',
				title: t('settings.notifications.nameUpdated'),
			})

			await reloadUser()
		} catch (error) {
			toast({
				variant: 'error',
				title: t('settings.notifications.nameUpdateFailed'),
			})
		}
	})
</script>
