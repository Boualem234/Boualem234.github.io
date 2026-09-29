import { useLanguage } from "../i18n/LanguageContext";

/**
 * Represents the footer section of the website.
 *
 * @component
 */

const Footer = () => {
  const date = new Date();
  const currentYear = date.getFullYear();
  const { t } = useLanguage();

  return (
    <footer>
      {/* Signature */}
      <div className="footer-link">
        <p>
          <span>▷</span> {t.footer.madeBy} &copy; {currentYear}
        </p>
        <p>{t.footer.rights}</p>
        <p style={{ fontSize: "12px", opacity: 0.7 }}>{t.footer.template}</p>
      </div>
    </footer>
  );
};

export default Footer;
