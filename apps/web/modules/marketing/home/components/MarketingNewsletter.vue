<template>
	<section class="border-t py-24">
		<div class="container">
			<div class="mb-12 text-center">
				<Icon name="key" class="text-primary mx-auto mb-3 h-12 w-12" />
				<h1 class="text-3xl font-bold lg:text-4xl">
					{{ t('newsletter.title') }}
				</h1>
				<p class="mt-3 text-lg opacity-70">{{ t('newsletter.subtitle') }}</p>
			</div>

			<div class="mx-auto max-w-lg">
				<Alert v-if="isSubmitSuccessful === true" variant="success">
					<Icon name="success" class="h-4 w-4" />
					<template #title>
						{{ t('newsletter.hints.success.title') }}
					</template>
					<template #description>
						{{ t('newsletter.hints.success.message') }}
					</template>
				</Alert>

				<template v-else>
					<form @submit.prevent="onSubmit">
						<div class="flex items-start">
							<Input v-bind="email" type="email" required :placeholder="t('newsletter.email')" />
							<Button type="submit" class="ml-4" :loading="isSubmitting">
								{{ t('newsletter.submit') }}
							</Button>
						</div>
					</form>

					<Alert v-if="errors.email" variant="error" class="mt-6 text-sm">
						<Icon name="error" class="h-4 w-4" />
						<template #title>
							{{ t('newsletter.hints.error.title') }}
						</template>
						<template #description>
							{{ errors.email }}
						</template>
					</Alert>
				</template>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	const { apiCaller } = useApiCaller()
	const { t } = useTranslations()

	const { z, toTypedSchema, useForm } = formUtils

	const formSchema = toTypedSchema(
		z.object({
			email: z.string().email(t('newsletter.hints.error.input')),
		})
	)

	const isSubmitSuccessful = ref(false)

	const { defineInputBinds, handleSubmit, isSubmitting, errors, setFieldError } = useForm({
		validationSchema: formSchema,
		initialValues: {
			email: '',
		},
	})

	const email = defineInputBinds('email')

	const onSubmit = handleSubmit(
		async values => {
			try {
				const emailSent = await apiCaller.newsletter.signup.mutate({
					email: values.email,
				})
				if (!emailSent) {
					throw new Error('Email not sent')
				}

				isSubmitSuccessful.value = true
			} catch (error) {
				isSubmitSuccessful.value = false
				setFieldError('email', t('newsletter.hints.error.submission'))
			}
		},
		() => {
			isSubmitSuccessful.value = false
		}
	)
</script>
