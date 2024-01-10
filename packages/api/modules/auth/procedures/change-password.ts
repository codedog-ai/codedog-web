import { auth } from 'auth'
import { z } from 'zod'
import { protectedProcedure } from '../../trpc'

export const changePassword = protectedProcedure
	.input(
		z.object({
			password: z.string().min(8).max(255),
		})
	)
	.mutation(async ({ ctx: { user }, input: { password } }) => {
		// check if user has a password key
		const userKeys = await auth.getAllUserKeys(user!.id)

		if (!userKeys.some(key => key.providerId === 'email')) {
			await auth.createKey({
				userId: user!.id,
				providerId: 'email',
				providerUserId: user!.email,
				password,
			})

			return
		}

		await auth.updateKeyPassword('email', user!.email, password)
	})
