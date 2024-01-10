<template>
	<SaasActionBlock @submit="onSubmit" :isSubmitting="isSubmitting" :isSubmitDisabled="isSubmitDisabled">
		<template #title>{{ t('settings.team.changeName.title') }}</template>
		<div>
			<Input v-bind="name" type="text" id="name" required autocomplete="name" class="max-w-sm" />
		</div>
	</SaasActionBlock>
</template>

<script setup lang="ts">
	const props = defineProps<{
		initialValue: string
		teamId: string
	}>()

	const { t } = useTranslations()
	const { apiCaller } = useApiCaller()
	const { toast } = useToast()
	const { switchTeam } = useSwitchTeam()

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
			const res = await apiCaller.team.update.mutate({
				name: values.name,
				id: props.teamId,
			})

			toast({
				variant: 'success',
				title: t('settings.notifications.teamNameUpdated'),
			})

			switchTeam(res.slug, { refresh: true })
		} catch (error) {
			toast({
				variant: 'error',
				title: t('settings.notifications.teamNameNotUpdated'),
			})
		}
	})
</script>
