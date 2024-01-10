<template>
	<caption v-bind="{ ...$attrs, class: twMerge('text-muted-foreground mt-4 text-sm', props.class) }">
		<slot />
	</caption>
</template>

<script setup lang="ts">
	const props = defineProps<{
		class?: ClassProp
	}>()
</script>
