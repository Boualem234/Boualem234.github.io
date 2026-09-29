import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import Hero from "../../components/Hero";
import AboutMe from "../../components/AboutMe";
import SectionHeader from "../../components/SectionHeader";
import ProjectList from "../../components/ProjectList";
import ContactInfo from "../../components/ContactInfo";
import Footer from "../../components/Footer";
import experience from "../../_data/experience.json";
import formation from "../../_data/formation.json";
import skills from "../../_data/skills.json";
import { useLanguage } from "../../i18n/LanguageContext";

/**
 * Page unique : Accueil > Expérience > Formation > Compétences > Projets > Contact.
 * La barre de navigation scrolle vers les ancres au lieu de changer d'onglet.
 */
const HomePage = ({ name, location, email }) => {
  const { hash } = useLocation();
  const { lang, t } = useLanguage();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [hash]);

  return (
    <>
      <main className="singlePage container">
        {/* ACCUEIL : une seule photo (dans Hero), texte À propos sans image */}
        <section id="accueil" className="homeSection homeHero">
          <Hero name={name} />
          <AboutMe />
        </section>

        {/* EXPÉRIENCE */}
        <section id="experience" className="homeSection">
          <SectionHeader title={t.experiencePage.title} description={t.experiencePage.description} />
          <div className="infoList">
            {experience.map((job, i) => (
              <motion.article
                key={i}
                className="infoCard"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.1, 0.3) }}
              >
                <h3>
                  {lang === "en" ? job.role_en : job.role_fr} - {job.company}
                </h3>
                <p className="infoMeta">
                  {lang === "en" ? job.location_en : job.location_fr} -{" "}
                  {lang === "en" ? job.period_en : job.period_fr}
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
        </section>

        {/* FORMATION */}
        <section id="formation" className="homeSection">
          <SectionHeader title={t.formationPage.title} description={t.formationPage.description} />
          <div className="infoList">
            {formation.map((f, i) => (
              <motion.article
                key={i}
                className="infoCard"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.1, 0.3) }}
              >
                <h3>{lang === "en" ? f.school_en : f.school_fr}</h3>
                <p className="infoDegree">{lang === "en" ? f.degree_en : f.degree_fr}</p>
                <p className="infoMeta">
                  {lang === "en" ? f.location_en : f.location_fr} -{" "}
                  {lang === "en" ? f.period_en : f.period_fr}
                </p>
              </motion.article>
            ))}
          </div>
        </section>

        {/* COMPÉTENCES */}
        <section id="competences" className="homeSection">
          <SectionHeader title={t.competencesPage.title} description={t.competencesPage.description} />
          <div className="skillsGrid">
            {skills.map((cat, i) => (
              <motion.div
                key={i}
                className="infoCard skillCard"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.08, 0.3) }}
              >
                <h3>{lang === "en" ? cat.title_en : cat.title_fr}</h3>
                <div className="skillBadges">
                  {cat.skills.map((s, j) => (
                    <span key={j} className="technology">
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PROJETS */}
        <section id="projets" className="homeSection">
          <SectionHeader title={t.portfolioPage.title} description={t.portfolioPage.description} />
          <div className="row">
            <ProjectList />
          </div>
        </section>

        {/* CONTACT : infos + bouton mailto, sans service tiers */}
        <section id="contact" className="homeSection">
          <SectionHeader title={t.contactPage.title} description={t.contactPage.description} />
          <div className="contactWrap contactSingle">
            <ContactInfo name={name} location={location} email={email} />
            <a className="btn contactMailBtn" href={`mailto:${email}`}>
              {t.contactPage.writeMe}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
