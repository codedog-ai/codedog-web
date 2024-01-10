<template>
	<Alert variant="primary">
		<Icon name="invitation" class="h-4 w-4" />
		<template #title>{{ t('auth.teamInvitation.title') }}</template>
		<template #description?>
			{{ t('auth.teamInvitation.description') }}
		</template>
	</Alert>
</template>

<script setup lang="ts">
	const { t } = useTranslations()
</script>
