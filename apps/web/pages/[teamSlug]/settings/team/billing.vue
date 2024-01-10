<template>
	<div v-if="!pending" class="grid gap-6">
		<SaasSubscriptionOverview v-if="data?.plans" :plans="data.plans" :currentSubscription="data.teamSubscription" />

		<SaasUpgradePlan
			v-if="data?.plans"
			:plans="data.plans"
			:activePlanId="data.teamSubscription?.plan_id"
			:teamId="data.team.id" />
	</div>
	<SaasLoadingSpinner v-else />
</template>

<script setup lang="ts">
	definePageMeta({
		layout: 'saas-app',
	})

	const route = useRoute('teamSlug-settings-team-billing___en')
	const { t } = useTranslations()
	const { apiCaller } = useApiCaller()
	const localePath = useLocalePath()

	useSeoMeta({
		title: t('settings.billing.title'),
	})

	const { data, pending } = useAsyncData(async () => {
		const team = await apiCaller.team.bySlug.query({
			slug: route.params.teamSlug,
		})

		const [plans, teamSubscription] = await Promise.all([
			apiCaller.billing.plans.query(),
			apiCaller.team.subscription.query({
				teamId: team.id,
			}),
		])

		return {
			team,
			plans,
			teamSubscription,
		}
	})

	watchEffect(() => {
		if (!pending.value && !data.value?.team) {
			navigateTo(localePath('/auth/login'))
		}
	})
</script>
