import slugify from 'slugify'

const forbiddenTeamNames = ['pricing', 'auth', 'blog', 'api']

export function slugifyTeamName(name: string) {
	if (forbiddenTeamNames.includes(name.toLowerCase())) {
		return `${name.toLowerCase()}-team`
	}

	return slugify(name, {
		lower: true,
		remove: /[*+~.()'"!?:@]/g,
		replacement: '-',
		trim: true,
		strict: true,
	})
}
