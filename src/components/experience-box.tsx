import { ContentFrame } from './content-frame'
import type { TechKey } from './tech'
import techStack from './tech'

import { Collapse } from 'solid-collapse'
import { FaSolidChevronDown, FaSolidChevronUp } from 'solid-icons/fa'
import {
  type Component,
  createMemo,
  createSignal,
  For,
  type JSX,
} from 'solid-js'

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
  const [isExpanded, setIsExpanded] = createSignal(false)
  const moreButtonId = createMemo(() => `${props.key}-more-button`)
  const collapseId = createMemo(() => `${props.key}-collapsed}`)
  return (
    <ContentFrame>
      <article class="prose max-w-none">
        <div class="flex items-center justify-around">
          <a href={props.link} class="h-max w-[30%]">
            <img src={props.image} alt={props.title} class="my-0" />
          </a>
          <dl>
            <dt>Position:</dt>
            <dd>{props.position}</dd>
            <dt>Tech stack:</dt>
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
              Less <FaSolidChevronUp />
            </>
          ) : (
            <>
              More <FaSolidChevronDown />
            </>
          )}
        </button>
      </article>
    </ContentFrame>
  )
}
