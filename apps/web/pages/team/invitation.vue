<template>
	<SaasLoadingWrapper />
</template>

<script setup lang="ts">
	const route = useRoute('team-invitation___en')
	const localePath = useLocalePath()

	const { data } = await useFetch('/api/team/invitation', {
		query: {
			code: route.query.code as string,
		},
	})
	const redirectPath = computed(() => {
		return localePath(data.value?.redirectPath ?? '/')
	})

	navigateTo(redirectPath.value)
</script>
