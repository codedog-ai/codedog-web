export const getBaseUrl = () => {
	if (process.env.NUXT_PUBLIC_SITE_URL) {
		return process.env.NUXT_PUBLIC_SITE_URL
	}
	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}`
	}
	return `http://localhost:${process.env.PORT ?? 3000}`
}
