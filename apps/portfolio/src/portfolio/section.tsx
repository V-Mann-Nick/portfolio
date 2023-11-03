import { type Component } from 'solid-js'

import type { SectionDefinition } from './types'

export const Section: Component<
  Omit<SectionDefinition, 'label' | 'Icon'> & {
    class?: string
    ref: HTMLElement | undefined
  }
> = (props) => {
  return (
    <section
      class={['min-h-screen', props.class].filter(Boolean).join(' ')}
      id={props.key}
      ref={props.ref}
    >
      <props.Content />
    </section>
  )
}
