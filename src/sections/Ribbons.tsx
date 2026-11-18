import Marquee from "../components/Marquee";
import { motifs } from "../data/interests";
import { stackMarquee } from "../data/skills";
import styles from "./Ribbons.module.css";

/** Icône de passion en alternance (basket, coiffure, jeux vidéo, lecture). */
function motifAt(index: number) {
  const { Icon } = motifs[index % motifs.length]!;
  return <Icon className={styles.motif} />;
}

/** Ruban défilant avec la stack. */
export default function Ribbons() {
  return (
    <div className={styles.ribbons} aria-hidden="true">
      <div className={`${styles.ribbon} ${styles.orange}`}>
        <Marquee items={stackMarquee} separator={motifAt} duration={40} />
      </div>
    </div>
  );
}
