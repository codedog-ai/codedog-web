import { TeamInvitationModel, db } from 'database'
import { z } from 'zod'
import { publicProcedure } from '../../trpc'

export const invitationById = publicProcedure
	.input(
		z.object({
			id: z.string(),
		})
	)
	.output(
		TeamInvitationModel.extend({
			team: z
				.object({
					name: z.string(),
					slug: z.string(),
				})
				.nullish(),
		}).nullable()
	)
	.mutation(async ({ input: { id } }) => {
		const invitation = await db.teamInvitation.findFirst({
			where: {
				id,
			},
			include: {
				team: {
					select: {
						name: true,
						slug: true,
					},
				},
			},
		})

		return invitation
	})
