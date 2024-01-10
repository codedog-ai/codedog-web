<template>
	<div v-if="activeTeam" class="container max-w-6xl py-8">
		<div class="align-start flex flex-col gap-8 md:flex-row">
			<div class="w-full md:max-w-[200px]">
				<SaasSettingsMenu :menuItems="menuItems" />
			</div>

			<div class="flex-1">
				<!-- Nested route -->
				<NuxtPage />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { SaasSettingsMenuItemGroup } from '@/modules/saas/settings/components/SaasSettingsMenuGroup.vue'

	const route = useRoute()
	const router = useRouter()
	const { teamMemberships } = useUser()
	const { t } = useTranslations()

	const teamSlug = computed(() => {
		return 'teamSlug' in route.params ? route.params.teamSlug : ''
	})

	const activeTeam = computed(() => {
		return teamMemberships.value.find(membership => {
			return membership.team.slug === teamSlug.value
		})?.team
	})

	const menuItems = computed<SaasSettingsMenuItemGroup[]>(() => {
		if (!activeTeam.value) {
			return []
		}

		return [
			{
				title: t('settings.menu.team.title'),
				avatar: 'team',
				items: [
					{
						title: t('settings.menu.team.general'),
						to: router.resolve({
							name: 'teamSlug-settings-team-general___en',
							params: {
								teamSlug: activeTeam.value.slug,
							},
						}).path,
					},
					{
						title: t('settings.menu.team.members'),
						to: router.resolve({
							name: 'teamSlug-settings-team-members___en',
							params: {
								teamSlug: activeTeam.value.slug,
							},
						}).path,
					},
					{
						title: t('settings.menu.team.billing'),
						to: router.resolve({
							name: 'teamSlug-settings-team-billing___en',
							params: {
								teamSlug: activeTeam.value.slug,
							},
						}).path,
					},
				],
			},
			{
				title: t('settings.menu.account.title'),
				avatar: 'user',
				items: [
					{
						title: t('settings.menu.account.general'),
						to: router.resolve({
							name: 'teamSlug-settings-account-general___en',
							params: {
								teamSlug: activeTeam.value.slug,
							},
						}).path,
					},
				],
			},
		]
	})
</script>
