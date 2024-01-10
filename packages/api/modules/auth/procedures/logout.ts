import { TRPCError } from '@trpc/server'
import { auth } from 'auth'
import { protectedProcedure } from '../../trpc'

export const logout = protectedProcedure.mutation(async ({ ctx: { sessionId, event } }) => {
	try {
		if (!sessionId) {
			return
		}
		await auth.invalidateSession(sessionId)
		const sessionCookie = auth.createSessionCookie(null)
		if (event) {
			setCookie(event, sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
		}
	} catch (e) {
		console.error(e)
		throw new TRPCError({
			code: 'INTERNAL_SERVER_ERROR',
			message: 'An unknown error occurred.',
		})
	}
})
