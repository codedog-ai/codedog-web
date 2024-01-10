<template>
	<div class="relative">
		<Input v-bind="{ ...$attrs, ...props.fieldData }" :type="showPassword ? 'text' : 'password'" class="pr-10" />

		<button
			type="button"
			@click="showPassword = !showPassword"
			class="text-primary absolute inset-y-0 right-0 flex items-center pr-4 text-xl">
			<Icon :name="showPassword ? 'hide' : 'show'" class="h-4 w-4" />
		</button>
	</div>
</template>

<script setup lang="ts">
	import type { BaseInputBinds, GenericObject } from 'vee-validate'
	import type { InputHTMLAttributes } from 'vue'

	/** @see https://github.com/vuejs/core/issues/8286#issuecomment-1545659320 */
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface HTMLAttributes extends /* @vue-ignore */ InputHTMLAttributes {}

	type Props = HTMLAttributes & {
		fieldData: BaseInputBinds<string | undefined> & GenericObject
	}

	const props = defineProps<Props>()

	defineOptions({
		inheritAttrs: false,
	})

	const showPassword = ref(false)
</script>
