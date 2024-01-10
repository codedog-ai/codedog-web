<template>
	<div class="mb-8 border-b pb-4">
		<h2 v-if="$slots.title" class="text-2xl font-bold lg:text-3xl"><slot name="title" /></h2>
		<p v-if="$slots.subtitle" class="mt-1 opacity-50"><slot name="subtitle" /></p>
	</div>
</template>
