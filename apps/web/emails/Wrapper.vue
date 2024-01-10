<template>
	<EHtml lang="en">
		<EHead>
			<EFont fontFamily="Onest" fallbackFontFamily="Arial" :fontWeight="400" fontStyle="normal" />
		</EHead>

		<ESection
			:style="{
				padding: '4px',
			}">
			<EContainer
				:style="{
					padding: '24px',
					borderColor: colors.border,
					borderWidth: '1px',
					borderStyle: 'solid',
					backgroundColor: colors.card,
					color: colors.cardForeground,
					borderRadius: '12px',
				}">
				<Logo />

				<slot />
			</EContainer>
		</ESection>
	</EHtml>
</template>

<script setup lang="ts">
	/**
	 * Tailwind is not well supported in vue-email.
	 * Maybe you can switch as soon this is resolved:
	 * @awaiting https://github.com/Dave136/vue-email/issues/72
	 */
	const colors = {
		border: '#e2e8f0',
		card: '#ffffff',
		cardForeground: '#020817',
	}
</script>
