import FaSolidChevronDown from '~icons/fa-solid/chevron-down'

import { ContentFrame } from './content-frame'
import { useLocale } from './locale-provider'
import { type TechKey, TechLink } from './tech'

import { Collapse } from 'solid-collapse'
import {
  type Component,
  createSignal,
  createUniqueId,
  For,
  type JSX,
} from 'solid-js'

type ExperienceBoxProps = {
  title: string
  image: string
  link: string
  position: string
  dates: {
    start: Date
    end: Date
  }
  techStack: TechKey[]
  more: JSX.Element
}

export const ExperienceBox: Component<ExperienceBoxProps> = (props) => {
  const { messages, currentLocale } = useLocale()

  const [isExpanded, setIsExpanded] = createSignal(false)

  const moreButtonId = createUniqueId()
  const collapseId = createUniqueId()

  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat(currentLocale(), {
      month: 'long',
      year: 'numeric',
    }).format(date)
  const startDate = () => formatDate(props.dates.start)
  const endDate = () => formatDate(props.dates.end)

  return (
    <ContentFrame class="prose max-w-none shadow" as="article">
      <div>
        <div
          class="not-prose tooltip tooltip-bottom w-[min(100%,theme(spacing.64))]"
          data-tip={props.title}
        >
          <a href={props.link} target="_blank">
            <img src={props.image} alt={props.title} />
          </a>
        </div>
        <dl>
          <dt>{messages().experience.box.position}:</dt>
          <dd>{props.position}</dd>
          <dt>{messages().experience.box.dates}:</dt>
          <dd>
            {startDate()} - {endDate()}
          </dd>
          <dt>{messages().experience.box.techStack}:</dt>
          <dd>
            <ul class="not-prose flex list-none flex-wrap gap-2">
              <For each={Array.from(props.techStack)}>
                {(techKey) => (
                  <li class="inline">
                    <TechLink techKey={techKey} asTag />
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
        aria-labelledby={moreButtonId}
        role="region"
        class="collapse"
      >
        <div class="py-4">{props.more}</div>
      </Collapse>
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        class="btn btn-accent btn-sm btn-block"
        id={moreButtonId}
        aria-expanded={isExpanded()}
        aria-controls={collapseId}
      >
        {isExpanded()
          ? messages().experience.box.less
          : messages().experience.box.more}{' '}
        <FaSolidChevronDown
          classList={{ 'rotate-180': isExpanded() }}
          class="transition-transform"
        />
      </button>
    </ContentFrame>
  )
}
