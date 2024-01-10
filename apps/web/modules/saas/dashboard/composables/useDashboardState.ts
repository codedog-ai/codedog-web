export const useDashboardState = () => {
	const sidebarExpanded = useState('dashboardState.sidebarExpanded', () => false)
	const createTeamDialogOpen = useState('dashboardState.createTeamDialogOpen', () => false)

	return {
		sidebarExpanded,
		createTeamDialogOpen,
	}
}
