<template>
	<SelectItem
		v-bind="{
			...$attrs,
			...props,
			class: twMerge(
				'focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
				props.class
			),
		}">
		<span class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
			<SelectItemIndicator>
				<Icon name="check" class="h-4 w-4" />
			</SelectItemIndicator>
		</span>
		<SelectItemText><slot /></SelectItemText>
	</SelectItem>
</template>

<script setup lang="ts">
	import { SelectItem, SelectItemIndicator, SelectItemText, type SelectItemProps } from 'radix-vue'

	type Props = SelectItemProps & {
		class?: ClassProp
	}
	const props = defineProps<Props>()
</script>
