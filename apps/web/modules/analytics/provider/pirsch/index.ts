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
					key: 'analytics-pirsch',
					src: 'https://api.pirsch.io/pirsch-extended.js',
					id: 'pirschextendedjs',
					'data-code': runtimeConfig.public.analytics.pirschCode,
				},
			],
		})
	}

	const trackEvent = (event: string, data?: Record<string, any>) => {
		if (typeof window === 'undefined' || !(window as any).pirsch) {
			return
		}

		;(window as any).pirsch(event, {
			meta: data,
		})
	}

	return {
		init,
		trackEvent,
	}
}
