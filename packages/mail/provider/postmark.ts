import { config } from '../config'
import type { SendEmailHandler } from '../types'

const { from } = config

export const send: SendEmailHandler = async ({ to, subject, html }) => {
	const response = await fetch('https://api.postmarkapp.com/email', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-Postmark-Server-Token': process.env.POSTMARK_SERVER_TOKEN as string,
		},
		body: JSON.stringify({
			From: from,
			To: to,
			Subject: subject,
			HtmlBody: html,
			MessageStream: 'outbound',
		}),
	})

	if (!response.ok) {
		console.error(await response.json())
		throw new Error('Could not send email')
	}
}
