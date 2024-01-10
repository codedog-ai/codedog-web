import { createAdminApiCaller } from 'api/modules/trpc'
import { createHmac, timingSafeEqual } from 'node:crypto'
import type { SubscriptionStatus } from 'database'

export default defineEventHandler(async event => {
	try {
		const text = await readRawBody(event)
		const hmac = createHmac('sha256', process.env.LEMONSQUEEZY_WEBHOOK_SECRET as string)
		const digest = Buffer.from(hmac.update(`${text}`).digest('hex'), 'utf8')
		const signatureHeader = getHeader(event, 'x-signature')
		if (!signatureHeader) {
			throw new Error('Missing x-signature header')
		}
		const signature = Buffer.from(signatureHeader, 'utf8')

		if (!timingSafeEqual(digest, signature)) throw new Error('Invalid signature.')

		const payload = await readBody(event)

		const {
			meta: { event_name: eventName, custom_data: customData },
			data,
		} = payload

		const statusMap: Record<string, SubscriptionStatus> = {
			active: 'ACTIVE',
			past_due: 'PAST_DUE',
			unpaid: 'UNPAID',
			cancelled: 'CANCELED',
			expired: 'EXPIRED',
			on_trial: 'TRIALING',
			paused: 'PAUSED',
		}

		const apiCaller = await createAdminApiCaller()

		switch (eventName) {
			case 'subscription_created':
			case 'subscription_updated':
			case 'subscription_cancelled':
			case 'subscription_expired':
			case 'subscription_resumed':
				await apiCaller.billing.syncSubscription({
					id: String(data.id),
					team_id: customData?.team_id,
					customer_id: String(data.attributes.customer_id),
					plan_id: String(data.attributes.product_id),
					variant_id: String(data.attributes.variant_id),
					status: statusMap[data.attributes.status],
					next_payment_date: new Date(data.attributes.trial_ends_at ?? data.attributes.renews_at),
				})
				break
		}
	} catch (error) {
		throw createError({
			statusCode: 400,
			statusMessage: `Webhook error: ${error instanceof Error ? error.message : ''}`,
		})
	}

	setResponseStatus(event, 204)
	return null
})
