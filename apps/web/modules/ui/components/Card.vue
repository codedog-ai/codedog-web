<template>
	<div :class="twMerge('bg-card text-card-foreground rounded-lg shadow', props.class)">
		<slot />
	</div>
</template>

<script setup lang="ts">
	const props = defineProps<{
		class?: ClassProp
	}>()
</script>
