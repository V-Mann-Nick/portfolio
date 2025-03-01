import clsx from "clsx";
import {
  type Component,
  type ComponentProps,
  createSignal,
  createUniqueId,
  For,
  type JSX,
  mergeProps,
  Show,
} from "solid-js";
import type { SetOptional } from "type-fest";

import { Popover, type PopoverProps } from "./popover.tsx";
import { Tooltip, type TooltipProps } from "./tooltip.tsx";

type ItemConstraint = {
  key: string;
  label?: JSX.Element;
  href?: string;
};

export type DropdownProps<TItem extends ItemConstraint = ItemConstraint> =
  & {
    label: string;
    items: TItem[];
    triggerClass?: string;
    triggerChildren: JSX.Element;
    onSelect: (item: TItem) => void;
    currentSelection?: string;
    tooltip?: Omit<TooltipProps, "children">;
    extraATagProps?: (
      item: ItemConstraint,
    ) => JSX.HTMLAttributes<HTMLAnchorElement>;
  }
  & SetOptional<
    Pick<PopoverProps<"click", "menu">, "positioningStrategy" | "placement">,
    "placement"
  >;

export const DropdownMenu = <TItem extends ItemConstraint>(
  _props: DropdownProps<TItem>,
): JSX.Element => {
  const props = mergeProps({ placement: "bottom-start" as const }, _props);

  const [activeDescendantIdx, setActiveDescendantIdx] = createSignal(-1);
  const [menu, setMenu] = createSignal<HTMLUListElement>();
  const [anchor, setAnchor] = createSignal<HTMLElement>();

  const triggerId = createUniqueId();
  const optionId = createUniqueId();
  const composeOptionId = (idx: number) => `${optionId}-${idx}`;

  const Dropdown: Component<
    Partial<ComponentProps<TooltipProps["children"]>["forwardedProps"]>
  > = (tooltipAnchorProps) => (
    <Popover
      accessibilityType="menu"
      content={(contentProps) => (
        <ul
          class={clsx(
            "min-content menu dropdown-content rounded-box bg-base-200 z-[1] mt-2 shadow focus-visible:outline-none",
          )}
          ref={setMenu}
          role="menu"
          tabindex="-1"
          aria-activedescendant={activeDescendantIdx() >= 0
            ? composeOptionId(activeDescendantIdx())
            : undefined}
          aria-labelledby={triggerId}
          onKeyDown={(event) => {
            const onClose = () => {
              contentProps.setShowPopover(false);
              setActiveDescendantIdx(-1);
              anchor()?.focus();
            };
            const handlers = {
              ArrowDown: () =>
                setActiveDescendantIdx(
                  (prev) => (prev + 1) % props.items.length,
                ),
              ArrowUp: () =>
                setActiveDescendantIdx(
                  (prev) =>
                    (prev - 1 + props.items.length) % props.items.length,
                ),
              Home: () => setActiveDescendantIdx(0),
              End: () => setActiveDescendantIdx(props.items.length - 1),
              Escape: onClose,
              Enter: () => {
                const activeItem = props.items[activeDescendantIdx()];
                if (activeItem) {
                  props.onSelect(activeItem);
                }
                onClose();
              },
            };
            if (event.key in handlers) {
              event.preventDefault();
              handlers[event.key as keyof typeof handlers]();
            }
          }}
        >
          <For each={props.items}>
            {(item, idx) => {
              const isCurrent = () => item.key === props.currentSelection;
              return (
                <li>
                  <a
                    class={clsx(
                      "whitespace-nowrap border hover:bg-transparent",
                      isCurrent() && "border-info",
                      !isCurrent() && "border-transparent",
                      activeDescendantIdx() === idx() && "focus",
                    )}
                    href={item.href}
                    id={composeOptionId(idx())}
                    role="menuitem"
                    // TODO: ?
                    aria-current={isCurrent() ? "page" : undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      props.onSelect(item);
                      contentProps.setShowPopover(false);
                    }}
                    onMouseEnter={() => setActiveDescendantIdx(idx())}
                    onMouseLeave={() => setActiveDescendantIdx(-1)}
                    {...(props.extraATagProps?.(item) ?? {})}
                  >
                    {item.label ?? item.key}
                  </a>
                </li>
              );
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
          class={clsx("btn btn-ghost", props.triggerClass)}
          id={triggerId}
          aria-label={props.label}
          onKeyDown={(event) => {
            if (anchorProps.showPopover) {
              return;
            }
            const handlers = {
              ArrowUp: () => {
                setActiveDescendantIdx(props.items.length - 1);
              },
              ArrowDown: () => {
                setActiveDescendantIdx(0);
              },
            };
            if (event.key in handlers) {
              event.preventDefault();
              anchorProps.setShowPopover(true);
              menu()?.focus();
              handlers[event.key as keyof typeof handlers]();
            }
          }}
          {...tooltipAnchorProps}
          {...anchorProps.forwardedProps}
          ref={(element) => {
            anchorProps.forwardedProps.ref(element);
            tooltipAnchorProps.ref?.(element);
            setAnchor(element);
          }}
          onBlur={(event) => {
            // If focus moves to menu, don't close the tooltip
            if (event.relatedTarget === menu()) {
              return;
            }
            tooltipAnchorProps.onBlur?.();
          }}
          onClick={() => {
            anchorProps.forwardedProps.onClick();
            menu()?.focus();
          }}
        >
          {props.triggerChildren}
        </button>
      )}
    </Popover>
  );

  return (
    <Show fallback={<Dropdown />} when={props.tooltip}>
      {(tooltip) => (
        <Tooltip {...tooltip()}>
          {(anchorProps) => <Dropdown {...anchorProps.forwardedProps} />}
        </Tooltip>
      )}
    </Show>
  );
};
