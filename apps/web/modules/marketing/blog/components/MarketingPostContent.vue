<template>
	<ContentRendererMarkdown :value="props.post" class="prose dark:prose-invert mx-auto mt-6 max-w-2xl" />
</template>

<script setup lang="ts">
	import type { MarketingBlogPageFields } from '@/modules/marketing/blog/types'

	const props = defineProps<{
		post: MarketingBlogPageFields
	}>()
</script>
