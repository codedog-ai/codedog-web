<template>
	<span v-bind="{ ...props, ...$attrs, class: twMerge('ml-auto text-xs tracking-widest opacity-60', props.class) }" />
</template>

<script setup lang="ts">
	type Props = {
		class?: ClassProp
	}
	const props = defineProps<Props>()
</script>
