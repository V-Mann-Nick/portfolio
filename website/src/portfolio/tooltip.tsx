import clsx from "clsx";
import { type Component } from "solid-js";

import type { PopoverProps } from "./popover.tsx";

import { Popover } from "./popover.tsx";

type TooltipPopoverProps = PopoverProps<"hover", "tooltip">;

export type TooltipProps =
  & {
    tooltip: TooltipPopoverProps["content"];
    tooltipContainerClass?: TooltipPopoverProps["popoverContainerClass"];
    hideTooltip?: TooltipPopoverProps["hidePopover"];
  }
  & Omit<
    TooltipPopoverProps,
    | "content"
    | "tooltipContainerClass"
    | "hideTooltip"
    | "accessibilityType"
    | "triggerType"
  >;

export const Tooltip: Component<TooltipProps> = (props) => {
  const isPlainTooltip = () => typeof props.tooltip === "string";
  return (
    <Popover
      {...props}
      accessibilityType="tooltip"
      content={props.tooltip}
      hideOnMobile
      hidePopover={props.hideTooltip}
      popoverContainerClass={clsx(
        props.tooltipContainerClass,
        isPlainTooltip() &&
          "bg-secondary text-secondary-content rounded px-2 py-1 text-sm",
      )}
      triggerType="hover"
    />
  );
};
