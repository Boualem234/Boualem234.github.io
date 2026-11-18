import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import InterestIcon from "../components/InterestIcon";
import SectionHeading from "../components/SectionHeading";
import { interests, type Interest } from "../data/interests";
import { useMediaQuery } from "../hooks/useMediaQuery";
import Stable from "../i18n/Stable";
import styles from "./Beyond.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

function InterestCard({ interest, index }: { interest: Interest; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const canHover = useMediaQuery("(hover: hover)");
  const inView = useInView(ref, { once: true, margin: "0px 0px -25% 0px" });
  const [hovered, setHovered] = useState(false);
  const [introOver, setIntroOver] = useState(false);
  // Sur écran tactile, l'animation se joue une fois à l'apparition de la carte.
  const intro = inView && !canHover && !introOver;

  useEffect(() => {
    if (!intro) return;
    const id = window.setTimeout(() => setIntroOver(true), 3000);
    return () => window.clearTimeout(id);
  }, [intro]);

  return (
    <motion.li
      ref={ref}
      className={`${styles.card} ${styles[interest.id]} ${hovered || intro ? "play" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
    >
      <div className={styles.art}>
        <InterestIcon id={interest.id} />
      </div>
      <h3>
        <Stable text={interest.title} />
      </h3>
    </motion.li>
  );
}

export default function Beyond() {

  return (
    <section id="hors-code" className="section" aria-labelledby="beyond-heading">
      <div className="container">
        <SectionHeading
          id="beyond-heading"
          index="06"
          copy={(u) => u.beyond}
        />
        <ul className={styles.grid}>
          {interests.map((interest, i) => (
            <InterestCard key={interest.id} interest={interest} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
