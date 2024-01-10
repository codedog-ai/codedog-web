<template>
	<ToastRoot
		v-bind="{ ...$attrs, ...props, class: twMerge(toastVariants({ variant: props.variant, class: props.class })) }">
		<slot />
	</ToastRoot>
</template>

<script setup lang="ts">
	import { ToastRoot, type ToastRootProps } from 'radix-vue'

	const toastVariants = cva(
		'group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full',
		{
			variants: {
				variant: {
					default: 'border bg-background',
					loading: 'border bg-background',
					error: 'border-error bg-error text-error-foreground',
					success: 'border-success bg-success text-success-foreground',
				},
			},
			defaultVariants: {
				variant: 'default',
			},
		}
	)

	export type ToastVariantProps = VariantProps<typeof toastVariants>

	defineOptions({
		inheritAttrs: false,
	})

	export type ToastProps = ToastRootProps & ToastVariantProps

	const props = withDefaults(
		defineProps<{
			class?: ClassProp
			variant?: ToastProps['variant']
		}>(),
		{
			variant: 'default',
		}
	)
</script>
