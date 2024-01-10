<template>
	<div v-if="user" class="grid gap-6">
		<SaasChangeNameForm :initialValue="user.name || ''" />
		<SaasChangePasswordForm />
	</div>
</template>

<script setup lang="ts">
	definePageMeta({
		layout: 'saas-app',
	})

	const { t } = useTranslations()
	const localePath = useLocalePath()
	const { user } = useUser()

	useSeoMeta({
		title: t('settings.account.title'),
	})

	watchEffect(() => {
		if (!user.value) {
			navigateTo(localePath('/auth/login'))
		}
	})
</script>
