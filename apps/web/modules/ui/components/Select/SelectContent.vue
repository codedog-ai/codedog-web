<template>
	<SelectPortal>
		<SelectContent
			v-bind="{
				...$attrs,
				...props,
				position: props.position,
				class: twMerge(
					'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 min-w-[8rem] overflow-hidden rounded-md border shadow-md',
					props.position === 'popper'
						? 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1'
						: '',
					props.class
				),
			}">
			<SelectViewport
				:class="
					twMerge(
						'p-1',
						props.position === 'popper'
							? 'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
							: ''
					)
				">
				<slot />
			</SelectViewport>
		</SelectContent>
	</SelectPortal>
</template>

<script setup lang="ts">
	import { SelectPortal, SelectContent, SelectViewport, type SelectContentProps } from 'radix-vue'

	defineOptions({
		inheritAttrs: false,
	})

	type Props = SelectContentProps & {
		class?: ClassProp
		position: SelectContentProps['position']
	}
	const props = withDefaults(defineProps<Props>(), {
		position: 'popper',
	})
</script>
