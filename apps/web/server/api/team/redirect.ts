import { withLeadingSlash } from 'ufo'
import type { Team } from 'database'
import { createApiCaller } from 'api'
import { TEAM_SLUG_COOKIE_NAME } from '@/modules/saas/shared/constants'

const createResponse = (redirectPath: string) => {
	return {
		redirectPath: withLeadingSlash(redirectPath),
	}
}

export default defineEventHandler(async event => {
	const requestUrl = getRequestURL(event)
	const redirectTo = requestUrl.searchParams.get('redirectTo') || null

	const apiCaller = await createApiCaller(event)

	const getRedirectPath = ({ teamSlug, path }: { teamSlug?: string; path: string }) => {
		let redirectPath = redirectTo ?? path
		if (teamSlug && redirectPath.includes('[teamSlug]')) {
			redirectPath = redirectPath.replace('[teamSlug]', teamSlug)
		}
		return redirectPath
	}

	try {
		const user = await apiCaller.auth.user()
		if (!user) {
			let redirectUrl = '/auth/login'
			if (redirectTo) {
				redirectUrl = `${redirectUrl}?redirectTo=${redirectTo}`
			}
			return createResponse(redirectUrl)
		}

		const { teamMemberships } = user

		if (!teamMemberships || !teamMemberships.length) {
			let team: Team | undefined

			try {
				const name = user.name || user.email.split('@')[0]
				team = await apiCaller.team.create({
					name,
				})
			} catch (e) {
				console.error(e)
				return createResponse('/')
			}

			return createResponse(getRedirectPath({ teamSlug: team.slug, path: '/[teamSlug]/dashboard' }))
		}

		const teamSlugCookie = getCookie(event, TEAM_SLUG_COOKIE_NAME)

		if (teamSlugCookie) {
			const teamMembership = teamMemberships.find(membership => membership.team.slug === teamSlugCookie)

			if (teamMembership) {
				return createResponse(getRedirectPath({ teamSlug: teamMembership.team.slug, path: '/[teamSlug]/dashboard' }))
			}
		}

		return createResponse(getRedirectPath({ teamSlug: teamMemberships[0].team.slug, path: '/[teamSlug]/dashboard' }))
	} catch (e) {
		console.error(e)
		return createResponse('/')
	}
})
