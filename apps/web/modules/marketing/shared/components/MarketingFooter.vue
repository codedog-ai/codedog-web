<template>
	<footer class="bg-muted text-muted-foreground py-12">
		<div class="container grid grid-cols-1 gap-6 lg:grid-cols-3">
			<div>
				<Logo />
				<p class="mt-3 text-sm opacity-70">© {{ new Date().getFullYear() }} supastarter. All rights reserved.</p>
			</div>

			<div class="flex flex-col gap-2">
				<NuxtLinkLocale to="/blog" class="block"> Blog </NuxtLinkLocale>
				<a href="#" class="block"> Features </a>
				<a href="#" class="block"> Pricing </a>
			</div>

			<div class="flex flex-col gap-2">
				<a href="#" class="block"> Privacy policy </a>
				<a href="#" class="block"> Terms of service </a>
				<a href="#" class="block"> Contact </a>
			</div>
		</div>
	</footer>
</template>

<script setup lang="ts"></script>
