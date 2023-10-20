import type { SectionDefinition } from './types'

import { type Component } from 'solid-js'

export const Section: Component<
  Omit<SectionDefinition, 'label' | 'Icon'> & {
    class?: string
    ref: HTMLElement | undefined
  }
> = (props) => {
  return (
    <section
      id={props.key}
      ref={props.ref}
      class={['min-h-screen', props.class].filter(Boolean).join(' ')}
    >
      <props.Content />
    </section>
  )
}
