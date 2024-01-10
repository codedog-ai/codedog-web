<template>
	<Wrapper>
		<EText>
			Hey {{ props.name }}, <br />
			you changed your email. Please click the link below to confirm your new email address.
		</EText>

		<PrimaryButton :href="props.url">Confirm email &rarr;</PrimaryButton>
		<br />

		<EText :style="{ fontSize: '14px', lineHeight: '20px', color: colors.mutedForeground }">
			If you want to open the link in a different browser than your default one, copy and paste this link:
			<ELink :href="props.url">{{ props.url }}</ELink>
		</EText>
	</Wrapper>
</template>

<script setup lang="ts">
	const colors = {
		mutedForeground: '#64748b',
	}

	const props = defineProps<{
		name: string
		url: string
	}>()
</script>
