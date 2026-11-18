import type { Localized } from "../i18n/context";

export type EducationItem = {
  id: "condorcet" | "chicoutimi";
  school: string;
  degree: Localized;
  place: Localized;
  period: Localized;
  coords: string;
};

export const education: EducationItem[] = [
  {
    id: "condorcet",
    school: "Haute École Provinciale de Hainaut – Condorcet",
    degree: {
      fr: "Bachelier en informatique — orientation développement d'applications",
      en: "Bachelor in Computer Science — application development",
    },
    place: { fr: "Charleroi, Belgique", en: "Charleroi, Belgium" },
    period: { fr: "Sept. 2023 – Juin 2026", en: "Sep. 2023 – Jun. 2026" },
    coords: "50.41° N · 4.44° E",
  },
  {
    id: "chicoutimi",
    school: "Cégep de Chicoutimi",
    degree: { fr: "Programme d'échange international", en: "International exchange program" },
    place: { fr: "Chicoutimi, Québec, Canada", en: "Chicoutimi, Québec, Canada" },
    period: { fr: "Sept. – Déc. 2025", en: "Sep. – Dec. 2025" },
    coords: "48.43° N · 71.07° W",
  },
];

/** Distance orthodromique Charleroi → Chicoutimi (km). */
export const exchangeDistanceKm = 5223;
