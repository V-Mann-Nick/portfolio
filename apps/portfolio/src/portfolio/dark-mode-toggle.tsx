import IconFaSolidMoon from '~icons/fa-solid/moon'
import IconFaSolidSun from '~icons/fa-solid/sun'
import clsx from 'clsx'
import { type Component, Show, onMount } from 'solid-js'

import { useLocale } from './locale-provider'
import { initializeDarkModeState, isDarkMode, onDarkModeChange } from './state'
import { Tooltip } from './tooltip'

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
      <Tooltip placement="bottom" tooltip={label()}>
        {(childProps) => (
          <button
            class={clsx(
              'btn btn-ghost swap swap-flip',
              props.btnClass,
              isDarkMode() && 'swap-active'
            )}
            aria-label={label()}
            onClick={() => onDarkModeChange(!isDarkMode())}
            {...childProps.forwardedProps}
          >
            <IconFaSolidMoon class="swap-on" font-size="1rem" />
            <IconFaSolidSun class="swap-off" font-size="1rem" />
          </button>
        )}
      </Tooltip>
    </Show>
  )
}
