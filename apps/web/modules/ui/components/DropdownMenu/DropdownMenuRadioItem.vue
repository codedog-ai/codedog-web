<template>
	<DropdownMenuRadioItem
		v-bind="{
			...$attrs,
			...props,
			class: twMerge(
				'focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-2 pl-8 pr-3 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[state=checked]:font-semibold data-[disabled]:opacity-50',
				props.class
			),
		}">
		<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<DropdownMenuItemIndicator>
				<Icon name="check" class="h-4 w-4" />
			</DropdownMenuItemIndicator>
		</span>
		<slot />
	</DropdownMenuRadioItem>
</template>

<script setup lang="ts">
	import { DropdownMenuRadioItem, DropdownMenuItemIndicator, type DropdownMenuRadioItemProps } from 'radix-vue'

	type Props = DropdownMenuRadioItemProps & {
		class?: ClassProp
	}
	const props = defineProps<Props>()
</script>
