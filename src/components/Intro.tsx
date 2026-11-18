import { useEffect, useRef } from "react";
import { animate as animateValue, useAnimate } from "motion/react";
import { useLenis } from "lenis/react";
import { motifs } from "../data/interests";
import styles from "./Intro.module.css";

type Props = {
  /** Appelé quand l'écran commence à s'ouvrir : le hero peut s'animer. */
  onReveal: () => void;
  onDone: () => void;
};

// Intro courte (~1,1 s au total) : on ne fait pas attendre un recruteur.
const FILL_DURATION = 0.6;
const SPLIT_DURATION = 0.55;
const SPLIT_EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Intro : une jauge de boost se remplit, les quatre passions s'allument au passage
 * (basket, coiffure, jeux vidéo, lecture), puis l'écran s'ouvre en deux.
 */
export default function Intro({ onReveal, onDone }: Props) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const lenis = useLenis();
  const counterRef = useRef<HTMLSpanElement>(null);
  const callbacks = useRef({ onReveal, onDone });

  useEffect(() => {
    lenis?.stop();
    return () => lenis?.start();
  }, [lenis]);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      motifs.forEach((_, i) => {
        animate(
          `[data-motif="${i}"]`,
          { opacity: [0.18, 1], scale: [0.7, 1.25, 1], color: ["#85807a", "#ff6b35"] },
          { duration: 0.3, delay: 0.05 + (i * FILL_DURATION) / motifs.length, ease: "easeOut" },
        );
      });
      await Promise.all([
        animate("[data-fill]", { scaleX: [0, 1] }, { duration: FILL_DURATION, ease: [0.65, 0, 0.35, 1] }),
        animateValue(0, 100, {
          duration: FILL_DURATION,
          ease: [0.65, 0, 0.35, 1],
          onUpdate: (v) => {
            if (counterRef.current) counterRef.current.textContent = String(Math.round(v)).padStart(3, "0");
          },
        }),
      ]);
      if (cancelled) return;
      callbacks.current.onReveal();
      await Promise.all([
        animate("[data-half=top]", { y: "-100%" }, { duration: SPLIT_DURATION, ease: SPLIT_EASE }),
        animate("[data-half=bottom]", { y: "100%" }, { duration: SPLIT_DURATION, ease: SPLIT_EASE }),
        animate("[data-track]", { opacity: 0 }, { duration: 0.2 }),
      ]);
      if (!cancelled) callbacks.current.onDone();
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [animate]);

  return (
    <div ref={scope} className={styles.intro} aria-hidden="true">
      <div className={styles.half} data-half="top">
        <div className={styles.motifs}>
          {motifs.map(({ id, Icon }, i) => (
            <span key={id} data-motif={i} className={styles.motif}>
              <Icon />
            </span>
          ))}
        </div>
        <p className={styles.label}>
          <span>Boualem El Guendouz</span>
          <span>Portfolio · 2026</span>
        </p>
      </div>
      <div className={`${styles.half} ${styles.bottom}`} data-half="bottom">
        <p className={styles.label}>
          <span>Full Stack · .NET · Django</span>
          <span>
            Boost <span ref={counterRef} className={styles.counter}>000</span>
          </span>
        </p>
      </div>
      <div className={styles.track} data-track>
        <span className={styles.fill} data-fill />
      </div>
    </div>
  );
}
