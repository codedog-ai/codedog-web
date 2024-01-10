<template>
	<ToastDescription v-bind="{ ...$attrs, ...props, class: twMerge('text-sm opacity-90', props.class) }">
		<slot />
	</ToastDescription>
</template>

<script setup lang="ts">
	import { ToastDescription, type ToastDescriptionProps } from 'radix-vue'

	type Props = ToastDescriptionProps & {
		class?: ClassProp
	}
	const props = defineProps<Props>()
</script>
