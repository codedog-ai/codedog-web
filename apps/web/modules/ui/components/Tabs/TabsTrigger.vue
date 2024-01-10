<template>
	<TabsTrigger
		v-bind="{
			...$attrs,
			...props,
			class: twMerge(
				'ring-offset-background focus-visible:ring-ring data-[state=active]:bg-primary/10 data-[state=active]:text-primary inline-flex items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
				props.class
			),
		}">
		<slot />
	</TabsTrigger>
</template>

<script setup lang="ts">
	import { TabsTrigger, type TabsTriggerProps } from 'radix-vue'

	type Props = TabsTriggerProps & {
		class?: ClassProp
	}
	const props = defineProps<Props>()
</script>
