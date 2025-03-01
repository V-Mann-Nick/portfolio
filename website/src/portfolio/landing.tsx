import FaBrandsGithub from "~icons/fa-brands/github";
import FaBrandsLinkedin from "~icons/fa-brands/linkedin";
import IconFaSolidArrowDown from "~icons/fa-solid/arrow-down";
import { type Component, type ComponentProps, For, type JSX } from "solid-js";

// @deno-types="../image.d.ts"
import meImage from "../assets/me.jpg";
import { sectionDefinitions } from "./app.tsx";
import { useLocale } from "./locale-provider.tsx";
import { Section } from "./section.tsx";
import { Tooltip } from "./tooltip.tsx";

type SocialMedia = {
  Icon: (props: ComponentProps<"svg">) => JSX.Element;
  title: string;
  href: string;
};

const socialMedia: SocialMedia[] = [
  {
    Icon: FaBrandsGithub,
    title: "Github",
    href: "https://github.com/V-Mann-Nick",
  },
  {
    Icon: FaBrandsLinkedin,
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/nicklas-sedlock-53764b1a8",
  },
];

const LandingContent: Component = () => {
  const { messages } = useLocale();
  return (
    <>
      <div class="mb-auto mt-16" />
      <img
        class="h-52 w-52 rounded-full object-cover"
        alt="Nicklas in the mountains"
        src={meImage.src}
      />
      <div class="flex flex-col items-center gap-2">
        <h1 class="text-4xl">Nicklas Sedlock</h1>
        <h2 class="text-2xl">{messages().landing.subtitle}</h2>
        <div class="flex gap-1">
          <For each={socialMedia}>
            {(media) => (
              <Tooltip placement="bottom" tooltip={media.title}>
                {(anchorProps) => (
                  <a
                    class="btn btn-circle btn-ghost"
                    href={media.href}
                    target="_blank"
                    aria-label={media.title}
                    {...anchorProps.forwardedProps}
                  >
                    <media.Icon style={{ "font-size": "1.5rem" }} />
                  </a>
                )}
              </Tooltip>
            )}
          </For>
        </div>
      </div>
      <Tooltip
        placement="top"
        tooltip={messages().landing.scrollDownTooltip}
        tooltipContainerClass="text-base"
      >
        {(anchorProps) => (
          <a
            class="btn btn-circle btn-ghost mb-16 mt-auto h-24 w-24"
            href={`#${sectionDefinitions[0].key}`}
            aria-label={messages().landing.scrollDownTooltip}
            {...anchorProps.forwardedProps}
          >
            <IconFaSolidArrowDown class="text-accent animate-bounce text-5xl" />
          </a>
        )}
      </Tooltip>
    </>
  );
};

export const Landing: Component<{
  ref: HTMLElement | undefined;
  sectionKey: string;
}> = (props) => (
  <Section
    class="flex h-screen flex-col items-center justify-center gap-5"
    Content={LandingContent}
    key={props.sectionKey}
    noNavigate
    ref={props.ref}
  />
);
