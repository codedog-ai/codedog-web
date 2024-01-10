<template>
	<div class="w-full overflow-auto">
		<table v-bind="{ ...$attrs, class: twMerge('w-full caption-bottom text-sm', props.class) }">
			<slot />
		</table>
	</div>
</template>

<script setup lang="ts">
	const props = defineProps<{
		class?: ClassProp
	}>()

	defineOptions({
		inheritAttrs: false,
	})
</script>
