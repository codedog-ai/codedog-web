import { createResolver, defineNuxtModule, addImportsDir } from 'nuxt/kit'

const providerPath = './provider/custom'

export default defineNuxtModule({
	meta: {
		name: 'analytics',
	},
	setup() {
		const { resolve } = createResolver(import.meta.url)
		addImportsDir(resolve(providerPath))
	},
})
