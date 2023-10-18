import { DarkModeToggle } from './dark-mode-toggle'
import { Experience } from './experience'
import type { Locale } from './i18n'
import { Landing } from './landing'
import { LocaleProvider } from './locale-provider'
import { LocaleSwitcher } from './locale-switcher'
import { Navigation } from './navigation'
import { Section } from './section'
import type { SectionDefinition } from './types'

import { type Component, For, Show } from 'solid-js'

const sectionDefinitions: SectionDefinition[] = [
  {
    key: 'experience',
    label: (messages) => messages.experience.title,
    Content: Experience,
  },
  {
    key: 'projects',
    label: (messages) => messages.projects.title,
    Content: () => <></>,
  },
]

export const App: Component<{ locale: Locale }> = (props) => (
  <LocaleProvider initialLocale={props.locale}>
    <main class="min-h-screen bg-base-300 text-base-content transition-colors duration-100 ease-linear">
      <div class="absolute right-5 top-5 flex items-center gap-2">
        <DarkModeToggle />
        <LocaleSwitcher />
      </div>
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
  </LocaleProvider>
)
