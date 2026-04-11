import type { Project, ProjectCategory, ProjectMetric, ProjectVisibility } from "@/types";

type Locale = "fr" | "en";

interface LocalizedProjectData {
  _id: string;
  slug: string;
  category: ProjectCategory;
  featured: boolean;
  visibility: ProjectVisibility;
  technologies: string[];
  coverImage?: string;
  gallery?: string[];
  githubUrl?: string;
  liveUrl?: string;
  demoVideoUrl?: string;
  docsUrl?: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  context: Record<Locale, string>;
  solution: Record<Locale, string>;
  highlights: Record<Locale, string[]>;
  metrics: Record<Locale, ProjectMetric[]>;
}

const PROJECTS_DATA: LocalizedProjectData[] = [
  {
    _id: "lsh-rp",
    slug: "lsh-rp",
    category: "perso",
    featured: true,
    visibility: "public",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind", "Docker"],
    githubUrl: "https://github.com/kbakazami/lsh-rp",
    liveUrl: "https://lsh-rp.dev",
    title: {
      fr: "LSH-RP",
      en: "LSH-RP",
    },
    description: {
      fr: "Plateforme communautaire complète pour un serveur GTA V RP avec gestion de personnages, factions et économie.",
      en: "Full-featured community platform for a GTA V RP server with character, faction and economy management.",
    },
    context: {
      fr: "Le serveur avait besoin d'un outil central pour gérer les inscriptions, suivre les personnages et coordonner les factions. Les anciens outils étaient éparpillés entre Discord, Google Sheets et un forum legacy.",
      en: "The server needed a central tool to manage sign-ups, track characters and coordinate factions. Former tools were scattered across Discord, Google Sheets and a legacy forum.",
    },
    solution: {
      fr: "Une plateforme Next.js avec authentification Discord OAuth, fiches personnages riches, système de quêtes et tableau de bord admin. Déployée via Docker et auto-hébergée.",
      en: "A Next.js platform with Discord OAuth, rich character sheets, quest system and admin dashboard. Deployed via Docker and self-hosted.",
    },
    highlights: {
      fr: [
        "Auth Discord OAuth avec synchronisation des rôles",
        "Schéma Prisma modulaire pour personnages et factions",
        "Dashboard admin temps réel (Server-Sent Events)",
        "Déploiement Docker + reverse proxy Traefik",
      ],
      en: [
        "Discord OAuth with role synchronization",
        "Modular Prisma schema for characters and factions",
        "Real-time admin dashboard (Server-Sent Events)",
        "Docker deployment behind a Traefik reverse proxy",
      ],
    },
    metrics: {
      fr: [
        { label: "Utilisateurs", value: "420+" },
        { label: "Personnages", value: "1.2k" },
        { label: "Commits", value: "680" },
      ],
      en: [
        { label: "Users", value: "420+" },
        { label: "Characters", value: "1.2k" },
        { label: "Commits", value: "680" },
      ],
    },
  },
  {
    _id: "rp-business-manager",
    slug: "rp-business-manager",
    category: "perso",
    featured: false,
    visibility: "public",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
    githubUrl: "https://github.com/kbakazami/rp-business-manager",
    title: {
      fr: "RP Business Manager",
      en: "RP Business Manager",
    },
    description: {
      fr: "Outil SaaS pour gérer les entreprises RP : stocks, employés, paies et comptabilité simplifiée.",
      en: "SaaS tool to manage RP businesses: inventory, employees, payroll and lightweight accounting.",
    },
    context: {
      fr: "Les chefs d'entreprise RP jonglaient entre des tableurs partagés et des messages Discord pour suivre leur activité, avec beaucoup d'erreurs et de pertes de données.",
      en: "RP business owners were juggling shared spreadsheets and Discord messages to track activity, leading to many errors and data loss.",
    },
    solution: {
      fr: "Une application web multi-tenant avec rôles granulaires, suivi des stocks en temps réel et export comptable CSV/PDF pour la clôture mensuelle.",
      en: "A multi-tenant web app with granular roles, real-time inventory tracking and CSV/PDF accounting exports for monthly closing.",
    },
    highlights: {
      fr: [
        "Architecture multi-tenant avec isolation par entreprise",
        "Rôles et permissions granulaires côté serveur",
        "Websocket pour le suivi live des stocks",
        "Exports comptables CSV et PDF",
      ],
      en: [
        "Multi-tenant architecture with per-company isolation",
        "Granular server-side roles and permissions",
        "Websocket live inventory tracking",
        "CSV and PDF accounting exports",
      ],
    },
    metrics: {
      fr: [
        { label: "Entreprises", value: "35" },
        { label: "Transactions", value: "18k" },
      ],
      en: [
        { label: "Companies", value: "35" },
        { label: "Transactions", value: "18k" },
      ],
    },
  },
  {
    _id: "portfolio-lab",
    slug: "portfolio-lab",
    category: "lab",
    featured: false,
    visibility: "public",
    technologies: ["Next.js 15", "Tailwind v4", "Framer Motion", "Sanity"],
    githubUrl: "https://github.com/kbakazami/portfolio-v2",
    liveUrl: "https://kba.dev",
    title: {
      fr: "Portfolio Lab",
      en: "Portfolio Lab",
    },
    description: {
      fr: "Le portfolio que vous parcourez — terrain de jeu pour tester les dernières versions de Next.js, Tailwind et Framer Motion.",
      en: "The portfolio you're browsing — a playground to test the latest Next.js, Tailwind and Framer Motion versions.",
    },
    context: {
      fr: "Besoin d'un espace personnel moderne pour showcaser mes projets et tester en continu les outils frontend de pointe, tout en restant maintenable.",
      en: "A personal space to showcase projects and continuously test cutting-edge frontend tools while remaining maintainable.",
    },
    solution: {
      fr: "Un site statique Next.js 15 App Router avec CMS Sanity embarqué, i18n next-intl et animations Framer Motion pensées pour respecter prefers-reduced-motion.",
      en: "A Next.js 15 App Router static site with embedded Sanity CMS, next-intl i18n and Framer Motion animations respecting prefers-reduced-motion.",
    },
    highlights: {
      fr: [
        "App Router + Server Components par défaut",
        "Tailwind v4 avec tokens CSS custom",
        "i18n FR/EN via next-intl + middleware",
        "Animations respectueuses de l'accessibilité",
      ],
      en: [
        "App Router with Server Components by default",
        "Tailwind v4 with custom CSS tokens",
        "FR/EN i18n via next-intl + middleware",
        "Accessibility-aware animations",
      ],
    },
    metrics: {
      fr: [
        { label: "Lighthouse", value: "100" },
        { label: "LCP", value: "< 1s" },
      ],
      en: [
        { label: "Lighthouse", value: "100" },
        { label: "LCP", value: "< 1s" },
      ],
    },
  },
  {
    _id: "ecommerce-magento",
    slug: "ecommerce-magento",
    category: "pro",
    featured: true,
    visibility: "private",
    technologies: ["Magento 2", "PHP", "MySQL", "Redis", "Elasticsearch", "Docker"],
    title: {
      fr: "E-commerce Magento",
      en: "Magento E-commerce",
    },
    description: {
      fr: "Refonte complète d'une plateforme e-commerce Magento 2 haut trafic pour un client retail international.",
      en: "Full rebuild of a high-traffic Magento 2 e-commerce platform for an international retail client.",
    },
    context: {
      fr: "Le client subissait des temps de chargement catastrophiques en période de soldes et un back-office devenu ingérable après 4 ans d'empilement de modules tiers.",
      en: "The client suffered from disastrous load times during sales periods and an unmanageable back-office after 4 years of stacked third-party modules.",
    },
    solution: {
      fr: "Audit technique complet, nettoyage des modules, migration vers une infra dockerisée avec Redis et Elasticsearch, et refonte du thème front en mobile-first.",
      en: "Full technical audit, module cleanup, migration to a dockerized infra with Redis and Elasticsearch, and a mobile-first theme rebuild.",
    },
    highlights: {
      fr: [
        "Audit et suppression de 40+ modules obsolètes",
        "Cache full-page Redis + Varnish",
        "Recherche Elasticsearch avec synonymes métier",
        "Pipeline CI/CD GitLab avec tests E2E",
      ],
      en: [
        "Audit and removal of 40+ outdated modules",
        "Redis + Varnish full-page cache",
        "Elasticsearch search with business synonyms",
        "GitLab CI/CD pipeline with E2E tests",
      ],
    },
    metrics: {
      fr: [
        { label: "LCP", value: "-62%" },
        { label: "Conversion", value: "+18%" },
        { label: "SKUs", value: "45k" },
      ],
      en: [
        { label: "LCP", value: "-62%" },
        { label: "Conversion", value: "+18%" },
        { label: "SKUs", value: "45k" },
      ],
    },
  },
];

export type LocalizedProject = Project & {
  context: string;
  solution: string;
  highlights: string[];
  metrics: ProjectMetric[];
};

function localize(data: LocalizedProjectData, locale: Locale): LocalizedProject {
  return {
    _id: data._id,
    slug: data.slug,
    category: data.category,
    featured: data.featured,
    visibility: data.visibility,
    technologies: data.technologies,
    coverImage: data.coverImage,
    gallery: data.gallery,
    githubUrl: data.githubUrl,
    liveUrl: data.liveUrl,
    demoVideoUrl: data.demoVideoUrl,
    docsUrl: data.docsUrl,
    title: data.title[locale],
    description: data.description[locale],
    context: data.context[locale],
    solution: data.solution[locale],
    highlights: data.highlights[locale],
    metrics: data.metrics[locale],
  };
}

export function getProjects(locale: Locale): LocalizedProject[] {
  return PROJECTS_DATA.map((project) => localize(project, locale));
}

export function getProject(slug: string, locale: Locale): LocalizedProject | undefined {
  const found = PROJECTS_DATA.find((project) => project.slug === slug);
  return found ? localize(found, locale) : undefined;
}

export function getProjectSlugs(): string[] {
  return PROJECTS_DATA.map((project) => project.slug);
}
