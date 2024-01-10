<template>
	<Card v-if="currentTeamRole === 'OWNER'">
		<form @submit.prevent="onSubmit" class="@container">
			<CardHeader>
				<template #title>{{ t('settings.team.members.inviteMember.title') }}</template>
			</CardHeader>

			<CardContent>
				<div class="@md:flex-row flex flex-col gap-2">
					<FormItem class="flex-1">
						<FormLabel for="email" required>
							{{ t('settings.team.members.inviteMember.email') }}
						</FormLabel>
						<Input v-bind="email" type="email" id="email" required />
					</FormItem>

					<FormItem>
						<FormLabel for="role" required>
							{{ t('settings.team.members.inviteMember.role') }}
						</FormLabel>
						<SaasTeamRoleSelect v-model="roleValue" />
					</FormItem>
				</div>

				<div class="mt-6 flex justify-end border-t pt-3">
					<Button type="submit" :disabled="isSubmitDisabled" :loading="isSubmitting">
						{{ t('settings.team.members.inviteMember.submit') }}
					</Button>
				</div>
			</CardContent>
		</form>
	</Card>
</template>

<script setup lang="ts">
	import type { TeamMemberRole } from 'database'

	const props = defineProps<{
		teamId: string
	}>()

	const emit = defineEmits<{
		success: []
	}>()

	const route = useRoute()
	const { t } = useTranslations()
	const { apiCaller } = useApiCaller()
	const { toast } = useToast()
	const { teamMemberships } = useUser()

	const teamSlug = computed(() => {
		return 'teamSlug' in route.params ? route.params.teamSlug : ''
	})

	const activeMembership = computed(() => {
		return teamMemberships.value.find(membership => {
			return membership.team.slug === teamSlug.value
		})
	})

	const currentTeamRole = computed(() => {
		return activeMembership.value?.role
	})

	const { z, toTypedSchema, useForm } = formUtils

	const roleValues: [TeamMemberRole, TeamMemberRole] = ['MEMBER', 'OWNER']

	const formSchema = toTypedSchema(
		z.object({
			email: z.string().email(),
			role: z.enum(roleValues),
		})
	)

	const { defineInputBinds, handleSubmit, isSubmitting, useFieldModel, resetForm } = useForm({
		validationSchema: formSchema,
		initialValues: {
			email: '',
			role: 'MEMBER',
		},
	})

	const email = defineInputBinds('email')
	const roleValue = useFieldModel('role')

	const isSubmitDisabled = computed(() => {
		return !email.value
	})

	const onSubmit = handleSubmit(async values => {
		try {
			await apiCaller.team.inviteMember.mutate({
				...values,
				teamId: props.teamId,
			})

			resetForm()
			toast({
				title: t('settings.team.members.inviteMember.notifications.success.title'),
				description: t('settings.team.members.inviteMember.notifications.success.description'),
				variant: 'success',
			})
			emit('success')
		} catch (error) {
			toast({
				title: t('settings.team.members.inviteMember.notifications.error.title'),
				description: t('settings.team.members.inviteMember.notifications.error.description'),
				variant: 'error',
			})
		}
	})
</script>
