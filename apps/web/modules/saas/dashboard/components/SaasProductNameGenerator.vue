<template>
	<div>
		<form @submit.prevent="onSubmit">
			<FormItem>
				<FormLabel for="topic"> Topic </FormLabel>
				<Input v-bind="topic" type="text" id="topic" required />
			</FormItem>

			<Button class="mt-4 w-full" :loading="pending && status !== 'idle'">
				<Icon name="magic" class="mr-2 h-4 w-4" />
				Generate product names
			</Button>
		</form>

		<ul v-if="data" class="mt-8 grid grid-cols-1 gap-2">
			<li v-for="(name, key) of data" :key="key" class="bg-muted rounded-md border p-4">
				{{ name }}
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
	const { apiCaller } = useApiCaller()

	const { z, toTypedSchema, useForm } = formUtils

	const formSchema = toTypedSchema(
		z.object({
			topic: z.string().min(1),
		})
	)

	const { defineInputBinds, handleSubmit, values } = useForm({
		validationSchema: formSchema,
		initialValues: {
			topic: '',
		},
	})

	const topicValue = computed(() => {
		return values.topic || ''
	})

	const topic = defineInputBinds('topic')

	const { data, pending, refresh, status } = useAsyncData(
		() => {
			return apiCaller.ai.generateProductNames.query({
				topic: topicValue.value,
			})
		},
		{
			immediate: false,
		}
	)

	const onSubmit = handleSubmit(async () => {
		refresh()
	})
</script>
