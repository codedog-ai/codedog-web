<template>
	<AvatarImage
		v-bind="{
			...$attrs,
			...props,
			class: twMerge('aspect-square h-full w-full', props.class),
		}">
		<slot />
	</AvatarImage>
</template>

<script setup lang="ts">
	import { AvatarImage, type AvatarImageProps } from 'radix-vue'

	type Props = AvatarImageProps & {
		class?: ClassProp
	}
	const props = defineProps<Props>()
</script>
