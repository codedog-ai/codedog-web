<template>
	<tbody v-bind="{ ...$attrs, class: twMerge('[&_tr:last-child]:border-0', props.class) }">
		<slot />
	</tbody>
</template>

<script setup lang="ts">
	const props = defineProps<{
		class?: ClassProp
	}>()
</script>
