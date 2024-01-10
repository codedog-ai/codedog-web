import { mailTemplates } from 'mail/util/templates'
import { send } from 'mail/provider'
import { useCompiler } from '#vue-email'

export const sendEmail = async <TemplateId extends keyof typeof mailTemplates>({
	to,
	templateId,
	context,
}: {
	to: string
	templateId: TemplateId
	context?: any
}) => {
	const templateData = mailTemplates[templateId]

	const template = await useCompiler(templateData.name, {
		props: context,
	})

	try {
		await send({
			to,
			subject: templateData.subject,
			/** @see https://github.com/Dave136/vue-email/issues/79 */
			text: '',
			html: template,
		})

		return true
	} catch (error) {
		console.error(error)
		return false
	}
}
