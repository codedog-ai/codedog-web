<template>
	<span :class="twMerge(badgeVariants({ status: props.status, class: props.class }))">
		<slot />
	</span>
</template>

<script setup lang="ts">
	const badgeVariants = cva('inline-block rounded-full px-3 py-1 text-xs uppercase font-semibold leading-tight', {
		variants: {
			status: {
				success: ['bg-emerald-500/10', 'text-emerald-500'],
				info: ['bg-primary/10', 'text-primary'],
				warning: ['bg-amber-500/10', 'text-amber-500'],
				error: ['bg-rose-500/10', 'text-rose-500'],
			},
		},
		defaultVariants: {
			status: 'info',
		},
	})

	type ButtonVariantProps = VariantProps<typeof badgeVariants>

	export type BadgeProps = {
		class?: ClassProp
		status?: ButtonVariantProps['status']
	}

	const props = withDefaults(defineProps<BadgeProps>(), {
		status: 'info',
	})
</script>
