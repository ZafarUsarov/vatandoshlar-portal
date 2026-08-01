# Architecture

This document describes the current architecture of Vatandoshlar.de and the intended direction for future development.

Vatandoshlar.de is a Next.js application designed as a long-term information platform for Uzbek people living in Germany or planning to move to Germany.

The architecture currently prioritizes simplicity, maintainability, reusable UI components, and a safe migration path toward localization, a database, authentication, and an administration portal.

---

## Technology Stack

The application currently uses:

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Next.js App Router
- ESLint
- npm
- Git and GitHub

TypeScript strict mode is enabled.

---

## Current System Context

The current application is a single Next.js project.

```text
User
  ↓
Next.js application
  ↓
App Router pages
  ↓
Section and card components
  ↓
Static TypeScript data
```

There is currently:

- no database;
- no authentication system;
- no administration portal;
- no external content management system;
- no production localization system.

These capabilities are planned for later milestones and must not be treated as already implemented.

---

## Repository Structure

```text
vatandoshlar-portal/
├── app/
├── components/
│   ├── cards/
│   ├── features/
│   └── ui/
├── data/
├── lib/
├── public/
├── types/
├── ARCHITECTURE.md
├── CONTRIBUTING.md
├── README.md
├── package.json
├── next.config.ts
└── tsconfig.json
```

### `app/`

Contains App Router layouts, pages, loading states, and dynamic routes.

Current route structure:

```text
/
├── /events
│   └── /events/[slug]
├── /jobs
│   └── /jobs/[slug]
├── /news
│   └── /news/[slug]
├── /services
│   └── /services/[slug]
└── /telegram
```

Route files should primarily handle:

- routing;
- metadata;
- data selection;
- page composition.

Large reusable sections should be extracted into components instead of remaining inside route files.

### `components/`

Contains reusable application components.

The directory currently includes:

- shared layout and navigation components;
- homepage section components;
- content cards;
- reusable UI primitives;
- feature-specific components.

### `components/ui/`

Acts as the initial design-system layer.

Existing UI primitives include components such as:

- Badge
- Button
- Card
- Container
- PageHero
- Section
- StatCard

New UI primitives should be introduced only when they provide clear reuse or improve consistency.

### `components/cards/`

Contains reusable presentation components for domain content, including:

- EventCard
- NewsCard
- ServiceCard
- TelegramCard
- JobGuideCard

Cards should receive typed data through props and should not directly own data-fetching logic.

### `data/`

Contains static TypeScript content used by the current application.

```text
data/
├── events.ts
├── features.ts
├── jobPlatforms.ts
├── jobs.ts
├── news.ts
├── searchIndex.ts
├── services.ts
└── telegram.ts
```

This layer currently acts as the content source for the application.

### `types/`

Contains shared TypeScript domain types.

Shared domain entities should be defined in one authoritative location and should not be duplicated across components and data files.

### `lib/`

Contains shared utilities that are not UI components or domain content.

### `public/`

Contains static assets such as images, icons, and other publicly accessible files.

---

## Current Data Flow

The application currently uses a static-data architecture.

```text
data/*.ts
   ↓
route or section component
   ↓
card or reusable UI component
   ↓
rendered HTML
```

Example:

```text
data/news.ts
   ↓
app/news/page.tsx
   ↓
components/cards/NewsCard.tsx
   ↓
news list rendered to the user
```

This approach is appropriate for the current project size because it is:

- simple;
- type-safe;
- fast;
- easy to inspect;
- inexpensive to operate.

However, UI components must not become tightly coupled to static files. Future database migration should require changing the data-access layer rather than rewriting the entire UI.

---

## Component Boundaries

### Server Components

Server Components should remain the default.

They are appropriate for:

- route composition;
- metadata generation;
- static content rendering;
- data access;
- SEO-relevant content.

### Client Components

Client Components should be used only when required for:

- event handlers;
- browser APIs;
- local interactive state;
- animation behavior requiring client execution;
- theme controls;
- modal dialogs;
- command palette interactions.

The `"use client"` directive should not be added without a concrete requirement.

---

## Styling Architecture

The application uses Tailwind CSS v4 and a semantic token layer defined through global styles.

Examples of semantic classes include:

```text
bg-page
bg-surface
bg-surface-muted
text-text-primary
text-text-secondary
border-border-default
bg-brand
```

Semantic tokens should be preferred over direct color values.

Avoid mixing semantic tokens with unnecessary hardcoded classes such as:

```text
bg-white
text-slate-950
dark:bg-slate-950
```

when an equivalent semantic token already exists.

The current mixture of semantic and hardcoded colors is a known source of dark-mode inconsistency, especially in the Jobs and Events areas. This will be addressed in the dedicated dark-mode milestone.

---

## Theme Initialization

The root layout initializes the selected theme before the application becomes interactive.

The implementation currently uses:

- local storage;
- operating-system color preference;
- a class on the document element;
- `suppressHydrationWarning`.

Theme behavior must remain centralized. Individual pages should not implement separate theme-management logic.

---

## Search Architecture

