import { useRuntimeConfig, useHead } from '#imports'

export const useAnalytics = () => {
	const init = () => {
		if (!process.client) {
			return
		}

		const runtimeConfig = useRuntimeConfig()

		useHead({
			script: [
				{
					key: 'analytics-umami',
					src: 'https://analytics.eu.umami.is/script.js',
					async: true,
					'data-website-id': runtimeConfig.public.analytics.umamiTrackingId,
				},
			],
		})
	}

	const trackEvent = (event: string, data?: Record<string, any>) => {
		if (typeof window === 'undefined' || !(window as any).umami) {
			return
		}

		;(window as any).umami.track(event, {
			props: data,
		})
	}

	return {
		init,
		trackEvent,
	}
}
