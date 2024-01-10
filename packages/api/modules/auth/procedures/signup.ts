import { TRPCError } from '@trpc/server'
import { auth, generateOneTimePassword, generateVerificationToken } from 'auth'
import { UserRole } from 'database'
import { z } from 'zod'
import { publicProcedure } from '../../trpc'

export const signup = publicProcedure
	.input(
		z.object({
			email: z
				.string()
				.email()
				.min(1)
				.max(255)
				.transform(v => v.toLowerCase()),
			password: z.string().min(8).max(255),
			name: z.string().min(1).max(255),
			callbackUrl: z.string(),
		})
	)
	.mutation(async ({ input: { email, password, name, callbackUrl }, ctx: { event } }) => {
		try {
			const user = await auth.createUser({
				key: {
					providerId: 'email',
					providerUserId: email,
					password,
				},
				attributes: {
					email,
					email_verified: false,
					name,
					role: UserRole.USER,
					avatar_url: null,
				},
			})

			const session = await auth.createSession({
				userId: user.userId,
				attributes: {},
			})

			// auth.handleRequest(req);
			const sessionCookie = auth.createSessionCookie(session)
			if (event) {
				setCookie(event, sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
			}

			const token = await generateVerificationToken({
				userId: user.userId,
			})
			const otp = await generateOneTimePassword({
				userId: user.userId,
				type: 'SIGNUP',
				identifier: email,
			})

			const url = new URL(callbackUrl)
			url.searchParams.set('token', token)

			await sendEmail({
				templateId: 'newUser',
				to: email,
				context: {
					url: url.toString(),
					otp,
					name: user.name ?? user.email,
				},
			})
		} catch (e) {
			console.error(e)
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'An unknown error occurred.',
			})
		}
	})
