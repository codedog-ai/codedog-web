<template>
	<SelectRoot
		:modelValue="props.modelValue"
		@update:modelValue="emit('update:modelValue', $event as TeamMemberRole)"
		:disabled="$props.disabled">
		<SelectTrigger class="w-[180px]">
			<SelectValue />
		</SelectTrigger>
		<SelectContent>
			<SelectItem v-for="option of roleOptions" :key="option.value" :value="option.value">
				{{ option.label }}
			</SelectItem>
		</SelectContent>
	</SelectRoot>
</template>

<script setup lang="ts">
	import type { TeamMemberRole } from 'database'

	const props = defineProps<{
		modelValue: TeamMemberRole | undefined
		disabled?: boolean
	}>()

	const emit = defineEmits<{
		'update:modelValue': [value: TeamMemberRole]
	}>()

	const { t } = useTranslations()

	const roleOptions = computed<{ label: string; value: TeamMemberRole }[]>(() => [
		{
			label: t('settings.team.members.roles.member'),
			value: 'MEMBER',
		},
		{
			label: t('settings.team.members.roles.owner'),
			value: 'OWNER',
		},
	])
</script>
