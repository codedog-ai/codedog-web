<template>
	<TabsList
		v-bind="{
			...$attrs,
			...props,
			class: twMerge(
				'text-muted-foreground border-primary/10 inline-flex items-center justify-center rounded-full border-2 p-0.5 text-sm',
				props.class
			),
		}">
		<slot />
	</TabsList>
</template>

<script setup lang="ts">
	import { TabsList, type TabsListProps } from 'radix-vue'

	type Props = TabsListProps & {
		class?: ClassProp
	}
	const props = defineProps<Props>()
</script>
