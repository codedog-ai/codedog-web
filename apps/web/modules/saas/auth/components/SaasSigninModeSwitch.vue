<template>
	<TabsRoot :modelValue="props.modelValue" @update:modelValue="emit('update:modelValue', $event as ActiveMode)">
		<TabsList class="w-full">
			<TabsTrigger v-for="mode of modes" :key="mode.value" :value="mode.value" class="flex-1">
				{{ mode.label }}
			</TabsTrigger>
		</TabsList>
	</TabsRoot>
</template>

<script setup lang="ts">
	type ActiveMode = 'password' | 'magic-link'

	const props = defineProps<{
		'modelValue': ActiveMode
	}>()

	const emit = defineEmits<{
		'update:modelValue': [value: ActiveMode]
	}>()

	const modes: {
		value: ActiveMode
		label: string
	}[] = [
		{
			value: 'magic-link',
			label: 'Magic Link',
		},
		{
			value: 'password',
			label: 'Password',
		},
	]
</script>