The current search experience is based on a static search index.

The search system should eventually support:

- all public content categories;
- localized content;
- Germany Guide articles;
- stable destination URLs;
- future database-backed indexing.

Search indexing must remain separate from presentation components.

---

## Metadata and SEO

The project currently has a root metadata configuration and some route-level metadata.

The future SEO architecture should include:

- route-specific metadata;
- canonical URLs;
- localized alternate URLs;
- `hreflang`;
- sitemap generation;
- robots configuration;
- structured data;
- breadcrumb data;
- organization information;
- FAQ structured data where appropriate.

SEO changes should be introduced during the dedicated SEO milestone rather than mixed into unrelated feature work.

---

## Localization Direction

Localization is the next major application milestone.

Planned languages:

- Uzbek
- German

The intended URL strategy is expected to use explicit locale segments:

```text
/uz/...
/de/...
```

The final strategy must be documented and approved before implementation.

Localization will affect:

- routing;
- layouts;
- navigation;
- metadata;
- UI text;
- static content;
- search indexing;
- canonical URLs;
- alternate-language links.

The previous localization attempt caused nested layout and routing problems. Therefore, localization must be introduced incrementally and verified route by route.

---

## Future Data Architecture

The static data layer will eventually be replaced or supplemented by a database-backed repository layer.

Target direction:

```text
Page or Server Component
          ↓
Application service
          ↓
Repository interface
          ↓
Static repository or database repository
          ↓
Database
```

Example:

```text
NewsPage
   ↓
NewsService
   ↓
NewsRepository
   ├── StaticNewsRepository
   └── DatabaseNewsRepository
```

This architecture allows the application to migrate gradually without rewriting presentation components.

The repository and service layers should not be introduced prematurely. They should be added when the database milestone creates a real need for them.

---

## Future Administration Architecture

The first administration portal is expected to remain inside the same Next.js application unless security, deployment, or team boundaries justify a separate application.

Possible structure:

```text
app/
├── [locale]/
│   └── public routes
└── admin/
    ├── news/
    ├── jobs/
    ├── events/
    ├── services/
    ├── telegram/
    ├── germany-guide/
    └── messages/
```

The final administration architecture will depend on:

- authentication;
- authorization;
- database choice;
- deployment strategy;
- content workflow;
- audit requirements.

No admin implementation should begin before those dependencies are designed.

---

## Planned Major Modules

Future milestones include:

- localization;
- dark-mode consistency;
- SEO;
- Germany Guide;
- contact system;
- founder page;
- database integration;
- authentication;
- administration portal;
- automated tests;
- CI/CD;
- production monitoring and backups.

New ideas should be added to the backlog and must not interrupt the current milestone without an explicit priority decision.

---

## Germany Guide Architecture

The Germany Guide will become a major content module covering topics such as:

- Au-pair;
- FSJ and BFD;
- Ausbildung;
- university studies;
- Master’s and PhD programs;
- Chancenkarte;
- EU Blue Card;
- skilled-worker immigration;
- IT professionals;
- medical professionals;
- family reunification;
- visitor invitations;
- visa appointments;
- recognition of qualifications;
- residence procedures.

The content model must support:

- multiple languages;
- categories;
- requirements;
- step-by-step processes;
- official sources;
- review dates;
- warnings;
- frequently asked questions;
- future administration through the admin portal.

Legal, immigration, and official-procedure content must rely on authoritative sources and include a visible last-reviewed date.

---

## Quality Attributes

Architectural decisions should support the following qualities:

### Maintainability

Code should be easy to understand, modify, and review.

### Scalability

The platform should support additional content, languages, users, and administrative workflows without requiring a complete rewrite.

### Accessibility

Semantic HTML, keyboard support, visible focus states, descriptive labels, and sufficient contrast are mandatory.

### Performance

Client-side JavaScript should remain limited to features that require it.

### Security

Secrets, private credentials, and personal data must not be committed to the repository.

### Testability

Business logic and data transformations should remain separable from UI rendering.

### SEO

Public content must remain server-rendered and discoverable.

---

## Architectural Rules

1. Preserve the existing architecture unless a documented change is approved.
2. Prefer Server Components.
3. Keep page files focused on route composition.
4. Reuse existing UI primitives.
5. Prefer semantic styling tokens.
6. Keep shared types centralized.
7. Avoid unnecessary dependencies.
8. Do not implement unrelated milestones together.
9. Record important architectural decisions.
10. Update this document when the system architecture changes.

---

## Known Architectural Risks

Current risks include:

- hardcoded and semantic colors being mixed;
- no production localization model;
- no automated test infrastructure;
- static data models not being fully consistent;
- some route files becoming too large;
- incomplete SEO infrastructure;
- limited project documentation;
- no database or authentication boundary yet.

These risks are tracked for their appropriate milestones and should not all be addressed simultaneously.

---

## Architecture Status

Current milestone:

```text
Repository Foundation and Project Audit
```

Next planned milestone:

```text
Localization / i18n Architecture
```

This document represents the current architecture and intended direction. It must be updated whenever a significant structural decision is implemented.