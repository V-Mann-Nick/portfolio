import FaSolidChevronDown from "~icons/fa-solid/chevron-down";
import clsx from "clsx";
import { Collapse } from "solid-collapse";
import {
  type Component,
  createSignal,
  createUniqueId,
  For,
  type JSX,
} from "solid-js";

import { ContentFrame } from "./content-frame.tsx";
import { type LinkKey } from "./links.ts";
import { useLocale } from "./locale-provider.tsx";
import { Tooltip } from "./tooltip.tsx";
import { Link } from "./link.tsx";

type ExperienceBoxProps = {
  title: string;
  image: string;
  link: string;
  position: string;
  dates: {
    start: Date;
    end: Date;
  };
  techStack: LinkKey[];
  more: JSX.Element;
};

export const ExperienceBox: Component<ExperienceBoxProps> = (props) => {
  const { messages, currentLocale } = useLocale();

  const [isExpanded, setIsExpanded] = createSignal(false);

  const moreButtonId = createUniqueId();
  const collapseId = createUniqueId();

  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat(currentLocale(), {
      month: "long",
      year: "numeric",
    }).format(date);
  const startDate = () => formatDate(props.dates.start);
  const endDate = () => formatDate(props.dates.end);

  return (
    <ContentFrame>
      <h2 class="hidden">{props.title}</h2>
      <div>
        <Tooltip placement="bottom" tooltip={props.title}>
          {(anchorProps) => (
            <a
              class="not-prose block w-[min(100%,theme(spacing.64))]"
              href={props.link}
              target="_blank"
              {...anchorProps.forwardedProps}
            >
              <img alt={props.title} loading="lazy" src={props.image} />
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
                    <Link asTag linkKey={techKey} />
                  </li>
                )}
              </For>
            </ul>
          </dd>
        </dl>
      </div>
      <Collapse
        class="collapse"
        id={collapseId}
        role="region"
        value={isExpanded()}
        aria-labelledby={moreButtonId}
      >
        <div class="py-4">{props.more}</div>
      </Collapse>
      <button
        type="button"
        class="btn btn-secondary btn-sm btn-block"
        id={moreButtonId}
        aria-controls={collapseId}
        aria-expanded={isExpanded()}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        {isExpanded()
          ? messages().experience.box.less
          : messages().experience.box.more}{" "}
        <FaSolidChevronDown
          class={clsx("transition-transform", isExpanded() && "rotate-180")}
        />
      </button>
    </ContentFrame>
  );
};
