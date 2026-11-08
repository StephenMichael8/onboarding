# Propel Onboarding Flow

A comprehensive multi-screen onboarding experience for Propel, designed to inspire, teach, and route users into personalized paths.

## Features

- **Interactive Engagement**: Collect user preferences and interests throughout the informational screens
- **Guided Flow**: Structured as Inspire → Teach → Prove → Consent → Identify → Role Module → Route → Commit
- **Path-Based Routing**: AI suggests starting paths based on user inputs, not roles
- **Hyper-Personalization**: Collects values, interests, personality signals, and community preferences
- **Role Modules**: Founder, Provider, Investor, and Changemaker specific flows
- **Path Packet**: Final screen combines path suggestion, next actions, people to meet, opportunities, and first post

## Tech Stack

- React 18
- Vite 8
- CSS3 with animations
- Vitest + React Testing Library (tests)
- ESLint 9 (flat config: react / react-hooks / jsx-a11y)

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run the test suite once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run coverage` | Run tests with a coverage report |

## Production Readiness

- **Testing & CI** — `npm test` runs unit/component tests; `.github/workflows/ci.yml`
  runs lint → test → build → production-dependency audit on every push and PR.
- **Error handling** — a top-level `ErrorBoundary` renders a recoverable fallback
  if any screen throws, instead of a blank page.
- **Persistence** — onboarding progress and answers are saved to `localStorage`,
  so a refresh mid-flow resumes where the user left off (cleared on completion).
- **Accessibility** — selection controls are native buttons with `aria-pressed`,
  the progress bar exposes `role="progressbar"`, focus moves to each new screen,
  and keyboard focus is visible.
- **Security headers** — `public/_headers` ships a Content-Security-Policy plus
  `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and
  `Permissions-Policy` for static hosts that read a `_headers` file (Netlify /
  Cloudflare Pages). Translate to your host's mechanism if deploying elsewhere.
- **Dependencies** — `npm audit` reports 0 vulnerabilities.

## Onboarding Flow Structure

1. Landing Page
2. Do More Together (Globe + interactive interests)
3. Reality + Belief (with values alignment)
4. Core Loop
5. Values (selectable value cards)
6. Stephen Intro
7. Scaling + Fragmentation
8. Stories (selectable story cards)
9. What You Can Do (what brought you here)
10. Proof
11. Community + Resources (interest selection)
12. Homepage Tutorial
13. Code of Conduct
14. Recap
15. Pick Your Starting Role
16. Dream
17. Success + Intent
18. Working On
19. Themes
20. Constraints
21. Superpower
22. Collaboration
23. Role Module A
24. Role Module B + Path Suggestion + Path Packet + First Post

## Data Collected

- Initial interests
- Aligned values
- Primary value
- Resonated story
- What brought you here
- Community interests
- Resource interests
- Dream, success metrics, intent
- Themes, constraints, superpowers
- Collaboration preferences
- Role-specific data

All data is used to personalize the user experience and route them to the most relevant path.
