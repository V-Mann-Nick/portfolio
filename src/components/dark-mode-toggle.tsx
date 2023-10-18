import IconFaSolidMoon from '~icons/fa-solid/moon'
import IconFaSolidSun from '~icons/fa-solid/sun'

import { useLocale } from './locale-provider'
import { initializeDarkModeState, isDarkMode, onDarkModeChange } from './state'

import { type Component, onMount, Show } from 'solid-js'

export const DarkModeToggle: Component<{
  class?: string
  btnClass?: string
}> = (props) => {
  onMount(initializeDarkModeState)
  const { messages } = useLocale()
  const label = () =>
    isDarkMode()
      ? messages().darkModeToggleTooltip.light
      : messages().darkModeToggleTooltip.dark
  return (
    <Show when={isDarkMode() !== null}>
      <div
        class={['tooltip', 'tooltip-left', props.class]
          .filter(Boolean)
          .join(' ')}
        data-tip={label()}
      >
        <button
          class={['btn btn-ghost', props.btnClass].filter(Boolean).join(' ')}
          onClick={() => onDarkModeChange(!isDarkMode())}
          aria-label={label()}
        >
          {isDarkMode() ? (
            <IconFaSolidMoon font-size="1rem" />
          ) : (
            <IconFaSolidSun font-size="1rem" />
          )}
        </button>
      </div>
    </Show>
  )
}
