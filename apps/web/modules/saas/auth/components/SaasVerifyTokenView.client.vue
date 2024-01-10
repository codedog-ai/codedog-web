<template>
	<div v-if="loading" class="flex items-center justify-center py-8">
		<Icon name="spinner" class="h-8 w-8 animate-spin" />
	</div>

	<div v-else>
		<h1 class="text-3xl font-bold">
			{{ tokenVerified ? t('auth.confirmation.title') : t('auth.invalidToken.title') }}
		</h1>
		<p class="text-muted-foreground mb-4 mt-2">
			{{ tokenVerified ? t('auth.confirmation.message') : t('auth.invalidToken.message') }}
		</p>
	</div>
</template>

<script setup lang="ts">
	const { apiCaller } = useApiCaller()
	const { t } = useTranslations()
	const { reloadUser } = useUser({ initialUser: null })

	const loading = ref(true)
	const tokenVerified = ref(false)

	const { searchQuery: token } = useRouteSearchQuery({ name: 'token', replace: true })

	onMounted(async () => {
		if (!token.value) {
			loading.value = false
			return
		}

		try {
			await apiCaller.auth.verifyToken.mutate({ token: token.value })
			tokenVerified.value = true
			await reloadUser()
		} catch (_) {
		} finally {
			loading.value = false
		}
	})
</script>
