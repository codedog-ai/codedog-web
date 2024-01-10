<template>
	<ToastProvider>
		<ToastRoot
			v-for="toast of toasts"
			:key="toast.id"
			v-bind="{ id: toast.id, variant: toast.variant }"
			@update:open="() => dismiss(toast.id)">
			<div class="flex items-center gap-3">
				<Icon
					v-if="getToastIconName({ toast })"
					:name="getToastIconName({ toast })"
					class="h-6 w-6 shrink-0 opacity-50"
					:class="toast.variant === 'loading' ? 'animate-spin' : ''" />

				<div class="grid gap-1">
					<ToastTitle v-if="toast.title">{{ toast.title }}</ToastTitle>
					<ToastDescription v-if="toast.description">{{ toast.description }}</ToastDescription>
				</div>
			</div>

			<ToastClose />
		</ToastRoot>

		<ToastViewport />
	</ToastProvider>
</template>

<script setup lang="ts">
	import type { IconName } from '../Icon.vue'
	import type { ToastVariantProps } from './ToastRoot.vue'

	const { state: toasts, dismiss } = useToast()

	const variantIcons = computed<Record<NonNullable<ToastVariantProps['variant']>, IconName>>(() => ({
		default: 'notification',
		loading: 'spinner',
		success: 'check',
		error: 'error',
	}))

	const getToastIconName = ({ toast }: { toast: Toast }): any => {
		return toast.icon ?? toast.variant != null ? variantIcons.value[toast.variant!] : undefined
	}
</script>
