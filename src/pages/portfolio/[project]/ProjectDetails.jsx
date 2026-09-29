import { useLayoutEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import PageNotFound from "../../404/PageNotFound";
import Carousel from "../../../components/Carousel";
import projects from "../../../_data/projects.json";
import Footer from "../../../components/Footer";
import { formatDate } from "../../../utils/formatDate";
import { useLanguage } from "../../../i18n/LanguageContext";

/**
 * Fiche projet minimaliste : barre haute (retour, titre, date, code),
 * galerie + infos en 2 colonnes, tient sur un écran desktop sans scroll.
 */
const ProjectDetails = () => {
  const { lang, t } = useLanguage();
  const { projectTitle } = useParams();

  // Arrivée garantie en haut : avant affichage, scroll instantané
  // (insensible au `scroll-behavior: smooth` global et aux chargements d'images).
  useLayoutEffect(() => {
    try {
      window.history.scrollRestoration = "manual";
    } catch {}
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    } catch {
      window.scrollTo(0, 0);
    }
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [projectTitle]);

  // Find the project in the data using the slug (fallback to title for old links)
  const project = projects.find(
    (project) => (project.slug || project.title.toLowerCase()) === projectTitle
  );

  if (!project) {
    return <PageNotFound />;
  }

  const displayTitle = lang === "en" ? project.title_en || project.title : project.title_fr || project.title;
  const displayDescription =
    lang === "en" ? project.description_en || project.description : project.description_fr || project.description;
  const displayBody = lang === "en" ? project.body_en || project.body : project.body_fr || project.body;

  return (
    <>
      <main className="container portfolio portfolioDetails">
        {/* Barre haute : retour, titre + date, lien code */}
        <motion.div
          className="detailTopbar"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link to="/#projets" className="detailBack" aria-label={t.project.goBack} title={t.project.goBack}>
            <FiArrowLeft />
          </Link>
          <div className="detailHeading">
            <h1 className="detailTitle">{displayTitle}</h1>
            {project.date && <span className="detailDate">{formatDate(project.date, lang)}</span>}
          </div>
        </motion.div>

        <motion.div
          className="projectDetails"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="row">
            <div className="projectImage">
              <Carousel
                images={
                  project.images && project.images.length > 0
                    ? project.images
                    : [project.image2 || project.image].filter(Boolean)
                }
                alt={displayTitle}
              />
            </div>
            <div className="projectBodyContainer">
              <p className="detailLede">{displayDescription}</p>
              <div className="tech">
                {project.technologies.map((technology, i) => (
                  <span key={i} className="technology">
                    {technology}
                  </span>
                ))}
              </div>
              <div className="projectBody">
                {displayBody.split("\n").map((paragraph, i) => (
                  <p className="paragraph" key={i}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {project.github && (
                <div className="projectLinks">
                  <a className="btn projectLinkBtn" href={project.github} target="_blank" rel="noreferrer">
                    {t.project.viewCode} <FiArrowUpRight className="arrow-icon" aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
};

export default ProjectDetails;
