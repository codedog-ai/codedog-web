<template>
	<div class="rounded-md border">
		<TableRoot>
			<TableBody v-if="props.memberships.length">
				<TableRow v-for="row of props.memberships" :key="row.id">
					<!-- User Details -->
					<TableCell>
						<div v-if="row.user" class="flex items-center gap-2">
							<UserAvatar :name="row.user.name ?? row.user.email" :avatarUrl="row.user.avatar_url" />
							<div>
								<strong class="block">{{ row.user.name }}</strong>
								<small class="text-muted-foreground">
									{{ row.user.email }}
								</small>
							</div>
						</div>
					</TableCell>

					<!-- Actions -->
					<TableCell>
						<div class="flex flex-row justify-end gap-2">
							<SaasTeamRoleSelect
								:modelValue="row.role"
								@update:modelValue="val => handleUpdateRole({ membershipId: row.id, role: val })"
								:disabled="currentTeamRole !== 'OWNER' || row.is_creator" />

							<DropdownMenuRoot>
								<DropdownMenuTrigger asChild>
									<Button size="icon" variant="ghost">
										<Icon name="more" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem
										:disabled="row.is_creator"
										class="text-error"
										@click="() => handleRemoveMember({ membershipId: row.id })">
										<Icon :name="row.user?.id === user?.id ? 'logout' : 'delete'" class="mr-2 h-4 w-4" />
										{{ t('settings.team.members.removeMember') }}
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenuRoot>
						</div>
					</TableCell>
				</TableRow>
			</TableBody>

			<TableBody v-else>
				<TableRow>
					<TableCell colspan="2" class="h-24 text-center"> No results. </TableCell>
				</TableRow>
			</TableBody>
		</TableRoot>
	</div>
</template>

<script setup lang="ts">
	import type { ApiOutput } from 'api'
	import type { TeamMemberRole } from 'database'

	const props = defineProps<{
		memberships: ApiOutput['team']['memberships']
	}>()

	const route = useRoute()
	const { t } = useTranslations()
	const { user, teamMemberships } = useUser()
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

	const handleUpdateRole = async ({ membershipId, role }: { membershipId: string; role: TeamMemberRole }) => {
		if (!process.client || typeof window === 'undefined') {
			return
		}

		const loadingToast = toast({
			variant: 'loading',
			description: t('settings.team.members.notifications.updateMembership.loading.description'),
		})

		try {
			await apiCaller.team.updateMembership.mutate({
				id: membershipId,
				role,
			})

			toast({
				variant: 'success',
				description: t('settings.team.members.notifications.updateMembership.success.description'),
			})

			location.reload()
		} catch (error) {
			toast({
				variant: 'error',
				description: t('settings.team.members.notifications.updateMembership.error.description'),
			})
		} finally {
			dismiss(loadingToast.id)
		}
	}

	const handleRemoveMember = async ({ membershipId }: { membershipId: string }) => {
		if (!process.client || typeof window === 'undefined') {
			return
		}

		const loadingToast = toast({
			variant: 'loading',
			description: t('settings.team.members.notifications.removeMember.loading.description'),
		})

		try {
			await apiCaller.team.removeMember.mutate({
				membershipId,
			})

			toast({
				variant: 'success',
				description: t('settings.team.members.notifications.removeMember.success.description'),
			})

			location.reload()
		} catch (error) {
			toast({
				variant: 'error',
				description: t('settings.team.members.notifications.removeMember.error.description'),
			})
		} finally {
			dismiss(loadingToast.id)
		}
	}
</script>
