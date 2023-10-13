import { setCurrentSection } from './state'
import type { SectionDefinition } from './types'

import { type Component, createEffect, onCleanup } from 'solid-js'

export const Section: Component<
  Omit<SectionDefinition, 'label'> & { class?: string }
> = (props) => {
  let ref: HTMLElement | undefined
  createEffect(() => {
    if (!ref) return
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry?.isIntersecting) return
        setCurrentSection(props.key)
        if (props.noNavigate) {
          history.replaceState(
            null,
            '',
            window.location.pathname + window.location.search
          )
        } else history.replaceState(null, '', `#${props.key}`)
      },
      { threshold: 0.35 }
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
      class={['h-screen', props.class].filter(Boolean).join(' ')}
    >
      {props.content}
    </section>
  )
}
