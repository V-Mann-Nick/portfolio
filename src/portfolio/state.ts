import { createSignal } from "solid-js";

export const [currentSection, setCurrentSection] = createSignal<string>();

export const [isDarkMode, setIsDarkMode] = createSignal<boolean | null>(null);

export const initializeDarkModeState = () =>
  setIsDarkMode(document.documentElement.classList.contains("dark"));

export const onDarkModeChange = (isDarkMode: boolean) => {
  localStorage.setItem("is-dark-mode", isDarkMode ? "true" : "false");
  setIsDarkMode(isDarkMode);
  if (isDarkMode) {
    document.documentElement.classList.add("dark");
    document.documentElement.dataset["theme"] = "nord-dark";
  } else {
    document.documentElement.classList.remove("dark");
    document.documentElement.dataset["theme"] = "nord-light";
  }
};
