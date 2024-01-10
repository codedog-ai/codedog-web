<template>
	<SaasActionBlock>
		<template #title>
			{{ t('settings.billing.subscription.upgradePlan') }}
		</template>

		<PricingTable
			:plans="props.plans"
			:activePlanId="props.activePlanId"
			:onSelectPlan="handleSelectPlan"
			class="md:-mt-12" />
	</SaasActionBlock>
</template>

<script setup lang="ts">
	import type { ApiOutput } from 'api'

	type SubscriptionPlan = ApiOutput['billing']['plans'][number]

	const props = defineProps<{
		plans: SubscriptionPlan[]
		teamId: string
		activePlanId?: string
	}>()

	const { t } = useTranslations()
	const { apiCaller } = useApiCaller()

	const handleSelectPlan = async (planId: string, variantId: string) => {
		if (!process.client || typeof window === 'undefined') {
			return
		}

		try {
			const checkoutLink = await apiCaller.billing.createCheckoutLink.mutate({
				planId,
				variantId,
				teamId: props.teamId,
				redirectUrl: window.location.href,
			})

			navigateTo(checkoutLink, {
				external: true,
			})
		} catch (error) {}
	}
</script>
