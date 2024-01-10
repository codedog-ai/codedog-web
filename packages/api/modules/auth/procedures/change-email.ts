import { auth, generateVerificationToken } from 'auth'
import { z } from 'zod'
import { protectedProcedure } from '../../trpc'

export const changeEmail = protectedProcedure
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
	.mutation(async ({ ctx: { user, event }, input: { email, callbackUrl } }) => {
		if (!user) {
			return
		}

		const updatedUser = await auth.updateUserAttributes(user.id, {
			email,
			email_verified: false,
		})

		await auth.invalidateAllUserSessions(user.id)
		const sessionCookie = auth.createSessionCookie(null)
		if (event) {
			setCookie(event, sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
		}

		const token = await generateVerificationToken({
			userId: user.userId,
		})

		const url = new URL(callbackUrl)
		url.searchParams.set('token', token)

		sendEmail({
			to: email,
			templateId: 'emailChange',
			context: {
				name: updatedUser.name ?? updatedUser.email,
				url: url.toString(),
			},
		})
	})
