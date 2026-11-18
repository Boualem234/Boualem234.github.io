import { useState, type CSSProperties } from "react";
import { Link, useParams } from "react-router";
import { motion } from "motion/react";
import { TbArrowLeft, TbArrowRight, TbArrowUpRight, TbBrandGithub, TbLock, TbMaximize } from "react-icons/tb";
import Footer from "../components/Footer";
import Lightbox from "../components/Lightbox";
import ProjectVisual from "../components/ProjectVisual";
import { findProject, projects } from "../data/projects";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { both } from "../i18n/both";
import { useI18n } from "../i18n/context";
import Stable from "../i18n/Stable";
import NotFoundPage from "./NotFoundPage";
import styles from "./ProjectPage.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -10% 0px" },
  transition: { duration: 0.8, delay, ease: EASE },
});

export default function ProjectPage() {
  const { slug } = useParams();
  const project = findProject(slug);
  return project ? <ProjectDetails key={project.slug} slug={project.slug} /> : <NotFoundPage />;
}

function ProjectDetails({ slug }: { slug: string }) {
  const { t, pick } = useI18n();
  const index = projects.findIndex((item) => item.slug === slug);
  const project = projects[index]!;
  const next = projects[(index + 1) % projects.length]!;
  const [lightbox, setLightbox] = useState<number | null>(null);
  const title = pick(project.title);

  useDocumentTitle(`${title} — Boualem El Guendouz`);

  return (
    <>
      <main id="main" className={styles.page} style={{ "--project": project.accent } as CSSProperties}>
        <div className={styles.glow} aria-hidden="true" />
        <div className="container">
          <Link to="/#projets" className={styles.back}>
            <TbArrowLeft aria-hidden="true" />
            <Stable text={both((u) => u.projectPage.back)} />
          </Link>

          <header className={styles.header}>
            <motion.p className={styles.kind} {...reveal()}>
              <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
              <Stable text={project.kind} />
            </motion.p>
            <motion.h1 className={styles.title} {...reveal(0.05)}>
              <Stable text={project.title} block />
            </motion.h1>
            <motion.p className={styles.summary} {...reveal(0.1)}>
              <Stable text={project.summary} block />
            </motion.p>

            <motion.dl className={styles.facts} {...reveal(0.15)}>
              <div>
                <dt><Stable text={both((u) => u.projectPage.year)} /></dt>
                <dd>
                  <Stable text={project.period} />
                </dd>
              </div>
              {project.team && (
                <div>
                  <dt><Stable text={both((u) => u.projectPage.team)} /></dt>
                  <dd>
                    <Stable text={project.team} />
                  </dd>
                </div>
              )}
              <div>
                <dt><Stable text={both((u) => u.projectPage.type)} /></dt>
                <dd>
                  <Stable text={project.kind} />
                </dd>
              </div>
              <div>
                <dt><Stable text={both((u) => u.projectPage.links)} /></dt>
                <dd>
                  {project.github ? (
                    <a href={project.github} target="_blank" rel="noreferrer" className={styles.link}>
                      <TbBrandGithub aria-hidden="true" />
                      GitHub
                      <TbArrowUpRight aria-hidden="true" />
                    </a>
                  ) : (
                    <span className={styles.private}>
                      <TbLock aria-hidden="true" />
                      <Stable text={both((u) => u.projects.privateCode)} />
                    </span>
                  )}
                </dd>
              </div>
            </motion.dl>
          </header>

          <motion.div className={styles.cover} {...reveal(0.2)}>
            <ProjectVisual
              project={project}
              sizes="(min-width: 1240px) 1240px, 100vw"
              className={project.images.length > 0 ? styles.coverFrame : undefined}
            />
          </motion.div>

          <section className={styles.story}>
            <motion.div {...reveal()}>
              <h2 className={styles.h2}><Stable text={both((u) => u.projectPage.context)} /></h2>
              <p className={styles.context}>
                <Stable text={project.context} block />
              </p>
            </motion.div>
            <motion.div {...reveal(0.1)}>
              <h2 className={styles.h2}><Stable text={both((u) => u.projectPage.done)} /></h2>
              <ol className={styles.highlights}>
                {project.highlights.fr.map((_, i) => (
                  <li key={i}>
                    <span className={styles.highlightIndex}>{String(i + 1).padStart(2, "0")}</span>
                    <p>
                      <Stable text={{ fr: project.highlights.fr[i] ?? "", en: project.highlights.en[i] ?? "" }} block />
                    </p>
                  </li>
                ))}
              </ol>
            </motion.div>
          </section>

          <motion.section className={styles.block} {...reveal()}>
            <h2 className={styles.h2}><Stable text={both((u) => u.projectPage.stack)} /></h2>
            <ul className={styles.stack}>
              {project.stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </motion.section>

          {project.images.length > 0 && (
            <section className={styles.block}>
              <motion.h2 className={styles.h2} {...reveal()}>
                <Stable text={both((u) => u.projectPage.gallery)} />
                <span className={styles.count}>{project.images.length}</span>
              </motion.h2>
              <div className={styles.gallery}>
                {project.images.map((image, i) => (
                  <motion.figure key={image.src} className={styles.shot} {...reveal((i % 2) * 0.08)}>
                    <button type="button" onClick={() => setLightbox(i)} aria-label={`${t.lightbox.open} : ${pick(image.caption)}`}>
                      <img
                        src={image.srcSm}
                        srcSet={`${image.srcSm} 800w, ${image.src} ${image.width}w`}
                        sizes="(min-width: 900px) 600px, 100vw"
                        width={image.width}
                        height={image.height}
                        alt={pick(image.caption)}
                        loading="lazy"
                        decoding="async"
                      />
                      <span className={styles.zoom} aria-hidden="true">
                        <TbMaximize />
                      </span>
                    </button>
                    <figcaption>
                      <span className={styles.shotIndex}>{String(i + 1).padStart(2, "0")}</span>
                      <Stable text={image.caption} />
                    </figcaption>
                  </motion.figure>
                ))}
              </div>
            </section>
          )}

          <Link to={`/projets/${next.slug}`} className={styles.next} style={{ "--next": next.accent } as CSSProperties}>
            <span className={styles.nextLabel}>
              <Stable text={both((u) => u.projectPage.next)} />
            </span>
            <span className={styles.nextTitle}>
              <Stable text={next.title} />
              <TbArrowRight aria-hidden="true" />
            </span>
          </Link>
        </div>
      </main>
      <Footer />
      <Lightbox images={project.images} index={lightbox} onChange={setLightbox} />
    </>
  );
}
