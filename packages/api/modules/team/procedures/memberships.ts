import { TRPCError } from '@trpc/server'
import { TeamMembershipModel, UserModel, db } from 'database'
import { z } from 'zod'
import { protectedProcedure } from '../../trpc'

export const memberships = protectedProcedure
	.input(
		z.object({
			teamId: z.string(),
		})
	)
	.output(
		z.array(
			TeamMembershipModel.merge(
				z.object({
					user: UserModel.optional(),
				})
			)
		)
	)
	.query(async ({ input: { teamId }, ctx: { abilities } }) => {
		if (!abilities.isTeamMember(teamId)) {
			throw new TRPCError({
				code: 'UNAUTHORIZED',
				message: 'No permission to read the memberships for this team.',
			})
		}

		const memberships = await db.teamMembership.findMany({
			where: {
				team_id: teamId,
			},
		})

		const userIds = memberships.map(m => m.user_id).filter((id): id is string => !!id) ?? []

		const users = await db.user.findMany({
			where: {
				id: {
					in: userIds,
				},
			},
		})

		return (
			memberships.map(m => ({
				...m,
				user: users.find(u => u.id === m.user_id),
			})) ?? []
		)
	})
