import { TbArrowLeft } from "react-icons/tb";
import Button from "../components/Button";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { both } from "../i18n/both";
import Stable from "../i18n/Stable";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  useDocumentTitle(`404 — Boualem El Guendouz`);

  return (
    <main id="main" className={styles.page}>
      <div className={`container ${styles.inner}`}>
        {/* « 404 » dont le zéro est un ballon de basket qui rebondit */}
        <p className={styles.code}>
          <span className="visually-hidden">404</span>
          <span aria-hidden="true">4</span>
          <span className={styles.court} aria-hidden="true">
            <svg viewBox="0 0 100 100" className={styles.ball}>
              <g className={styles.spin}>
                <circle cx="50" cy="50" r="46" className={styles.ballFill} />
                <path d="M4 50 H96 M50 4 V96 M17 17 Q38 50 17 83 M83 17 Q62 50 83 83" className={styles.seams} />
              </g>
            </svg>
            <span className={styles.shadow} />
          </span>
          <span aria-hidden="true">4</span>
        </p>
        <h1 className={styles.title}>
          <Stable text={both((u) => u.notFound.title)} />
        </h1>
        <p className={styles.text}>
          <Stable text={both((u) => u.notFound.text)} block />
        </p>
        <Button to="/" variant="primary" icon={<TbArrowLeft />}>
          <Stable text={both((u) => u.notFound.back)} />
        </Button>
      </div>
    </main>
  );
}
