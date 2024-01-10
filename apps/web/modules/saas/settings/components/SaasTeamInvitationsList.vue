<template>
	<div class="rounded-md border">
		<TableRoot>
			<TableBody v-if="props.invitations.length">
				<TableRow v-for="row of props.invitations" :key="row.id">
					<!-- User Details -->
					<TableCell>
						<div>
							{{ row.email }}
						</div>
					</TableCell>

					<!-- Actions -->
					<TableCell>
						<div class="flex flex-row justify-end gap-2">
							<SaasTeamRoleSelect :modelValue="row.role" disabled />

							<DropdownMenuRoot>
								<DropdownMenuTrigger asChild>
									<Button size="icon" variant="ghost">
										<Icon name="more" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem
										:disabled="currentTeamRole !== 'OWNER'"
										class="text-error"
										@click="() => handleRevokeInvitation({ invitationId: row.id })">
										<Icon name="undo" class="mr-2 h-4 w-4" />
										{{ t('settings.team.members.invitations.revoke') }}
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenuRoot>
						</div>
					</TableCell>
				</TableRow>
			</TableBody>

			<TableBody v-else>
				<TableRow>
					<TableCell colspan="2" class="h-24 text-center">
						{{ t('settings.team.members.invitations.empty') }}
					</TableCell>
				</TableRow>
			</TableBody>
		</TableRoot>
	</div>
</template>

<script setup lang="ts">
	import type { ApiOutput } from 'api'

	const props = defineProps<{
		invitations: ApiOutput['team']['invitations']
	}>()

	const route = useRoute()
	const { t } = useTranslations()
	const { teamMemberships } = useUser()
	const { toast, dismiss } = useToast()
	const { apiCaller } = useApiCaller()

	const teamSlug = computed(() => {
		return 'teamSlug' in route.params ? route.params.teamSlug : ''
	})

	const activeMembership = computed(() => {
		return teamMemberships.value.find(membership => {
			return membership.team.slug === teamSlug.value
		})
	})

	const currentTeamRole = computed(() => {
		return activeMembership.value?.role
	})

	const handleRevokeInvitation = async ({ invitationId }: { invitationId: string }) => {
		if (!process.client || typeof window === 'undefined') {
			return
		}

		const loadingToast = toast({
			variant: 'loading',
			description: t('settings.team.members.notifications.revokeInvitation.loading.description'),
		})

		try {
			await apiCaller.team.revokeInvitation.mutate({
				invitationId,
			})

			toast({
				variant: 'success',
				description: t('settings.team.members.notifications.revokeInvitation.success.description'),
			})

			location.reload()
		} catch (error) {
			toast({
				variant: 'error',
				description: t('settings.team.members.notifications.revokeInvitation.error.description'),
			})
		} finally {
			dismiss(loadingToast.id)
		}
	}
</script>
