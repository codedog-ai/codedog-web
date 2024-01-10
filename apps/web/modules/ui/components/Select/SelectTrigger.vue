<template>
	<SelectTrigger
		v-bind="{
			...$attrs,
			...props,
			class: twMerge(
				'border-input ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
				props.class
			),
		}">
		<slot />
		<SelectIcon asChild>
			<Icon name="select" class="h-4 w-4 opacity-50" />
		</SelectIcon>
	</SelectTrigger>
</template>

<script setup lang="ts">
	import { SelectTrigger, SelectIcon, type SelectTriggerProps } from 'radix-vue'

	type Props = SelectTriggerProps & {
		class?: ClassProp
	}
	const props = defineProps<Props>()
</script>
