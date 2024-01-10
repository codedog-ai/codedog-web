<template>
	<Button variant="default" @click="createCustomerPortal" :loading="mutationPending">
		<Icon name="creditCard" class="mr-2 h-4 w-4" />
		{{ t('settings.billing.createCustomerPortal.label') }}
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

	const createCustomerPortal = async () => {
		if (!process.client || typeof window === 'undefined') {
			return
		}

		mutationPending.value = true

		try {
			const url = await apiCaller.billing.createCustomerPortalLink.mutate({
				subscriptionId: props.subscriptionId,
				redirectUrl: window.location.href,
			})

			navigateTo(url, {
				external: true,
			})
		} catch (error) {
			toast({
				variant: 'error',
				title: t('settings.billing.createCustomerPortal.notifications.error.title'),
			})
		} finally {
			mutationPending.value = false
		}
	}
</script>
