import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import Image from "./Image";
import { useLanguage } from "../i18n/LanguageContext";

/**
 * Represents a project card component.
 *
 * Gentle entrance on page load (staggered, no scroll dependency):
 * all projects visible at once.
 * Layout handled by portfolio.css (no Bootstrap utilities dependency).
 *
 * @component
 * @param {string} title - The title of the project.
 * @param {string} image - The image source for the project thumbnail.
 * @param {number} id - The unique identifier of the project.
 * @param {number} index - The position in the list (stagger delay).
 */

const ProjectCard = ({ title, image, id, slug, index = 0 }) => {
  const { lang } = useLanguage();

  return (
    <Link to={`/portfolio/${slug || title.toLowerCase()}`} key={id} className="projectLink col-12 col-lg-4">
      <motion.div
        className="projectCard"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: Math.min(index, 8) * 0.07, ease: "easeOut" }}
      >
        <div className="textWrap">
          <h3 className="projectTitle">{title}</h3>
          <span className="viewWork">
            {lang === "fr" ? "Voir" : "View Work"} <FiArrowUpRight />
          </span>
        </div>
        <div className="imageContainer">
          <Image src={image} alt="Laptop displaying the application" />
        </div>
      </motion.div>
    </Link>
  );
};

export default ProjectCard;
