import { TRPCError } from '@trpc/server'
import { auth, validateOneTimePassword } from 'auth'
import { UserOneTimePasswordType } from 'database'
import { z } from 'zod'
import { publicProcedure } from '../../trpc'

export const verifyOtp = publicProcedure
	.input(
		z.object({
			type: z.nativeEnum(UserOneTimePasswordType),
			identifier: z.string(),
			code: z.string(),
		})
	)
	.mutation(async ({ input: { type, identifier, code }, ctx: { event } }) => {
		try {
			const userId = await validateOneTimePassword({
				type,
				identifier,
				code,
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
			console.error(e)

			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'Invalid one-time password',
			})
		}
	})
