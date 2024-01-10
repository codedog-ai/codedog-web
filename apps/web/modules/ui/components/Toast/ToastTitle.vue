<template>
	<ToastTitle v-bind="{ ...$attrs, ...props, class: twMerge('text-sm font-semibold [&+div]:text-xs', props.class) }">
		<slot />
	</ToastTitle>
</template>

<script setup lang="ts">
	import { ToastTitle, type ToastTitleProps } from 'radix-vue'

	type Props = ToastTitleProps & {
		class?: ClassProp
	}
	const props = defineProps<Props>()
</script>
