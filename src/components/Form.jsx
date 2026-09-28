import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import validator from "email-validator";
import Button from "./Button";
import { useLanguage } from "../i18n/LanguageContext";

// Minimum human fill time (ms): faster submissions are treated as bots
const MIN_FILL_TIME_MS = 3000;

/**
 * Contact Form Component
 * ----------------------
 * This component represents a fully functional contact form.
 *
 * @component
 *
 * Form Submission API Key:
 * ------------------------
 * To enable form submissions, obtain your API Key from https://web3forms.com/
 *
 * Follow these steps:
 * 1. Create a .env file in the root directory.
 * 2. Copy and paste the following line into your .env file, replacing with your API key:
 *    REACT_APP_ACCESS_KEY="Your API Key"
 *
 */

const Form = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  // State for handling form submission statuses and errors
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  // Timestamp of form mount (bot time-trap, free anti-spam)
  const mountTime = useRef(Date.now());

  // State for form data (botcheck: honeypot natively handled by web3forms)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    botcheck: false,
    access_key: process.env.REACT_APP_ACCESS_KEY,
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle input focus to reset error state
  const handleInputFocus = (errorStateSetter) => {
    errorStateSetter(false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Silent bot rejection: honeypot checked or inhuman fill speed.
    // Show the same success state so bots learn nothing.
    if (formData.botcheck || Date.now() - mountTime.current < MIN_FILL_TIME_MS) {
      setSending(false);
      setSuccess(true);
      setFailed(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        botcheck: false,
        access_key: process.env.REACT_APP_ACCESS_KEY,
      });
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      return;
    }

    // Validate and set error states
    formData.name === "" ? setNameError(true) : setNameError(false);
    formData.email === "" || !validator.validate(formData.email) ? setEmailError(true) : setEmailError(false);
    formData.subject === "" ? setSubjectError(true) : setSubjectError(false);
    formData.message === "" ? setMessageError(true) : setMessageError(false);

    // Handle invalid form
    if (
      nameError ||
      emailError ||
      messageError ||
      subjectError ||
      !validator.validate(formData.email) ||
      formData.name === "" ||
      formData.email === "" ||
      formData.subject === "" ||
      formData.message === ""
    ) {
      setFormData({
        ...formData,
        email: "",
      });
      setSending(false);
      setFailed(true);
      return;
    }

    // Form submission in progress
    setSending(true);

    const data = JSON.stringify(formData);

    // Send form data to an API endpoint
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        // Form submission success
        setSending(false);
        setSuccess(true);
        setFailed(false);
        setFormData({
          ...formData,
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      })
      .catch(() => {
        // Form submission failed
        setSending(false);
        setFailed(true);
      });
  };

  // Determine button text based on status
  const handleButtonText = () => {
    if (sending) {
      return t.form.sending;
    } else if (success) {
      return t.form.sent;
    } else if (failed || nameError || messageError || emailError || subjectError) {
      return t.form.retry;
    } else {
      return t.form.send;
    }
  };

  return (
    <motion.form
      action=""
      ref={ref}
      className="contactForm"
      initial={{ y: "10vw", opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: "10vw", opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      onSubmit={handleSubmit}
    >
      <h4 className="contentTitle">{t.form.title}</h4>
      {/* Input fields */}
      <div className="col-12 col-md-6 formGroup">
        <input
          type="text"
          className={`formControl ${nameError ? "formError" : ""}`}
          onFocus={() => {
            handleInputFocus(setNameError);
          }}
          onChange={handleChange}
          value={formData.name}
          id="contactName"
          name="name"
          placeholder={`${nameError ? t.form.nameError : t.form.name}`}
          autoComplete="name"
        />
      </div>
      <div className="col-12 col-md-6 formGroup">
        <input
          type="text"
          className={`formControl ${emailError ? "formError" : ""}`}
          onFocus={() => {
            handleInputFocus(setEmailError);
          }}
          onChange={handleChange}
          value={formData.email}
          id="contactEmail"
          name="email"
          placeholder={`${emailError ? t.form.emailError : t.form.email}`}
          autoComplete="email"
        />
      </div>
      <div className="col-12 formGroup">
        <input
          type="text"
          className={`formControl ${subjectError ? "formError" : ""}`}
          onFocus={() => {
            handleInputFocus(setSubjectError);
          }}
          onChange={handleChange}
          value={formData.subject}
          id="contactSubject"
          name="subject"
          placeholder={`${subjectError ? t.form.subjectError : t.form.subject}`}
          autoComplete="off"
        />
      </div>
      <div className="col-12 formGroup">
        <textarea
          className={`formControl ${messageError ? "formError" : ""}`}
          onFocus={() => {
            handleInputFocus(setMessageError);
          }}
          onChange={handleChange}
          value={formData.message}
          name="message"
          id="contactMessage"
          rows="5"
          placeholder={`${messageError ? t.form.messageError : t.form.message}`}
          autoComplete="off"
        ></textarea>
      </div>
      {/* Honeypot: invisible to humans, bots fill it and get silently rejected */}
      <input
        type="checkbox"
        name="botcheck"
        checked={formData.botcheck}
        onChange={(e) => setFormData({ ...formData, botcheck: e.target.checked })}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          opacity: 0,
        }}
      />
      {/* Form submission button */}
      <motion.div className="col-12 formGroup formSubmit">
        <Button
          name={handleButtonText()}
          disabled={nameError || messageError || emailError || subjectError || sending || success}
        />
      </motion.div>
    </motion.form>
  );
};

export default Form;
