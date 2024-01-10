<template>
	<DialogRoot :open="createTeamDialogOpen" @update:open="newVal => (createTeamDialogOpen = newVal)">
		<DialogContent>
			<DialogDescription class="sr-only">
				{{ t('createTeam.title') }}
			</DialogDescription>
			<DialogHeader>
				<DialogTitle>
					{{ t('createTeam.title') }}
				</DialogTitle>
			</DialogHeader>

			<SaasCreateTeamForm @success="newTeam => handleCreateTeamSuccess(newTeam.slug)" />
		</DialogContent>
	</DialogRoot>
</template>

<script setup lang="ts">
	const { createTeamDialogOpen } = useDashboardState()
	const { t } = useTranslations()

	const emit = defineEmits<{
		success: [slug: string]
	}>()

	const handleCreateTeamSuccess = async (newTeamSlug: string) => {
		emit('success', newTeamSlug)
		createTeamDialogOpen.value = false
	}
</script>
