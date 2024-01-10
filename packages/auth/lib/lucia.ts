import { prisma } from '@lucia-auth/adapter-prisma'
import { github, google } from '@lucia-auth/oauth/providers'
import { db } from 'database'
import { type User, lucia } from 'lucia'
import 'lucia/polyfill/node'
import { h3 } from 'lucia/middleware'
import { getBaseUrl } from 'utils'

// expect error (see next section)
export const auth = lucia({
	adapter: prisma(db, {
		user: 'user',
		session: 'userSession',
		key: 'userKey',
	}),
	env: process.env.NODE_ENV === 'development' ? 'DEV' : 'PROD',
	middleware: h3(),
	sessionCookie: {
		expires: false,
	},
	getUserAttributes: data => {
		return {
			id: data.id,
			email: data.email,
			email_verified: data.email_verified,
			name: data.name ?? data.email,
			role: data.role,
			avatar_url: data.avatar_url,
		}
	},
})

export const githubAuth = github(auth, {
	clientId: process.env.GITHUB_CLIENT_ID as string,
	clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
	scope: ['user:email'],
})

export const googleAuth = google(auth, {
	redirectUri: new URL('/api/oauth/google/callback', getBaseUrl()).toString(),
	clientId: process.env.GOOGLE_CLIENT_ID as string,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
	scope: ['email'],
})

export type Auth = typeof auth
export type SessionUser = User
export { OAuthRequestError } from '@lucia-auth/oauth'
export { LuciaError, type Session } from 'lucia'
