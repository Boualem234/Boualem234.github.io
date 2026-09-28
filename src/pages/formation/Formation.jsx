import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";
import formation from "../../_data/formation.json";
import { useLanguage } from "../../i18n/LanguageContext";

const Formation = () => {
  const location = useLocation();
  const { lang, t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <main className="infoPage container">
        <PageHeader title={t.formationPage.title} description={t.formationPage.description} />
        <div className="infoList">
          {formation.map((f, i) => (
            <motion.article
              key={i}
              className="infoCard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
            >
              <h3>{lang === "en" ? f.school_en : f.school_fr}</h3>
              <p className="infoDegree">{lang === "en" ? f.degree_en : f.degree_fr}</p>
              <p className="infoMeta">
                {lang === "en" ? f.location_en : f.location_fr} - {lang === "en" ? f.period_en : f.period_fr}
              </p>
            </motion.article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Formation;
