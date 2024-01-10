<template>
	<SaasActionBlock v-if="subscriptionPlan && subscriptionVariant">
		<template #title>
			{{ t('settings.billing.subscription.currentSubscription') }}
		</template>

		<div class="flex items-center gap-2">
			<h4 class="text-primary text-lg font-bold">
				<span>{{ subscriptionPlan.name }}</span>
				<small class="font-normal">
					({{ n(subscriptionVariant.price / 100, 'currency') }}/{{
						t(`settings.billing.subscription.${subscriptionVariant.interval}`)
					}})
				</small>
			</h4>
			<SaasSubscriptionStatusBadge
				v-if="props.currentSubscription?.status"
				:status="props.currentSubscription.status" />
		</div>

		<p v-if="props.currentSubscription?.next_payment_date" class="text-muted-foreground mt-1">
			{{ nextPaymentLabel }}
		</p>

		<div v-if="props.currentSubscription" class="-mx-6 -mb-6 mt-6 flex justify-end border-t px-6 py-3">
			<div class="flex w-full flex-col justify-between gap-3 md:flex-row">
				<div>
					<SaasCustomerPortalButton :subscriptionId="props.currentSubscription.id" />
				</div>

				<div class="flex flex-col gap-3 md:flex-row">
					<SaasCancelSubscriptionButton v-if="subscriptionIsRunning" :subscriptionId="props.currentSubscription.id" />
				</div>
			</div>
		</div>
	</SaasActionBlock>
</template>

<script setup lang="ts">
	import type { ApiOutput } from 'api'

	type SubscriptionPlan = ApiOutput['billing']['plans'][number]

	const props = defineProps<{
		plans: SubscriptionPlan[]
		currentSubscription?: ApiOutput['team']['subscription']
	}>()

	const { n, t } = useTranslations()
	const { localeCurrency } = useLocaleCurrency()

	const freePlan = computed<SubscriptionPlan>(() => ({
		id: 'free',
		name: t('settings.billing.subscription.freePlan.title'),
		variants: [
			{
				id: 'free',
				interval_count: 1,
				price: 0,
				interval: 'month',
				currency: localeCurrency.value,
			},
		],
	}))

	const activePlanId = computed(() => {
		return props.currentSubscription ? props.currentSubscription.plan_id : 'free'
	})
	const activeVariantId = computed(() => {
		return props.currentSubscription ? props.currentSubscription.variant_id : 'free'
	})

	const subscriptionPlan = computed(() => {
		return [freePlan.value, ...props.plans].find(plan => plan.id === activePlanId.value)
	})
	const subscriptionVariant = computed(() => {
		return subscriptionPlan.value?.variants.find(variant => variant.id === activeVariantId.value)
	})

	const subscriptionIsExceeding = computed(() => {
		if (!props.currentSubscription) {
			return false
		}
		return props.currentSubscription.status === 'CANCELED' || props.currentSubscription.status === 'PAUSED'
	})

	const subscriptionIsRunning = computed(() => {
		if (!props.currentSubscription) {
			return false
		}
		return props.currentSubscription.status === 'ACTIVE' || props.currentSubscription.status === 'TRIALING'
	})

	const { formatDate } = useLocaleDate()

	const nextPaymentLabel = computed(() => {
		const currentSubscription = props.currentSubscription
		if (!currentSubscription) {
			return
		}

		const nextPaymentDate = currentSubscription.next_payment_date
			? new Date(currentSubscription.next_payment_date)
			: null
		if (!nextPaymentDate) {
			return
		}

		const isExceeding = subscriptionIsExceeding.value
		return isExceeding
			? t('settings.billing.subscription.endsOn', {
					nextPaymentDate: formatDate({ date: nextPaymentDate }),
			  })
			: t('settings.billing.subscription.nextPayment', {
					nextPaymentDate: formatDate({ date: nextPaymentDate }),
			  })
	})
</script>
