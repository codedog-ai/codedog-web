<template>
	<Button variant="outline" @click="cancelSubscription" :loading="mutationPending">
		<Icon name="close" class="mr-2 h-4 w-4" />
		{{ t('settings.billing.subscription.cancel') }}
	</Button>
</template>

<script setup lang="ts">
	const props = defineProps<{
		subscriptionId: string
	}>()

	const { t } = useTranslations()
	const { toast } = useToast()
	const { apiCaller } = useApiCaller()

	const mutationPending = ref(false)

	const cancelSubscription = async () => {
		if (!process.client || typeof window === 'undefined') {
			return
		}

		mutationPending.value = true

		try {
			await apiCaller.billing.cancelSubscription.mutate({
				id: props.subscriptionId,
			})

			toast({
				variant: 'success',
				title: t('settings.billing.cancelSubscription.notifications.success.title'),
			})

			location.reload()
		} catch (error) {
			toast({
				variant: 'error',
				title: t('settings.billing.cancelSubscription.notifications.error.title'),
			})
		} finally {
			mutationPending.value = false
		}
	}
</script>
