import { DarkModeToggle } from './dark-mode-toggle'
import { Landing } from './landing'
import { Navigation } from './navigation'
import { Section } from './section'
import type { SectionDefinition } from './types'

import { type Component, For, Show } from 'solid-js'

const sectionDefinitions: SectionDefinition[] = [
  {
    key: 'about',
    label: 'About',
    content: <></>,
  },
  {
    key: 'projects',
    label: 'Projects',
    content: <></>,
  },
  {
    key: 'contact',
    label: 'Contact',
    content: <></>,
  },
]

export const App: Component = () => {
  return (
    <main class="min-h-screen bg-base-100 text-base-content transition-colors duration-100 ease-linear">
      <DarkModeToggle class="absolute right-5 top-5" />
      <Landing />
      <div>
        <Navigation sections={sectionDefinitions} />
        <For each={sectionDefinitions}>
          {(sectionDefinition, idx) => (
            <>
              <Section {...sectionDefinition} />
              <Show when={idx() + 1 < sectionDefinitions.length}>
                <div class="divider px-[10%]" />
              </Show>
            </>
          )}
        </For>
      </div>
    </main>
  )
}
