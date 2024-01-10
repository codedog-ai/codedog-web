import { TRPCError } from '@trpc/server'
import { TeamModel, db } from 'database'
import { z } from 'zod'
import { protectedProcedure } from '../../trpc'

export const bySlug = protectedProcedure
	.input(
		z.object({
			slug: z.string(),
		})
	)
	.output(TeamModel)
	.query(async ({ input: { slug }, ctx: { abilities } }) => {
		const team = await db.team.findFirst({
			where: {
				slug,
			},
		})

		if (!team) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Team not found.',
			})
		}

		if (!abilities.isTeamMember(team.id)) {
			throw new TRPCError({
				code: 'UNAUTHORIZED',
				message: 'No permission to read this team.',
			})
		}

		return team
	})
