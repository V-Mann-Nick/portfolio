import clickOutsideDirective from './click-outside'

import {
  type Component,
  createSignal,
  createUniqueId,
  For,
  type JSX,
} from 'solid-js'

// @ts-expect-error Directive needs to be in scope
const clickOutside = clickOutsideDirective

type Item = {
  key: string
  label?: string
  href?: string
}

type DropdownProps = {
  label: string
  items: Item[]
  triggerClass?: string
  triggerChildren: JSX.Element
  onSelect: (item: Item) => void
  currentSelection?: string
  tooltip?: { text: string; position: 'top' | 'bottom' | 'left' | 'right' }
  extraATagProps?: (item: Item) => JSX.HTMLAttributes<HTMLAnchorElement>
}

export const DropdownMenu: Component<DropdownProps> = (props) => {
  const [isExpanded, setIsExpanded] = createSignal(false)
  const [activeDescendantIdx, setActiveDescendantIdx] = createSignal(0)
  let menuRef: HTMLUListElement | undefined
  let triggerRef: HTMLButtonElement | undefined

  const onClose = (options?: { focusTrigger?: boolean }) => {
    setIsExpanded(false)
    setActiveDescendantIdx(0)
    if (options?.focusTrigger) {
      triggerRef?.focus()
    }
  }

  const triggerId = createUniqueId()
  const menuId = createUniqueId()
  const optionId = createUniqueId()

  const dropdown = (
    <div
      class="dropdown-end dropdown"
      classList={{ 'dropdown-open': isExpanded() }}
      use:clickOutside={() => onClose()}
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
          if (event.key === 'ArrowUp') {
            event.preventDefault()
            setIsExpanded(true)
            menuRef?.focus()
            setActiveDescendantIdx(props.items.length - 1)
          } else if (event.key === 'ArrowDown') {
            event.preventDefault()
            setIsExpanded(true)
            menuRef?.focus()
            setActiveDescendantIdx(0)
          }
        }}
        class={['btn btn-ghost normal-case', props.triggerClass]
          .filter(Boolean)
          .join(' ')}
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
              setActiveDescendantIdx((prev) => (prev + 1) % props.items.length),
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
        class="min-content menu dropdown-content rounded-box z-[1] mt-2 bg-base-200 shadow focus-visible:outline-none"
        classList={{ hidden: !isExpanded() }}
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
                  class="whitespace-nowrap hover:bg-transparent"
                  classList={{
                    focus: activeDescendantIdx() === idx(),
                    border: isCurrent(),
                    'border-primary': isCurrent(),
                  }}
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

  return (
    <>
      {props.tooltip ? (
        <div
          class={`tooltip tooltip-${props.tooltip.position}`}
          data-tip={props.tooltip.text}
        >
          {dropdown}
        </div>
      ) : (
        dropdown
      )}
    </>
  )
}
