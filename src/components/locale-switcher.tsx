import IconFaSolidGlobe from '~icons/fa-solid/globe'

import clickOutsideDirective from './click-outside'
import { defaultLocale, locales } from './i18n'
import { useLocale } from './locale-provider'

import { type Component, createSignal, createUniqueId, For } from 'solid-js'

// @ts-expect-error Directive needs to be in scope
const clickOutside = clickOutsideDirective

const localeOptions = locales.map((locale) => ({
  locale,
  label: new Intl.DisplayNames([locale], { type: 'language' }).of(locale),
}))

export const LocaleSwitcher: Component<{ btnClass?: string }> = (props) => {
  const { currentLocale, setCurrentLocale, messages } = useLocale()
  const label = () => messages().localeSwitcher.label

  const [isExpanded, setIsExpanded] = createSignal(false)
  const [activeDescendantIdx, setActiveDescendantIdx] = createSignal(0)
  let menuRef: HTMLUListElement | undefined
  let buttonRef: HTMLButtonElement | undefined

  const triggerId = createUniqueId()
  const menuId = createUniqueId()
  const optionId = createUniqueId()

  return (
    <div class="tooltip tooltip-left" data-tip={label()}>
      <div
        class="dropdown-end dropdown"
        classList={{ 'dropdown-open': isExpanded() }}
        use:clickOutside={() => setIsExpanded(false)}
      >
        <button
          id={triggerId}
          ref={buttonRef!}
          aria-expanded={isExpanded()}
          aria-label={label()}
          aria-controls={menuId}
          onClick={() => {
            setIsExpanded((prev) => !prev)
            menuRef?.focus()
          }}
          onKeyDown={(event) => {
            if (isExpanded()) return
            if (event.key === 'ArrowUp') {
              event.preventDefault()
              setIsExpanded(true)
              menuRef?.focus()
              setActiveDescendantIdx(localeOptions.length - 1)
            } else if (event.key === 'ArrowDown') {
              event.preventDefault()
              setIsExpanded(true)
              menuRef?.focus()
              setActiveDescendantIdx(0)
            }
          }}
          class={['btn btn-ghost normal-case', props.btnClass]
            .filter(Boolean)
            .join(' ')}
        >
          <IconFaSolidGlobe />
          {currentLocale()}
        </button>
        <ul
          ref={menuRef!}
          tabindex="-1"
          onKeyDown={(event) => {
            if (!isExpanded()) return
            const handlers = {
              ArrowDown: () =>
                setActiveDescendantIdx(
                  (prev) => (prev + 1) % localeOptions.length
                ),
              ArrowUp: () =>
                setActiveDescendantIdx(
                  (prev) =>
                    (prev - 1 + localeOptions.length) % localeOptions.length
                ),
              Home: () => setActiveDescendantIdx(0),
              End: () => setActiveDescendantIdx(localeOptions.length - 1),
              Escape: () => {
                setIsExpanded(false)
                setActiveDescendantIdx(0)
                buttonRef?.focus()
              },
              Enter: () => {
                if (
                  activeDescendantIdx() >= 0 &&
                  activeDescendantIdx() < localeOptions.length
                ) {
                  setCurrentLocale(localeOptions[activeDescendantIdx()]!.locale)
                }
                setIsExpanded(false)
                setActiveDescendantIdx(0)
                buttonRef?.focus()
              },
            }
            if (event.key in handlers) {
              event.preventDefault()
              handlers[event.key as keyof typeof handlers]()
            }
          }}
          {...(activeDescendantIdx() >= 0
            ? {
                'aria-activedescendant': `${optionId}-${activeDescendantIdx()}`,
              }
            : {})}
          id={menuId}
          role="menu"
          aria-labelledby={triggerId}
          class="min-content menu dropdown-content rounded-box z-[1] mt-2 bg-base-200 shadow focus-visible:outline-none"
          classList={{ hidden: !isExpanded() }}
        >
          <For each={localeOptions}>
            {({ locale, label }, idx) => {
              return (
                <li>
                  <a
                    id={`${optionId}-${idx()}`}
                    {...(locale === currentLocale()
                      ? { 'aria-current': 'page', 'aria-selected': true }
                      : {})}
                    lang={locale}
                    hreflang={locale}
                    role="menuitem"
                    onClick={(event) => {
                      event.preventDefault()
                      setCurrentLocale(locale)
                      setIsExpanded(false)
                      setActiveDescendantIdx(0)
                    }}
                    onMouseEnter={() => setActiveDescendantIdx(idx())}
                    onMouseLeave={() => setActiveDescendantIdx(-1)}
                    href={locale === defaultLocale ? '/' : `/${locale}/`}
                    class="whitespace-nowrap hover:bg-transparent"
                    classList={{ focus: activeDescendantIdx() === idx() }}
                  >
                    {label} ({locale})
                  </a>
                </li>
              )
            }}
          </For>
        </ul>
      </div>
    </div>
  )
}
