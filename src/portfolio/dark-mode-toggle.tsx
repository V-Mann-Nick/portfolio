import IconFaSolidMoon from '~icons/fa-solid/moon'
import IconFaSolidSun from '~icons/fa-solid/sun'

import { useLocale } from './locale-provider'
import { initializeDarkModeState, isDarkMode, onDarkModeChange } from './state'
import { Tooltip } from './tooltip'

import clsx from 'clsx'
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
      <Tooltip tooltip={label()} placement="bottom">
        {(childProps) => (
          <button
            class={clsx(
              'btn btn-ghost swap swap-flip',
              props.btnClass,
              isDarkMode() && 'swap-active'
            )}
            onClick={() => onDarkModeChange(!isDarkMode())}
            aria-label={label()}
            {...childProps.forwardedProps}
          >
            <IconFaSolidMoon font-size="1rem" class="swap-on" />
            <IconFaSolidSun font-size="1rem" class="swap-off" />
          </button>
        )}
      </Tooltip>
    </Show>
  )
}
