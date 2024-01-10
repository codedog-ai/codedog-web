import tailwindConfig from 'tailwind-config'
import type { Config } from 'tailwindcss'

const config: Config = {
	presets: [tailwindConfig],
	content: ['./layouts/**/*.vue', './modules/**/*.vue', './pages/**/*.vue'],
}

export default config
