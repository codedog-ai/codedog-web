<template>
	<AvatarRoot
		v-bind="{
			...$attrs,
			...props,
			class: twMerge('relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full', props.class),
		}">
		<slot />
	</AvatarRoot>
</template>

<script setup lang="ts">
	import { AvatarRoot, type AvatarRootProps } from 'radix-vue'

	type Props = AvatarRootProps & {
		class?: ClassProp
	}
	const props = defineProps<Props>()
</script>
