import { useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { TbArrowRight, TbArrowUpRight, TbBrandGithub, TbLock } from "react-icons/tb";
import Button from "../components/Button";
import ProjectVisual from "../components/ProjectVisual";
import SectionHeading from "../components/SectionHeading";
import { projects, type Project } from "../data/projects";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { both } from "../i18n/both";
import Stable from "../i18n/Stable";
import styles from "./Projects.module.css";

type CardProps = {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  stacked: boolean;
};

function ProjectCard({ project, index, total, progress, stacked }: CardProps) {
  const [hover, setHover] = useState(false);
  // Les cartes déjà passées reculent légèrement sous la suivante.
  const targetScale = 1 - (total - 1 - index) * 0.035;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const dim = useTransform(progress, [index / total, (index + 1) / total], [0, index === total - 1 ? 0 : 0.35]);

  return (
    <div className={styles.slot} style={{ "--i": index, "--project": project.accent } as CSSProperties}>
      <motion.article
        className={styles.card}
        style={{ scale: stacked ? scale : 1 }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className={styles.info}>
          <p className={styles.meta}>
            <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
            <Stable text={project.kind} />
            <span className={styles.year}>{project.year}</span>
          </p>
          <h3 className={styles.title}>
            <Link to={`/projets/${project.slug}`}>
              <Stable text={project.title} />
            </Link>
          </h3>
          <p className={styles.summary}>
            <Stable text={project.summary} block />
          </p>
          <ul className={styles.tags} aria-label="Stack">
            {project.stack.slice(0, 5).map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
            {project.stack.length > 5 && <li className={styles.more}>+{project.stack.length - 5}</li>}
          </ul>
          <div className={styles.actions}>
            <Button to={`/projets/${project.slug}`} icon={<TbArrowRight />}>
              <Stable text={both((u) => u.projects.caseStudy)} />
            </Button>
            {project.github ? (
              <a className={styles.code} href={project.github} target="_blank" rel="noreferrer">
                <TbBrandGithub aria-hidden="true" />
                <Stable text={both((u) => u.projects.code)} />
                <TbArrowUpRight aria-hidden="true" />
              </a>
            ) : (
              <span className={`${styles.code} ${styles.private}`}>
                <TbLock aria-hidden="true" />
                <Stable text={both((u) => u.projects.privateCode)} />
              </span>
            )}
          </div>
        </div>

        <Link to={`/projets/${project.slug}`} className={styles.visual} tabIndex={-1} aria-hidden="true">
          <ProjectVisual project={project} playing={hover} className={styles.frame} />
        </Link>

        {stacked && <motion.div className={styles.shade} style={{ opacity: dim }} aria-hidden="true" />}
      </motion.article>
    </div>
  );
}

export default function Projects() {
  const listRef = useRef<HTMLDivElement>(null);
  const stacked = useMediaQuery("(min-width: 900px)");
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start start", "end end"] });

  return (
    <section id="projets" className="section" aria-labelledby="projects-heading">
      <div className="container">
        <SectionHeading
          id="projects-heading"
          index="03"
          copy={(u) => u.projects}
        />
        <div ref={listRef} className={`${styles.list} ${stacked ? styles.stacked : ""}`}>
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              total={projects.length}
              progress={scrollYProgress}
              stacked={stacked}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
