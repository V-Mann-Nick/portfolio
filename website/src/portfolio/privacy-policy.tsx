import IconFaSolidArrowLeft from "~icons/fa-solid/arrow-left";
import { Component } from "solid-js";
import { LocaleProvider, useLocale } from "./locale-provider.tsx";
import { defaultLocale, Locale } from "./i18n/index.ts";
import { ContentFrame } from "./content-frame.tsx";
import { Footer } from "./footer.tsx";
import { DarkModeToggle } from "./dark-mode-toggle.tsx";
import { LocaleSwitcher } from "./locale-switcher.tsx";
import { Tooltip } from "./tooltip.tsx";

type PrivacyPolicyProps = {
  locale: Locale;
};

export const PrivacyPolicy: Component<PrivacyPolicyProps> = (props) => {
  return (
    <LocaleProvider initialLocale={props.locale}>
      <main class="bg-base-300 text-base-content min-h-screen transition-colors duration-100 ease-linear">
        <ButtonBar />
        <Text />
      </main>
      <Footer />
    </LocaleProvider>
  );
};

const ButtonBar: Component = () => {
  const { currentLocale, messages } = useLocale();
  const rootUrl = () =>
    currentLocale() === defaultLocale ? "/" : `/${currentLocale()}/`;

  return (
    <div class="text-right pt-5 px-5 flex justify-end gap-2">
      <Tooltip placement="bottom" tooltip={messages().privacyPolicy.back}>
        {(anchorProps) => (
          <a
            class="btn btn-circle btn-ghost h-12 w-12"
            href={rootUrl()}
            aria-label={messages().privacyPolicy.back}
            {...anchorProps.forwardedProps}
          >
            <IconFaSolidArrowLeft style={{ "font-size": "1.25rem" }} />
          </a>
        )}
      </Tooltip>
      <div class="flex-1" />
      <DarkModeToggle />
      <LocaleSwitcher />
    </div>
  );
};

const Text: Component = () => {
  const { messages } = useLocale();
  return (
    <article class="prose prose-img:rounded-lg flex max-w-none flex-col gap-4 py-12">
      <ContentFrame class="my-0" as="h1">
        {messages().privacyPolicy.title}
      </ContentFrame>
      <ContentFrame>
        {messages().privacyPolicy.content()}
      </ContentFrame>
    </article>
  );
};
