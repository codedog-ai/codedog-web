import { type UserOneTimePasswordType, db } from 'database'
import { generateRandomString, isWithinExpiration } from 'lucia/utils'

export const generateVerificationToken = async ({
	userId,
	expireDuration = 1000 * 60 * 60 * 2,
}: {
	userId: string
	expireDuration?: number
}) => {
	const storedUserTokens = await db.userVerificationToken.findMany({
		where: {
			user_id: userId,
		},
	})

	if (storedUserTokens.length > 0) {
		const reusableStoredToken = storedUserTokens.find(token => {
			return isWithinExpiration(Number(token.expires) - expireDuration / 2)
		})
		if (reusableStoredToken) {
			return reusableStoredToken.token
		}
	}

	const token = generateRandomString(63)

	await db.userVerificationToken.create({
		data: {
			token,
			expires: new Date(new Date().getTime() + expireDuration),
			user_id: userId,
		},
	})

	return token
}

export const validateVerificationToken = async ({ token }: { token: string }) => {
	const storedToken = await db.userVerificationToken.findFirst({
		where: {
			token,
		},
	})

	if (!storedToken) {
		throw new Error('Invalid token')
	}

	await db.userVerificationToken.delete({
		where: {
			id: storedToken.id,
		},
	})

	const expires = storedToken.expires.getTime()

	if (!isWithinExpiration(expires)) {
		throw new Error('Expired token')
	}

	return storedToken.user_id
}

export const generateOneTimePassword = async ({
	userId,
	type,
	identifier,
	expireDuration = 1000 * 60 * 60 * 2,
}: {
	userId: string
	type: UserOneTimePasswordType
	identifier: string
	expireDuration?: number
}) => {
	const storedUserTokens = await db.userOneTimePassword.findMany({
		where: {
			user_id: userId,
		},
	})

	if (storedUserTokens.length > 0) {
		const reusableStoredToken = storedUserTokens.find(token => {
			return isWithinExpiration(Number(token.expires) - expireDuration / 2)
		})
		if (reusableStoredToken) {
			return reusableStoredToken.code
		}
	}

	const otp = generateRandomString(6, '0123456789')

	await db.userOneTimePassword.create({
		data: {
			code: otp,
			type,
			identifier,
			expires: new Date(new Date().getTime() + expireDuration),
			user_id: userId,
		},
	})

	return otp
}

export const validateOneTimePassword = async ({
	code,
	type,
	identifier,
}: {
	code: string
	type: UserOneTimePasswordType
	identifier?: string
}) => {
	const storedOtp = await db.userOneTimePassword.findFirst({
		where: {
			code,
			type,
			identifier,
		},
	})

	if (!storedOtp) {
		throw new Error('Invalid token')
	}

	await db.userOneTimePassword.delete({
		where: {
			id: storedOtp.id,
		},
	})

	const expires = storedOtp.expires.getTime()

	if (!isWithinExpiration(expires)) {
		throw new Error('Expired token')
	}

	return storedOtp.user_id
}
