<template>
	<ToastViewport
		v-bind="{
			...$attrs,
			...props,
			class: twMerge(
				'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:right-0 sm:flex-col gap-2 md:max-w-[420px]',
				props.class
			),
		}">
		<slot />
	</ToastViewport>
</template>

<script setup lang="ts">
	import { ToastViewport, type ToastViewportProps } from 'radix-vue'

	type Props = ToastViewportProps & {
		class?: ClassProp
	}
	const props = defineProps<Props>()
</script>
