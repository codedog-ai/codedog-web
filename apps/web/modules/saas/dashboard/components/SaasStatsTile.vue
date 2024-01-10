<template>
	<Card>
		<CardHeader class="pb-2">
			<template #title>
				<div class="text-muted-foreground text-sm">{{ title }}</div>
			</template>
		</CardHeader>
		<CardContent>
			<div class="flex items-center justify-between">
				<strong class="text-2xl font-bold">
					{{ formattedValue }}
					<small v-if="props.context">{{ context }}</small>
				</strong>

				<Badge v-if="props.trend" :status="props.trend > 0 ? 'success' : 'error'">
					{{ formattedTrend }}
				</Badge>
			</div>
		</CardContent>
	</Card>
</template>

<script setup lang="ts">
	const { n } = useTranslations()

	const props = defineProps<{
		title: string
		value: number
		valueFormat: 'currency' | 'number' | 'percentage'
		context?: string
		trend?: number
	}>()

	/** check `i18n.config.ts` to add formatting rules. */
	const formattedValue = computed(() => {
		switch (props.valueFormat) {
			case 'currency':
				return n(props.value, 'currency')
			case 'number':
				return n(props.value, 'number')
			case 'percentage':
				return n(props.value, 'percent')
		}
	})

	const formattedTrend = computed(() => {
		if (!props.trend) {
			return null
		}
		return `${props.trend >= 0 ? '+' : ''}${n(props.trend, 'percent')}`
	})
</script>
