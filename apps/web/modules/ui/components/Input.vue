<template>
	<input
		:value="modelValue"
		@input="emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
		@blur="emit('blur')"
		:class="
			twMerge(
				'border-input placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:border-primary flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
				props.class
			)
		"
		:type="props.type" />
</template>

<script lang="ts" setup>
	import type { InputHTMLAttributes } from 'vue'

	/** @see https://github.com/vuejs/core/issues/8286#issuecomment-1545659320 */
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface HTMLAttributes extends /* @vue-ignore */ InputHTMLAttributes {}

	type Props = HTMLAttributes & {
		modelValue?: string
		class?: ClassProp
	}

	const props = defineProps<Props>()

	const emit = defineEmits(['update:modelValue', 'blur'])
</script>
