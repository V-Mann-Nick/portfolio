import IconFaSolidBars from '~icons/fa-solid/bars'
import clsx from 'clsx'
import { type Component, For } from 'solid-js'

import type { SectionDefinitions } from './app'
import type { SectionDefinition } from './types'

import { DarkModeToggle } from './dark-mode-toggle'
import { DropdownMenu, type DropdownProps } from './dropdown-menu'
import { useLocale } from './locale-provider'
import { LocaleSwitcher } from './locale-switcher'
import { currentSection } from './state'

const NavigationItem: Component<SectionDefinition> = (props) => {
  const { messages } = useLocale()
  return (
    <a
      class={clsx(
        'btn rounded-none px-6',
        currentSection() === props.key && 'btn-secondary'
      )}
      href={`#${props.key}`}
    >
      <props.Icon />
      {props.label(messages())}
    </a>
  )
}

type MobileNavigationProps = {
  sections: SectionDefinitions
} & Pick<DropdownProps, 'triggerClass'>

const MobileNavigation: Component<MobileNavigationProps> = (props) => {
  const { messages } = useLocale()
  const label = () => messages().mobileNavigation.label
  return (
    <DropdownMenu
      currentSelection={currentSection()}
      items={props.sections.map((section) => ({
        key: section.key,
        label: (
          <>
            <section.Icon /> {section.label(messages())}
          </>
        ),
        href: `#${section.key}`,
      }))}
      label={label()}
      positioningStrategy="fixed"
      tooltip={{
        tooltip: label(),
        placement: 'right',
      }}
      triggerChildren={<IconFaSolidBars />}
      triggerClass={clsx('rounded-none', props.triggerClass)}
      onSelect={({ href }) => (window.location.hash = href)}
    />
  )
}

type NavigationProps = {
  sections: SectionDefinitions
}

export const Navigation: Component<NavigationProps> = (props) => (
  <nav
    class="bg-base-200 sticky top-0 z-10 flex h-12 justify-between px-3 shadow-lg"
    aria-label="Main site navigation"
  >
    <ul class="hidden sm:flex">
      <For each={props.sections}>
        {(section) => (
          <li>
            <NavigationItem {...section} />
          </li>
        )}
      </For>
    </ul>
    <MobileNavigation sections={props.sections} triggerClass="sm:hidden" />
    <div>
      <DarkModeToggle btnClass="rounded-none h-full" />
      <LocaleSwitcher btnClass="rounded-none" positioningStrategy="fixed" />
    </div>
  </nav>
)
