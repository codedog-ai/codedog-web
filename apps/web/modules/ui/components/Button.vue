<template>
	<component
		:is="props.asChild ? Slot : 'button'"
		:class="twMerge(buttonVariants({ variant: props.variant, size: props.size, class: props.class }))"
		:disabled="props.disabled || props.loading">
		<Icon v-if="props.loading" name="spinner" class="h-4 w-4 animate-spin" />
		<slot v-else />
	</component>
</template>

<script setup lang="ts">
	import { Slot } from 'radix-vue'
	import type { ButtonHTMLAttributes } from 'vue'

	const buttonVariants = cva(
		'focus-visible:ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
		{
			variants: {
				variant: {
					default: 'bg-primary text-primary-foreground hover:bg-primary/90',
					error: 'bg-error text-error-foreground hover:bg-error/90',
					outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
					secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
					ghost: 'text-primary hover:bg-accent hover:text-accent-foreground',
					link: 'text-primary underline-offset-4 hover:underline',
				},
				size: {
					default: 'h-9 rounded-full px-4 py-2',
					sm: 'h-8 rounded-full px-3 text-sm',
					lg: 'h-10 rounded-full px-8 text-base',
					icon: 'h-9 w-9 rounded-sm',
				},
			},
			defaultVariants: {
				variant: 'default',
				size: 'default',
			},
		}
	)

	type ButtonVariantProps = VariantProps<typeof buttonVariants>

	/** @see https://github.com/vuejs/core/issues/8286#issuecomment-1545659320 */
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface HTMLAttributes extends /* @vue-ignore */ ButtonHTMLAttributes {}

	type Props = HTMLAttributes & {
		class?: ClassProp
		variant?: ButtonVariantProps['variant']
		size?: ButtonVariantProps['size']
		asChild?: boolean
		loading?: boolean
	}

	const props = withDefaults(defineProps<Props>(), {
		variant: 'default',
		size: 'default',
	})
</script>
