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
type AnchorMenuAriaProps = Record<string, never>

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
    onClose: () => void
  }>
  content: JSX.Element | Component<{ onClose: () => void }>
  delay?: number
  placement: Placement
  popoverContainerClass?: string
  hidePopover?: boolean
}

export const Popover = <
  TTriggerType extends TriggerType,
  TAccessibilityType extends AccessibilityType,
>(
  _props: PopoverProps<TTriggerType, TAccessibilityType>
): JSX.Element => {
  const props = mergeProps({ delay: 200 }, _props)

  const [showPopover, setShowPopover] = createSignal(false)
  const [isAnimatedIn, setIsAnimatedIn] = createSignal(false)
  const [anchor, setAnchor] = createSignal<HTMLElement>()
  const [popper, setPopper] = createSignal<HTMLElement>()

  const anchorEventHandlers = () => {
    let hoverTimeout: NodeJS.Timeout | undefined
    const resetWhenHover = () => {
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
        onMouseLeave: resetWhenHover,
        onFocus: () => setShowPopover(true),
        onBlur: resetWhenHover,
      } satisfies AnchorHoverEventHandlers,
    } satisfies Record<TriggerType, Record<string, () => void>>
    return eventHandlersByTriggerType[props.triggerType]
  }

  const popoverId = createUniqueId()
  const anchorAriaProps = () => {
    const ariaPropsByAccessibilityType = {
      tooltip: {
        'aria-describedby': popoverId,
      } satisfies AnchorTooltipAriaProps,
      menu: {} satisfies AnchorMenuAriaProps,
    } satisfies Record<AccessibilityType, Record<string, string>>
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

  const onClose = () => setShowPopover(false)
  const combinedShowPopover = () => showPopover() && !props.hidePopover

  return (
    <>
      <props.children
        // @ts-expect-error type guarantees should be fine
        forwardedProps={{
          ref: setAnchor,
          ...anchorEventHandlers(),
          ...anchorAriaProps(),
        }}
        onClose={onClose}
      />
      <Show when={combinedShowPopover()}>
        <Portal ref={setPopper}>
          <div
            id={popoverId}
            role="tooltip"
            class={clsx(
              isAnimatedIn() ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
              'transition-opacity transition-transform',
              props.popoverContainerClass
            )}
          >
            {typeof props.content === 'function' ? (
              <props.content onClose={onClose} />
            ) : (
              props.content
            )}
          </div>
        </Portal>
      </Show>
    </>
  )
}
