import type { inferAsyncReturnType } from '@trpc/server'
import { type SessionUser, type Session, auth } from 'auth'
import { db } from 'database'
import { type H3Event } from 'h3'
import { defineAbilitiesFor } from '../auth'

export async function createContext(event?: H3Event | { isAdmin?: boolean }) {
	const authRequest = event && 'node' in event ? auth.handleRequest(event) : null
	let session: Session | null = null
	try {
		session = await authRequest?.validate() // or `authRequest.validateBearerToken()`
	} catch (e) {
		console.error(e)
	}

	const user: SessionUser | null = session?.user ?? null

	const teamMemberships = user
		? await db.teamMembership.findMany({
				where: {
					user_id: user.id,
				},
				include: {
					team: true,
				},
		  })
		: null

	const abilities = defineAbilitiesFor({
		user,
		teamMemberships,
	})

	return {
		user,
		teamMemberships,
		abilities,
		sessionId: session?.sessionId ?? null,
		isAdmin: event && 'isAdmin' in event ? event.isAdmin : false,
		event: event && 'node' in event ? event : undefined,
	}
}

export type Context = inferAsyncReturnType<typeof createContext>
