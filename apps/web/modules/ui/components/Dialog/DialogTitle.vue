<template>
	<DialogTitle
		v-bind="{ ...$attrs, ...props, class: twMerge('text-lg font-semibold leading-none tracking-tight', props.class) }">
		<slot />
	</DialogTitle>
</template>

<script setup lang="ts">
	import { DialogTitle, type DialogTitleProps } from 'radix-vue'

	type Props = DialogTitleProps & {
		class?: ClassProp
	}
	const props = defineProps<Props>()
</script>
