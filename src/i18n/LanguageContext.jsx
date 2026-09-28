import { createContext, useContext, useEffect, useState } from "react";
import fr from "./fr.json";
import en from "./en.json";

const dictionaries = { fr, en };

const LanguageContext = createContext({
  lang: "fr",
  setLang: () => {},
  t: fr,
});

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("portfolio-lang") || "fr";
    } catch {
      return "fr";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("portfolio-lang", lang);
    } catch {}
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dictionaries[lang] || fr }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
