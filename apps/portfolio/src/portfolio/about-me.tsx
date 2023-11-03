import type { Component } from 'solid-js'

import dork from '../assets/dork.jpg'
import me2 from '../assets/me2.jpg'
import { ContentFrame } from './content-frame'
import { useLocale } from './locale-provider'

export const AboutMe: Component = () => {
  const { messages } = useLocale()
  return (
    <article class="prose prose-img:rounded-lg flex max-w-none flex-col gap-4 py-12">
      <ContentFrame class="my-0" as="h1">
        {messages().aboutMe.title}
      </ContentFrame>
      <ContentFrame>
        <img
          class="ml-auto mr-auto sm:float-left sm:mb-0 sm:ml-0 sm:mr-5"
          alt="Nicklas in the mountains"
          height={me2.height}
          loading="lazy"
          src={me2.src}
          width={me2.width}
        />
        {messages().aboutMe.content.p1()}
        {messages().aboutMe.content.p2()}
        <img
          class="ml-auto mr-auto sm:float-right sm:my-0 sm:ml-5 sm:mr-0"
          alt="Dorky Nicklas smiling at the camera while coding"
          height={dork.height}
          loading="lazy"
          src={dork.src}
          width={dork.width}
        />
        {messages().aboutMe.content.p3()}
        {messages().aboutMe.content.p4()}
      </ContentFrame>
    </article>
  )
}
