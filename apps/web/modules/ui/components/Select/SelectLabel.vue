<template>
	<SelectLabel
		v-bind="{
			...$attrs,
			...props,
			class: twMerge('px-2 py-1.5 text-sm font-semibold', props.class),
		}" />
</template>

<script setup lang="ts">
	import { SelectLabel, type SelectLabelProps } from 'radix-vue'

	type Props = SelectLabelProps & {
		class?: ClassProp
	}
	const props = defineProps<Props>()
</script>
