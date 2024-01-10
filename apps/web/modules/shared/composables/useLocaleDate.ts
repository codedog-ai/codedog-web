/**
 * Format a date.
 * Uses the values defined in `i18n.config.ts`
 */
export const useLocaleDate = () => {
	const { locale } = useI18n()

	const formatDate = ({ date }: { date: Date | null | undefined }) => {
		if (!date) return ''
		return new Intl.DateTimeFormat(locale.value).format(date)
	}

	return {
		formatDate,
	}
}
