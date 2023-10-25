import IconFaSolidGlobe from '~icons/fa-solid/globe'

import { DropdownMenu, type DropdownProps } from './dropdown-menu'
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

type LocaleSwitcherProps = {
  btnClass?: string
} & Pick<DropdownProps, 'positioningStrategy'>

export const LocaleSwitcher: Component<LocaleSwitcherProps> = (props) => {
  const { currentLocale, setCurrentLocale, messages } = useLocale()
  const label = () => messages().localeSwitcher.label

  return (
    <DropdownMenu
      label={label()}
      items={localeOptions}
      placement="bottom-end"
      triggerChildren={
        <>
          <IconFaSolidGlobe />
          {currentLocale()}
        </>
      }
      triggerClass={props.btnClass}
      onSelect={(item) => setCurrentLocale(item.key as Locale)}
      currentSelection={currentLocale()}
      positioningStrategy={props.positioningStrategy}
      tooltip={{ tooltip: label(), placement: 'left' }}
      extraATagProps={({ key }) => ({ lang: key, hreflang: key })}
    />
  )
}
