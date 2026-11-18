import { useEffect } from "react";
import { useLocation } from "react-router";
import { useScrollTo } from "../hooks/useScrollTo";

/**
 * Remet la page en haut à chaque navigation, ou rejoint l'ancre demandée
 * (ex. retour d'une étude de cas vers /#projets).
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();
  const scrollTo = useScrollTo();

  useEffect(() => {
    if (!hash) {
      scrollTo(0, { immediate: true });
      return;
    }
    // La section peut ne pas être encore montée (page chargée à la demande).
    let frame = 0;
    let tries = 0;
    const attempt = () => {
      if (scrollTo(hash, { immediate: tries === 0 }) || tries++ > 30) return;
      frame = requestAnimationFrame(attempt);
    };
    frame = requestAnimationFrame(attempt);
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, scrollTo]);

  return null;
}
