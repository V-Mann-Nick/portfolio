import IconFaSolidGlobe from '~icons/fa-solid/globe'
import { type Component } from 'solid-js'

import { DropdownMenu, type DropdownProps } from './dropdown-menu'
import { type Locale, locales } from './i18n'
import { useLocale } from './locale-provider'

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

type LocaleSwitcherProps = {
  btnClass?: string
} & Pick<DropdownProps, 'positioningStrategy'>

export const LocaleSwitcher: Component<LocaleSwitcherProps> = (props) => {
  const { currentLocale, setCurrentLocale, messages } = useLocale()
  const label = () => messages().localeSwitcher.label

  return (
    <DropdownMenu
      currentSelection={currentLocale()}
      extraATagProps={({ key }) => ({ lang: key, hreflang: key })}
      items={localeOptions}
      label={`${label()} (${currentLocale()})`}
      placement="bottom-end"
      positioningStrategy={props.positioningStrategy}
      tooltip={{ tooltip: label(), placement: 'left' }}
      triggerChildren={
        <>
          <IconFaSolidGlobe />
          {currentLocale()}
        </>
      }
      triggerClass={props.btnClass}
      onSelect={(item) => {
        setCurrentLocale(item.key as Locale)
      }}
    />
  )
}
