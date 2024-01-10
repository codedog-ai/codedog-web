export const useTeamSlugCookie = () => {
	const expiresDate = new Date()
	expiresDate.setDate(expiresDate.getDate() + 30)

	const teamSlugCookie = useCookie(TEAM_SLUG_COOKIE_NAME, { path: '/', expires: expiresDate })

	return {
		teamSlugCookie,
	}
}
