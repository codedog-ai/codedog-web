import { SubscriptionModel, db } from 'database'
import { z } from 'zod'
import { protectedProcedure } from '../../trpc'

export const subscription = protectedProcedure
	.input(
		z.object({
			teamId: z.string(),
		})
	)
	.output(SubscriptionModel.nullable())
	.query(async ({ input: { teamId }, ctx: { abilities } }) => {
		if (!abilities.isTeamMember(teamId)) {
			throw new Error('Unauthorized')
		}

		const subscription = await db.subscription.findFirst({
			where: {
				team_id: teamId,
			},
		})

		return subscription
	})
