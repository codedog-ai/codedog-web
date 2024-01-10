/// <reference types="lucia" />

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

declare namespace Lucia {
	type UserRole = import('database').UserRole
	type User = import('database').User
	type Auth = import('./lib/lucia').Auth
	type DatabaseUserAttributes = PartialBy<Omit<User, 'id'>, 'avatar_url' | 'github_username'>
	type DatabaseSessionAttributes = {}
}
