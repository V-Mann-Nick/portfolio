import IconFaSolidBars from '~icons/fa-solid/bars'

import { DarkModeToggle } from './dark-mode-toggle'
import { DropdownMenu } from './dropdown-menu'
import { useLocale } from './locale-provider'
import { LocaleSwitcher } from './locale-switcher'
import { currentSection } from './state'
import type { SectionDefinition } from './types'

import clsx from 'clsx'
import { type Component, For } from 'solid-js'

const NavigationItem: Component<SectionDefinition> = (props) => {
  const { messages } = useLocale()
  return (
    <a
      class={clsx(
        'btn rounded-none px-6',
        currentSection() === props.key && 'btn-accent'
      )}
      href={`#${props.key}`}
    >
      <props.Icon />
      {props.label(messages())}
    </a>
  )
}

const MobileNavigation: Component<{
  sections: SectionDefinition[]
  dropdownClass: string
}> = (props) => {
  const { messages } = useLocale()
  return (
    <DropdownMenu
      label="Placeholder"
      items={props.sections.map((section) => ({
        key: section.key,
        label: (
          <>
            <section.Icon /> {section.label(messages())}
          </>
        ),
        href: `#${section.key}`,
      }))}
      tooltip={{
        tooltip: messages().mobileNavigation.label,
        placement: 'right',
      }}
      dropdownClass={props.dropdownClass}
      triggerClass="rounded-none"
      onSelect={({ href }) => (window.location.hash = href!)}
      triggerChildren={<IconFaSolidBars />}
      currentSelection={currentSection()}
    />
  )
}

export const Navigation: Component<{ sections: SectionDefinition[] }> = (
  props
) => (
  <nav
    aria-label="Main site navigation"
    class="sticky top-0 z-10 flex h-12 justify-between bg-base-200 px-3 shadow-lg"
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
    <MobileNavigation sections={props.sections} dropdownClass="sm:hidden" />
    <div>
      <DarkModeToggle btnClass="rounded-none h-full" />
      <LocaleSwitcher btnClass="rounded-none" />
    </div>
  </nav>
)
