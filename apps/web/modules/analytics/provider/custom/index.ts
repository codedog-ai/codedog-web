export const useAnalytics = () => {
	const init = () => {
		if (!process.client) {
			return
		}

		/*
		const runtimeConfig = useRuntimeConfig()
		*/

		useHead({
			script: [
				// Add your script here
				/*
				{
					key: 'analytics-custom',
					src: 'https://example.com/script.js',
					'data-tracking-id': runtimeConfig.public.analytics.customTrackingId, // add something like this to your `nuxt.config.ts`
					async: true,
				},
				*/
			],
		})
	}

	const trackEvent = (event: string, data?: Record<string, any>) => {
		// call your analytics service to track a custom event here
		// eslint-disable-next-line no-console
		console.info('tracking event', event, data)
	}

	return {
		init,
		trackEvent,
	}
}
