import IconFaSolidFlask from '~icons/fa-solid/flask'
import IconFaSolidLightbulb from '~icons/fa-solid/lightbulb'

import { DarkModeToggle } from './dark-mode-toggle'
import { Experience } from './experience'
import type { Locale } from './i18n'
import { Landing } from './landing'
import { LocaleProvider } from './locale-provider'
import { LocaleSwitcher } from './locale-switcher'
import { Navigation } from './navigation'
import { Section } from './section'
import { setCurrentSection } from './state'
import type { SectionDefinition } from './types'
import { throttle } from './utils'

import { type Component, For, onCleanup, onMount, Show } from 'solid-js'

export const sectionDefinitions: SectionDefinition[] = [
  {
    key: 'experience',
    label: (messages) => messages.experience.title,
    Icon: IconFaSolidFlask,
    Content: Experience,
  },
  {
    key: 'projects',
    label: (messages) => messages.projects.title,
    Icon: IconFaSolidLightbulb,
    Content: () => <></>,
  },
]

export const App: Component<{ locale: Locale }> = (props) => {
  // Track the currently visible section
  const sectionRefsByKey: Record<string, HTMLElement | undefined> = {}
  onMount(() => {
    const handler = () => {
      if (!Object.keys(sectionRefsByKey).length) return
      const [closestKey] = Object.entries(sectionRefsByKey).reduce(
        ([closestKey, closestDistance], [key, ref]) => {
          if (!ref) return [closestKey, closestDistance] as const
          const distance = Math.abs(ref.getBoundingClientRect().y)
          if (distance < closestDistance) return [key, distance] as const
          return [closestKey, closestDistance] as const
        },
        [Object.keys(sectionRefsByKey)[0]!, Infinity] as const
      )
      setCurrentSection(closestKey)
    }
    handler()
    const throttledHandler = throttle(handler, 150)
    document.addEventListener('scroll', throttledHandler)
    onCleanup(() => document.removeEventListener('scroll', throttledHandler))
  })
  return (
    <LocaleProvider initialLocale={props.locale}>
      <main class="min-h-screen bg-base-300 text-base-content transition-colors duration-100 ease-linear">
        <div class="absolute right-5 top-5 flex items-center gap-2">
          <DarkModeToggle />
          <LocaleSwitcher />
        </div>
        <Landing sectionKey="landing" ref={sectionRefsByKey['landing']} />
        <Navigation sections={sectionDefinitions} />
        <For each={sectionDefinitions}>
          {(sectionDefinition, idx) => (
            <>
              <Section
                ref={sectionRefsByKey[sectionDefinition.key]}
                {...sectionDefinition}
              />
              <Show when={idx() + 1 < sectionDefinitions.length}>
                <div class="divider px-[10%]" />
              </Show>
            </>
          )}
        </For>
      </main>
    </LocaleProvider>
  )
}
