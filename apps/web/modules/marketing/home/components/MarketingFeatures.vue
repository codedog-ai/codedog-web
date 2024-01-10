<template>
	<section class="bg-card text-card-foreground py-24">
		<div class="container">
			<!-- Section header -->
			<div class="text-center">
				<h1 class="text-4xl font-bold lg:text-5xl">Features your clients will love</h1>
				<p class="mt-3 text-lg opacity-70">In this section you can showcase the features of your SaaS.</p>
			</div>

			<div class="mt-20 grid grid-cols-1 gap-16">
				<!-- Feature 1 -->
				<div class="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
					<div class="bg-primary/10 rounded-2xl p-12">
						<img :src="heroImage" class="block dark:hidden" alt="Feature 1" />
						<img :src="heroDarkImage" class="hidden dark:block" alt="Feature 1" />
					</div>

					<div>
						<h3 class="text-3xl font-bold">Feature A</h3>
						<p class="mt-2 leading-normal opacity-70">
							This is a brilliant feature. And below you can see some reasons why. This is basically just a dummy text.
						</p>
						<Button class="mt-4 px-0" variant="link" size="sm">Learn more &rarr;</Button>

						<div class="mt-6 grid grid-cols-2 gap-4">
							<div class="bg-card text-card-foreground rounded-xl border p-4">
								<Icon name="star" class="text-primary h-6 w-6 text-3xl" />
								<strong class="mt-2 block">Benefit 1</strong>
								<p class="opacity-70">This is a brilliant benefit.</p>
							</div>
							<div class="bg-card text-card-foreground rounded-xl border p-4">
								<Icon name="pointer" class="text-primary h-6 w-6 text-3xl" />
								<strong class="mt-2 block">Benefit 2</strong>
								<p class="opacity-70">This is a brilliant benefit.</p>
							</div>
						</div>
					</div>
				</div>
				<!-- Feature 2 -->
				<div class="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
					<div class="bg-primary/10 rounded-2xl p-12 lg:order-2">
						<img :src="heroImage" class="block dark:hidden" alt="Feature 2" />
						<img :src="heroDarkImage" class="hidden dark:block" alt="Feature 2" />
					</div>

					<div class="lg:order-1">
						<h3 class="text-3xl font-bold">Feature B</h3>
						<p class="mt-2 leading-normal opacity-70">
							This is a brilliant feature. And below you can see some reasons why. This is basically just a dummy text.
						</p>
						<Button class="mt-4 px-0" variant="link" size="sm">Learn more &rarr;</Button>

						<div class="mt-6 grid grid-cols-2 gap-4">
							<div class="bg-card text-card-foreground rounded-xl border p-4">
								<Icon name="upload" class="text-primary h-6 w-6 text-3xl" />
								<strong class="mt-2 block">Benefit 1</strong>
								<p class="opacity-70">This is a brilliant benefit.</p>
							</div>
							<div class="bg-card text-card-foreground rounded-xl border p-4">
								<Icon name="cloud" class="text-primary h-6 w-6 text-3xl" />
								<strong class="mt-2 block">Benefit 2</strong>
								<p class="opacity-70">This is a brilliant benefit.</p>
							</div>
						</div>
					</div>
				</div>
				<!-- Feature 3 -->
				<div class="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
					<div class="bg-primary/10 rounded-2xl p-12">
						<img :src="heroImage" class="block dark:hidden" alt="Feature 3" />
						<img :src="heroDarkImage" class="hidden dark:block" alt="Feature 3" />
					</div>

					<div>
						<h3 class="text-3xl font-bold">Feature C</h3>
						<p class="mt-2 leading-normal opacity-70">
							This is a brilliant feature. And below you can see some reasons why. This is basically just a dummy text.
						</p>
						<Button class="mt-4 px-0" variant="link" size="sm">Learn more &rarr;</Button>

						<div class="mt-6 grid grid-cols-2 gap-4">
							<div class="bg-card text-card-foreground rounded-xl border p-4">
								<Icon name="phone" class="text-primary h-6 w-6 text-3xl" />
								<strong class="mt-2 block">Benefit 1</strong>
								<p class="opacity-70">This is a brilliant benefit.</p>
							</div>
							<div class="bg-card text-card-foreground rounded-xl border p-4">
								<Icon name="paperclip" class="text-primary h-6 w-6 text-3xl" />
								<strong class="mt-2 block">Benefit 2</strong>
								<p class="opacity-70">This is a brilliant benefit.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	const heroImage = ref('/images/hero.svg')
	const heroDarkImage = ref('/images/hero-dark.svg')
</script>
