<template>
	<SheetPortal>
		<SheetOverlay />

		<DialogContent
			v-bind="{ ...$attrs, ...props, class: twMerge(sheetVariants({ side: props.side, class: props.class })) }">
			<slot />

			<DialogClose
				class="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
				<Icon name="close" class="h-4 w-4" />
				<span class="sr-only">Close</span>
			</DialogClose>
		</DialogContent>
	</SheetPortal>
</template>

<script setup lang="ts">
	import { DialogClose, DialogContent, type DialogContentProps } from 'radix-vue'

	const sheetVariants = cva(
		'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
		{
			variants: {
				side: {
					top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
					bottom:
						'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
					left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
					right:
						'inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
				},
			},
			defaultVariants: {
				side: 'right',
			},
		}
	)

	defineOptions({
		inheritAttrs: false,
	})

	type SheetProps = DialogContentProps & VariantProps<typeof sheetVariants>

	const props = withDefaults(
		defineProps<{
			class?: ClassProp
			side?: SheetProps['side']
		}>(),
		{
			side: 'right',
		}
	)
</script>
