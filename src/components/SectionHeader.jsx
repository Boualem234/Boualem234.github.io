import { motion } from "framer-motion";

const SectionHeader = ({ title, description }) => (
  <div className="sectionHeader">
    <motion.p
      className="pageDescription"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
    >
      {description}
    </motion.p>
    <motion.h2
      className="pageTitle"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {title}
    </motion.h2>
  </div>
);

export default SectionHeader;
