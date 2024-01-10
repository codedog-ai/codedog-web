import { TRPCError } from '@trpc/server'
import { TeamModel, db } from 'database'
import { z } from 'zod'
import { protectedProcedure } from '../../trpc'
import { slugifyTeamName } from '../lib/team-slug'

export const update = protectedProcedure
	.input(
		z.object({
			id: z.string(),
			name: z.string(),
		})
	)
	.output(TeamModel)
	.mutation(async ({ input: { id, name }, ctx: { abilities } }) => {
		if (!abilities.isTeamOwner(id)) {
			throw new TRPCError({
				code: 'UNAUTHORIZED',
				message: 'No permission to update this team.',
			})
		}

		let slug = slugifyTeamName(name)
		if (!slug)
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'Invalid team name',
			})

		let isSlugAvailable = false
		let iteration = 0

		while (!isSlugAvailable) {
			if (iteration === 2)
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'Could not create team',
				})

			const existingTeam = await db.team.findUnique({
				where: {
					slug,
				},
			})

			if (!existingTeam) {
				isSlugAvailable = true
			} else {
				slug = slugifyTeamName(`${name}-${(Math.random() + 1).toString(36).substring(2, 7)}`)
			}

			iteration++
		}

		const team = await db.team.update({
			where: {
				id,
			},
			data: {
				name,
				slug,
			},
		})

		return team
	})
