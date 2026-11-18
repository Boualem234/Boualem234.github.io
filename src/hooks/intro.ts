import { createContext, useContext } from "react";

/** `true` dès que l'intro s'ouvre sur la page : les animations du hero peuvent démarrer. */
export const IntroContext = createContext(true);

export function useIntroReady() {
  return useContext(IntroContext);
}

const SEEN_KEY = "intro-seen";

export function shouldPlayIntro() {
  if (window.location.pathname !== "/") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return sessionStorage.getItem(SEEN_KEY) !== "1";
  } catch {
    return true;
  }
}

export function markIntroSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    // Sans stockage, l'intro rejouera à la prochaine visite : acceptable.
  }
}
