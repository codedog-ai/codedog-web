<template>
	<form @submit.prevent="onSubmit">
		<FormItem>
			<FormLabel for="name" required> {{ t('createTeam.name') }} </FormLabel>
			<Input v-bind="name" type="text" id="name" required />
		</FormItem>

		<Button class="mt-4 w-full" type="submit" :loading="isSubmitting">
			{{ t('createTeam.submit') }}
		</Button>
	</form>
</template>

<script setup lang="ts">
	import type { ApiOutput } from 'api'

	const { apiCaller } = useApiCaller()
	const { t } = useTranslations()
	const { toast } = useToast()

	const emit = defineEmits<{
		success: [newTeam: ApiOutput['team']['create']]
	}>()

	const props = defineProps<{
		defaultName?: string
	}>()

	const { z, toTypedSchema, useForm } = formUtils

	const formSchema = toTypedSchema(
		z.object({
			name: z.string().min(3).max(32),
		})
	)

	const { defineInputBinds, handleSubmit, isSubmitting } = useForm({
		validationSchema: formSchema,
		initialValues: {
			name: props.defaultName,
		},
	})

	const name = defineInputBinds('name')

	const onSubmit = handleSubmit(async values => {
		try {
			const newTeam = await apiCaller.team.create.mutate({
				name: values.name,
			})

			toast({
				title: t('createTeam.notifications.success'),
			})

			emit('success', newTeam)
		} catch (e) {
			toast({
				title: t('createTeam.notifications.error'),
				variant: 'error',
			})
		}
	})
</script>
