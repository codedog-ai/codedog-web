<template>
	<div :class="twMerge('p-6 pt-0', props.class)">
		<slot />
	</div>
</template>

<script setup lang="ts">
	const props = defineProps<{
		class?: ClassProp
	}>()
</script>
