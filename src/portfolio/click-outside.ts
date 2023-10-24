import { onCleanup } from 'solid-js'

declare module 'solid-js' {
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Directives {
      clickOutside: (event: MouseEvent) => void
    }
  }
}

export default (
  element: Element,
  onClickOutsideAccessor: () => (event: MouseEvent) => void
) => {
  const handler = (event: MouseEvent) => {
    if (!element.contains(event.target as Node)) {
      onClickOutsideAccessor()(event)
    }
  }
  document.body.addEventListener('click', handler)
  onCleanup(() => document.body.removeEventListener('click', handler))
}
