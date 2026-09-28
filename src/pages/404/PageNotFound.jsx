import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";
import { useLanguage } from "../../i18n/LanguageContext";

/**
 * Represents the 404 Page Not Found component.
 * This component is displayed when a user tries to access a non-existent page.
 *
 * @component
 */

const PageNotFound = () => {
  const { t } = useLanguage();
  return (
    <main className="error">
      {/* Display the page header */}
      <PageHeader title={t.notFound.title} description={t.notFound.description} />

      <div className="error-description">
        <div className="row">
          <div className="col">
            {/* Display a message indicating the page was not found */}
            <p>{t.notFound.p1}</p>
            <p>{t.notFound.p2}</p>

            {/* Provide a link back to the home page */}
            <Link to="/" className="home">
              <Button name={t.notFound.button} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PageNotFound;
