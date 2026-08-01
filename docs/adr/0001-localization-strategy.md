# ADR 0001: Localization Strategy

- Status: Accepted
- Date: 2026-08-01
- Decision owners: Zafar Usarov
- Related milestone: Localization / i18n

## Context

Vatandoshlar.de currently provides its interface and content primarily in Uzbek.

The platform must support Uzbek and German while preserving:

- stable and indexable URLs;
- server-rendered public content;
- route-specific metadata;
- accessible navigation;
- future database integration;
- future administration workflows;
- maintainable translation files;
- a safe migration path from the current single-language application.

A previous localization attempt introduced nested `<html>` elements and routing problems. The new implementation must therefore be incremental and verified after every structural change.

## Decision

Vatandoshlar.de will use explicit locale segments in all public URLs.

```text
/uz
/de

/uz/news
/de/news

/uz/jobs
/de/jobs

/uz/events
/de/events

/uz/services
/de/services

/uz/telegram
/de/telegram
```

The root route `/` will redirect to the default locale.

The default locale will initially be:

```text
uz
```

The first supported locales will be:

```text
uz
de
```

Localization will be implemented with `next-intl`, subject to verification against the installed Next.js version before integration.

## URL Strategy

All public routes will include a locale segment.

Examples:

```text
/uz/news
/de/news

/uz/news/[slug]
/de/news/[slug]
```

This decision provides:

- explicit language-specific URLs;
- predictable routing;
- clearer canonical URLs;
- easier `hreflang` generation;
- better separation of localized content;
- stable links for search engines and users.

The default locale will not be hidden from URLs.

## Root Route Behaviour

The root URL:

```text
/
```

will redirect to:

```text
/uz
```

Browser-language detection will not control the first implementation.

This keeps routing deterministic and avoids unexpected redirects.

Automatic language detection may be reconsidered later as a separate decision.

## Language Selection

Users will be able to switch between Uzbek and German through a language selector.

The language selector should:

- preserve the current page when possible;
- generate locale-aware links;
- remain accessible by keyboard;
- expose a clear accessible label;
- avoid manually concatenating URL strings;
- preserve stable dynamic route slugs where possible.

The selected language may later be stored in a cookie, but cookie persistence is not required for the first migration step.

## UI Translation Model

Short interface text will be stored in translation dictionaries.

Planned structure:

```text
messages/
├── uz.json
└── de.json
```

Examples of UI text:

- navigation labels;
- buttons;
- form labels;
- headings;
- empty states;
- validation messages;
- accessibility labels;
- shared metadata labels.

Translation keys should be grouped by domain or component.

Example:

```json
{
  "Navigation": {
    "home": "Bosh sahifa",
    "news": "Yangiliklar",
    "jobs": "Ish",
    "services": "Xizmatlar",
    "events": "Tadbirlar",
    "telegram": "Telegram"
  }
}
```

Components must not contain duplicated Uzbek and German interface strings.

## Content Localization Model

Long-form domain content must remain separate from small UI dictionaries.

This includes:

- news articles;
- jobs;
- services;
- events;
- Telegram descriptions;
- Germany Guide articles.

The initial static content model should support localized values without coupling presentation components to one language.

A possible transitional shape is:

```ts
type Locale = "uz" | "de";

type LocalizedText = Record<Locale, string>;
```

Example:

```ts
type LocalizedArticle = {
  id: string;
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  content: LocalizedText;
};
```

The final content model will be confirmed during the data-model migration task.

UI dictionaries and domain content must not be mixed into one large translation file.

## Dynamic Route Slugs

The first implementation will prefer one stable slug per content item across locales.

Example:

```text
/uz/news/germaniyada-integratsiya-kurslari
/de/news/germaniyada-integratsiya-kurslari
```

This reduces migration complexity and prevents duplicate lookup logic.

Localized slugs may be considered later if there is a clear SEO or product requirement. That change would require:

- locale-specific slug storage;
- redirect management;
- canonical handling;
- admin support;
- collision prevention.

## Layout Architecture

Only the root application layout may render:

```html
<html>
<body>
```

The locale layout must not create nested `<html>` or `<body>` elements.

Planned responsibility split:

```text
app/layout.tsx
├── document shell
├── html
├── body
├── global styles
└── global providers where appropriate

app/[locale]/layout.tsx
├── locale validation
├── locale request configuration
├── translation provider
└── localized page composition
```

