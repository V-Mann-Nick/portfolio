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
        <img src={me2.src} class="float-left mb-0 mr-5" />
        {messages().aboutMe.content.p1()}
        {messages().aboutMe.content.p2()}
        <img src={dork.src} class="float-right my-0 ml-5" />
        {messages().aboutMe.content.p3()}
        {messages().aboutMe.content.p4()}
      </ContentFrame>
    </article>
  )
}
