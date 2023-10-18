import { defaultLocale, type DictI18n, dictonaries, type Locale } from './i18n'

import {
  type Accessor,
  createContext,
  createSignal,
  type ParentComponent,
  useContext,
} from 'solid-js'

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
  const setCurrentLocale = (locale: Locale) => {
    _setCurrentLocale(locale)
    if (defaultLocale === locale) {
      history.pushState(null, '', '/' + location.hash)
    } else history.pushState(null, '', `/${locale}/` + location.hash)
  }
  const messages = () => dictonaries[currentLocale()]

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
  if (!context) throw new Error('LocaleProvider not found')
  return context
}
