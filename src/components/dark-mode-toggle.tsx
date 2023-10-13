import { isDarkMode, setIsDarkMode } from './state'

import { FaSolidMoon, FaSolidSun } from 'solid-icons/fa'
import { type Component, Show } from 'solid-js'

const onDarkModeChange = (isDarkMode: boolean) => {
  localStorage.setItem('is-dark-mode', isDarkMode ? 'true' : 'false')
  setIsDarkMode(isDarkMode)
  if (isDarkMode) {
    document.documentElement.classList.add('dark')
    document.documentElement.dataset.theme = 'nord-dark'
  } else {
    document.documentElement.classList.remove('dark')
    document.documentElement.dataset.theme = 'nord-light'
  }
}

export const DarkModeToggle: Component<{ class?: string }> = (props) => {
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
          {isDarkMode() ? <FaSolidMoon size={20} /> : <FaSolidSun size={20} />}
        </Show>
      </button>
    </div>
  )
}
