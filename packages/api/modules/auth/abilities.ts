import type { SessionUser } from 'auth'
import { TeamMemberRole, type TeamMembership, UserRole } from 'database'

export function defineAbilitiesFor({
	user,
	teamMemberships,
}: {
	user: SessionUser | null
	teamMemberships: TeamMembership[] | null
}) {
	const isAdmin = user?.role === UserRole.ADMIN

	const getTeamRole = (teamId: string) => teamMemberships?.find(m => m.team_id === teamId)?.role ?? null
	const isTeamOwner = (teamId: string) => isAdmin || getTeamRole(teamId) === TeamMemberRole.OWNER
	const isTeamMember = (teamId: string) => isTeamOwner(teamId) || getTeamRole(teamId) === TeamMemberRole.MEMBER

	return {
		isAdmin,
		isTeamMember,
		isTeamOwner,
	}
}
