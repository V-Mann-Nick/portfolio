import FaSolidChevronDown from '~icons/fa-solid/chevron-down'

import { ContentFrame } from './content-frame'
import { Link, type LinkKey } from './links'
import { useLocale } from './locale-provider'
import { Tooltip } from './tooltip'

import clsx from 'clsx'
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
  techStack: LinkKey[]
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
        <Tooltip placement="bottom" tooltip={props.title}>
          {(anchorProps) => (
            <a
              href={props.link}
              target="_blank"
              class="not-prose block w-[min(100%,theme(spacing.64))]"
              {...anchorProps}
            >
              <img src={props.image} alt={props.title} loading="lazy" />
            </a>
          )}
        </Tooltip>
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
                    <Link linkKey={techKey} asTag />
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
          class={clsx('transition-transform', isExpanded() && 'rotate-180')}
        />
      </button>
    </ContentFrame>
  )
}
