import clickOutsideDirective from './click-outside'
import { Tooltip, type TooltipProps } from './tooltip'

import clsx from 'clsx'
import {
  type Component,
  type ComponentProps,
  createSignal,
  createUniqueId,
  For,
  type JSX,
  splitProps,
} from 'solid-js'

// @ts-expect-error Directive needs to be in scope
const clickOutside = clickOutsideDirective

type Item = {
  key: string
  label?: JSX.Element
  href?: string
}

type DropdownProps = {
  label: string
  items: Item[]
  dropdownClass?: string
  triggerClass?: string
  triggerChildren: JSX.Element
  onSelect: (item: Item) => void
  currentSelection?: string
  tooltip?: Omit<TooltipProps, 'children'>
  extraATagProps?: (item: Item) => JSX.HTMLAttributes<HTMLAnchorElement>
}

export const DropdownMenu: Component<DropdownProps> = (props) => {
  const [isExpanded, setIsExpanded] = createSignal(false)
  const [activeDescendantIdx, setActiveDescendantIdx] = createSignal(-1)
  let menuRef: HTMLUListElement | undefined
  let triggerRef: HTMLButtonElement | undefined

  const onClose = (options?: { focusTrigger?: boolean }) => {
    setIsExpanded(false)
    setActiveDescendantIdx(-1)
    if (options?.focusTrigger) {
      triggerRef?.focus()
    }
  }

  const triggerId = createUniqueId()
  const menuId = createUniqueId()
  const optionId = createUniqueId()

  const Dropdown: Component<
    Partial<ComponentProps<TooltipProps['children']>>
  > = (_anchorProps) => {
    const [focusHandlers, anchorProps] = splitProps(_anchorProps, [
      'onFocus',
      'onBlur',
    ])
    return (
      <div
        class={clsx(
          'dropdown',
          isExpanded() && 'dropdown-open',
          props.dropdownClass
        )}
        use:clickOutside={() => onClose()}
        {...anchorProps}
      >
        <button
          id={triggerId}
          ref={triggerRef!}
          aria-expanded={isExpanded()}
          aria-label={props.label}
          aria-controls={menuId}
          onClick={() => {
            setIsExpanded((prev) => !prev)
            menuRef?.focus()
          }}
          onKeyDown={(event) => {
            if (isExpanded()) return
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
              setIsExpanded(true)
              menuRef?.focus()
              handlers[event.key as keyof typeof handlers]()
            }
          }}
          class={clsx('btn btn-ghost', props.triggerClass)}
          {...focusHandlers}
        >
          {props.triggerChildren}
        </button>
        <ul
          ref={menuRef!}
          tabindex="-1"
          onKeyDown={(event) => {
            if (!isExpanded()) return
            const handlers = {
              ArrowDown: () =>
                setActiveDescendantIdx(
                  (prev) => (prev + 1) % props.items.length
                ),
              ArrowUp: () =>
                setActiveDescendantIdx(
                  (prev) => (prev - 1 + props.items.length) % props.items.length
                ),
              Home: () => setActiveDescendantIdx(0),
              End: () => setActiveDescendantIdx(props.items.length - 1),
              Escape: () => onClose({ focusTrigger: true }),
              Enter: () => {
                if (
                  activeDescendantIdx() >= 0 &&
                  activeDescendantIdx() < props.items.length
                ) {
                  props.onSelect(props.items[activeDescendantIdx()]!)
                }
                onClose({ focusTrigger: true })
              },
            }
            if (event.key in handlers) {
              event.preventDefault()
              handlers[event.key as keyof typeof handlers]()
            }
          }}
          aria-activedescendant={
            activeDescendantIdx() >= 0
              ? `${optionId}-${activeDescendantIdx()}`
              : undefined
          }
          id={menuId}
          role="menu"
          aria-labelledby={triggerId}
          class={clsx(
            'min-content menu dropdown-content rounded-box z-[1] mt-2 bg-base-200 shadow focus-visible:outline-none',
            !isExpanded() && 'hidden'
          )}
        >
          <For each={props.items}>
            {(item, idx) => {
              const isCurrent = () => item.key === props.currentSelection
              return (
                <li>
                  <a
                    id={`${optionId}-${idx()}`}
                    aria-current={isCurrent() ? 'page' : undefined}
                    role="menuitem"
                    onClick={(event) => {
                      event.preventDefault()
                      props.onSelect(item)
                      onClose()
                    }}
                    onMouseEnter={() => setActiveDescendantIdx(idx())}
                    onMouseLeave={() => setActiveDescendantIdx(-1)}
                    href={item.href}
                    class={clsx(
                      'whitespace-nowrap border hover:bg-transparent',
                      isCurrent() && 'border-info',
                      !isCurrent() && 'border-transparent',
                      activeDescendantIdx() === idx() && 'focus'
                    )}
                    {...(props.extraATagProps?.(item) ?? {})}
                  >
                    {item.label ?? item.key}
                  </a>
                </li>
              )
            }}
          </For>
        </ul>
      </div>
    )
  }

  return (
    <>
      {props.tooltip ? (
        <Tooltip {...props.tooltip}>
          {(anchorProps) => <Dropdown {...anchorProps} />}
        </Tooltip>
      ) : (
        <Dropdown />
      )}
    </>
  )
}
