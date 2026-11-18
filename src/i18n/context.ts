import { createContext, useContext } from "react";
import type { UiStrings } from "./ui";

export type Lang = "fr" | "en";
export const LANGS: Lang[] = ["fr", "en"];
export type Localized<T = string> = Record<Lang, T>;

export type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: UiStrings;
  /** Renvoie la variante de la langue active d'une valeur localisée. */
  pick: <T>(value: Localized<T>) => T;
};

export const I18nContext = createContext<I18nContextValue | null>(null);

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n doit être utilisé dans <I18nProvider>");
  return ctx;
}
