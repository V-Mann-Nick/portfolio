import { UAParser } from "ua-parser-js";

const parser = typeof globalThis === "undefined"
  ? null
  : new UAParser(globalThis.navigator.userAgent).getResult();
export const isMobile = parser?.device.type === "mobile";
