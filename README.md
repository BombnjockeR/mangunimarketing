# Manguni

The all-in-one workspace for brand ↔ creator collaboration: brief, review,
track performance, and pay out — in one place instead of a spreadsheet, a
WhatsApp thread, and an invoice queue.

See [STRATEGY.md](./STRATEGY.md) for the market thinking, feature rationale,
and the payment-problem writeup behind this build.

## What's here

This is a **working prototype**: real UI, real interactions, mock data.
Nothing is wired to a real backend, auth provider, or payment processor yet
— that's intentional, see "What's mocked" below.

- **Marketing site** (`/`) — the pitch: the views-vs-followers thesis, pain
  points, features, and the payment story.
- **Mock sign-in** (`/login`) — pick "Brand" or "Creator" to see the role's
  view. No password; this is a prototype.
- **Workspace** (`/app`)
  - **Overview** — role-specific snapshot (active briefs, balances, what's due).
  - **Board** — drag-and-drop Kanban across To do / In progress / In review / Done.
  - **Review** — click anywhere on a draft to drop a note at that exact spot; mark it fixed.
  - **Performance** — per-post views/likes/comments/shares/retention, pulled from mock data shaped like a real analytics API response.
  - **Payments** — escrow balance, fund/withdraw actions, and an "approve & release" flow that updates instantly (this is the mocked instant-payout UI).

## What's mocked (and what a real build needs next)

| Area | Now | To make real |
|---|---|---|
| Auth | Role picker written to `localStorage` | Real auth (email/OAuth), session tokens |
| Data | Static arrays in `src/lib/mockData.ts` | A database + API |
| Payments | UI-only balance/release simulation | A real processor (e.g. Stripe Connect) behind the same UI — see STRATEGY.md's "payment problem" section for the intended flow (fund → approve → instant release) |
| Instagram/TikTok performance | Seeded numbers with a client-side "ticking" animation | Platform APIs (Instagram Graph API, TikTok API) polled into the same `PostPerformance` shape already used here |

The data shapes in `mockData.ts` were written to look like real API
responses on purpose, so swapping mock data for live data is a data-fetching
change, not a redesign.

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
npm run preview  # serve the production build locally
```

Stack: Vite, React 19, TypeScript, Tailwind CSS v4, React Router, Recharts.
