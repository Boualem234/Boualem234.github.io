import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { motion, useAnimate, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { TbArrowDown, TbArrowRight, TbDownload } from "react-icons/tb";
import Button from "../components/Button";
import Scissors from "../components/Scissors";
import { profile } from "../data/profile";
import { useIntroReady } from "../hooks/intro";
import { useScrollTo } from "../hooks/useScrollTo";
import { both } from "../i18n/both";
import { useI18n } from "../i18n/context";
import Stable from "../i18n/Stable";
import styles from "./Hero.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Le prénom, tranché par les ciseaux : les deux moitiés se décalent un instant puis se recollent. */
function CutName({ text, play }: { text: string; play: boolean }) {
  const [scope, animate] = useAnimate<HTMLSpanElement>();
  const reduce = useReducedMotion();
  const [cut, setCut] = useState(false);

  useEffect(() => {
    if (!play || reduce) return;
    let cancelled = false;
    const run = async () => {
      await animate("[data-letter]", { y: ["115%", "0%"] }, { duration: 0.9, delay: (i) => (i % text.length) * 0.05, ease: EASE });
      if (cancelled) return;
      await Promise.all([
        animate("[data-cut-line]", { scaleX: [0, 1] }, { duration: 0.65, ease: "easeInOut" }),
        animate("[data-cut-scissors]", { left: ["-2%", "104%"], opacity: [1, 1, 0] }, { duration: 0.7, ease: "easeInOut" }),
      ]);
      if (cancelled) return;
      // La ligne s'efface, les moitiés se décalent… puis se recollent : au repos, le nom est intact.
      setCut(true);
      animate("[data-cut-line]", { opacity: 0, scaleY: 0.3 }, { duration: 0.5, ease: "easeOut" });
      await new Promise((resolve) => setTimeout(resolve, 650));
      if (!cancelled) setCut(false);
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [play, reduce, animate, text.length]);

  const letters = (
    <>
      {text.split("").map((letter, i) => (
        <span key={i} className={styles.letter} data-letter style={reduce ? undefined : { transform: "translateY(115%)" }}>
          {letter}
        </span>
      ))}
    </>
  );

  return (
    <span ref={scope} className={`${styles.cutName} ${cut ? styles.isCut : ""}`} aria-hidden="true">
      <span className={styles.cutTop}>{letters}</span>
      <span className={styles.cutBottom}>{letters}</span>
      <span className={styles.cutLine} data-cut-line style={reduce ? undefined : { transform: "scaleX(0)" }} />
      <span className={styles.cutScissors} data-cut-scissors>
        <Scissors state="snip" />
      </span>
    </span>
  );
}

function Portrait({ alt, badge, ready }: { alt: string; badge: string; ready: boolean }) {
  const [spot, setSpot] = useState<{ x: number; y: number } | null>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpot({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const badgeText = badge.repeat(2);

  return (
    <div className={styles.portrait}>
      <motion.div
        className={styles.arch}
        onMouseMove={onMove}
        onMouseLeave={() => setSpot(null)}
        style={spot ? ({ "--mx": `${spot.x}px`, "--my": `${spot.y}px` } as CSSProperties) : undefined}
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={ready ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
        transition={{ duration: 1.2, delay: 0.25, ease: EASE }}
      >
        <div className={styles.archGlow} />
        <img className={styles.photo} src={profile.portrait} alt={alt} width={740} height={744} fetchPriority="high" />
        <img
          className={`${styles.photo} ${styles.photoColor} ${spot ? styles.photoColorOn : ""}`}
          src={profile.portraitColor}
          alt=""
          aria-hidden="true"
          width={740}
          height={744}
        />
      </motion.div>
      <motion.div
        className={styles.badge}
        aria-hidden="true"
        initial={{ scale: 0, rotate: -90 }}
        animate={ready ? { scale: 1, rotate: 0 } : undefined}
        transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
      >
        <svg viewBox="0 0 120 120" className={styles.badgeText}>
          <defs>
            <path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
          </defs>
          <text>
            <textPath href="#badge-circle" textLength="289">
              {badgeText}
            </textPath>
          </text>
        </svg>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const ready = useIntroReady();
  const { t } = useI18n();
  const scrollTo = useScrollTo();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const textY = useTransform(progress, [0, 1], ["0%", "-18%"]);
  const portraitY = useTransform(progress, [0, 1], ["0%", "14%"]);
  const fade = useTransform(progress, [0, 0.75], [1, 0]);

  const show = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <section id="accueil" ref={ref} className={styles.hero}>
      <div className={styles.grid} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <motion.div className={styles.text} style={{ y: textY, opacity: fade }}>
          <motion.p className={styles.status} {...show(0.1)}>
            <span className={styles.dot} />
            <strong>
              <Stable text={both((u) => u.hero.status)} />
            </strong>
            <span className={styles.statusDetail}>
              <Stable text={both((u) => u.hero.statusDetail)} />
            </span>
          </motion.p>

          <h1 className={styles.name}>
            <span className="visually-hidden">
              {profile.fullName} — {t.hero.role}
            </span>
            <CutName text={profile.firstName} play={ready} />
            <motion.span className={styles.lastName} aria-hidden="true" {...show(0.45)}>
              <span className="serif">{profile.lastName}</span>
            </motion.span>
          </h1>

          <motion.p className={styles.role} {...show(0.6)}>
            <Stable text={both((u) => u.hero.role)} />
            <span className={styles.roleStack}>{t.hero.stack}</span>
          </motion.p>

          <motion.p className={styles.lead} {...show(0.7)}>
            <Stable text={both((u) => u.hero.lead)} block />
          </motion.p>

          <motion.div className={styles.ctas} {...show(0.8)}>
            <Button magnetic icon={<TbArrowRight />} href="#projets" onClick={(e) => {
                e.preventDefault();
                scrollTo("projets");
              }}>
              <Stable text={both((u) => u.hero.ctaProjects)} />
            </Button>
            <Button variant="ghost" href={profile.cv} download icon={<TbDownload />} iconHover="drop">
              <Stable text={both((u) => u.hero.ctaCv)} />
            </Button>
          </motion.div>
        </motion.div>

        <motion.div className={styles.portraitCol} style={{ y: portraitY }}>
          <Portrait alt={t.hero.portraitAlt} badge={t.hero.badge} ready={ready} />
        </motion.div>
      </div>

      <motion.div className={`container ${styles.facts}`} {...show(1)}>
        <dl>
          {t.hero.facts.map((_, i) => (
            <div key={i} className={styles.fact}>
              <dt>
                <Stable text={both((u) => u.hero.facts[i]?.label ?? "")} />
              </dt>
              <dd>
                <Stable text={both((u) => u.hero.facts[i]?.value ?? "")} />
              </dd>
            </div>
          ))}
        </dl>
        <a href="#about" className={styles.scroll} onClick={(e) => {
            e.preventDefault();
            scrollTo("about");
          }}>
          <Stable text={both((u) => u.hero.scroll)} />
          <span className={styles.scrollIcon}>
            <TbArrowDown />
          </span>
        </a>
      </motion.div>
    </section>
  );
}
