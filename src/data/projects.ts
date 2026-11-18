import type { Localized } from "../i18n/context";

export type ProjectImage = {
  src: string;
  srcSm: string;
  width: number;
  height: number;
  caption: Localized;
};

export type Project = {
  slug: string;
  title: Localized;
  kind: Localized;
  year: string;
  period: Localized;
  team: Localized | null;
  summary: Localized;
  context: Localized;
  highlights: Localized<string[]>;
  stack: string[];
  github: string | null;
  /** Couleur d'accent de la carte, reprise de l'identité visuelle du projet. */
  accent: string;
  images: ProjectImage[];
  /** Index de l'image utilisée en couverture. */
  cover: number;
};

/** Dimensions réelles des captures (générées à la conversion WebP). */
function shots(slug: string, sizes: [number, number][], captions: Localized[]): ProjectImage[] {
  return sizes.map(([width, height], i) => ({
    src: `${import.meta.env.BASE_URL}images/projects/${slug}/${i + 1}.webp`,
    srcSm: `${import.meta.env.BASE_URL}images/projects/${slug}/${i + 1}-sm.webp`,
    width,
    height,
    caption: captions[i] ?? { fr: "", en: "" },
  }));
}

export const projects: Project[] = [
  {
    slug: "suivi-atelier-auem",
    title: { fr: "Suivi d'atelier AUEM", en: "AUEM Workshop Tracking" },
    kind: { fr: "Stage · Application métier", en: "Internship · Business app" },
    year: "2026",
    period: { fr: "Fév. – Mai 2026", en: "Feb. – May 2026" },
    team: { fr: "Binôme de stagiaires, en Scrum", en: "Two interns, in Scrum" },
    summary: {
      fr: "Application de suivi d'atelier : scan de codes-barres, synchro des commandes, statistiques et calendrier des étapes.",
      en: "Workshop tracking app: barcode scanning, order sync, statistics and a step calendar.",
    },
    context: {
      fr: "Mon stage chez WOOGMA, en binôme avec une autre stagiaire. Le client, AUEM, fait des essais mécaniques sur des pièces. Chaque essai passe par plusieurs étapes (sciage, usinage, essai, rapport), et pour savoir où il en était, il fallait aller vérifier dans l'atelier. Avec l'application, l'opérateur scanne l'OF à chaque étape : l'avancement et les retards se suivent en direct.",
      en: "My internship at WOOGMA, paired with another intern. The client, AUEM, runs mechanical tests on parts. Each test goes through several steps (sawing, machining, testing, report), and to know where it stood, someone had to go and check in the workshop. With the app, the operator scans the order at each step: progress and delays can be followed live.",
    },
    highlights: {
      fr: [
        "Scan en atelier (Django + HTMX + Tabler) : gros boutons pour des opérateurs en gants, et un script JavaScript qui lit la scannette, qui tape comme un clavier, puis ouvre le bon OF.",
        "API en Django Ninja qui reçoit les commandes créées dans AUEM Order : accès protégé par clé, pas de doublons, types d'essai inconnus créés automatiquement avec une étape « À définir ».",
        "Statistiques : temps par étape sur les 50 derniers OF avec la date de livraison prévue, moyenne par mois pour chaque type d'essai en barres empilées (Chart.js), tableau des OF en retard.",
        "Calendrier des étapes de chaque OF (FullCalendar), avec des vues semaine et jour limitées aux heures de l'atelier (7 h – 18 h).",
        "Panneau d'admin refait autour d'un menu latéral, et création de commande guidée en 4 étapes (commande, pièces, essais, récap) gardée en session jusqu'à la validation.",
        "Six sprints de deux semaines en Scrum. Mise en ligne avec Docker et Coolify : chaque push sur main redéploie l'app.",
      ],
      en: [
        "Workshop scanning (Django + HTMX + Tabler): big buttons for operators wearing gloves, and a JavaScript script that reads the scanner, which types like a keyboard, then opens the right order.",
        "Django Ninja API that receives the orders created in AUEM Order: key-protected access, no duplicates, unknown test types created automatically with a “To be defined” step.",
        "Statistics: time per step on the last 50 orders with the planned delivery date, monthly average for each test type as stacked bars (Chart.js), table of late orders.",
        "Calendar of each order's steps (FullCalendar), with week and day views limited to workshop hours (7 am – 6 pm).",
        "Admin panel rebuilt around a side menu, and guided 4-step order creation (order, parts, tests, summary) kept in session until it's confirmed.",
        "Six two-week sprints in Scrum. Deployed with Docker and Coolify: every push to main redeploys the app.",
      ],
    },
    stack: ["Python", "Django", "Django Ninja", "HTMX", "JavaScript", "Tabler", "PostgreSQL", "Chart.js", "FullCalendar", "Docker", "Coolify", "OVH S3", "Sentry"],
    github: null,
    accent: "#ff6b35",
    cover: 8,
    images: shots(
      "suivi-atelier-auem",
      [[1386, 660], [605, 290], [1386, 659], [605, 287], [1386, 457], [605, 344], [756, 355], [605, 346], [1234, 686]],
      [
        { fr: "Sélection de l'opérateur", en: "Operator selection" },
        { fr: "Scan du code-barres d'un OF", en: "Scanning an order's barcode" },
        { fr: "Suivi d'un essai en cours", en: "Tracking a test in progress" },
        { fr: "Gestion des commandes", en: "Order management" },
        { fr: "Essais mécaniques d'une commande", en: "Mechanical tests of an order" },
        { fr: "Calendrier des étapes d'un OF", en: "Step calendar of an order" },
        { fr: "Gestion des étapes", en: "Step management" },
        { fr: "Durées moyennes par type d'essai", en: "Average durations per test type" },
        { fr: "Tableau de bord de production", en: "Production dashboard" },
      ],
    ),
  },
  {
    slug: "boutique",
    title: { fr: "GroceryBasket", en: "GroceryBasket" },
    kind: { fr: "Projet final · E-commerce", en: "Final project · E-commerce" },
    year: "2025",
    period: { fr: "Décembre 2025", en: "December 2025" },
    team: { fr: "Équipe de 3", en: "Team of 3" },
    summary: {
      fr: "Boutique en ligne de produits alimentaires, avec panier et paiement PayPal.",
      en: "Online grocery store with a cart and PayPal checkout.",
    },
    context: {
      fr: "Projet final fait à trois : une boutique en ligne de produits alimentaires, du catalogue jusqu'au paiement.",
      en: "Final project built by three of us: an online grocery store, from the catalogue to the payment.",
    },
    highlights: {
      fr: [
        "Django (architecture MVT) : catalogue par catégories, recherche, produits en vedette et en promo.",
        "Données gérées avec l'ORM Django et MySQL.",
        "Panier, récapitulatif de commande avec les taxes (TPS / TVQ) et paiement PayPal.",
        "Travail à trois avec GitHub et GitFlow, en faisant attention à la sécurité.",
      ],
      en: [
        "Django (MVT architecture): catalogue by category, search, featured and discounted products.",
        "Data handled with the Django ORM and MySQL.",
        "Cart, order summary with taxes (GST / QST) and PayPal checkout.",
        "Three of us working with GitHub and GitFlow, paying attention to security.",
      ],
    },
    stack: ["Python", "Django", "Django ORM", "MySQL", "PayPal", "GitHub", "GitFlow"],
    github: "https://github.com/Boualem234/ProjetFinal_WebMasterz_GroceryBasket",
    accent: "#8bd450",
    cover: 0,
    images: shots(
      "boutique",
      [[1600, 900], [1600, 840], [1600, 899], [1600, 851], [1600, 901], [1600, 845], [1262, 851], [1600, 847]],
      [
        { fr: "Accueil et promotions", en: "Home page and promotions" },
        { fr: "Catégories de produits", en: "Product categories" },
        { fr: "Catalogue produits", en: "Product catalogue" },
        { fr: "Code promo et garanties", en: "Promo code and guarantees" },
        { fr: "Panier avec calcul des taxes", en: "Cart with tax calculation" },
        { fr: "Résumé de commande et paiement", en: "Order summary and payment" },
        { fr: "Paiement PayPal (sandbox)", en: "PayPal checkout (sandbox)" },
        { fr: "Page de contact", en: "Contact page" },
      ],
    ),
  },
  {
    slug: "bibliboua",
    title: { fr: "BibliBoua", en: "BibliBoua" },
    kind: { fr: "Premier projet Django", en: "First Django project" },
    year: "2025",
    period: { fr: "Octobre 2025", en: "October 2025" },
    team: null,
    summary: {
      fr: "Gestion de bibliothèque avec comptes, rôles, recherche et pagination.",
      en: "Library management app with accounts, roles, search and pagination.",
    },
    context: {
      fr: "Mon premier projet Django, pour apprendre le framework : modèles, vues, templates, admin et gestion des droits.",
      en: "My first Django project, to learn the framework: models, views, templates, admin and access control.",
    },
    highlights: {
      fr: [
        "Architecture MVT, ORM, admin Django, routing et formulaires.",
        "Connexion et droits d'accès : utilisateurs, groupes et permissions selon le rôle.",
        "Ajout, modification et suppression de livres, avec recherche et pagination.",
        "Versionnage avec GitHub et GitFlow.",
      ],
      en: [
        "MVT architecture, ORM, Django admin, routing and forms.",
        "Login and access rights: users, groups and role-based permissions.",
        "Adding, editing and deleting books, with search and pagination.",
        "Versioning with GitHub and GitFlow.",
      ],
    },
    stack: ["Python", "Django", "MVT", "Permissions Django", "Groupes & utilisateurs", "GitHub", "GitFlow"],
    github: "https://github.com/Boualem234/Django_Bibliotheque",
    accent: "#4c8dff",
    cover: 0,
    images: shots(
      "bibliboua",
      [[1600, 899], [1600, 851], [1600, 899], [1600, 899], [1600, 853]],
      [
        { fr: "Accueil et recherche", en: "Home page and search" },
        { fr: "Livres en vedette", en: "Featured books" },
        { fr: "Présentation et statistiques", en: "Overview and statistics" },
        { fr: "Fiche d'un livre", en: "Book details" },
        { fr: "Liste des livres : recherche, actions, pagination", en: "Book list: search, actions, pagination" },
      ],
    ),
  },
  {
    slug: "monstres",
    title: { fr: "Chasse aux monstres", en: "Monster Hunt" },
    kind: { fr: "Jeu · API REST", en: "Game · REST API" },
    year: "2025",
    period: { fr: "Octobre 2025", en: "October 2025" },
    team: { fr: "Binôme", en: "Team of 2" },
    summary: {
      fr: "Jeu d'exploration sur une carte 5×5 : combats, captures de monstres et quêtes.",
      en: "Exploration game on a 5×5 map: fights, monster captures and quests.",
    },
    context: {
      fr: "Un jeu d'exploration sur une carte 5×5 : on explore, on combat, on capture des monstres et on fait des quêtes. Fait en binôme.",
      en: "An exploration game on a 5×5 map: you explore, fight, capture monsters and complete quests. Built as a pair.",
    },
    highlights: {
      fr: [
        "Carte 5×5 à explorer : combats, captures de monstres et quêtes.",
        "Architecture MVC en C# avec Entity Framework et MySQL.",
        "Intégration d'une API REST pour récupérer les données des monstres et des quêtes.",
        "Collaboration en binôme et versionnage du code via GitHub.",
      ],
      en: [
        "A 5×5 map to explore: fights, monster captures and quests.",
        "MVC architecture in C# with Entity Framework and MySQL.",
        "REST API integration to fetch monster and quest data.",
        "Pair collaboration and code versioning with GitHub.",
      ],
    },
    stack: ["C#", "Entity Framework", "MySQL", "REST API", "MVC", "GitHub"],
    github: "https://github.com/Boualem234/MonsterAPIDuo-main-public",
    accent: "#b06cff",
    cover: 0,
    images: [],
  },
  {
    slug: "livraison",
    title: { fr: "AkunaEat", en: "AkunaEat" },
    kind: { fr: "Application web · Livraison", en: "Web app · Food delivery" },
    year: "2025",
    period: { fr: "Mai 2025", en: "May 2025" },
    team: null,
    summary: {
      fr: "Application de livraison de repas inspirée d'Uber Eats.",
      en: "Food delivery app inspired by Uber Eats.",
    },
    context: {
      fr: "Une application de livraison de repas inspirée d'Uber Eats : les clients commandent, les restaurateurs gèrent leurs restaurants, menus et commandes. On a commencé par l'analyse (diagrammes UML) avant de coder.",
      en: "A food delivery app inspired by Uber Eats: customers order, restaurant owners manage their restaurants, menus and orders. We started with the analysis (UML diagrams) before coding.",
    },
    highlights: {
      fr: [
        "Côté client : restaurants, menus, plats et commande. Côté restaurateur : tableau de bord, services, menus et commandes.",
        "API externe pour calculer les distances et savoir si une adresse est livrable.",
        "Analyse UML : diagrammes de cas d'utilisation, de classes et de séquences.",
        "Développement en C# / .NET avec MVC et Blazor.",
      ],
      en: [
        "Customer side: restaurants, menus, dishes and ordering. Owner side: dashboard, services, menus and orders.",
        "External API to compute distances and check whether an address can be delivered to.",
        "UML analysis: use-case, class and sequence diagrams.",
        "Built in C# / .NET with MVC and Blazor.",
      ],
    },
    stack: ["C#", ".NET", "Blazor", "MVC", "API REST", "GitHub"],
    github: "https://github.com/Boualem234/AKUNAeat",
    accent: "#34c47c",
    cover: 1,
    images: shots(
      "livraison",
      [[1600, 899], [1600, 901], [1600, 899], [1600, 847], [1600, 849], [1600, 855], [1600, 853]],
      [
        { fr: "Accueil AkunaEat", en: "AkunaEat home page" },
        { fr: "Restaurants disponibles", en: "Available restaurants" },
        { fr: "Détails d'un restaurant", en: "Restaurant details" },
        { fr: "Plats à la carte", en: "À la carte dishes" },
        { fr: "Menus du restaurant", en: "Restaurant menus" },
        { fr: "Composition d'un menu", en: "Menu composition" },
        { fr: "Tableau de bord du restaurateur", en: "Restaurant owner dashboard" },
      ],
    ),
  },
];

export function findProject(slug: string | undefined) {
  return projects.find((p) => p.slug === slug);
}
