import { useRef, type MouseEvent, type ReactNode, type Ref } from "react";
import { Link } from "react-router";
import { motion, useSpring } from "motion/react";
import styles from "./Button.module.css";

type Props = {
  children: ReactNode;
  variant?: "primary" | "ghost";
  icon?: ReactNode;
  /** Mouvement de l'icône au survol : flèche qui file ou téléchargement qui descend. */
  iconHover?: "arrow" | "drop";
  /** Lien interne (react-router). */
  to?: string;
  href?: string;
  download?: boolean;
  external?: boolean;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  /** Le bouton suit légèrement le curseur. */
  magnetic?: boolean;
  className?: string;
};

const MotionLink = motion.create(Link);
const SPRING = { stiffness: 220, damping: 18, mass: 0.4 };

export default function Button({
  children,
  variant = "primary",
  icon,
  iconHover = "arrow",
  to,
  href,
  download,
  external,
  onClick,
  magnetic = false,
  className,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);

  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.22);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.32);
  };
  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const common = {
    className: [styles.button, styles[variant], styles[iconHover], className].filter(Boolean).join(" "),
    style: magnetic ? { x, y } : undefined,
    onMouseMove,
    onMouseLeave,
    onClick,
  };
  const content = (
    <>
      <span className={styles.label}>{children}</span>
      {icon && <span className={styles.icon}>{icon}</span>}
    </>
  );

  if (to) {
    return (
      <MotionLink ref={ref as Ref<HTMLAnchorElement>} to={to} {...common}>
        {content}
      </MotionLink>
    );
  }
  if (href) {
    return (
      <motion.a
        ref={ref as Ref<HTMLAnchorElement>}
        href={href}
        download={download || undefined}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        {...common}
      >
        {content}
      </motion.a>
    );
  }
  return (
    <motion.button ref={ref as Ref<HTMLButtonElement>} type="button" {...common}>
      {content}
    </motion.button>
  );
}
