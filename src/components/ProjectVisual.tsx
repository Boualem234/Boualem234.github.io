import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TbBrandGithub } from "react-icons/tb";
import type { Project } from "../data/projects";
import { both } from "../i18n/both";
import { useI18n } from "../i18n/context";
import Stable from "../i18n/Stable";
import BrowserFrame from "./BrowserFrame";
import styles from "./ProjectVisual.module.css";

type Props = {
  project: Project;
  /** Fait défiler les captures (ex. au survol de la carte). */
  playing?: boolean;
  sizes?: string;
  className?: string;
};

/** Captures d'un projet dans un cadre de navigateur ; encart texte si le projet n'en a pas. */
export default function ProjectVisual({ project, playing = false, sizes = "(min-width: 1000px) 50vw, 100vw", className }: Props) {
  const { pick } = useI18n();
  const [index, setIndex] = useState(project.cover);
  const images = project.images;

  useEffect(() => {
    if (!playing || images.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % images.length), 1300);
    return () => {
      window.clearInterval(id);
      setIndex(project.cover);
    };
  }, [playing, images.length, project.cover]);

  const image = images[index];

  // Pas de capture fournie : on ne fabrique pas d'image, on le dit simplement.
  if (!image) {
    return (
      <div className={[styles.noShot, className].filter(Boolean).join(" ")}>
        <p className={styles.noShotStack}>{project.stack.slice(0, 3).join(" · ")}</p>
        <p className={styles.noShotTitle}>
          <Stable text={both((u) => u.projects.noShot)} />
        </p>
        {project.github && (
          <p className={styles.noShotText}>
            <TbBrandGithub aria-hidden="true" />
            <Stable text={both((u) => u.projects.noShotText)} />
          </p>
        )}
      </div>
    );
  }

  return (
    <BrowserFrame title={pick(project.title)} className={className}>
      <AnimatePresence initial={false}>
        <motion.img
          key={image.src}
          className={styles.shot}
          src={image.src}
          srcSet={`${image.srcSm} 800w, ${image.src} ${image.width}w`}
          sizes={sizes}
          width={image.width}
          height={image.height}
          alt={pick(image.caption)}
          loading="lazy"
          decoding="async"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
    </BrowserFrame>
  );
}
