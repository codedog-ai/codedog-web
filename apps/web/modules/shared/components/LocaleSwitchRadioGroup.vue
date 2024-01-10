<template>
	<DropdownMenuRadioGroup v-model="value">
		<DropdownMenuRadioItem
			v-for="localeObj of locales"
			:key="(localeObj as LocaleObject).code"
			:value="(localeObj as LocaleObject).code">
			{{ (localeObj as LocaleObject).name }}
		</DropdownMenuRadioItem>
	</DropdownMenuRadioGroup>
</template>

<script setup lang="ts">
	import type { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables'

	const { locales, locale } = useI18n()
	const switchLocalePath = useSwitchLocalePath()

	const value = ref(locale.value)
	watch(value, newLocale => {
		navigateTo(switchLocalePath(newLocale))
	})
</script>
