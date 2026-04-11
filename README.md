# Portfolio Kba

Portfolio personnel full-stack — Next.js 15 (App Router), TypeScript strict, Tailwind v4, Framer Motion, Sanity CMS et next-intl (FR / EN).

## Stack

- **Framework** : Next.js 15 (App Router, React 19)
- **Langage** : TypeScript strict
- **Styling** : Tailwind CSS v4
- **Animations** : Framer Motion (respecte `prefers-reduced-motion`)
- **CMS** : Sanity v3 (studio embarqué sur `/studio`) avec fallback local
- **i18n** : next-intl (FR / EN)
- **Déploiement** : Vercel
- **Package manager** : pnpm

## Prérequis

- Node.js >= 20
- pnpm

## Installation

```bash
pnpm install
cp .env.local.example .env.local
```

Remplir `.env.local` avec les identifiants Sanity (voir section suivante).

## Configuration Sanity

1. Créer un projet sur [sanity.io](https://www.sanity.io/) (plan gratuit)
2. Récupérer le `projectId` depuis le dashboard
3. Renseigner les variables dans `.env.local` :
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxx
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   ```
4. (Optionnel) Générer un token en lecture/écriture pour `SANITY_API_TOKEN` si besoin d'ISR on-demand
5. Lancer le dev server puis accéder au studio : `http://localhost:3000/studio`
6. Créer les documents : `siteSettings`, `about`, `project`, `skill`, `experience`

> Si Sanity n'est pas configuré, le site utilise automatiquement les données locales de fallback (`src/data/projects.ts` et sections hardcodées).

## Variables d'environnement

Voir `.env.local.example` pour la liste complète. Les variables Sanity sont requises en prod ; `SANITY_API_TOKEN` et `GITHUB_TOKEN` sont optionnels.

## Scripts

```bash
pnpm dev          # dev server (http://localhost:3000)
pnpm build        # build production
pnpm start        # serveur production (après build)
pnpm lint         # ESLint
pnpm type-check   # tsc --noEmit
```

## Structure

```
src/
├── app/
│   ├── [locale]/                # Routes i18n (FR / EN)
│   │   ├── layout.tsx           # Layout racine + metadata SEO
│   │   ├── page.tsx             # Landing (Hero + sections)
│   │   └── projects/[slug]/     # Case studies dynamiques
│   ├── api/                     # Routes API (contact, github stats)
│   ├── studio/                  # Sanity Studio embarqué
│   ├── sitemap.ts               # Sitemap dynamique (toutes les routes + projets)
│   └── robots.ts                # robots.txt
├── components/                  # Layout, sections, UI, animations
├── data/projects.ts             # Fallback local des projets
├── i18n/                        # Config next-intl
├── lib/sanity/                  # Client + queries GROQ
├── messages/                    # Traductions FR / EN
└── types/                       # Types partagés
```

## Déploiement Vercel

1. Pousser le repo sur GitHub
2. Importer le projet sur [vercel.com/new](https://vercel.com/new)
3. Renseigner les variables d'environnement dans le dashboard Vercel (mêmes clés que `.env.local`)
4. Déployer — Vercel détecte Next.js automatiquement

Ou via la CLI :

```bash
pnpm dlx vercel deploy
```

### Domaine

Par défaut le site cible `https://kba.dev`. Si vous déployez sous un autre domaine, mettre à jour :

- `SITE_URL` dans `src/app/[locale]/layout.tsx`
- `SITE_URL` dans `src/app/sitemap.ts`
- `SITE_URL` dans `src/app/robots.ts`

## SEO

- `generateMetadata` (layout + pages projets) avec OpenGraph + Twitter Card
- Sitemap auto-généré (`/sitemap.xml`)
- Robots (`/robots.txt`)
- JSON-LD Person schema dans le layout
- Hreflang alternates FR / EN

## Accessibilité

- Skip-to-content link
- Navigation clavier complète avec focus visible
- Aria-labels sur tous les boutons iconiques
- Respect de `prefers-reduced-motion`
- Contraste WCAG AA
- Alt text sur toutes les images

## Licence

MIT
