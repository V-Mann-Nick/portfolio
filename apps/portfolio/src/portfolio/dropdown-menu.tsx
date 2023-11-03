import clsx from 'clsx'
import {
  type Component,
  type ComponentProps,
  For,
  type JSX,
  Show,
  createSignal,
  createUniqueId,
  mergeProps,
} from 'solid-js'
import { type SetOptional } from 'type-fest'

import { Popover, type PopoverProps } from './popover'
import { Tooltip, type TooltipProps } from './tooltip'

type Item = {
  key: string
  label?: JSX.Element
  href?: string
}

export type DropdownProps = {
  label: string
  items: Item[]
  triggerClass?: string
  triggerChildren: JSX.Element
  onSelect: (item: Item) => void
  currentSelection?: string
  tooltip?: Omit<TooltipProps, 'children'>
  extraATagProps?: (item: Item) => JSX.HTMLAttributes<HTMLAnchorElement>
} & SetOptional<
  Pick<PopoverProps<'click', 'menu'>, 'positioningStrategy' | 'placement'>,
  'placement'
>

export const DropdownMenu: Component<DropdownProps> = (_props) => {
  const props = mergeProps({ placement: 'bottom-start' as const }, _props)

  const [activeDescendantIdx, setActiveDescendantIdx] = createSignal(-1)
  const [menu, setMenu] = createSignal<HTMLUListElement>()
  const [anchor, setAnchor] = createSignal<HTMLElement>()

  const triggerId = createUniqueId()
  const optionId = createUniqueId()
  const composeOptionId = (idx: number) => `${optionId}-${idx}`

  const Dropdown: Component<
    Partial<ComponentProps<TooltipProps['children']>['forwardedProps']>
  > = (tooltipAnchorProps) => {
    return (
      <Popover
        accessibilityType="menu"
        content={(contentProps) => (
          <ul
            class={clsx(
              'min-content menu dropdown-content rounded-box z-[1] mt-2 bg-base-200 shadow focus-visible:outline-none'
            )}
            ref={setMenu}
            role="menu"
            tabindex="-1"
            aria-activedescendant={
              activeDescendantIdx() >= 0
                ? composeOptionId(activeDescendantIdx())
                : undefined
            }
            aria-labelledby={triggerId}
            onKeyDown={(event) => {
              const onClose = () => {
                contentProps.setShowPopover(false)
                setActiveDescendantIdx(-1)
                anchor()?.focus()
              }
              const handlers = {
                ArrowDown: () =>
                  setActiveDescendantIdx(
                    (prev) => (prev + 1) % props.items.length
                  ),
                ArrowUp: () =>
                  setActiveDescendantIdx(
                    (prev) =>
                      (prev - 1 + props.items.length) % props.items.length
                  ),
                Home: () => setActiveDescendantIdx(0),
                End: () => setActiveDescendantIdx(props.items.length - 1),
                Escape: onClose,
                Enter: () => {
                  if (
                    activeDescendantIdx() >= 0 &&
                    activeDescendantIdx() < props.items.length
                  ) {
                    props.onSelect(props.items[activeDescendantIdx()]!)
                  }
                  onClose()
                },
              }
              if (event.key in handlers) {
                event.preventDefault()
                handlers[event.key as keyof typeof handlers]()
              }
            }}
          >
            <For each={props.items}>
              {(item, idx) => {
                const isCurrent = () => item.key === props.currentSelection
                return (
                  <li>
                    <a
                      class={clsx(
                        'whitespace-nowrap border hover:bg-transparent',
                        isCurrent() && 'border-info',
                        !isCurrent() && 'border-transparent',
                        activeDescendantIdx() === idx() && 'focus'
                      )}
                      href={item.href}
                      id={composeOptionId(idx())}
                      role="menuitem"
                      // TODO: ?
                      aria-current={isCurrent() ? 'page' : undefined}
                      onClick={(event) => {
                        event.preventDefault()
                        props.onSelect(item)
                        contentProps.setShowPopover(false)
                      }}
                      onMouseEnter={() => setActiveDescendantIdx(idx())}
                      onMouseLeave={() => setActiveDescendantIdx(-1)}
                      {...(props.extraATagProps?.(item) ?? {})}
                    >
                      {item.label ?? item.key}
                    </a>
                  </li>
                )
              }}
            </For>
          </ul>
        )}
        offset={0}
        placement={props.placement}
        positioningStrategy={props.positioningStrategy}
        triggerType="click"
      >
        {(anchorProps) => (
          <button
            class={clsx('btn btn-ghost', props.triggerClass)}
            id={triggerId}
            aria-label={props.label}
            onKeyDown={(event) => {
              if (anchorProps.showPopover) return
              const handlers = {
                ArrowUp: () => {
                  setActiveDescendantIdx(props.items.length - 1)
                },
                ArrowDown: () => {
                  setActiveDescendantIdx(0)
                },
              }
              if (event.key in handlers) {
                event.preventDefault()
                anchorProps.setShowPopover(true)
                menu()?.focus()
                handlers[event.key as keyof typeof handlers]()
              }
            }}
            {...tooltipAnchorProps}
            {...anchorProps.forwardedProps}
            ref={(element) => {
              anchorProps.forwardedProps.ref(element)
              tooltipAnchorProps.ref?.(element)
              setAnchor(element)
            }}
            onBlur={(event) => {
              // If focus moves to menu, don't close the tooltip
              if (event.relatedTarget === menu()) return
              tooltipAnchorProps.onBlur?.()
            }}
            onClick={() => {
              anchorProps.forwardedProps.onClick?.()
              menu()?.focus()
            }}
          >
            {props.triggerChildren}
          </button>
        )}
      </Popover>
    )
  }

  return (
    <Show fallback={<Dropdown />} when={props.tooltip}>
      {(tooltip) => (
        <Tooltip {...tooltip()}>
          {(anchorProps) => <Dropdown {...anchorProps.forwardedProps} />}
        </Tooltip>
      )}
    </Show>
  )
}
