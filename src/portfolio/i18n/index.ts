import de from "./de.tsx";
import en from "./en.tsx";
import { Locale } from "./locales.ts";

export type DictI18n = typeof en;

export const dictonaries = {
  en,
  de,
} satisfies Record<Locale, DictI18n>;

export { defaultLocale, type Locale, locales } from "./locales.ts";
