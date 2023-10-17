import IconFaSolidGlobe from '~icons/fa-solid/globe'

import { defaultLocale, locales } from './i18n'
import { useLocale } from './locale-provider'

import { type Component, For } from 'solid-js'

const localeOptions = locales.map((locale) => ({
  locale,
  label: new Intl.DisplayNames([locale], { type: 'language' }).of(locale),
}))

export const LocaleSwitcher: Component<{ btnClass?: string }> = (props) => {
  const { currentLocale, setCurrentLocale } = useLocale()
  return (
    <div class="dropdown dropdown-end">
      <label
        tabindex="0"
        class={['btn btn-ghost normal-case', props.btnClass]
          .filter(Boolean)
          .join(' ')}
      >
        <IconFaSolidGlobe />
        {currentLocale()}
      </label>
      <ul
        tabindex="0"
        class="min-content menu dropdown-content rounded-box z-[1] mt-2 bg-base-200 shadow"
      >
        <For each={localeOptions}>
          {({ locale, label }) => {
            return (
              <li>
                <a
                  onClick={(event) => {
                    event.preventDefault()
                    // @ts-expect-error - `blur` is not defined on `Element`
                    document.activeElement?.blur?.()
                    setCurrentLocale(locale)
                  }}
                  href={locale === defaultLocale ? '/' : `/${locale}/`}
                  class="whitespace-nowrap"
                >
                  {label} ({locale})
                </a>
              </li>
            )
          }}
        </For>
      </ul>
    </div>
  )
}
