import type { IconType } from "react-icons";
import {
  SiBlazor,
  SiBootstrap,
  SiChartdotjs,
  SiDjango,
  SiDocker,
  SiDotnet,
  SiGit,
  SiHtmx,
  SiJavascript,
  SiMysql,
  SiOvh,
  SiPostgresql,
  SiPython,
  SiSentry,
} from "react-icons/si";
import {
  TbApi,
  TbArrowsCross,
  TbBrandCSharp,
  TbCalendarEvent,
  TbCloudUpload,
  TbDatabase,
  TbInfinity,
  TbLayersSubtract,
  TbClockHour4,
  TbRefresh,
  TbSchema,
} from "react-icons/tb";
import type { Localized } from "../i18n/context";

export type Skill = { name: string; icon: IconType };
export type SkillGroup = {
  id: string;
  title: Localized;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "backend",
    title: { fr: "Back-end & APIs", en: "Back end & APIs" },
    skills: [
      { name: "C#", icon: TbBrandCSharp },
      { name: "ASP.NET Core", icon: SiDotnet },
      { name: "Python", icon: SiPython },
      { name: "Django", icon: SiDjango },
      { name: "Django Ninja", icon: TbApi },
      { name: "API REST", icon: TbArrowsCross },
      { name: "Huey", icon: TbClockHour4 },
    ],
  },
  {
    id: "frontend",
    title: { fr: "Front-end & DataViz", en: "Front end & DataViz" },
    skills: [
      { name: "JavaScript ES6+", icon: SiJavascript },
      { name: "HTMX", icon: SiHtmx },
      { name: "Blazor", icon: SiBlazor },
      { name: "Chart.js", icon: SiChartdotjs },
      { name: "Tabler / Bootstrap", icon: SiBootstrap },
      { name: "FullCalendar", icon: TbCalendarEvent },
    ],
  },
  {
    id: "data",
    title: { fr: "Données & conception", en: "Data & design" },
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MySQL", icon: SiMysql },
      { name: "SQL Server", icon: TbDatabase },
      { name: "Modélisation relationnelle", icon: TbSchema },
      { name: "MVC / MVVM / MVT", icon: TbLayersSubtract },
    ],
  },
  {
    id: "devops",
    title: { fr: "Cloud, DevOps & méthodes", en: "Cloud, DevOps & methods" },
    skills: [
      { name: "Docker", icon: SiDocker },
      { name: "Coolify", icon: TbCloudUpload },
      { name: "OVHcloud S3", icon: SiOvh },
      { name: "Sentry", icon: SiSentry },
      { name: "CI/CD", icon: TbInfinity },
      { name: "Git / GitFlow", icon: SiGit },
      { name: "Agile Scrum", icon: TbRefresh },
    ],
  },
];

/** Marquee : la stack telle qu'on la lit en un coup d'œil. */
export const stackMarquee = [
  "C#",
  "ASP.NET Core",
  "Blazor",
  "Python",
  "Django",
  "Django Ninja",
  "HTMX",
  "JavaScript",
  "PostgreSQL",
  "SQL Server",
  "Docker",
  "Chart.js",
  "Sentry",
];
