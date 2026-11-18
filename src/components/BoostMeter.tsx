import { useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useI18n } from "../i18n/context";
import { useScrollTo } from "../hooks/useScrollTo";
import styles from "./BoostMeter.module.css";

/** Arc de 270° comme la jauge de boost de Rocket League (pathLength normalisé à 100). */
const ARC = 75;

/** Progression de lecture façon jauge de boost : 0 → 100, clic = retour en haut. */
export default function BoostMeter() {
  const { t } = useI18n();
  const scrollTo = useScrollTo();
  const { scrollY, scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });
  const [value, setValue] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(smooth, "change", (v) => setValue(Math.min(100, Math.max(0, Math.round(v * 100)))));
  // Sur une page qui ne défile pas (404), la progression vaut 1 : on n'affiche la jauge qu'après un vrai défilement.
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 80));

  const visible = scrolled && value > 2;
  const full = value >= 99;

  return (
    <motion.button
      type="button"
      className={`${styles.meter} ${full ? styles.full : ""}`}
      onClick={() => scrollTo(0)}
      aria-label={`${t.boost} (${value} %)`}
      initial={false}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.6, pointerEvents: visible ? "auto" : "none" }}
      transition={{ duration: 0.3 }}
      tabIndex={visible ? 0 : -1}
    >
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <linearGradient id="boost-gradient" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#ff4d1f" />
            <stop offset="1" stopColor="#ffc247" />
          </linearGradient>
        </defs>
        <g transform="rotate(135 50 50)">
          <circle className={styles.track} cx="50" cy="50" r="42" pathLength={100} strokeDasharray={`${ARC} 100`} />
          <circle
            className={styles.progress}
            cx="50"
            cy="50"
            r="42"
            pathLength={100}
            stroke="url(#boost-gradient)"
            strokeDasharray={`${(ARC * value) / 100} 100`}
          />
          <circle className={styles.ticks} cx="50" cy="50" r="42" pathLength={100} strokeDasharray="0.5 4.5" />
        </g>
      </svg>
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>Boost</span>
    </motion.button>
  );
}
