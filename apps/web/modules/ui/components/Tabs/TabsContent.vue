<template>
	<TabsContent
		v-bind="{
			...$attrs,
			...props,
			class: twMerge(
				'ring-offset-background focus-visible:ring-ring mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
				props.class
			),
		}">
		<slot />
	</TabsContent>
</template>

<script setup lang="ts">
	import { TabsContent, type TabsContentProps } from 'radix-vue'

	type Props = TabsContentProps & {
		class?: ClassProp
	}
	const props = defineProps<Props>()
</script>
