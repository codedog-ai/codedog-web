<template>
	<DropdownMenuCheckboxItem
		v-bind="{
			...$attrs,
			...props,
			class: twMerge(
				'focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-3 pl-8 pr-3 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
				props.class
			),
		}">
		<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<DropdownMenuItemIndicator>
				<Icon name="check" class="h-4 w-4" />
			</DropdownMenuItemIndicator>
		</span>
		<slot />
	</DropdownMenuCheckboxItem>
</template>

<script setup lang="ts">
	import { DropdownMenuCheckboxItem, DropdownMenuItemIndicator, type DropdownMenuCheckboxItemProps } from 'radix-vue'

	type Props = DropdownMenuCheckboxItemProps & {
		class?: ClassProp
	}
	const props = defineProps<Props>()
</script>
