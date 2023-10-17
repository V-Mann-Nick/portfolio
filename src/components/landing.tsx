import FaBrandsGithub from '~icons/fa-brands/github'
import FaBrandsLinkedin from '~icons/fa-brands/linkedin'

import meImage from '../assets/me.jpg'

import { Section } from './section'

import { type Component, type ComponentProps, For, type JSX } from 'solid-js'

type SocialMedia = {
  Icon: (props: ComponentProps<'svg'>) => JSX.Element
  title: string
  href: string
}

const socialMedia: SocialMedia[] = [
  {
    Icon: FaBrandsGithub,
    title: 'Github',
    href: 'https://github.com/V-Mann-Nick',
  },
  {
    Icon: FaBrandsLinkedin,
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/nicklas-sedlock-53764b1a8',
  },
]

export const Landing: Component = () => (
  <Section
    key="landing"
    content={
      <>
        <img src={meImage.src} class="h-52 w-52 rounded-full object-cover" />
        <div class="flex flex-col items-center gap-2">
          <h1 class="text-4xl">Nicklas Sedlock,</h1>
          <h2 class="text-2xl">Programmer</h2>
          <div class="flex gap-1">
            <For each={socialMedia}>
              {(media) => (
                <div class="tooltip tooltip-bottom" data-tip={media.title}>
                  <a
                    class="btn btn-circle btn-ghost"
                    href={media.href}
                    target="_blank"
                  >
                    <media.Icon style={{ 'font-size': '1.5rem' }} />
                  </a>
                </div>
              )}
            </For>
          </div>
        </div>
      </>
    }
    class="flex h-screen flex-col items-center justify-center gap-5"
    noNavigate
  />
)
