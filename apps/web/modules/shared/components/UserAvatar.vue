<template>
	<AvatarRoot>
		<AvatarImage v-if="props.avatarUrl" :src="props.avatarUrl" />
		<AvatarFallback class="bg-primary/10 text-primary">
			{{ initials }}
		</AvatarFallback>
	</AvatarRoot>
</template>

<script setup lang="ts">
	const props = defineProps<{
		name: string
		avatarUrl?: string | null
	}>()

	const initials = computed(() => {
		return props.name
			.split(' ')
			.map(n => n[0])
			.join('')
	})
</script>
