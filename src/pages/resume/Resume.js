import PageHeader from "../../components/PageHeader";
import { useLanguage } from "../../i18n/LanguageContext";

const Resume = ({ brand }) => {
  const { t } = useLanguage();
  return (
    <section className="resume container">
      <PageHeader title={t.resumePage.title} description={t.resumePage.description} />
      <p className="brand">{brand}</p>
    </section>
  );
};

export default Resume;
