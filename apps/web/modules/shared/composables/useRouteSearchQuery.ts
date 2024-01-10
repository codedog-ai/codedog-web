/**
 * Works only client-side.
 */
export const useRouteSearchQuery = ({
	name = 'q',
	defaultValue = '',
	replace = false,
}: { name?: string; defaultValue?: string; replace?: boolean } = {}) => {
	const route = useRoute()

	const searchQuery = computed({
		get: () => {
			const routeVal = route.query[name]
			if (routeVal) return String(routeVal)

			return defaultValue
		},
		set: newVal => {
			navigateTo({ query: { [name]: newVal } }, { replace })
		},
	})

	return { searchQuery }
}
