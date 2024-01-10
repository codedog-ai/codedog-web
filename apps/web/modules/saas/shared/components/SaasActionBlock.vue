<template>
	<Card>
		<form @submit.prevent="emit('submit')">
			<CardHeader>
				<template #title><slot name="title" /></template>
			</CardHeader>

			<CardContent>
				<slot />

				<div v-if="hasSubmitEventListener" class="mt-6 flex justify-end border-t pt-3">
					<Button type="submit" :disabled="props.isSubmitDisabled" :loading="props.isSubmitting">
						{{ t('settings.save') }}
					</Button>
				</div>
			</CardContent>
		</form>
	</Card>
</template>

<script setup lang="ts">
	const emit = defineEmits<{
		submit: []
	}>()

	const props = defineProps<{
		isSubmitDisabled?: boolean
		isSubmitting?: boolean
	}>()

	const { t } = useTranslations()

	const hasSubmitEventListener = computed(() => !!getCurrentInstance()?.vnode.props?.onSubmit)
</script>
