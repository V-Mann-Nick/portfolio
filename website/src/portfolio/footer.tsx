import type { Component } from "solid-js";

export const Footer: Component = () => {
  const thisYear = new Date().getFullYear();
  return (
    <footer class="bg-base-300 fixed bottom-0 left-0 w-full px-3 py-1 text-xs shadow-lg">
      © 2023 - {thisYear}, Nicklas Sedlock
    </footer>
  );
};
