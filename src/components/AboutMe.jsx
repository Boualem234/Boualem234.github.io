import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "../i18n/LanguageContext";

/**
 * Represents the About Me section.
 * Displays information about the user.
 * Not currently in use.
 *
 * @component
 * @param {string} name - The name of the user.
 */

const AboutMe = () => {
  const { t } = useLanguage();
  // Using react-intersection-observer to determine if the component is in view
  const [ref, inView] = useInView({
    threshold: 0.4,
    triggerOnce: true,
  });

  // Variants for staggered animations
  const staggerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  // Variants for paragraph animations
  const paragraphVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section className="about aboutSingle" ref={ref}>
      <div className="aboutContainer container">
        <div className="row">
          <div className="personalInfo col-12">
            <motion.div
              className="contentContainer"
              variants={staggerVariants}
              initial="initial"
              animate={inView ? "animate" : "initial"}
            >
              {/* Display greeting and job title with animation */}
              <motion.h4 variants={paragraphVariants}>{t.about.greeting}</motion.h4>
              <motion.h5 variants={paragraphVariants}>{t.about.role}</motion.h5>

              {/* Display content description with animation */}
              <motion.div
                className="contentDescription"
                variants={staggerVariants}
                initial="initial"
                animate={inView ? "animate" : "initial"}
              >
                {/* Paragraphs with animation */}
                <motion.p variants={paragraphVariants}>{t.about.p1}</motion.p>
                <br />
                <motion.p variants={paragraphVariants}>{t.about.p2}</motion.p>
                <br />
                <motion.p variants={paragraphVariants}>{t.about.p3}</motion.p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
