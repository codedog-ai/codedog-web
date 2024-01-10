<template>
	<DropdownMenuItem
		v-bind="{
			...$attrs,
			...props,
			class: twMerge(
				'focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm px-3 py-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
				inset ? 'pl-8' : '',
				props.class
			),
		}">
		<slot />
	</DropdownMenuItem>
</template>

<script setup lang="ts">
	import { DropdownMenuItem, type DropdownMenuItemProps } from 'radix-vue'

	type Props = DropdownMenuItemProps & {
		inset?: boolean
		class?: ClassProp
	}
	const props = defineProps<Props>()
</script>
