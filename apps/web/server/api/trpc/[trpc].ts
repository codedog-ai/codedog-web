import { createNuxtApiHandler } from 'trpc-nuxt'
import { apiRouter, createContext } from 'api/modules/trpc'

export default createNuxtApiHandler({
	router: apiRouter,
	createContext,
})
