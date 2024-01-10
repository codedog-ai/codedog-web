<template>
	<div>
		<div class="flex items-center justify-start gap-2">
			<slot name="avatar" />
			<h2 class="text-muted-foreground">{{ props.menuItemGroup.title }}</h2>
		</div>

		<ul class="mt-1 list-none">
			<li v-for="subitem of props.menuItemGroup.items" :key="subitem.to">
				<NuxtLinkLocale
					:to="subitem.to"
					class="block py-1.5 pl-10"
					:class="isActiveMenuItem(subitem.to) ? 'font-bold' : ''">
					{{ subitem.title }}
				</NuxtLinkLocale>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
	const route = useRoute()

	export type SaasSettingsMenuItemGroup = {
		title: string
		avatar: 'team' | 'user'
		items: { title: string; to: string }[]
	}
	const props = defineProps<{
		menuItemGroup: SaasSettingsMenuItemGroup
	}>()

	const isActiveMenuItem = (href: string | null) => {
		return href && route.path.includes(href)
	}
</script>
