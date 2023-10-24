import { isMobile } from './is-mobile'

import type { Placement } from '@popperjs/core'
import clsx from 'clsx'
import {
  type Component,
  createEffect,
  createSignal,
  createUniqueId,
  type JSX,
  mergeProps,
  onCleanup,
  onMount,
  Show,
} from 'solid-js'
import { Portal } from 'solid-js/web'
import usePopper from 'solid-popper'

export type TooltipProps = {
  tooltip: JSX.Element
  delay?: number
  placement: Placement
  tooltipContainerClass?: string
  hideTooltip?: boolean
  children: Component<{
    ref: (el: HTMLElement) => void
    'aria-describedby': string | undefined
    onMouseEnter: () => void
    onMouseLeave: () => void
    onFocus: () => void
    onBlur: () => void
  }>
}

export const Tooltip: Component<TooltipProps> = (_props) => {
  const props = mergeProps({ delay: 200 }, _props)

  const [showTooltip, setShowTooltip] = createSignal(false)
  const [isAnimatedIn, setIsAnimatedIn] = createSignal(false)
  const [anchor, setAnchor] = createSignal<HTMLElement>()
  const [popper, setPopper] = createSignal<HTMLElement>()

  let hoverTimeout: NodeJS.Timeout | undefined
  const onMouseEnter = () => {
    if (!props.delay) setShowTooltip(true)
    else {
      hoverTimeout = setTimeout(() => setShowTooltip(true), props.delay)
    }
  }
  const onFocus = () => setShowTooltip(true)
  const reset = () => {
    clearTimeout(hoverTimeout)
    setShowTooltip(false)
  }
  const onMouseLeave = reset
  const onBlur = reset

  onMount(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowTooltip(false)
    }
    document.addEventListener('keydown', handleEscape)
    onCleanup(() => {
      document.removeEventListener('keydown', handleEscape)
    })
  })

  createEffect(() => {
    if (showTooltip()) {
      requestAnimationFrame(() => setIsAnimatedIn(true))
    } else {
      setIsAnimatedIn(false)
    }
  })

  usePopper(anchor, popper, {
    placement: 'bottom',
    modifiers: [
      { name: 'offset', options: { offset: [0, 10] } },
      { name: 'preventOverflow', options: { padding: 10 } },
      {
        name: 'addZIndex',
        enabled: true,
        phase: 'write',
        fn({ state }) {
          state.elements.popper.classList.add('z-50')
        },
      },
    ],
  })

  const combinedShowTooltip = () =>
    showTooltip() && !isMobile && !props.hideTooltip
  const isPlainTooltip = () => typeof props.tooltip === 'string'
  const tooltipId = createUniqueId()

  return (
    <>
      <props.children
        ref={setAnchor}
        aria-describedby={combinedShowTooltip() ? tooltipId : undefined}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <Show when={combinedShowTooltip()}>
        <Portal ref={setPopper}>
          <div
            id={tooltipId}
            role="tooltip"
            class={clsx(
              isAnimatedIn() ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
              'transition-opacity transition-transform',
              isPlainTooltip() &&
                'rounded bg-accent px-2 py-1 text-sm text-neutral-content',
              props.tooltipContainerClass
            )}
          >
            {props.tooltip}
          </div>
        </Portal>
      </Show>
    </>
  )
}
