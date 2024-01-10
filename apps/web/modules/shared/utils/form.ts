import { useForm } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

export const formUtils = {
	useForm,
	z,
	toTypedSchema,
}
