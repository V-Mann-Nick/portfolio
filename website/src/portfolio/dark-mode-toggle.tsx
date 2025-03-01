import IconFaSolidMoon from "~icons/fa-solid/moon";
import IconFaSolidSun from "~icons/fa-solid/sun";
import clsx from "clsx";
import { type Component, onMount, Show } from "solid-js";

import { useLocale } from "./locale-provider.tsx";
import {
  initializeDarkModeState,
  isDarkMode,
  onDarkModeChange,
} from "./state.ts";
import { Tooltip } from "./tooltip.tsx";

export const DarkModeToggle: Component<{
  class?: string;
  btnClass?: string;
}> = (props) => {
  onMount(initializeDarkModeState);
  const { messages } = useLocale();
  const label = () =>
    isDarkMode()
      ? messages().darkModeToggleTooltip.light
      : messages().darkModeToggleTooltip.dark;
  return (
    <Show when={isDarkMode() !== null}>
      <Tooltip placement="bottom" tooltip={label()}>
        {(childProps) => (
          <button
            class={clsx(
              "btn btn-ghost swap swap-flip",
              props.btnClass,
              isDarkMode() && "swap-active",
            )}
            aria-label={label()}
            onClick={() => {
              onDarkModeChange(!isDarkMode());
            }}
            {...childProps.forwardedProps}
          >
            <IconFaSolidMoon class="swap-on" font-size="1rem" />
            <IconFaSolidSun class="swap-off" font-size="1rem" />
          </button>
        )}
      </Tooltip>
    </Show>
  );
};
