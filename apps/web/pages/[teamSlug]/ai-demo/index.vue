<template>
	<div class="container max-w-6xl py-8">
		<SaasPageHeader>
			<template #title>AI Demo</template>
			<template #subtitle>This demo shows an example integration of the OpenAI API</template>
		</SaasPageHeader>

		<div class="bg-card text-foreground mx-auto max-w-3xl rounded-lg border p-8">
			<div>
				<p class="mb-4">Enter a topic and we will generate some funny product names for you:</p>
				<SaasProductNameGenerator />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	definePageMeta({
		layout: 'saas-app',
	})
</script>
