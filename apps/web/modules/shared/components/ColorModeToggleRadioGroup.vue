<template>
	<DropdownMenuRadioGroup v-model="$colorMode.preference">
		<DropdownMenuRadioItem v-for="option of colorModeOptions" :key="option.value" :value="option.value">
			<Icon :name="option.icon" class="mr-2 h-4 w-4 opacity-50" /> {{ option.label }}
		</DropdownMenuRadioItem>
	</DropdownMenuRadioGroup>
</template>

<script lang="ts" setup>
	import type { IconName } from '@/modules/ui/components/Icon.vue'

	const colorModeOptions: {
		value: string
		label: string
		icon: IconName
	}[] = [
		{
			value: 'system',
			label: 'System',
			icon: 'system',
		},
		{
			value: 'light',
			label: 'Light',
			icon: 'lightMode',
		},
		{
			value: 'dark',
			label: 'Dark',
			icon: 'darkMode',
		},
	]
</script>
