import { useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import PageHeader from "../../../components/PageHeader";
import PageNotFound from "../../404/PageNotFound";
import Carousel from "../../../components/Carousel";
import projects from "../../../_data/projects.json";
import Footer from "../../../components/Footer";
import { useLanguage } from "../../../i18n/LanguageContext";

/**
 * Represents the ProjectDetails page component.
 * Displays details of a specific project.
 *
 * @component
 */

const ProjectDetails = () => {
  // Get the current location using React Router's useLocation hook
  const location = useLocation();
  const { lang, t } = useLanguage();

  // Scroll to the top of the page when the location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Get the project title from the route parameters
  const { projectTitle } = useParams();

  // Find the project in the data using the slug (fallback to title for old links)
  const project = projects.find(
    (project) => (project.slug || project.title.toLowerCase()) === projectTitle
  );

  // If the project is not found, display the PageNotFound component
  if (!project) {
    return <PageNotFound />;
  }

  const displayTitle = lang === "en" ? project.title_en || project.title : project.title_fr || project.title;
  const displayDescription =
    lang === "en" ? project.description_en || project.description : project.description_fr || project.description;
  const displayBody = lang === "en" ? project.body_en || project.body : project.body_fr || project.body;

  return (
    <>
      <main className="container portfolio">
        {/* Back arrow at top left */}
        <motion.div
          style={{ display: "flex", justifyContent: "flex-start", width: "100%", marginTop: "30px", marginBottom: "10px" }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/portfolio" aria-label={t.project.goBack} title={t.project.goBack}>
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                border: "1px solid var(--hl-color)",
                color: "var(--text-color)",
                fontSize: "22px",
              }}
            >
              <FiArrowLeft />
            </motion.span>
          </Link>
        </motion.div>
        {/* Display the page header with project title and description */}
        <PageHeader title={displayTitle} description={displayDescription} />
        <div className="projectDetails">
          <div className="row">
            <div className="col-12 col-xl-5 projectImage">
              {/* Carrousel d'images du projet */}
              <Carousel images={project.images && project.images.length > 0 ? project.images : [project.image2 || project.image].filter(Boolean)} alt={displayTitle} />
            </div>
            <div className="col-12 col-xl-7 projectBodyContainer">
              <div className="tech">
                {/* Display project technologies with animation */}
                {project.technologies.map((technology, i) => (
                  <motion.span
                    key={i}
                    className="technology"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: "easeInOut" }}
                  >
                    {technology + " "}
                  </motion.span>
                ))}
              </div>

              <div className="projectBody">
                {/* Display project body paragraphs with animation */}
                {displayBody.split("\n").map((paragraph, i) => (
                  <motion.p
                    className="paragraph"
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.3, ease: "easeInOut" }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProjectDetails;