This rule exists specifically to prevent the nested-layout failure encountered during the previous localization attempt.

## Metadata and SEO

Localization must support:

- localized page titles;
- localized descriptions;
- canonical URLs;
- alternate-language URLs;
- `hreflang`;
- localized Open Graph metadata;
- locale-aware sitemap generation.

Expected alternate URLs:

```text
uz: /uz/...
de: /de/...
```

SEO implementation will be completed in its dedicated milestone, but the localization architecture must not block it.

## Search

The search architecture must become locale-aware.

A search result should include enough information to generate the correct localized destination.

Possible future shape:

```ts
type SearchEntry = {
  id: string;
  locale: "uz" | "de";
  title: string;
  description: string;
  href: string;
  category: string;
};
```

The exact implementation will be designed when localized content is introduced.

## Admin Portal Compatibility

The localization architecture must support future administration of Uzbek and German content.

The future admin portal should allow editors to manage:

- Uzbek title;
- German title;
- Uzbek description;
- German description;
- publication state;
- source information;
- last-reviewed date;
- localized metadata.

The initial static implementation must not prevent migration to this model.

## Migration Strategy

Localization will be introduced incrementally.

Planned sequence:

1. Verify the stable baseline.
2. Install and configure the localization dependency.
3. Add routing configuration.
4. Introduce the locale route segment.
5. Add the locale layout without nested document elements.
6. Redirect `/` to `/uz`.
7. Migrate only the homepage.
8. Verify build, routing, theme, and hydration.
9. Migrate shared navigation.
10. Migrate remaining list routes one at a time.
11. Migrate dynamic detail routes.
12. Add localized metadata.
13. Make search locale-aware.
14. Remove remaining hardcoded interface text.

No large one-step migration is permitted.

## Validation Requirements

Each localization step must verify:

- `npm run lint`;
- `npm run build`;
- `/uz` works;
- `/de` works;
- existing routes still render;
- no nested `<html>` or `<body>`;
- no hydration warnings;
- navigation remains functional;
- dark mode remains functional;
- mobile and desktop layouts remain stable;
- dynamic routes resolve correctly;
- no unintended redirect loops.

## Consequences

### Positive

- Clear language-specific URLs
- Strong foundation for multilingual SEO
- Predictable navigation
- Future admin compatibility
- Incremental migration path
- Easier locale-aware metadata
- Better separation between UI text and domain content

### Negative

- Existing routes must be migrated
- Internal links must become locale-aware
- Static data requires localization changes
- Search indexing must be updated
- Metadata logic becomes more complex
- Every public route requires verification in both languages

## Alternatives Considered

### Default locale without URL prefix

Example:

```text
/news
/de/news
```

Rejected because it creates asymmetric routing and makes locale handling less explicit.

### Query parameter localization

Example:

```text
/news?lang=de
```

Rejected because it is less suitable for stable, indexable, language-specific content URLs.

### Automatic browser-language routing from the beginning

Deferred because deterministic routing is safer during the initial migration and easier to test.

### Separate applications for Uzbek and German

Rejected because it would duplicate routing, components, deployment, and maintenance work.

## Implementation Constraints

- Do not rewrite the entire application in one commit.
- Do not combine localization with dark-mode refactoring.
- Do not combine localization with database work.
- Do not add localized slugs during the first migration.
- Do not modify large static content models before the routing baseline is stable.
- Every meaningful change must use a focused Conventional Commit.
- The stable state must remain recoverable throughout migration.

## Commit Strategy

Expected commits may include:

```text
docs(i18n): record localization architecture decision
feat(i18n): add localization dependency and configuration
feat(i18n): add locale routing
feat(i18n): add locale request configuration
feat(i18n): migrate homepage to localized route
feat(i18n): localize shared navigation
feat(i18n): migrate news routes
feat(i18n): migrate jobs routes
feat(i18n): migrate services routes
feat(i18n): migrate events routes
feat(i18n): migrate telegram route
```

Each commit must preserve a buildable and reviewable project state.

## Follow-up Decisions

Separate decisions may later be required for:

- localized content storage;
- localized slugs;
- browser-language detection;
- cookie-based locale persistence;
- database translation tables;
- admin translation workflow;
- locale-aware search indexing;
- multilingual sitemap and structured data.