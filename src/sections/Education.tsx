import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useMotionValueEvent, useReducedMotion } from "motion/react";
import { TbSchool, TbWorld } from "react-icons/tb";
import CountUp from "../components/CountUp";
import SectionHeading from "../components/SectionHeading";
import { education, exchangeDistanceKm } from "../data/education";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { both } from "../i18n/both";
import { useI18n, type Lang } from "../i18n/context";
import Stable from "../i18n/Stable";
import styles from "./Education.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

/** « 5 223 » : l'espace fine (U+202F) de fr-BE n'existe pas dans la police, on prend une insécable. */
const formatKm = (n: number, lang: Lang) => n.toLocaleString(lang === "fr" ? "fr-BE" : "en-GB").replace(/\u202f/g, "\u00a0");

/** Deux cadrages : large sur desktop, plus haut sur mobile pour garder un texte lisible. */
const LAYOUTS = {
  wide: { w: 1200, h: 210, from: [1040, 120], to: [160, 130], control: [600, -60], ocean: 105 },
  compact: { w: 600, h: 300, from: [480, 200], to: [120, 215], control: [300, -30], ocean: 150 },
} as const;

/** L'arc Charleroi → Chicoutimi, parcouru par un avion à l'entrée dans l'écran. */
function Flight() {
  const { t, lang } = useI18n();
  const compact = useMediaQuery("(max-width: 700px)");
  const geo = compact ? LAYOUTS.compact : LAYOUTS.wide;
  const arc = `M${geo.from[0]} ${geo.from[1]} Q ${geo.control[0]} ${geo.control[1]} ${geo.to[0]} ${geo.to[1]}`;

  const ref = useRef<SVGSVGElement>(null);
  const arcRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<SVGGElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const reduce = useReducedMotion();
  const progress = useMotionValue(reduce ? 1 : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(progress, 1, { duration: 2.6, delay: 0.3, ease: [0.45, 0, 0.2, 1] });
    return () => controls.stop();
  }, [inView, reduce, progress]);

  const place = (p: number) => {
    const path = arcRef.current;
    const plane = planeRef.current;
    if (!path || !plane) return;
    const length = path.getTotalLength();
    const at = path.getPointAtLength(p * length);
    const ahead = path.getPointAtLength(Math.min(length, p * length + 1));
    const angle = (Math.atan2(ahead.y - at.y, ahead.x - at.x) * 180) / Math.PI;
    plane.setAttribute("transform", `translate(${at.x} ${at.y}) rotate(${angle}) scale(${compact ? 1.5 : 1.2})`);
    plane.style.opacity = p > 0.01 && p < 0.99 ? "1" : "0";
  };

  useMotionValueEvent(progress, "change", place);
  // Repositionne l'avion si le cadrage change (rotation d'écran, redimensionnement).
  useEffect(() => place(progress.get()));

  const cities = [
    { name: "Charleroi", coords: education[0]?.coords, at: geo.from },
    { name: "Chicoutimi", coords: education[1]?.coords, at: geo.to },
  ];

  return (
    <div className={styles.flight}>
      <svg ref={ref} viewBox={`0 0 ${geo.w} ${geo.h}`} className={`${styles.map} ${compact ? styles.mapCompact : ""}`} aria-hidden="true">
        <defs>
          <pattern id="flight-dots" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.3" className={styles.dot} />
          </pattern>
        </defs>
        <rect width={geo.w} height={geo.h} fill="url(#flight-dots)" />
        <text x={geo.w / 2} y={geo.ocean} textAnchor="middle" className={`${styles.ocean} serif`}>
          {t.education.ocean}
        </text>
        <path d={arc} className={styles.arcTrack} />
        <motion.path ref={arcRef} d={arc} className={styles.arc} style={{ pathLength: progress }} />

        {cities.map((city) => (
          <g key={city.name} transform={`translate(${city.at[0]} ${city.at[1]})`}>
            <circle r="18" className={styles.pulse} />
            <circle r="7" className={styles.pin} />
            <text y="42" textAnchor="middle" className={styles.city}>
              {city.name}
            </text>
            <text y="64" textAnchor="middle" className={styles.coords}>
              {city.coords}
            </text>
          </g>
        ))}

        <g ref={planeRef} style={{ opacity: 0 }}>
          <path
            d="M-12 -2 L4 -2 L12 0 L4 2 L-12 2 Z M-4 -2 L-8 -11 L-4 -11 L2 -2 Z M-4 2 L-8 11 L-4 11 L2 2 Z M-12 -2 L-15 -6 L-13 -6 L-9 -2 Z M-12 2 L-15 6 L-13 6 L-9 2 Z"
            className={styles.plane}
          />
        </g>
      </svg>

      <p className={styles.distance}>
        <span className={styles.km}>
          <CountUp to={exchangeDistanceKm} duration={2.6} format={(n) => formatKm(n, lang)} />
          <span className="serif accent"> km</span>
        </span>
        <Stable className={styles.distanceLabel} text={both((u) => u.education.distance)} />
      </p>
    </div>
  );
}

export default function Education() {

  return (
    <section id="formation" className="section" aria-labelledby="education-heading">
      <div className="container">
        <SectionHeading id="education-heading" index="05" copy={(u) => u.education} />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <Flight />
        </motion.div>

        <ol className={styles.timeline}>
          {education.map((item, i) => (
            <motion.li
              key={item.id}
              className={styles.item}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
            >
              <span className={styles.icon}>{item.id === "condorcet" ? <TbSchool aria-hidden="true" /> : <TbWorld aria-hidden="true" />}</span>
              <div className={styles.itemBody}>
                <p className={styles.period}>
                  <Stable text={item.period} />
                  <span className={item.id === "condorcet" ? styles.badgeOk : styles.badge}>
                    <Stable text={both((u) => (item.id === "condorcet" ? u.education.graduated : u.education.exchange))} />
                  </span>
                </p>
                <h3>{item.school}</h3>
                <p className={styles.degree}>
                  <Stable text={item.degree} block />
                </p>
                <p className={styles.place}>
                  <Stable text={item.place} />
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
