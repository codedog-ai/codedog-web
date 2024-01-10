<template>
	<DialogDescription v-bind="{ ...$attrs, ...props, class: twMerge('text-muted-foreground text-sm', props.class) }">
		<slot />
	</DialogDescription>
</template>

<script setup lang="ts">
	import { DialogDescription, type DialogDescriptionProps } from 'radix-vue'

	type Props = DialogDescriptionProps & {
		class?: ClassProp
	}
	const props = defineProps<Props>()
</script>
