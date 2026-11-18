import { motion } from "motion/react";
import ScrollText from "../components/ScrollText";
import { both } from "../i18n/both";
import Stable from "../i18n/Stable";
import styles from "./About.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function About() {
  return (
    <section id="about" className={`section ${styles.about}`} aria-labelledby="about-title">
      <div className="container">
        <p className={styles.label} id="about-title">
          <span className="accent">01</span>
          <span className={styles.rule} />
          <Stable text={both((u) => u.about.label)} />
        </p>

        <ScrollText text={both((u) => u.about.statement)} className={styles.statement} />

        <motion.figure
          className={styles.quote}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <blockquote>
            <p className="serif">
              <Stable text={both((u) => u.about.quote)} block />
            </p>
          </blockquote>
          <figcaption>
            <span className={styles.quoteRule} />
            <Stable text={both((u) => u.about.quoteLabel)} />
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
