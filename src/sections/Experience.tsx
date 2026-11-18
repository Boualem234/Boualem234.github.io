import { useState } from "react";
import { motion } from "motion/react";
import { TbArrowRight, TbMaximize } from "react-icons/tb";
import BrowserFrame from "../components/BrowserFrame";
import Button from "../components/Button";
import Lightbox from "../components/Lightbox";
import SectionHeading from "../components/SectionHeading";
import { findProject, type ProjectImage } from "../data/projects";
import { both } from "../i18n/both";
import { useI18n } from "../i18n/context";
import Stable from "../i18n/Stable";
import styles from "./Experience.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -12% 0px" },
  transition: { duration: 0.8, delay, ease: EASE },
});

/** Captures réelles du stage : l'écran de scan et le suivi d'un essai en cours. */
const AUEM = findProject("suivi-atelier-auem");
const SHOTS = [1, 2].map((i) => AUEM?.images[i]).filter((image): image is ProjectImage => Boolean(image));

export default function Experience() {
  const { t, pick } = useI18n();
  const e = t.experience;
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id="experience" className="section" aria-labelledby="experience-heading">
      <div className="container">
        <SectionHeading id="experience-heading" index="02" copy={(u) => u.experience} />

        <div className={styles.top}>
          <motion.div className={styles.intro} {...reveal()}>
            <div className={styles.role}>
              <p className={styles.roleTitle}>
                <Stable text={both((u) => u.experience.role)} />
              </p>
              <p className={styles.roleMeta}>
                <Stable text={both((u) => `${u.experience.place} · ${u.experience.period}`)} />
              </p>
            </div>

            <p className={styles.introText}>
              <Stable text={both((u) => u.experience.intro)} block />
            </p>

            <p className={styles.stackLabel}>
              <Stable text={both((u) => u.experience.stackLabel)} />
            </p>
            <ul className={styles.stack}>
              {AUEM?.stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div className={styles.shots} {...reveal(0.15)}>
            <p className={styles.shotsLabel}>
              <Stable text={both((u) => u.experience.shotsLabel)} />
            </p>
            {SHOTS.map((image, i) => (
              <figure key={image.src} className={styles.shot}>
                <button type="button" onClick={() => setLightbox(i)} aria-label={`${t.lightbox.open} : ${pick(image.caption)}`}>
                  <BrowserFrame>
                    <img
                      src={image.src}
                      width={image.width}
                      height={image.height}
                      alt={pick(image.caption)}
                      loading="lazy"
                      decoding="async"
                    />
                  </BrowserFrame>
                  <span className={styles.zoom} aria-hidden="true">
                    <TbMaximize />
                  </span>
                </button>
                <figcaption>
                  <span className={styles.shotIndex}>{String(i + 1).padStart(2, "0")}</span>
                  <Stable text={image.caption} />
                </figcaption>
              </figure>
            ))}
          </motion.div>
        </div>

        <div className={styles.highlights}>
          <motion.h3 className={styles.highlightsTitle} {...reveal()}>
            <Stable text={both((u) => u.experience.highlightsTitle)} />
          </motion.h3>
          <ol className={styles.highlightList}>
            {e.highlights.map((_, i) => (
              <motion.li key={i} className={styles.highlight} {...reveal(0.06 * i)}>
                <span className={styles.highlightIndex}>{String(i + 1).padStart(2, "0")}</span>
                <h4>
                  <Stable text={both((u) => u.experience.highlights[i]?.title ?? "")} block />
                </h4>
                <p>
                  <Stable text={both((u) => u.experience.highlights[i]?.text ?? "")} block />
                </p>
              </motion.li>
            ))}
          </ol>
          <motion.div className={styles.cta} {...reveal()}>
            <Button to="/projets/suivi-atelier-auem" icon={<TbArrowRight />} magnetic>
              <Stable text={both((u) => u.experience.caseStudy)} />
            </Button>
          </motion.div>
        </div>

        <motion.div className={styles.other} {...reveal()}>
          <p className={styles.otherLabel}>
            <Stable text={both((u) => u.experience.otherTitle)} />
          </p>
          <div className={styles.otherRow}>
            <p className={styles.otherRole}>
              <Stable text={both((u) => u.experience.other.role)} /> <span className={styles.otherCompany}>· {e.other.company}</span>
            </p>
            <p className={styles.otherMeta}>
              {e.other.place} · {e.other.period}
            </p>
            <p className={styles.otherText}>
              <Stable text={both((u) => u.experience.other.text)} block />
            </p>
          </div>
        </motion.div>
      </div>
      <Lightbox images={SHOTS} index={lightbox} onChange={setLightbox} />
    </section>
  );
}
