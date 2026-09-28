import PageHeader from "../../components/PageHeader";
import Form from "../../components/Form";
import ContactInfo from "../../components/ContactInfo";
import Footer from "../../components/Footer";
import { useLanguage } from "../../i18n/LanguageContext";

/**
 * Represents the Contact page component.
 * Displays a contact form and contact information side by side.
 *
 * @component
 * @param {string} name - The name of the contact person.
 * @param {string} email - The email address of the contact person.
 * @param {string} location - The location of the contact person.
 */

const Contact = ({ name, email, location }) => {
  const { t } = useLanguage();
  return (
    <>
      {/* Main Contact Page */}
      <main className="contact container">
        {/* Display the page header */}
        <PageHeader title={t.contactPage.title} description={t.contactPage.description} />

        <div className="contactWrap">
          <div className="row">
            {/* Display the contact form */}
            <div className="col-12 col-lg-6">
              <Form />
            </div>

            {/* Display the contact information */}
            <div className="col-12 col-lg-6">
              <ContactInfo name={name} location={location} email={email} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
