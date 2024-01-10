export const useSwitchTeam = () => {
	const { teamMemberships } = useUser()
	const { teamSlugCookie } = useTeamSlugCookie()

	const switchTeam = (slug: string | undefined, options: { refresh?: boolean } = {}) => {
		const route = useRoute()
		const teamSlug = computed(() => {
			return 'teamSlug' in route.params ? route.params.teamSlug : ''
		})
		const activeTeam = computed(() => {
			return teamMemberships.value.find(membership => {
				return membership.team.slug === teamSlug.value
			})?.team
		})
		if (!activeTeam.value || !slug) {
			return
		}

		teamSlugCookie.value = slug
		navigateTo(route.path.replace(activeTeam.value.slug, slug), {
			external: !!options.refresh, // so that the page refreshes and user context is updated to include new team.
		})
	}

	return {
		switchTeam,
	}
}
