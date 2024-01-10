<template>
	<tfoot v-bind="{ ...$attrs, class: twMerge('bg-primary text-primary-foreground font-medium', props.class) }">
		<slot />
	</tfoot>
</template>

<script setup lang="ts">
	const props = defineProps<{
		class?: ClassProp
	}>()
</script>
