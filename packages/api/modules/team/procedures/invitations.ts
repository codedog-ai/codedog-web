import { TRPCError } from '@trpc/server'
import { TeamInvitationModel, db } from 'database'
import { z } from 'zod'
import { protectedProcedure } from '../../trpc'

export const invitations = protectedProcedure
	.input(
		z.object({
			teamId: z.string(),
		})
	)
	.output(z.array(TeamInvitationModel))
	.query(async ({ input: { teamId }, ctx: { abilities } }) => {
		if (!abilities.isTeamMember(teamId)) {
			throw new TRPCError({
				code: 'UNAUTHORIZED',
				message: 'No permission to read the invitations for this team.',
			})
		}

		const invitations = await db.teamInvitation.findMany({
			where: {
				team_id: teamId,
			},
		})

		return invitations
	})
