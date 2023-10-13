import { Section } from './section'

import { type IconTypes } from 'solid-icons'
import { FaBrandsGithub, FaBrandsLinkedin } from 'solid-icons/fa'
import { type Component, For } from 'solid-js'

type SocialMedia = {
  Icon: IconTypes
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
        <img src="/me.png" class="h-52 w-52 rounded-full object-cover" />
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
                    <media.Icon size={30} />
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
