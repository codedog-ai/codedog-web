<template>
	<SaasLoadingWrapper />
</template>

<script setup lang="ts">
	const route = useRoute('team-redirect___en')
	const localePath = useLocalePath()

	const { data } = await useFetch('/api/team/redirect', {
		query: {
			redirectTo: route.query.redirectTo as string,
		},
	})
	const redirectPath = computed(() => {
		return localePath(data.value?.redirectPath ?? '/')
	})

	navigateTo(redirectPath.value, {
		replace: true,
	})
</script>
