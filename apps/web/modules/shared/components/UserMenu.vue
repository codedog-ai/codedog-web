<template>
	<DropdownMenuRoot v-if="user">
		<DropdownMenuTrigger asChild>
			<button class="focus-visible:ring-primary rounded-full outline-none focus-visible:ring-2">
				<UserAvatar :name="user.name ?? ''" :avatarUrl="user.avatar_url" />
			</button>
		</DropdownMenuTrigger>

		<DropdownMenuContent align="end">
			<DropdownMenuLabel>
				{{ user.name }}
				<span class="block text-xs font-normal opacity-70">{{ user.email }}</span>
			</DropdownMenuLabel>

			<DropdownMenuSeparator />

			<!-- Color mode selection -->
			<DropdownMenuSub>
				<DropdownMenuSubTrigger>
					<ColorModeToggleIcon />
					<div class="ml-2">Color mode</div>
				</DropdownMenuSubTrigger>
				<DropdownMenuPortal>
					<DropdownMenuSubContent>
						<ColorModeToggleRadioGroup />
					</DropdownMenuSubContent>
				</DropdownMenuPortal>
			</DropdownMenuSub>

			<DropdownMenuSeparator />

			<!-- Locale selection -->
			<DropdownMenuSub>
				<DropdownMenuSubTrigger>
					<Icon name="language" class="h-4 w-4" />

					<div class="ml-2">Language</div>
				</DropdownMenuSubTrigger>
				<DropdownMenuPortal>
					<DropdownMenuSubContent>
						<LocaleSwitchRadioGroup />
					</DropdownMenuSubContent>
				</DropdownMenuPortal>
			</DropdownMenuSub>

			<DropdownMenuSeparator />

			<DropdownMenuItem asChild>
				<NuxtLinkLocale :to="accountSettingsLink">
					<Icon name="settings" class="mr-2 h-4 w-4" />
					Account settings
				</NuxtLinkLocale>
			</DropdownMenuItem>

			<DropdownMenuItem @click="logout">
				<Icon name="logout" class="mr-2 h-4 w-4" />
				Logout
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenuRoot>
</template>

<script setup lang="ts">
	const route = useRoute()
	const router = useRouter()
	const { user, logout } = useUser()

	const teamSlug = computed(() => {
		return 'teamSlug' in route.params ? route.params.teamSlug : ''
	})

	const accountSettingsLink = computed(
		() =>
			router.resolve({
				name: 'teamSlug-settings-account-general___en',
				params: {
					teamSlug: teamSlug.value,
				},
			}).path
	)
</script>
