import { tw } from '../tw'

import { type JSX, mergeProps, type ParentProps, splitProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { type GetVariants } from 'tailwindest'

const buttonStyles = tw.variants({
  base: {
    ':hover': {
      backgroundColor: 'hover:bg-nord-9',
      color: 'hover:text-nord-0',
    },
    ':focus': {
      ringWidth: 'focus:ring-2',
      ringColor: 'focus:ring-nord-13',
    },
    transitionProperty: 'transition-colors',
    transitionDuration: 'duration-100',
    transitionTimingFunction: 'ease-linear',
  },
  variants: {
    shape: {
      default: {
        paddingX: 'px-3',
        paddingY: 'py-2',
        borderRadius: 'rounded',
      },
      circle: {
        padding: 'p-2',
        borderRadius: 'rounded-full',
      },
    },
    kind: {
      primary: {},
      ghost: {},
    },
  },
})

type ButtonProps<TTag extends 'button' | 'a'> = JSX.HTMLElementTags[TTag] &
  GetVariants<typeof buttonStyles> & { as?: TTag }

export const Button = <TTag extends 'button' | 'a' = 'button'>(
  _props: ParentProps<ButtonProps<TTag>>
): JSX.Element => {
  const props = mergeProps(
    { shape: 'default', kind: 'primary', as: 'button' } as const,
    _props
  )
  const [variantProps, _, htmlProps] = splitProps(
    props,
    ['shape', 'kind'],
    ['children', 'as']
  )
  return (
    // @ts-expect-error type safety should be fine
    <Dynamic<TTag>
      component={props.as}
      {...htmlProps}
      class={[htmlProps.class, buttonStyles.class(variantProps)]
        .filter(Boolean)
        .join(' ')}
    >
      {props.children}
    </Dynamic>
  )
}
