<template>
	<Icon v-if="resolvedValue === 'light'" name="lightMode" class="h-4 w-4" />
	<Icon v-else name="darkMode" class="h-4 w-4" />
</template>

<script setup lang="ts">
	const { value: resolvedValue } = useColorMode()
</script>
