import type { ParentComponent, ValidComponent } from 'solid-js'

import { mergeProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'

export const ContentFrame: ParentComponent<{
  class?: string
  as?: ValidComponent
}> = (_props) => {
  const props = mergeProps({ as: 'div' }, _props)
  return (
    <Dynamic
      class={[
        'bg-base-200 mx-auto w-[min(calc(100%-theme(spacing.8)),850px)] rounded px-8 py-6 shadow',
        props.class,
      ]
        .filter(Boolean)
        .join(' ')}
      component={props.as}
    >
      {props.children}
    </Dynamic>
  )
}
