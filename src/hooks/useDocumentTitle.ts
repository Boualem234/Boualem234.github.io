import { useEffect } from "react";

let currentTitle = document.title;

/** Titre de l'onglet de la page courante (restauré au retour sur l'onglet). */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    currentTitle = title;
    if (!document.hidden) document.title = title;
  }, [title]);
}

/** Clin d'œil repris de l'ancien site : un message quand on quitte l'onglet. */
export function useTabAwayTitle(awayTitle: string) {
  useEffect(() => {
    const onChange = () => {
      document.title = document.hidden ? awayTitle : currentTitle;
    };
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, [awayTitle]);
}
