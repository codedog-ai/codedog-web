import { auth, googleAuth, type Session } from 'auth'

export default defineEventHandler(async event => {
	const authRequest = auth.handleRequest(event)
	const session = (await authRequest.validate()) as Session | null
	if (session) {
		setResponseStatus(event, 302)
		return sendRedirect(event, '/')
	}

	const [url, state] = await googleAuth.getAuthorizationUrl()

	setCookie(event, 'google_oauth_state', state, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development',
		path: '/',
		maxAge: 60 * 60,
	})

	setResponseStatus(event, 302)
	return sendRedirect(event, url.toString())
})
