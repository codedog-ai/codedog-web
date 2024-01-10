<template>
	<div
		v-if="showBanner"
		class="bg-primary/10 text-foreground relative inset-0 bottom-auto px-8 py-3 text-center text-sm data-[state='open']:block data-[state='closed']:hidden">
		<div><strong>New:</strong> In this banner you can show your awesome new feature</div>
		<Button variant="link" @click="hideBanner()" class="absolute right-1 top-1">
			<Icon name="close" />
		</Button>
	</div>
</template>

<script setup lang="ts">
	const BANNER_HIDDEN_STORAGE_KEY = 'banner-hidden'

	const showBanner = ref(false)

	watchEffect(() => {
		if (!localStorage.getItem(BANNER_HIDDEN_STORAGE_KEY)) {
			showBanner.value = true
		}
	})

	const hideBanner = () => {
		localStorage.setItem(BANNER_HIDDEN_STORAGE_KEY, 'true')
		showBanner.value = false
	}
</script>
