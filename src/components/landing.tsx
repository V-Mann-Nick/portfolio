import FaBrandsGithub from '~icons/fa-brands/github'
import FaBrandsLinkedin from '~icons/fa-brands/linkedin'
import IconFaSolidArrowDown from '~icons/fa-solid/arrow-down'

import meImage from '../assets/me.jpg'

import { sectionDefinitions } from './app'
import { Link, type LinkKey } from './links'
import { useLocale } from './locale-provider'
import { Section } from './section'

import {
  type Component,
  type ComponentProps,
  For,
  type JSX,
  splitProps,
} from 'solid-js'

type SocialMedia = {
  Icon: (props: ComponentProps<'svg'>) => JSX.Element
  linkKey: LinkKey
}

const socialMedia: SocialMedia[] = [
  {
    Icon: FaBrandsGithub,
    linkKey: 'myGithub',
  },
  {
    Icon: FaBrandsLinkedin,
    linkKey: 'myLinkedin',
  },
]

const SocialLink: Component<SocialMedia> = (props) => {
  const Button: Component<JSX.HTMLAttributes<HTMLAnchorElement>> = (
    _buttonProps
  ) => {
    const [, buttonProps] = splitProps(_buttonProps, ['class', 'children'])
    return (
      <a class="btn btn-circle btn-ghost" {...buttonProps}>
        <props.Icon style={{ 'font-size': '1.5rem' }} />
      </a>
    )
  }
  return <Link linkKey={props.linkKey} as={Button} />
}

const LandingContent: Component = () => {
  const { messages } = useLocale()
  return (
    <>
      <div class="mb-auto mt-16" />
      <img src={meImage.src} class="h-52 w-52 rounded-full object-cover" />
      <div class="flex flex-col items-center gap-2">
        <h1 class="text-4xl">Nicklas Sedlock</h1>
        <h2 class="text-2xl">{messages().landing.subtitle}</h2>
        <div class="flex gap-1">
          <For each={socialMedia}>{(media) => <SocialLink {...media} />}</For>
        </div>
      </div>
      <div
        class="tooltip tooltip-top mb-16 mt-auto before:text-base"
        data-tip={messages().landing.scrollDownTooltip}
      >
        <a
          class="btn btn-circle btn-ghost h-24 w-24"
          href={`#${sectionDefinitions[0]!.key}`}
        >
          <IconFaSolidArrowDown class="animate-bounce text-5xl text-secondary" />
        </a>
      </div>
    </>
  )
}

export const Landing: Component<{
  ref: HTMLElement | undefined
  sectionKey: string
}> = (props) => (
  <Section
    ref={props.ref}
    key={props.sectionKey}
    Content={LandingContent}
    class="flex h-screen flex-col items-center justify-center gap-5"
    noNavigate
  />
)
