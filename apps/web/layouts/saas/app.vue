<template>
	<div v-if="userLoaded" class="bg-muted min-h-screen">
		<SaasNavBar />

		<main>
			<slot />
		</main>
	</div>

	<SaasLoadingWrapper v-else />
</template>

<script setup lang="ts">
	const route = useRoute()
	const localePath = useLocalePath()
	const { user, loaded: userLoaded, teamMemberships } = useUser()

	const teamSlug = computed(() => {
		return 'teamSlug' in route.params ? route.params.teamSlug : ''
	})

	const activeMembership = computed(() => {
		return teamMemberships.value.find(membership => {
			return membership.team.slug === teamSlug.value
		})
	})

	watchEffect(() => {
		if (userLoaded.value) {
			if (!user.value) {
				return navigateTo(localePath('/auth/login'))
			}

			if (teamSlug.value && !activeMembership.value) {
				return navigateTo(localePath('/'))
			}
		}
	})
</script>
