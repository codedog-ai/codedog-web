import { z } from 'zod'
import { publicProcedure } from '../../trpc'
import { getAllPlans } from '../provider'
import { SubscriptionPlanModel } from '../types'

export const plans = publicProcedure.output(z.array(SubscriptionPlanModel)).query(async () => {
	return await getAllPlans()
})
