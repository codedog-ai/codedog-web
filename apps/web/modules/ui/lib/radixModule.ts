import { addComponent, defineNuxtModule } from '@nuxt/kit'

/**
 * These components will be auto-imported directly from radix-vue.
 */
const componentList: {
	/** Original name of the component */
	name: string
	/** Rename the component to this name */
	as?: string
}[] = [
	/* Dialog */
	{ name: 'DialogRoot' },
	{ name: 'DialogPortal' },
	{ name: 'DialogTrigger' },

	/* Sheet (Dialog) */
	{ name: 'DialogRoot', as: 'SheetRoot' },
	{ name: 'DialogPortal', as: 'SheetPortal' },
	{ name: 'DialogTrigger', as: 'SheetTrigger' },

	/** DropdownMenu */
	{ name: 'DropdownMenuRoot' },
	{ name: 'DropdownMenuPortal' },
	{ name: 'DropdownMenuTrigger' },
	{ name: 'DropdownMenuGroup' },
	{ name: 'DropdownMenuRadioGroup' },
	{ name: 'DropdownMenuSub' },

	/** Select */
	{ name: 'SelectRoot' },
	{ name: 'SelectGroup' },
	{ name: 'SelectValue' },

	/** Tabs */
	{ name: 'TabsRoot' },

	/** Toast */
	{ name: 'ToastProvider' },
]

/**
 * This is an internal nuxt module that imports certain radix components.
 * If you want to define an override to them, add a new file (e.g. `DialogRoot`) to `modules/ui/components/Dialog`
 * and remove it from this list of auto imports.
 * @see https://github.com/radix-vue/radix-vue/blob/main/packages/plugins/src/nuxt/index.ts
 */
export default defineNuxtModule({
	setup() {
		for (const component of componentList) {
			addComponent({
				name: component.as || component.name,
				export: component.name,
				filePath: 'radix-vue',
			})
		}
	},
})
