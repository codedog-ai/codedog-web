<template>
	<DropdownMenuSubTrigger
		v-bind="{
			...$attrs,
			...props,
			class: twMerge(
				'focus:bg-accent data-[state=open]:bg-accent flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm outline-none',
				props.inset ? 'pl-8' : '',
				props.class
			),
		}">
		<slot />
		<Icon name="chevronRight" class="ml-auto h-4 w-4" />
	</DropdownMenuSubTrigger>
</template>

<script setup lang="ts">
	import { DropdownMenuSubTrigger, type DropdownMenuSubTriggerProps } from 'radix-vue'

	type Props = DropdownMenuSubTriggerProps & {
		inset?: boolean
		class?: ClassProp
	}
	const props = defineProps<Props>()
</script>
