<template>
	<tr
		v-bind="{
			...$attrs,
			class: twMerge('hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors', props.class),
		}">
		<slot />
	</tr>
</template>

<script setup lang="ts">
	const props = defineProps<{
		class?: ClassProp
	}>()
</script>
