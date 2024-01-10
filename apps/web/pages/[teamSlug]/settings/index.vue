<template>
	<div />
</template>

<script setup lang="ts">
	const route = useRoute('teamSlug-settings___en')
	const router = useRouter()
	const localePath = useLocalePath()

	const teamSlug = computed(() => {
		return 'teamSlug' in route.params ? route.params.teamSlug : ''
	})

	onMounted(() => {
		navigateTo(
			localePath(
				router.resolve({
					name: 'teamSlug-settings-team-general___en',
					params: {
						teamSlug: teamSlug.value,
					},
				}).path
			)
		)
	})
</script>
