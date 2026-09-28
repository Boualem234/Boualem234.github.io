import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";
import experience from "../../_data/experience.json";
import { useLanguage } from "../../i18n/LanguageContext";

const Experience = () => {
  const location = useLocation();
  const { lang, t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <main className="infoPage container">
        <PageHeader title={t.experiencePage.title} description={t.experiencePage.description} />
        <div className="infoList">
          {experience.map((job, i) => (
            <motion.article
              key={i}
              className="infoCard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
            >
              <h3>
                {lang === "en" ? job.role_en : job.role_fr} - {job.company}
              </h3>
              <p className="infoMeta">
                {lang === "en" ? job.location_en : job.location_fr} - {lang === "en" ? job.period_en : job.period_fr}
              </p>
              <ul className="infoBullets">
                {(lang === "en" ? job.bullets_en : job.bullets_fr).map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
              {job.projectSlug && (
                <Link to={`/portfolio/${job.projectSlug}`} className="infoLink">
                  {lang === "en" ? "View linked project" : "Voir le projet lié"} <FiArrowUpRight />
                </Link>
              )}
            </motion.article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Experience;
