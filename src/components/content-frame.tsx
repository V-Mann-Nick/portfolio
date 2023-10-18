import type { ParentComponent } from 'solid-js'

export const ContentFrame: ParentComponent<{ class?: string }> = (props) => (
  <div
    class={[
      'mx-auto w-[min(calc(100%-2rem),900px)] rounded bg-base-200 px-8 py-6',
      props.class,
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {props.children}
  </div>
)
