<template>
	<div v-if="!pending" class="grid grid-cols-1 gap-6">
		<template v-if="data">
			<SaasInviteMemberForm :teamId="data.team.id" @success="refresh" />
			<SaasTeamMembersBlock :memberships="data.memberships" :invitations="data.invitations" />
		</template>
	</div>
	<SaasLoadingSpinner v-else />
</template>

<script setup lang="ts">
	definePageMeta({
		layout: 'saas-app',
	})

	const route = useRoute('teamSlug-settings-team-members___en')
	const { t } = useTranslations()
	const localePath = useLocalePath()
	const { apiCaller } = useApiCaller()

	useSeoMeta({
		title: t('settings.team.title'),
	})

	const { data, error, pending, refresh } = useAsyncData(async () => {
		const team = await apiCaller.team.bySlug.query({
			slug: route.params.teamSlug,
		})

		const [memberships, invitations] = await Promise.all([
			apiCaller.team.memberships.query({
				teamId: team.id,
			}),
			apiCaller.team.invitations.query({
				teamId: team.id,
			}),
		])

		return {
			team,
			memberships,
			invitations,
		}
	})

	watchEffect(() => {
		if (!pending.value && (!data.value?.team || error.value)) {
			navigateTo(localePath('/auth/login'))
		}
	})
</script>
