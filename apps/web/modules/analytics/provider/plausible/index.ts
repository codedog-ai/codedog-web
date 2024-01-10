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
					defer: true,
					key: 'analytics-plausible',
					src: 'https://plausible.io/js/script.js',
					'data-domain': runtimeConfig.public.analytics.plausibleUrl,
				},
			],
		})
	}

	const trackEvent = (event: string, data?: Record<string, any>) => {
		if (typeof window === 'undefined' || !(window as any).plausible) {
			return
		}

		;(window as any).plausible(event, {
			props: data,
		})
	}

	return {
		init,
		trackEvent,
	}
}
