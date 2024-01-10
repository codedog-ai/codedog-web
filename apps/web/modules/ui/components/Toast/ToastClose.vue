<template>
	<ToastClose
		v-bind="{
			...$attrs,
			...props,
			class: twMerge(
				'text-foreground/50 hover:text-foreground absolute right-1 top-1 rounded-md p-1 opacity-0 transition-opacity focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.error]:text-red-300 group-[.error]:hover:text-red-50 group-[.error]:focus:ring-red-400 group-[.error]:focus:ring-offset-red-600',
				props.class
			),
		}">
		<Icon name="close" class="h-4 w-4" />
	</ToastClose>
</template>

<script setup lang="ts">
	import { ToastClose, type ToastCloseProps } from 'radix-vue'

	type Props = ToastCloseProps & {
		class?: ClassProp
	}
	const props = defineProps<Props>()
</script>
