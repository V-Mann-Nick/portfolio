import IconFaSolidFlask from '~icons/fa-solid/flask'
import IconFaSolidUser from '~icons/fa-solid/user'
import { type Component, For, Show, onCleanup, onMount } from 'solid-js'

import type { Locale } from './i18n'
import type { LinkPreviews } from './link-previews'
import type { SectionDefinition } from './types'

import { AboutMe } from './about-me'
import { DarkModeToggle } from './dark-mode-toggle'
import { Experience } from './experience'
import { Footer } from './footer'
import { Landing } from './landing'
import { LinkPreviewProvider } from './link-preview-provider'
import { LocaleProvider } from './locale-provider'
import { LocaleSwitcher } from './locale-switcher'
import { Navigation } from './navigation'
import { Section } from './section'
import { setCurrentSection } from './state'
import { throttle } from './utils'

export const sectionDefinitions = [
  {
    key: 'about-me',
    label: (messages) => messages.aboutMe.title,
    Content: AboutMe,
    Icon: IconFaSolidUser,
  },
  {
    key: 'experience',
    label: (messages) => messages.experience.title,
    Icon: IconFaSolidFlask,
    Content: Experience,
  },
  // {
  //   key: 'projects',
  //   label: (messages) => messages.projects.title,
  //   Icon: IconFaSolidLightbulb,
  //   Content: () => <></>,
  // },
] as const satisfies readonly SectionDefinition[]

export type SectionDefinitions = typeof sectionDefinitions

type AppProps = {
  locale: Locale
  linkPreviews: LinkPreviews
}

export const App: Component<AppProps> = (props) => {
  // Track the currently visible section
  const sectionRefsByKey: Record<string, HTMLElement | undefined> = {}
  onMount(() => {
    const handler = () => {
      const firstSectionKey = Object.keys(sectionRefsByKey)[0]
      if (!firstSectionKey) {
        return
      }
      const [closestKey] = Object.entries(sectionRefsByKey).reduce<
        [key: string, closestDistance: number]
      >(
        ([closestKey, closestDistance], [key, ref]) => {
          if (!ref) {
            return [closestKey, closestDistance]
          }
          const distance = Math.abs(ref.getBoundingClientRect().y)
          if (distance < closestDistance) {
            return [key, distance]
          }
          return [closestKey, closestDistance]
        },
        [firstSectionKey, Infinity]
      )
      setCurrentSection(closestKey)
    }
    handler()
    const throttledHandler = throttle(handler, 150)
    document.addEventListener('scroll', throttledHandler)
    onCleanup(() => {
      document.removeEventListener('scroll', throttledHandler)
    })
  })
  return (
    <LocaleProvider initialLocale={props.locale}>
      <LinkPreviewProvider linkPreviews={props.linkPreviews}>
        <main class="bg-base-300 text-base-content min-h-screen transition-colors duration-100 ease-linear">
          <div class="absolute right-5 top-5 flex items-center gap-2">
            <DarkModeToggle />
            <LocaleSwitcher />
          </div>
          <Landing ref={sectionRefsByKey['landing']} sectionKey="landing" />
          <Navigation sections={sectionDefinitions} />
          <For each={sectionDefinitions}>
            {(sectionDefinition, idx) => (
              <>
                <Section
                  ref={sectionRefsByKey[sectionDefinition.key]}
                  {...sectionDefinition}
                />
                <Show when={idx() + 1 < sectionDefinitions.length}>
                  <div class="divider" />
                </Show>
              </>
            )}
          </For>
        </main>
        <Footer />
      </LinkPreviewProvider>
    </LocaleProvider>
  )
}
