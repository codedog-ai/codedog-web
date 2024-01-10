import { TRPCError } from '@trpc/server'
import { TeamModel, db } from 'database'
import { z } from 'zod'
import { protectedProcedure } from '../../trpc'

export const acceptInvitation = protectedProcedure
	.input(
		z.object({
			id: z.string(),
		})
	)
	.output(TeamModel.pick({ slug: true }))
	.mutation(async ({ input: { id }, ctx: { user } }) => {
		const invitation = await db.teamInvitation.findFirst({
			where: {
				id,
			},
		})

		if (!invitation)
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Invitation not found.',
			})

		if (invitation.expiresAt < new Date())
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Invitation expired.',
			})

		// create membership for user
		const { team } = await db.teamMembership.create({
			data: {
				team_id: invitation.team_id,
				user_id: user!.id,
				role: invitation.role,
			},
			include: {
				team: {
					select: {
						slug: true,
					},
				},
			},
		})

		// delete invitation
		await db.teamInvitation.delete({
			where: {
				id,
			},
		})

		return team
	})
