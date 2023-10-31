import type { PopoverProps } from './popover'
import { Popover } from './popover'

import clsx from 'clsx'
import { type Component } from 'solid-js'

type TooltipPopoverProps = PopoverProps<'hover', 'tooltip'>

export type TooltipProps = {
  tooltip: TooltipPopoverProps['content']
  tooltipContainerClass?: TooltipPopoverProps['popoverContainerClass']
  hideTooltip?: TooltipPopoverProps['hidePopover']
} & Omit<
  TooltipPopoverProps,
  | 'content'
  | 'tooltipContainerClass'
  | 'hideTooltip'
  | 'accessibilityType'
  | 'triggerType'
>

export const Tooltip: Component<TooltipProps> = (props) => {
  const isPlainTooltip = () => typeof props.tooltip === 'string'
  return (
    <Popover
      {...props}
      content={props.tooltip}
      hidePopover={props.hideTooltip}
      accessibilityType="tooltip"
      triggerType="hover"
      popoverContainerClass={clsx(
        props.tooltipContainerClass,
        isPlainTooltip() &&
          'rounded bg-secondary px-2 py-1 text-sm text-secondary-content'
      )}
      hideOnMobile
    />
  )
}
