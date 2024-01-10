import mixpanel from 'mixpanel-browser'
import { useRuntimeConfig } from '#imports'

export const useAnalytics = () => {
	const init = () => {
		if (!process.client) {
			return
		}

		const runtimeConfig = useRuntimeConfig()

		mixpanel.init(runtimeConfig.public.analytics.mixpanelToken, {
			track_pageview: true,
			persistence: 'localStorage',
		})
	}

	const trackEvent = (event: string, data?: Record<string, any>) => {
		mixpanel.track(event, data)
	}

	return {
		init,
		trackEvent,
	}
}
