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
  return (
    <div
      class={['tooltip', 'tooltip-left', props.class].filter(Boolean).join(' ')}
      data-tip={
        isDarkMode()
          ? messages().darkModeToggleTooltip.light
          : messages().darkModeToggleTooltip.dark
      }
    >
      <button
        class={['btn btn-ghost', props.btnClass].filter(Boolean).join(' ')}
        onClick={() => onDarkModeChange(!isDarkMode())}
      >
        <Show when={isDarkMode() !== null}>
          {isDarkMode() ? (
            <IconFaSolidMoon font-size="1rem" />
          ) : (
            <IconFaSolidSun font-size="1rem" />
          )}
        </Show>
      </button>
    </div>
  )
}
