<template>
	<Button asChild variant="outline" type="button">
		<a :href="providerPath">
			<Icon v-if="providerData.icon" :name="providerData.icon" class="mr-2 h-4 w-4 opacity-70" />
			{{ t('auth.continueWithProvider', { provider: providerData.name }) }}
		</a>
	</Button>
</template>

<script setup lang="ts">
	import { joinURL } from 'ufo'
	import type { IconName } from '@/modules/ui/components/Icon.vue'

	const { t } = useTranslations()

	const providers: { [key: string]: { name: string; icon: IconName } } = {
		google: {
			name: 'Google',
			icon: 'google',
		},
		apple: {
			name: 'Apple',
			icon: 'apple',
		},
		github: {
			name: 'Github',
			icon: 'github',
		},
		twitter: {
			name: 'Twitter',
			icon: 'twitter',
		},
	}

	const props = defineProps<{
		provider: string
	}>()

	const providerData = computed(() => {
		return providers[props.provider as keyof typeof providers]
	})

	const providerPath = computed(() => {
		return joinURL(`/api/oauth/${props.provider}`)
	})
</script>
