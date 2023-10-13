import type { ParentComponent } from 'solid-js'

export const ContentFrame: ParentComponent<{ class?: string }> = (props) => (
  <div
    class={[
      'me-auto ms-auto w-[min(100%,900px)] rounded bg-base-200 px-12 py-8',
      props.class,
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {props.children}
  </div>
)
