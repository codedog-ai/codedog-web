import { TRPCError } from '@trpc/server'
import { auth, validateVerificationToken } from 'auth'
import { z } from 'zod'
import { publicProcedure } from '../../trpc'

export const verifyToken = publicProcedure
	.input(
		z.object({
			token: z.string(),
		})
	)
	.mutation(async ({ input: { token }, ctx: { event } }) => {
		try {
			const userId = await validateVerificationToken({
				token,
			})

			const session = await auth.createSession({
				userId,
				attributes: {},
			})

			if (!session.user.email_verified) {
				await auth.updateUserAttributes(session.user.id, {
					email_verified: true,
				})
			}

			// auth.handleRequest(req);
			const sessionCookie = auth.createSessionCookie(session)
			if (event) {
				setCookie(event, sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
			}

			return session
		} catch (e) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'Invalid token',
			})
		}
	})
