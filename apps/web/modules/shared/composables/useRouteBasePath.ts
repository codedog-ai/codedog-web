import { joinURL } from 'ufo'
import type { RouteLocation } from '#vue-router'

/**
 * The `route.path` but without a locale.
 * e.g. /en/mypage -> /mypage
 * @see https://github.com/nuxt-modules/i18n/issues/1897
 */
export const useRouteBasePath = ({ path }: { path: RouteLocation['path'] }) => {
	const { locale } = useI18n()

	const routeBasePath = computed(() => {
		const localePrefixPath = joinURL('/', locale.value)
		if (path.startsWith(localePrefixPath)) path = path.replace(localePrefixPath, '')
		return joinURL('/', path)
	})

	return { routeBasePath }
}
