import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { TbChevronLeft, TbChevronRight, TbX } from "react-icons/tb";
import type { ProjectImage } from "../data/projects";
import { useI18n } from "../i18n/context";
import styles from "./Lightbox.module.css";

type Props = {
  images: ProjectImage[];
  index: number | null;
  onChange: (index: number | null) => void;
};

/** Visionneuse plein écran : flèches, Échap, swipe. */
export default function Lightbox({ images, index, onChange }: Props) {
  const { t, pick } = useI18n();
  const lenis = useLenis();
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const open = index !== null;
  const count = images.length;

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      onChange((index + delta + count) % count);
    },
    [index, count, onChange],
  );

  // Ouverture : on fige le scroll et on rend le focus à l'élément d'origine à la fermeture.
  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    lenis?.stop();
    closeRef.current?.focus();
    return () => {
      lenis?.start();
      previousFocus?.focus({ preventScroll: true });
    };
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go, onChange]);

  const image = index !== null ? images[index] : undefined;

  return createPortal(
    <AnimatePresence>
      {image && index !== null && (
        <motion.div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label={pick(image.caption)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onChange(null)}
          onTouchStart={(e) => (touchX.current = e.touches[0]?.clientX ?? null)}
          onTouchEnd={(e) => {
            const start = touchX.current;
            const end = e.changedTouches[0]?.clientX;
            if (start !== null && end !== undefined && Math.abs(end - start) > 50) go(end < start ? 1 : -1);
            touchX.current = null;
          }}
        >
          <button ref={closeRef} type="button" className={styles.close} onClick={() => onChange(null)} aria-label={t.lightbox.close}>
            <TbX />
          </button>

          <AnimatePresence mode="wait" initial={false}>
            <motion.figure
              key={index}
              className={styles.figure}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              <img src={image.src} alt={pick(image.caption)} width={image.width} height={image.height} />
              <figcaption>
                <span className={styles.counter}>
                  {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                </span>
                {pick(image.caption)}
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          {count > 1 && (
            <>
              <button type="button" className={`${styles.nav} ${styles.prev}`} onClick={() => go(-1)} aria-label={t.lightbox.prev}>
                <TbChevronLeft />
              </button>
              <button type="button" className={`${styles.nav} ${styles.next}`} onClick={() => go(1)} aria-label={t.lightbox.next}>
                <TbChevronRight />
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
