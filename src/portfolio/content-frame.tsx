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
      component={props.as}
      class={[
        'mx-auto w-[min(calc(100%-theme(spacing.8)),800px)] rounded bg-base-200 px-8 py-6',
        props.class,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {props.children}
    </Dynamic>
  )
}