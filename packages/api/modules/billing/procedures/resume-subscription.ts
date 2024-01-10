import { TRPCError } from '@trpc/server'
import { db } from 'database'
import { z } from 'zod'
import { protectedProcedure } from '../../trpc'
import { resumeSubscription as resumeSubscriptionResolver } from '../provider'

export const resumeSubscription = protectedProcedure
	.input(
		z.object({
			id: z.string(),
		})
	)
	.mutation(async ({ input: { id }, ctx: { abilities } }) => {
		const subscription = await db.subscription.findFirst({
			where: {
				id,
			},
		})

		if (!subscription)
			throw new TRPCError({
				code: 'NOT_FOUND',
			})

		if (!abilities.isTeamOwner(subscription.team_id))
			throw new TRPCError({
				code: 'FORBIDDEN',
			})

		try {
			const { status } = await resumeSubscriptionResolver({ id })

			await db.subscription.update({
				where: {
					id,
				},
				data: {
					status,
				},
			})
		} catch (e) {
			console.error(e)
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
			})
		}
	})
