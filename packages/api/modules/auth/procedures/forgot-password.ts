import { TRPCError } from '@trpc/server'
import { generateOneTimePassword, generateVerificationToken } from 'auth'
import { db } from 'database'
import { z } from 'zod'
import { publicProcedure } from '../../trpc'

export const forgotPassword = publicProcedure
	.input(
		z.object({
			email: z
				.string()
				.email()
				.min(1)
				.max(255)
				.transform(v => v.toLowerCase()),
			callbackUrl: z.string(),
		})
	)
	.mutation(async ({ input: { email, callbackUrl } }) => {
		try {
			const user = await db.user.findFirst({
				where: {
					email,
				},
			})

			if (!user) {
				throw new Error('User not found')
			}

			const token = await generateVerificationToken({
				userId: user.id,
			})
			const otp = await generateOneTimePassword({
				userId: user.id,
				type: 'PASSWORD_RESET',
				identifier: email,
			})

			const url = new URL(callbackUrl)
			url.searchParams.set('token', token)

			await sendEmail({
				templateId: 'forgotPassword',
				to: email,
				context: {
					url: url.toString(),
					name: user.name ?? user.email,
					otp,
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
