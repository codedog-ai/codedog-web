import { track, inject } from '@vercel/analytics'

export const useAnalytics = () => {
	const init = () => {
		if (!process.client) {
			return
		}

		inject()
	}

	const trackEvent = (event: string, data?: Record<string, any>) => {
		track(event, data)
	}

	return {
		init,
		trackEvent,
	}
}
