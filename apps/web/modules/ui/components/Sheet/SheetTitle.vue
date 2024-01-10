<template>
	<DialogTitle v-bind="{ ...$attrs, ...props, class: twMerge('text-foreground text-lg font-semibold', props.class) }">
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
