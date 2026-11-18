import type { IconType } from "react-icons";
import { TbBallBasketball, TbBook, TbDeviceGamepad2, TbScissors } from "react-icons/tb";
import type { Localized } from "../i18n/context";

/** Les quatre passions qui rythment le site (intro, badge du hero, rubans), en alternance. */
export const motifs: { id: string; Icon: IconType }[] = [
  { id: "basket", Icon: TbBallBasketball },
  { id: "hair", Icon: TbScissors },
  { id: "games", Icon: TbDeviceGamepad2 },
  { id: "reading", Icon: TbBook },
];

export type InterestId = "hair" | "reading" | "gym" | "family";

export type Interest = {
  id: InterestId;
  title: Localized;
};

export const interests: Interest[] = [
  { id: "hair", title: { fr: "Coiffure", en: "Hairdressing" } },
  { id: "reading", title: { fr: "Lecture", en: "Reading" } },
  { id: "gym", title: { fr: "Musculation", en: "Strength training" } },
  { id: "family", title: { fr: "Famille", en: "Family" } },
];
