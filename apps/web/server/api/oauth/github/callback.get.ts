import { auth, githubAuth, OAuthRequestError, type Session } from 'auth'
import { db } from 'database'

export default defineEventHandler(async event => {
	const authRequest = auth.handleRequest(event)
	const session = (await authRequest.validate()) as Session | null
	if (session) {
		setResponseStatus(event, 302)
		return sendRedirect(event, '/')
	}

	const storedState = getCookie(event, 'github_oauth_state')
	const queryParams = getQuery(event)
	const state = String(queryParams.state)
	const code = String(queryParams.code)

	if (!storedState || !state || storedState !== state || !code) {
		setResponseStatus(event, 400)
		return null
	}

	try {
		const { getExistingUser, githubUser, createUser, createKey, githubTokens } = await githubAuth.validateCallback(code)

		const getUserPrimaryEmail = async () => {
			if (githubUser.email) return githubUser.email

			type EmailsResData =
				| {
						email: string | null | undefined
						primary: boolean | undefined
						verified: boolean | undefined
						visibility: string | null
				  }[]
				| null
				| undefined

			const emailsRes = await fetch('https://api.github.com/user/emails', {
				headers: {
					Authorization: `token ${githubTokens.accessToken}`,
				},
			})
			const emailsResData = (await emailsRes.json()) as EmailsResData

			const primaryEmail = emailsResData?.find(email => email.primary)?.email
			return primaryEmail ?? null
		}

		const getUser = async () => {
			const existingUser = await getExistingUser()

			if (existingUser) return existingUser

			// get all emails from user, due to issue with github not returning primary email when it's private
			const githubUserEmail = await getUserPrimaryEmail()

			// check if user exists with same email
			if (githubUserEmail) {
				const existingDatabaseUserWithEmail = await db.user.findFirst({
					where: {
						email: githubUserEmail,
					},
				})

				if (existingDatabaseUserWithEmail) {
					await createKey(existingDatabaseUserWithEmail.id)
					return await auth.updateUserAttributes(existingDatabaseUserWithEmail.id, {
						github_username: githubUser.login,
					})
				}
			}

			const user = await createUser({
				attributes: {
					email: githubUserEmail!,
					name: githubUser.name ?? githubUser.login,
					github_username: githubUser.login,
					avatar_url: githubUser.avatar_url,
					email_verified: githubUserEmail !== null,
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
