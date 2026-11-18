import { useCallback } from "react";
import { useLenis } from "lenis/react";

const HEADER_OFFSET = -72;

/** Défilement fluide vers une section (Lenis si actif, sinon natif). */
export function useScrollTo() {
  const lenis = useLenis();

  return useCallback(
    (target: string | number, options: { immediate?: boolean } = {}) => {
      if (typeof target === "number") {
        if (lenis) lenis.scrollTo(target, { immediate: options.immediate, force: true });
        else window.scrollTo({ top: target, behavior: options.immediate ? "auto" : "smooth" });
        return true;
      }
      const el = document.getElementById(target.replace(/^#/, ""));
      if (!el) return false;
      if (lenis) {
        // Après un changement de page, Lenis connaît encore la hauteur de l'ancienne : on la recalcule.
        lenis.resize();
        lenis.scrollTo(el, { offset: HEADER_OFFSET, immediate: options.immediate, force: true });
      } else {
        const top = el.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET;
        window.scrollTo({ top, behavior: options.immediate ? "auto" : "smooth" });
      }
      return true;
    },
    [lenis],
  );
}
