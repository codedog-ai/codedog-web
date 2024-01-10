<template>
	<div :class="twMerge('flex flex-col space-y-1.5 p-6', props.class)">
		<slot />

		<h3 v-if="$slots.title" class="text-xl font-semibold leading-none">
			<slot name="title" />
		</h3>
	</div>
</template>

<script setup lang="ts">
	const props = defineProps<{
		class?: ClassProp
	}>()
</script>
