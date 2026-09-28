import ProjectCard from "./ProjectCard";
import projects from "../_data/projects.json";
import { useLanguage } from "../i18n/LanguageContext";

/**
 * Represents a list of project cards.
 *
 * This component maps over the projects data and generates
 * a ProjectCard component for each project.
 *
 * @component
 */

const ProjectList = () => {
  const { lang } = useLanguage();
  // Most recent first (date "YYYY-MM"); tie-break: higher id first (bibliboua before monstres)
  const sorted = [...projects].sort(
    (a, b) => (b.date || "").localeCompare(a.date || "") || Number(b.id) - Number(a.id)
  );
  return sorted.map((project, i) => (
    <ProjectCard
      key={project.id}
      title={lang === "en" ? project.title_en || project.title : project.title_fr || project.title}
      slug={project.slug || project.title.toLowerCase()}
      image={project.image}
      id={project.id}
      index={i}
    />
  ));
};

export default ProjectList;
