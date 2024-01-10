<template>
	<div v-if="!pending" class="grid gap-6">
		<SaasChangeTeamNameForm v-if="team" :initialValue="team.name" :teamId="team.id" />
	</div>
	<SaasLoadingSpinner v-else />
</template>

<script setup lang="ts">
	definePageMeta({
		layout: 'saas-app',
	})

	const route = useRoute('teamSlug-settings-team-general___en')
	const { t } = useTranslations()
	const localePath = useLocalePath()
	const { apiCaller } = useApiCaller()

	useSeoMeta({
		title: t('settings.team.title'),
	})

	const {
		data: team,
		pending,
		error,
	} = apiCaller.team.bySlug.useQuery({
		slug: route.params.teamSlug,
	})

	watchEffect(() => {
		if (!pending.value && (!team.value || error.value)) {
			navigateTo(localePath('/auth/login'))
		}
	})
</script>
