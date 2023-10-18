import FaSolidChevronDown from '~icons/fa-solid/chevron-down'
import FaSolidChevronUp from '~icons/fa-solid/chevron-up'

import { ContentFrame } from './content-frame'
import { useLocale } from './locale-provider'
import type { TechKey } from './tech'
import techStack from './tech'

import { Collapse } from 'solid-collapse'
import { type Component, createSignal, For, type JSX } from 'solid-js'

type ExperienceBoxProps = {
  key: string
  title: string
  image: string
  link: string
  position: string
  techStack: TechKey[]
  more: JSX.Element
}

export const ExperienceBox: Component<ExperienceBoxProps> = (props) => {
  const { messages } = useLocale()

  const [isExpanded, setIsExpanded] = createSignal(false)

  const moreButtonId = () => `${props.key}-more-button`
  const collapseId = () => `${props.key}-collapsed}`

  return (
    <ContentFrame>
      <article class="prose max-w-none">
        <div class="flex flex-col items-center justify-around sm:flex-row">
          <a
            href={props.link}
            target="_blank"
            class="h-max w-[min(100%,theme(spacing.72))] sm:w-72"
          >
            <img src={props.image} alt={props.title} class="my-0" />
          </a>
          <dl>
            <dt>{messages().experience.box.position}:</dt>
            <dd>{props.position}</dd>
            <dt>{messages().experience.box.techStack}:</dt>
            <dd>
              <ul class="not-prose flex list-none gap-2">
                <For each={Array.from(props.techStack)}>
                  {(techKey) => (
                    <li class="inline">
                      <a
                        class="badge badge-outline no-underline hover:underline"
                        href={techStack[techKey].link}
                        target="_blank"
                      >
                        {techStack[techKey].name}
                      </a>
                    </li>
                  )}
                </For>
              </ul>
            </dd>
          </dl>
        </div>
        <Collapse
          value={isExpanded()}
          id="collapsed"
          aria-labelledby={moreButtonId()}
          role="region"
          class="collapse-transition"
        >
          {props.more}
        </Collapse>
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          class="btn btn-accent no-animation btn-sm btn-block"
          id={moreButtonId()}
          aria-expanded={isExpanded()}
          aria-controls={collapseId()}
        >
          {isExpanded() ? (
            <>
              {messages().experience.box.less} <FaSolidChevronUp />
            </>
          ) : (
            <>
              {messages().experience.box.more} <FaSolidChevronDown />
            </>
          )}
        </button>
      </article>
    </ContentFrame>
  )
}
