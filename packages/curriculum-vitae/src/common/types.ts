import { z } from 'zod'

import { faIconSchema } from './fa-icon'

export const documentMeta = z.object({
  title: z.string(),
  author: z.string(),
  subject: z.string().optional(),
})

export const contactInfoSchema = z.object({
  icon: faIconSchema,
  text: z.string(),
  href: z.string().url().optional(),
})

export type ContactInfoProps = z.infer<typeof contactInfoSchema>

export const contactSchema = z.object({
  contactInfo: z.array(contactInfoSchema),
})

export type ContactProps = z.infer<typeof contactSchema>
