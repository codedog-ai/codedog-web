<template>
	<th
		v-bind="{
			...$attrs,
			class: twMerge(
				'text-muted-foreground h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0',
				props.class
			),
		}">
		<slot />
	</th>
</template>

<script setup lang="ts">
	const props = defineProps<{
		class?: ClassProp
	}>()
</script>
