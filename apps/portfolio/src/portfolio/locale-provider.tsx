import {
  type Accessor,
  type ParentComponent,
  createContext,
  createSignal,
  useContext,
} from 'solid-js'

import { type DictI18n, type Locale, defaultLocale, dictonaries } from './i18n'

type LocaleContext = {
  currentLocale: Accessor<Locale>
  setCurrentLocale: (locale: Locale) => void
  messages: Accessor<DictI18n>
}

const LocaleContext = createContext<LocaleContext>()

export const LocaleProvider: ParentComponent<{ initialLocale: Locale }> = (
  props
) => {
  const [currentLocale, _setCurrentLocale] = createSignal(props.initialLocale)
  const messages = () => dictonaries[currentLocale()]
  const setCurrentLocale = (locale: Locale) => {
    _setCurrentLocale(locale)
    if (defaultLocale === locale) {
      history.pushState(null, '', '/' + location.hash)
    } else {
      history.pushState(null, '', `/${locale}/` + location.hash)
    }
    document.documentElement.lang = locale
    ;[
      document.querySelector('meta[name=description]'),
      document.querySelector('meta[property="og:description"]'),
    ].forEach((el) => el?.setAttribute('content', messages().meta.description))
  }

  return (
    <LocaleContext.Provider
      value={{ currentLocale, setCurrentLocale, messages }}
    >
      {props.children}
    </LocaleContext.Provider>
  )
}

export const useLocale = () => {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('LocaleProvider not found')
  }
  return context
}
