import { useI18n } from '#imports'

// Import default locale
import enLocale from '@/locales/en.json'

/**
 * This is the equivalent of `useI18n`, execpt it adds types for the translation keys.
 */
export const useTranslations = () => {
	return useI18n<[typeof enLocale]>()
}
