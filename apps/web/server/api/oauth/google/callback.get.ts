import { auth, googleAuth, OAuthRequestError, type Session } from 'auth'
import { db } from 'database'

export default defineEventHandler(async event => {
	const authRequest = auth.handleRequest(event)
	const session = (await authRequest.validate()) as Session | null
	if (session) {
		setResponseStatus(event, 302)
		return sendRedirect(event, '/')
	}

	const storedState = getCookie(event, 'google_oauth_state')
	const queryParams = getQuery(event)
	const state = String(queryParams.state)
	const code = String(queryParams.code)

	if (!storedState || !state || storedState !== state || !code) {
		setResponseStatus(event, 400)
		return null
	}

	try {
		const { getExistingUser, googleUser, createUser, createKey } = await googleAuth.validateCallback(code)

		const getUser = async () => {
			const existingUser = await getExistingUser()
			if (existingUser) {
				return existingUser
			}

			// check if user exists with same email
			if (googleUser.email_verified) {
				const existingDatabaseUserWithEmail = await db.user.findFirst({
					where: {
						email: googleUser.email,
					},
				})

				if (existingDatabaseUserWithEmail) {
					await createKey(existingDatabaseUserWithEmail.id)
					return auth.transformDatabaseUser(existingDatabaseUserWithEmail)
				}
			}

			// create user
			const user = await createUser({
				attributes: {
					email: googleUser.email!,
					email_verified: !!googleUser.email_verified,
					name: googleUser.name,
					avatar_url: googleUser.picture,
					role: 'USER',
				},
			})
			return user
		}

		const user = await getUser()
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {},
		})
		authRequest.setSession(session)

		setResponseStatus(event, 302)
		return sendRedirect(event, '/team/redirect')
	} catch (error) {
		console.error(error)

		if (error instanceof OAuthRequestError) {
			setResponseStatus(event, 400)
			return null
		}

		setResponseStatus(event, 500)
		return null
	}
})
