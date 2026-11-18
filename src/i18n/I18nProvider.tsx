import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { I18nContext, type Lang, type Localized } from "./context";
import { ui } from "./ui";

const STORAGE_KEY = "lang";

function initialLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "fr" || stored === "en") return stored;
  } catch {
    // Stockage indisponible (navigation privée) : on retombe sur la langue du navigateur.
  }
  return navigator.language.toLowerCase().startsWith("en") ? "en" : "fr";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Préférence non persistée, sans conséquence.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: ui[lang],
      pick: <T,>(v: Localized<T>) => v[lang],
    }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
