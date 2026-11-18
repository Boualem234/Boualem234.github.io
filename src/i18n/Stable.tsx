import { useI18n, type Localized } from "./context";
import styles from "./Stable.module.css";

type StackProps = {
  items: string[];
  active: number;
  /** Bloc (paragraphe, titre) plutôt qu'en ligne. */
  block?: boolean;
  className?: string;
};

/**
 * Superpose plusieurs textes dans la même case et n'affiche que l'actif :
 * la case garde la taille du plus long, rien ne bouge quand le texte change.
 */
export function StableStack({ items, active, block = false, className }: StackProps) {
  return (
    <span className={[styles.stack, block && styles.block, className].filter(Boolean).join(" ")}>
      {items.map((item, i) => (
        <span key={i} className={i === active ? undefined : styles.ghost} aria-hidden={i !== active || undefined}>
          {item}
        </span>
      ))}
    </span>
  );
}

/** Texte traduit qui réserve la place de sa version la plus longue (FR ou EN). */
export default function Stable({ text, block, className }: { text: Localized; block?: boolean; className?: string }) {
  const { lang } = useI18n();
  return <StableStack items={[text.fr, text.en]} active={lang === "fr" ? 0 : 1} block={block} className={className} />;
}
