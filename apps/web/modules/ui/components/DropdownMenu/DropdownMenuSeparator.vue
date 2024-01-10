<template>
	<DropdownMenuSeparator
		v-bind="{
			...$attrs,
			...props,
			class: twMerge('bg-border -mx-1 my-1 h-px', props.class),
		}">
		<slot />
	</DropdownMenuSeparator>
</template>

<script setup lang="ts">
	import { DropdownMenuSeparator, type DropdownMenuSeparatorProps } from 'radix-vue'

	type Props = DropdownMenuSeparatorProps & {
		class?: ClassProp
	}
	const props = defineProps<Props>()
</script>
