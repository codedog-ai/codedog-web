<template>
	<SaasSignupForm />
</template>

<script setup lang="ts">
	const { t } = useTranslations()

	definePageMeta({
		layout: 'saas-auth',
	})

	useSeoMeta({
		title: t('auth.signup.title'),
	})
</script>
