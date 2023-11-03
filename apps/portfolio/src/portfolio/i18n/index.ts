import de from './de'
import en from './en'

export type DictI18n = typeof en

export const dictonaries = {
  en,
  de,
} satisfies Record<string, DictI18n>

export type Locale = keyof typeof dictonaries
export const locales = ['en', 'de'] as const
export const defaultLocale = 'en' satisfies Locale
