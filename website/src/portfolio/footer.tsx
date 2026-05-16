import type { Component } from "solid-js";
import { useLocale } from "./locale-provider.tsx";
import { defaultLocale } from "./i18n/locales.ts";

export const Footer: Component = () => {
  const { messages } = useLocale();

  const { currentLocale } = useLocale();

  const privacyPolicyLink = () =>
    currentLocale() === defaultLocale
      ? "/privacy-policy/"
      : `/${currentLocale()}/privacy-policy/`;

  const thisYear = new Date().getFullYear();

  return (
    <footer class="bg-base-300 fixed bottom-0 left-0 w-full px-3 py-1 text-xs shadow-lg flex gap-2">
      <span>
        © 2023 - {thisYear}, Nicklas Sedlock
      </span>
      <span>|</span>
      <a href={privacyPolicyLink()}>{messages().privacyPolicy.title}</a>
    </footer>
  );
};
