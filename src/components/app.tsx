import { tw } from '../tw'

import { Button } from './button'
import { Landing } from './landing'

import { FaSolidMoon, FaSolidSun } from 'solid-icons/fa'
import {
  type Component,
  createEffect,
  createSignal,
  For,
  onCleanup,
  Show,
} from 'solid-js'
import { isServer } from 'solid-js/web'

export type SectionDefinition = {
  key: string
  label: string
  Content: Component
}

const sectionDefinitions: SectionDefinition[] = [
  {
    key: 'about',
    label: 'About',
    Content: () => null,
  },
  {
    key: 'projects',
    label: 'Projects',
    Content: () => null,
  },
  {
    key: 'contact',
    label: 'Contact',
    Content: () => null,
  },
]

const [currentSection, setCurrentSection] = createSignal<string>()

const Section: Component<SectionDefinition> = (props) => {
  let ref: HTMLElement | undefined
  createEffect(() => {
    if (!ref) return
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry?.isIntersecting) return
        setCurrentSection(props.key)
      },
      { threshold: 0.4 }
    )
    observer.observe(ref)
    onCleanup(() => {
      observer.disconnect()
    })
  })

  return (
    <section
      id={props.key}
      ref={ref!}
      class={tw.style({ height: 'h-screen' }).class}
    >
      <props.Content />
    </section>
  )
}

const [isDarkMode, setIsDarkMode] = createSignal(
  isServer ? null : document.documentElement.classList.contains('dark')
)

const onDarkModeChange = (isDarkMode: boolean) => {
  localStorage.setItem('is-dark-mode', isDarkMode ? 'true' : 'false')
  setIsDarkMode(isDarkMode)
  if (isDarkMode) document.documentElement.classList.add('dark')
  else document.documentElement.classList.remove('dark')
}

const DarkModeToggle: Component<{ class?: string }> = (props) => {
  return (
    <Button
      onClick={() => onDarkModeChange(!isDarkMode())}
      class={props.class}
      shape="circle"
    >
      <Show when={isDarkMode() !== null}>
        {isDarkMode() ? <FaSolidMoon size={20} /> : <FaSolidSun size={20} />}
      </Show>
    </Button>
  )
}

const navigationItemStyles = tw.toggle({
  base: {
    height: 'h-full',
    paddingX: 'px-4',
    display: 'flex',
    justifyContent: 'justify-center',
    alignItems: 'items-center',
    ':hover': {
      backgroundColor: 'hover:bg-nord-9',
      color: 'hover:text-nord-0',
    },
    transitionProperty: 'transition-colors',
    transitionDuration: 'duration-100',
    transitionTimingFunction: 'ease-linear',
  },
  truthy: {
    backgroundColor: 'bg-nord-7',
    color: 'text-nord-0',
  },
  falsy: {},
})

const NavigationItem: Component<SectionDefinition> = (props) => (
  <a
    class={navigationItemStyles.class(currentSection() === props.key)}
    href={`#${props.key}`}
  >
    {props.label}
  </a>
)

const headerStyles = tw.style({
  height: 'h-12',
  backgroundColor: 'bg-nord-6',
  '@dark': {
    backgroundColor: 'dark:bg-nord-0',
  },
  boxShadow: 'shadow-lg',
  position: 'sticky',
  top: 'top-0',
  paddingX: 'px-3',
  display: 'flex',
  justifyContent: 'justify-between',
})

const ulStyles = tw.style({ display: 'flex' })

const Navigation: Component<{ sections: SectionDefinition[] }> = (props) => {
  return (
    <header class={headerStyles.class}>
      <ul class={ulStyles.class}>
        <For each={props.sections}>
          {(section) => (
            <li>
              <NavigationItem {...section} />
            </li>
          )}
        </For>
      </ul>
      <DarkModeToggle class={tw.style({ alignSelf: 'self-center' }).class} />
    </header>
  )
}

const appStyles = tw.style({
  backgroundColor: 'bg-nord-6',
  color: 'text-nord-0',
  '@dark': {
    backgroundColor: 'dark:bg-nord-0',
    color: 'dark:text-nord-6',
  },
  transitionProperty: 'transition-colors',
  transitionDuration: 'duration-100',
  transitionTimingFunction: 'ease-linear',
  minHeight: 'min-h-screen',
})

const hrStyles = tw.style({
  borderColor: 'border-nord-3',
  '@dark': {
    borderColor: 'dark:border-nord-4',
  },
  borderWidth: 'border',
  marginX: 'mx-5',
  borderRadius: 'rounded-full',
})

const App: Component = () => {
  return (
    <main class={appStyles.class}>
      <DarkModeToggle
        class={
          tw.style({
            position: 'absolute',
            top: 'top-5',
            right: 'right-5',
          }).class
        }
      />
      <Landing />
      <section>
        <Navigation sections={sectionDefinitions} />
        <For each={sectionDefinitions}>
          {(sectionDefinition, idx) => (
            <>
              <Section {...sectionDefinition} />
              <Show when={idx() + 1 < sectionDefinitions.length}>
                <hr class={hrStyles.class} />
              </Show>
            </>
          )}
        </For>
      </section>
    </main>
  )
}

export default App
