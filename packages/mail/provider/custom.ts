import { config } from '../config'
import type { SendEmailHandler } from '../types'

const { from } = config

export const send: SendEmailHandler = async ({ to, subject, text, html }) => {
	// handle your custom email sending logic here
}
