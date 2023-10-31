import dork from '../assets/dork.jpg'
import me2 from '../assets/me2.jpg'

import { ContentFrame } from './content-frame'
import { useLocale } from './locale-provider'

import type { Component } from 'solid-js'

export const AboutMe: Component = () => {
  const { messages } = useLocale()
  return (
    <article class="prose flex max-w-none flex-col gap-4 py-12 prose-img:rounded-lg">
      <ContentFrame as="h1" class="my-0">
        {messages().aboutMe.title}
      </ContentFrame>
      <ContentFrame>
        <img
          loading="lazy"
          src={me2.src}
          height={me2.height}
          width={me2.width}
          class="sm:float-left sm:mb-0 sm:mr-5"
          alt="Nicklas in the mountains"
        />
        {messages().aboutMe.content.p1()}
        {messages().aboutMe.content.p2()}
        <img
          loading="lazy"
          src={dork.src}
          height={dork.height}
          width={dork.width}
          class="sm:float-right sm:my-0 sm:ml-5"
          alt="Dorky Nicklas smiling at the camera while coding"
        />
        {messages().aboutMe.content.p3()}
        {messages().aboutMe.content.p4()}
      </ContentFrame>
    </article>
  )
}
