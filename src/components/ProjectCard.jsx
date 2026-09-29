import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import Image from "./Image";
import { formatDate } from "../utils/formatDate";
import { useLanguage } from "../i18n/LanguageContext";

const MAX_TECH = 4;

/**
 * Ligne projet minimaliste : miniature, titre, description, date,
 * 4 technos max, lien détails + lien code direct (sans ouvrir la fiche).
 */
const ProjectCard = ({ title, description, date, technologies = [], image, id, slug, github, index = 0 }) => {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const shown = technologies.slice(0, MAX_TECH);
  const extra = technologies.length - shown.length;
  const to = `/portfolio/${slug || title.toLowerCase()}`;

  return (
    <motion.article
      className="projectCard projectRow"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: Math.min(index, 8) * 0.05, ease: "easeOut" }}
      onClick={() => navigate(to)}
    >
      <div className="projectThumb" aria-hidden="true">
        <Image src={image} alt="" />
      </div>
      <div className="projectText">
        <div className="projectTop">
          <h3 className="projectTitle">{title}</h3>
          {date && <span className="projectDate">{formatDate(date, lang)}</span>}
        </div>
        {description && <p className="projectDesc">{description}</p>}
        {shown.length > 0 && (
          <div className="projectRowTech">
            {shown.map((tech, i) => (
              <span key={i} className="technology">
                {tech}
              </span>
            ))}
            {extra > 0 && <span className="technology technologyMore">+{extra}</span>}
          </div>
        )}
        <div className="projectActions">
          <Link to={to} className="viewWork" onClick={(e) => e.stopPropagation()}>
            {t.project.viewDetails} <FiArrowUpRight />
          </Link>
          {github && (
            <a
              className="codeLink"
              href={github}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`${t.project.viewCode} - ${title}`}
            >
              <FiGithub aria-hidden="true" /> Code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
