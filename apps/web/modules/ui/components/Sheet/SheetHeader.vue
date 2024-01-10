<template>
	<div :class="twMerge('flex flex-col space-y-2 text-center sm:text-left', props.class)">
		<slot />
	</div>
</template>

<script setup lang="ts">
	const props = defineProps<{
		class?: ClassProp
	}>()
</script>
