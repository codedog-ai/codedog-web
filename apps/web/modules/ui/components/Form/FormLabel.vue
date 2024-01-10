<template>
	<label
		:for="props.for"
		class="mb-2 block text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
		<slot />{{ props.required ? ' *' : '' }}
	</label>
</template>

<script setup lang="ts">
	const props = defineProps<{
		for: string
		required?: boolean
	}>()
</script>
