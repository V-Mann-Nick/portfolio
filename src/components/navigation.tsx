import { DarkModeToggle } from './dark-mode-toggle'
import { currentSection } from './state'
import type { SectionDefinition } from './types'

import { type Component, For } from 'solid-js'

const NavigationItem: Component<SectionDefinition> = (props) => {
  return (
    <a
      class="btn btn-info rounded-none px-6 normal-case"
      classList={{
        'btn-info': currentSection() === props.key,
      }}
      href={`#${props.key}`}
    >
      {props.label}
    </a>
  )
}

export const Navigation: Component<{ sections: SectionDefinition[] }> = (
  props
) => {
  return (
    <header class="sticky top-0 flex h-12 justify-between bg-base-200 px-3 shadow-lg">
      <ul class="flex">
        <For each={props.sections}>
          {(section) => (
            <li>
              <NavigationItem {...section} />
            </li>
          )}
        </For>
      </ul>
      <DarkModeToggle class="self-center" />
    </header>
  )
}
