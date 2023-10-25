import type { Placement, PositioningStrategy } from '@popperjs/core'
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
  type Setter,
  Show,
} from 'solid-js'
import { Portal } from 'solid-js/web'
import usePopper from 'solid-popper'

type TriggerType = 'click' | 'hover'
type AnchorClickEventHandlers = {
  onClick: () => void
}
type AnchorHoverEventHandlers = {
  onMouseEnter: () => void
  onMouseLeave: () => void
  onFocus: () => void
  onBlur: () => void
}

type AccessibilityType = 'tooltip' | 'menu'
type AnchorTooltipAriaProps = {
  'aria-describedby': string
}
type AnchorMenuAriaProps = {
  'aria-expanded': boolean
  'aria-controls': string
  'aria-haspopup': true
}

export type PopoverProps<
  TTriggerType extends TriggerType,
  TAccessibilityType extends AccessibilityType,
> = {
  triggerType: TTriggerType
  accessibilityType: TAccessibilityType
  children: Component<{
    forwardedProps: (TTriggerType extends 'click'
      ? AnchorClickEventHandlers
      : AnchorHoverEventHandlers) &
      (TAccessibilityType extends 'tooltip'
        ? AnchorTooltipAriaProps
        : AnchorMenuAriaProps) & { ref: (el: HTMLElement) => void }
    showPopover: boolean
    setShowPopover: Setter<boolean>
  }>
  content:
    | JSX.Element
    | Component<{ showPopover: boolean; setShowPopover: Setter<boolean> }>
  delay?: number
  placement: Placement
  popoverContainerClass?: string
  hidePopover?: boolean
  offset?: number
  positioningStrategy?: PositioningStrategy
}

export const Popover = <
  TTriggerType extends TriggerType,
  TAccessibilityType extends AccessibilityType,
>(
  _props: PopoverProps<TTriggerType, TAccessibilityType>
): JSX.Element => {
  const props = mergeProps(
    { delay: 200, offset: 10, strategy: 'absolute' as const },
    _props
  )

  const [showPopover, setShowPopover] = createSignal(false)
  const [isAnimatedIn, setIsAnimatedIn] = createSignal(false)
  const [anchor, setAnchor] = createSignal<HTMLElement>()
  const [popper, setPopper] = createSignal<HTMLElement>()

  const anchorEventHandlers = () => {
    let hoverTimeout: NodeJS.Timeout | undefined
    const reset = () => {
      clearTimeout(hoverTimeout)
      setShowPopover(false)
    }
    const eventHandlersByTriggerType = {
      click: {
        onClick: () => setShowPopover((prev) => !prev),
      } satisfies AnchorClickEventHandlers,
      hover: {
        onMouseEnter: () => {
          if (!props.delay) setShowPopover(true)
          else {
            hoverTimeout = setTimeout(() => setShowPopover(true), props.delay)
          }
        },
        onMouseLeave: reset,
        onFocus: () => setShowPopover(true),
        onBlur: reset,
      } satisfies AnchorHoverEventHandlers,
    } satisfies Record<TriggerType, unknown>
    return eventHandlersByTriggerType[props.triggerType]
  }

  const popoverId = createUniqueId()
  const combinedShowPopover = () => showPopover() && !props.hidePopover
  const anchorAriaProps = () => {
    const ariaPropsByAccessibilityType = {
      tooltip: {
        'aria-describedby': popoverId,
      } satisfies AnchorTooltipAriaProps,
      menu: {
        'aria-expanded': combinedShowPopover(),
        'aria-controls': popoverId,
        'aria-haspopup': true,
      } satisfies AnchorMenuAriaProps,
    } satisfies Record<AccessibilityType, Record<string, unknown>>
    return ariaPropsByAccessibilityType[props.accessibilityType]
  }

  onMount(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowPopover(false)
    }
    document.addEventListener('keydown', handleEscape)
    onCleanup(() => {
      document.removeEventListener('keydown', handleEscape)
    })
  })

  createEffect(() => {
    if (showPopover()) {
      requestAnimationFrame(() => setIsAnimatedIn(true))
    } else {
      setIsAnimatedIn(false)
    }
  })

  usePopper(anchor, popper, {
    placement: props.placement,
    strategy: props.positioningStrategy,
    modifiers: [
      { name: 'offset', options: { offset: [0, props.offset] } },
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

  createEffect(() => {
    if (props.triggerType !== 'click') return
    const [anchorElement, popperElement] = [anchor(), popper()]
    if (!anchorElement || !popperElement) return
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        anchorElement.contains(e.target as Node) ||
        popperElement.contains(e.target as Node)
      ) {
        return
      }
      setShowPopover(false)
    }
    document.addEventListener('click', handleOutsideClick)
    onCleanup(() => {
      document.removeEventListener('click', handleOutsideClick)
    })
  })

  return (
    <>
      <props.children
        // @ts-expect-error type guarantees should be fine
        forwardedProps={{
          ref: setAnchor,
          ...anchorEventHandlers(),
          ...anchorAriaProps(),
        }}
        showPopover={combinedShowPopover()}
        setShowPopover={setShowPopover}
      />
      <Show when={combinedShowPopover()}>
        <Portal ref={setPopper}>
          <div
            id={popoverId}
            role={props.accessibilityType === 'tooltip' ? 'tooltip' : undefined}
            class={clsx(
              isAnimatedIn() ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
              'transition-opacity transition-transform',
              props.popoverContainerClass
            )}
          >
            {typeof props.content === 'function' ? (
              <props.content
                showPopover={showPopover()}
                setShowPopover={setShowPopover}
              />
            ) : (
              props.content
            )}
          </div>
        </Portal>
      </Show>
    </>
  )
}
