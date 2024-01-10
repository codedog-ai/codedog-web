<template>
	<PricingTable
		:plans="props.plans"
		:onSelectPlan="
			() => {
				navigateTo(`/team/redirect?redirectTo=${encodeURIComponent('/[teamSlug]/settings/team/billing')}`)
			}
		" />
</template>

<script setup lang="ts">
	import type { ApiOutput } from 'api'

	const props = defineProps<{
		plans: ApiOutput['billing']['plans']
	}>()
</script>
