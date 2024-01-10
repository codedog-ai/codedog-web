<template>
	<Wrapper>
		<EHeading>
			Join the team <strong>{{ props.teamName }}</strong>
		</EHeading>

		<EText>
			You have been invited to join the team {{ teamName }}. Click the button below or copy and paste the link into your
			browser of choice to accept the invitation and join the team.
		</EText>

		<br />

		<PrimaryButton :href="props.url">Join the team</PrimaryButton>

		<br />

		<EText :style="{ fontSize: '14px', lineHeight: '20px', color: colors.mutedForeground }">
			Or manually copy and paste this link into your browser:
			<ELink :href="props.url">{{ props.url }}</ELink>
		</EText>
	</Wrapper>
</template>

<script setup lang="ts">
	const colors = {
		mutedForeground: '#64748b',
	}

	const props = defineProps<{
		url: string
		teamName: string
	}>()
</script>
