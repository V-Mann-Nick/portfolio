import IconFaSolidMoon from '~icons/fa-solid/moon'
import IconFaSolidSun from '~icons/fa-solid/sun'

import { initializeDarkModeState, isDarkMode, onDarkModeChange } from './state'

import { type Component, onMount, Show } from 'solid-js'

export const DarkModeToggle: Component<{ class?: string }> = (props) => {
  onMount(initializeDarkModeState)
  return (
    <div
      class={['tooltip', 'tooltip-left', props.class].filter(Boolean).join(' ')}
      data-tip={`Switch to ${isDarkMode() ? 'light' : 'dark'} mode`}
    >
      <button
        class="btn btn-circle btn-ghost btn-sm"
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
