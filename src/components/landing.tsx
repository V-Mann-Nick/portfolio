import { tw } from '../tw'

import { Button } from './button'

import { type IconTypes } from 'solid-icons'
import { FaBrandsGithub, FaBrandsLinkedin } from 'solid-icons/fa'
import { type Component, For } from 'solid-js'

const landingStyles = tw.style({
  height: 'h-screen',
  display: 'flex',
  flexDirection: 'flex-col',
  gap: 'gap-5',
  justifyContent: 'justify-center',
  alignItems: 'items-center',
})

const meStyles = tw.style({
  width: 'w-52',
  height: 'h-52',
  borderRadius: 'rounded-full',
  objectFit: 'object-cover',
})

const textContainerStyles = tw.style({
  display: 'flex',
  flexDirection: 'flex-col',
  alignItems: 'items-center',
  gap: 'gap-2',
})

const nameStyles = tw.style({ fontSize: 'text-4xl' })

const professionStyles = tw.style({ fontSize: 'text-2xl' })

const socialMediaContainerStyles = tw.style({
  display: 'flex',
  gap: 'gap-1',
})

type SocialMedia = {
  Icon: IconTypes
  href: string
}

const socialMedia: SocialMedia[] = [
  { Icon: FaBrandsGithub, href: 'https://github.com/V-Mann-Nick' },
  {
    Icon: FaBrandsLinkedin,
    href: 'https://www.linkedin.com/in/nicklas-sedlock-53764b1a8',
  },
]

export const Landing: Component = () => (
  <section class={landingStyles.class}>
    <img src="/me.png" class={meStyles.class} />
    <div class={textContainerStyles.class}>
      <h1 class={nameStyles.class}>Nicklas Sedlock,</h1>
      <h2 class={professionStyles.class}>Programmer</h2>
      <div class={socialMediaContainerStyles.class}>
        <For each={socialMedia}>
          {(media) => (
            <Button
              as="a"
              shape="circle"
              kind="ghost"
              href={media.href}
              target="_blank"
            >
              <media.Icon size={30} />
            </Button>
          )}
        </For>
      </div>
    </div>
  </section>
)
