# Contributing to Vatandoshlar.de

Thank you for your interest in contributing to Vatandoshlar.de.

Vatandoshlar.de is a long-term platform for Uzbek people living in Germany or planning to move to Germany. Contributions should preserve the project's quality, maintainability, accessibility, and long-term scalability.

## Development principles

All contributions should follow these principles:

- Keep changes small and focused.
- Preserve the existing architecture unless a change is explicitly approved.
- Avoid quick fixes that introduce technical debt.
- Avoid unnecessary dependencies.
- Prefer reusable components over duplicated implementations.
- Keep TypeScript strict.
- Consider accessibility, responsive design, SEO, and dark mode.
- Do not mix unrelated changes in the same pull request or commit.
- Update documentation when behavior or architecture changes.

## Development setup

### Requirements

- Node.js 20 or newer
- npm
- Git

### Installation

```bash
git clone https://github.com/ZafarUsarov/vatandoshlar-portal.git
cd vatandoshlar-portal
npm install
```

### Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Branch strategy

The `main` branch represents the stable project state.

Development should happen in dedicated branches.

Supported branch naming conventions:

```text
feature/<short-description>
fix/<short-description>
refactor/<short-description>
docs/<short-description>
test/<short-description>
chore/<short-description>
```

Examples:

```text
feature/i18n-routing
fix/jobs-dark-mode
refactor/news-data-model
docs/architecture-guide
test/news-page
chore/update-dependencies
```

Do not implement unrelated features in the same branch.

## Commit conventions

The project follows Conventional Commits.

Format:

```text
type(scope): short description
```

Common commit types:

| Type | Purpose |
| --- | --- |
| `feat` | New functionality |
| `fix` | Bug fix |
| `refactor` | Internal code improvement without changing behavior |
| `docs` | Documentation changes |
| `test` | Test additions or updates |
| `style` | Formatting changes without logic changes |
| `chore` | Maintenance and tooling |
| `perf` | Performance improvements |
| `ci` | Continuous integration changes |

Examples:

```text
feat(i18n): add locale routing
fix(theme): resolve events page dark mode issues
refactor(data): extract shared news types
docs(readme): rewrite project documentation
test(services): add service repository tests
chore(git): ignore local project archives
```

Each commit should represent one meaningful change.

## Before implementation

Before changing code:

1. Understand the current implementation.
2. Identify affected files.
3. Evaluate architectural impact.
4. Identify possible risks.
5. Define how the change will be tested.
6. Confirm that the task belongs to the current milestone.

New ideas that are unrelated to the current milestone should be documented in the backlog instead of being implemented immediately.

## Code standards

### TypeScript

- Keep `strict` mode enabled.
- Avoid `any`.
- Prefer explicit domain types.
- Keep shared types in the appropriate `types/` module.
- Do not duplicate entity definitions across multiple files.

### React and Next.js

- Prefer Server Components by default.
- Use Client Components only when browser APIs, event handlers, or client state are required.
- Keep page components focused on routing and composition.
- Extract reusable sections when page files become too large.
- Do not add nested `<html>` or `<body>` elements outside the root layout.
- Preserve App Router conventions.

### Components

- Reuse existing components from `components/ui`.
- Reuse existing card components where appropriate.
- Avoid creating components that are used only once unless they improve readability or separation of concerns.
- Keep component APIs small and predictable.
- Include accessible labels for interactive controls.

### Styling

- Prefer semantic design tokens such as:

```text
bg-page
bg-surface
bg-surface-muted
text-text-primary
text-text-secondary
border-border-default
bg-brand
```

- Avoid hardcoded colors when a semantic token already exists.
- Verify both light and dark modes.
- Verify hover, focus, active, disabled, loading, and error states.
- Test layouts on mobile, tablet, and desktop.

### Accessibility

Changes should consider:

- Keyboard navigation
- Visible focus states
- Semantic HTML
- Form labels
- Alternative text for meaningful images
- Appropriate ARIA attributes
- Sufficient color contrast
- Reduced-motion preferences where relevant

### SEO

Pages should consider:

- Descriptive metadata
- Stable and meaningful URLs
- Canonical URLs
- Structured headings
- Semantic HTML
- Localized metadata when internationalization is implemented

## Data and content

The current project uses static TypeScript data files.

When modifying content:

- Preserve entity identifiers and stable slugs.
- Keep data structures consistent.
- Include source information when content depends on official information.
- Avoid embedding large content structures directly inside page components.
- Consider future migration to a database and admin portal.

Migration, visa, legal, and official-procedure content must be based on reliable sources and should include a last-reviewed date where applicable.

## Validation checklist

Before committing, run:

```bash
npm run lint
npm run build
```

Also verify manually:

- Existing routes still work
- Responsive layout
- Light mode
- Dark mode
- Keyboard navigation
- No browser console errors
- No TypeScript errors
- No unintended visual regressions

When tests are introduced, the relevant test suite must also pass.

## Pull requests

A pull request should:

- Have a clear and focused title
- Explain what changed
- Explain why the change was needed
- List affected areas
- Describe how the change was tested
- Include screenshots for visual changes
- Mention known limitations or follow-up work
- Avoid unrelated formatting or refactoring

Suggested pull request structure:

```md
## Summary

Describe the change.

## Motivation

Explain why it is necessary.

## Changes

- Change one
- Change two

## Testing

- [ ] Lint
- [ ] Build
- [ ] Responsive
- [ ] Dark mode
- [ ] Accessibility
- [ ] Manual route verification

## Screenshots

Add screenshots when relevant.

## Risks

Describe possible risks or follow-up work.
```

## Documentation

Update documentation when a contribution changes:

- Architecture
- Routes
- Data models
- Setup instructions
- Development workflow
- Roadmap
- Important technical decisions

Important architectural decisions should later be documented as Architecture Decision Records.

## Security and privacy

Do not commit:

- Passwords
- API keys
- Private tokens
- Personal user data
- Production credentials
- Local environment files
- Private archives or database exports

Report security concerns privately rather than creating a public issue.

## Project ownership

Vatandoshlar.de was founded and is developed by **Zafar Usarov**.

All contributions should support the project's mission of building a reliable, accessible, and maintainable platform for Uzbek people in Germany.