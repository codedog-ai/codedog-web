<template>
	<div :class="twMerge('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', props.class)">
		<slot />
	</div>
</template>

<script setup lang="ts">
	const props = defineProps<{
		class?: ClassProp
	}>()
</script>
