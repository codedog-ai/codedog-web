import type { H3Event } from 'h3'
import { createContext } from '../../modules/trpc'
import { apiRouter } from '../../modules/trpc/router'

export const createApiCaller = async (event: H3Event) => {
	const context = await createContext(event)
	return apiRouter.createCaller(context)
}

export const createAdminApiCaller = async () => {
	const context = await createContext({ isAdmin: true })
	return apiRouter.createCaller(context)
}
