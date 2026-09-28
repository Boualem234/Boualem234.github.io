import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";
import skills from "../../_data/skills.json";
import { useLanguage } from "../../i18n/LanguageContext";

const Competences = () => {
  const location = useLocation();
  const { lang, t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <main className="infoPage container">
        <PageHeader title={t.competencesPage.title} description={t.competencesPage.description} />
        <div className="skillsGrid">
          {skills.map((cat, i) => (
            <motion.section
              key={i}
              className="infoCard skillCard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <h3>{lang === "en" ? cat.title_en : cat.title_fr}</h3>
              <div className="skillBadges">
                {cat.skills.map((s, j) => (
                  <span key={j} className="technology">
                    {s}
                  </span>
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Competences;
