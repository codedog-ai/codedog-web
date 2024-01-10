<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
		<Toaster />
		<NuxtLoadingIndicator />
	</div>
</template>

<script setup lang="ts">
	const titleTemplateDefault = 'supastarter.nuxt - Application'
	const titleDivider = '|'

	const i18nHead = useLocaleHead({
		addSeoAttributes: true,
	})

	const { init } = useAnalytics()

	// You might want to display a consent banner before initializing analytics
	init()

	useHead({
		// general seo
		titleTemplate: title => (title ? `${title} ${titleDivider} ${titleTemplateDefault}` : titleTemplateDefault),

		// i18n
		htmlAttrs: {
			lang: i18nHead.value.htmlAttrs!.lang,
		},
		link: [...(i18nHead.value.link || [])],
		meta: [...(i18nHead.value.meta || [])],
	})
</script>
