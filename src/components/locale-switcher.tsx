import IconFaSolidGlobe from '~icons/fa-solid/globe'

import { DropdownMenu } from './dropdown-menu'
import { type Locale, locales } from './i18n'
import { useLocale } from './locale-provider'

import { type Component } from 'solid-js'

const localeOptions = locales.map((locale) => {
  const language = new Intl.DisplayNames([locale], { type: 'language' }).of(
    locale
  )
  return {
    key: locale,
    label: `${language} (${locale})`,
    href: locale === 'en' ? '/' : `/${locale}/`,
  }
})

export const LocaleSwitcher: Component<{ btnClass?: string }> = (props) => {
  const { currentLocale, setCurrentLocale, messages } = useLocale()
  const label = () => messages().localeSwitcher.label

  return (
    <DropdownMenu
      label={label()}
      items={localeOptions}
      dropdownClass="dropdown-end"
      triggerChildren={
        <>
          <IconFaSolidGlobe />
          {currentLocale()}
        </>
      }
      triggerClass={props.btnClass}
      onSelect={(item) => setCurrentLocale(item.key as Locale)}
      currentSelection={currentLocale()}
      tooltip={{ text: label(), class: 'tooltip-left' }}
      extraATagProps={({ key }) => ({ lang: key, hreflang: key })}
    />
  )
}
