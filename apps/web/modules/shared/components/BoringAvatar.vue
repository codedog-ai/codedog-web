<template>
	<img :style="{ width: `${props.size}px`, height: `${props.size}px` }" :src="boringAvatarUrl" alt="Avatar" />
</template>

<script setup lang="ts">
	const props = withDefaults(
		defineProps<{
			size: number
			name: string
			variant?: 'marble' | 'beam' | 'pixel' | 'sunset' | 'ring' | 'bauhaus'
		}>(),
		{
			size: 40,
			variant: 'marble',
		}
	)

	// You can customize the colors the avatars are generated with
	const avatarColors = computed(() => ['#3A9567', '#00A199', '#689EB1', '#589DB1'])

	const boringAvatarUrl = computed(() => {
		const colorList = avatarColors.value.map(color => color.replace('#', '')).join(',')
		return `https://source.boringavatars.com/marble/${props.size}/${props.name}?colors=${colorList}`
	})
</script>
