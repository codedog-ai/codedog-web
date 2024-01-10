<template>
	<div class="space-y-8" v-if="activeTeam && user">
		<SaasSettingsMenuGroup v-for="(item, key) of props.menuItems" :menuItemGroup="item" :key="key">
			<template #avatar>
				<BoringAvatar v-if="item.avatar === 'team'" :size="32" :name="activeTeam.name" variant="marble" />
				<UserAvatar v-else-if="item.avatar === 'user'" :name="user.name || ''" :avatarUrl="user.avatar_url" />
			</template>
		</SaasSettingsMenuGroup>
	</div>
</template>

<script setup lang="ts">
	import type { SaasSettingsMenuItemGroup } from './SaasSettingsMenuGroup.vue'

	const props = defineProps<{
		menuItems: SaasSettingsMenuItemGroup[]
	}>()

	const route = useRoute()
	const { user, teamMemberships } = useUser()

	const teamSlug = computed(() => {
		return 'teamSlug' in route.params ? route.params.teamSlug : ''
	})

	const activeTeam = computed(() => {
		return teamMemberships.value.find(membership => {
			return membership.team.slug === teamSlug.value
		})?.team
	})
</script>
