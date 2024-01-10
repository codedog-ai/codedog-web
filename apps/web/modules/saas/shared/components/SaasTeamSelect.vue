<template>
	<DropdownMenuRoot v-if="activeTeam">
		<DropdownMenuTrigger
			class="focus-visible:ring-ring focus-visible:border-primary -ml-2 flex w-full items-center justify-between rounded-md px-2 py-2 text-left outline-none focus-visible:ring-1">
			<div class="flex items-center justify-start gap-2 text-sm">
				<span class="hidden lg:block">
					<BoringAvatar :size="32" :name="activeTeam.name" variant="marble" />
				</span>
				<span class="block flex-1 truncate">{{ activeTeam.name }}</span>
				<Icon name="select" class="block h-4 w-4 opacity-50" />
			</div>
		</DropdownMenuTrigger>
		<DropdownMenuContent class="w-full">
			<DropdownMenuRadioGroup v-model="activeTeamSlugModel">
				<DropdownMenuRadioItem
					v-for="teamMembership of teamMemberships"
					:key="teamMembership.team.slug"
					:value="teamMembership.team.slug">
					<div class="flex flex-1 items-center justify-start gap-2">
						<BoringAvatar :size="16" :name="teamMembership.team.name" variant="marble" />
						{{ teamMembership.team.name }}
					</div>
				</DropdownMenuRadioItem>
			</DropdownMenuRadioGroup>

			<DropdownMenuSeparator />

			<DropdownMenuGroup>
				<DropdownMenuItem @click="() => (createTeamDialogOpen = true)">
					<Icon name="plus" class="mr-2 h-4 w-4" />
					{{ t('dashboard.sidebar.createTeam') }}
				</DropdownMenuItem>
			</DropdownMenuGroup>
		</DropdownMenuContent>
	</DropdownMenuRoot>

	<SaasCreateTeamDialog @success="newSlug => switchTeam(newSlug, { refresh: true })" />
</template>

<script setup lang="ts">
	const route = useRoute()
	const { t } = useTranslations()
	const { teamMemberships } = useUser()
	const { switchTeam } = useSwitchTeam()
	const { createTeamDialogOpen } = useDashboardState()

	const teamSlug = computed(() => {
		return 'teamSlug' in route.params ? route.params.teamSlug : ''
	})

	const activeTeam = computed(() => {
		return teamMemberships.value.find(membership => {
			return membership.team.slug === teamSlug.value
		})?.team
	})

	const activeTeamSlugModel = computed({
		get: () => activeTeam.value?.slug,
		set: newValue => switchTeam(newValue),
	})
</script>
