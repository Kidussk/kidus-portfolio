# Portfolio — six systems, six live demos

A single-page portfolio where every project opens a **working front-end demo** instead of a
screenshot gallery. Each demo is a self-contained React application seeded with fictional data,
running entirely in the browser — no backend, no API keys, nothing to deploy but static files.

| Demo | What you can do in it |
| --- | --- |
| **AssetFlow** | Filter a multi-branch asset register, open an asset to see straight-line depreciation and its movement history, check items in and out, drag work orders across a maintenance board |
| **EthioTractors** | Browse the public machinery site, filter the catalogue by sector, submit a quote request and watch it land in the staff inbox, publish or hide a product |
| **Liben Finishing Technology** | Move projects through six phases, approve daily site reports, advance procurement requests, and build a proforma invoice with live VAT, amount-in-words and a genuinely scannable QR code |
| **HU-IPMS** | Switch between Department Head, Advisor and Student — the navigation and every screen change with the role. Match advisors to groups by expertise and capacity, review submissions, read the defence schedule and weighted grades |
| **FetanSMS** | Compose an SMS with merge fields and watch the segment count and cost estimate update live, send it and watch delivery progress, approve a bank transfer |
| **University Hub** | Walk the academic structure tree, spot and resolve a timetable clash, see venue capacity warnings, validate a registrar spreadsheet before importing it |

## Running it

```bash
npm install
npm run dev          # http://localhost:5173
```

```bash
npm run build        # type-check + production bundle into dist/
npm run preview      # serve the built output
```

## Deploying to Vercel

The repository is a plain static Vite build, so no configuration is needed beyond what is
committed:

1. Import the repository at [vercel.com/new](https://vercel.com/new).
2. Vercel detects Vite automatically — build command `npm run build`, output directory `dist`.
3. Deploy.

`vercel.json` rewrites every path to `index.html` so that deep links like `/demo/liben` work on a
hard refresh, and sets a long cache lifetime on the fingerprinted assets.

## Editing the content

Everything you would want to change lives in two files:

- **`src/data/profile.ts`** — name, role, location, contact details, the About paragraphs, the
  capability groups and the four process steps. Fields that are placeholders or inferred are marked
  `[edit]` in a comment.
- **`src/data/projects.ts`** — the six projects: name, sector, tagline, summary, the problem
  statement shown in the demo's "About this system" panel, feature highlights, tech stack, the three
  headline facts and the accent colour that themes that project's demo.

Set `phone`, `linkedin` or `telegram` to an empty string in `profile.ts` and that row disappears
from the contact section automatically.

## Regenerating the card previews

The image on each project card is a real screenshot of that project's demo, not a mockup. To
refresh them after changing a demo:

```bash
npm run dev            # in one terminal
npm run shots          # in another — writes public/shots/<slug>.png
npm run og             # regenerates the social share card, public/og.png
```

`scripts/shots.mjs` captures the demo application at 1440×800; the card container uses a matching
`9/5` aspect ratio, so if you change one, change the other.

## How it is put together

```
src/
├── data/                profile + project content (edit these)
├── components/
│   ├── site/            portfolio sections: Nav, Hero, Work, About, …
│   └── icons.tsx        brand marks Lucide v1 no longer ships
├── demos/
│   ├── kit.tsx          shared demo UI: panels, tables, badges, drawers, toasts, formatters
│   ├── DemoShell.tsx    the app frame every demo renders inside
│   ├── registry.ts      slug → lazily-imported demo
│   └── <slug>/          data.ts (seed) + index.tsx (screens) per project
└── pages/
    ├── Portfolio.tsx    the one-page site
    └── DemoPage.tsx     demo chrome: back link, context panel, reset, prev/next
```

Each demo is code-split, so opening the portfolio downloads none of them; Recharts is pulled into a
single shared `charts` chunk rather than duplicated across the demos that use it.

Every demo holds its state in React only. The **reset** button in the demo header remounts the
application, so anything a visitor changes is thrown away — the next person always starts from the
same seed.

## A note on the data

All names, companies, figures, phone numbers and documents in these demos are invented for
illustration. No client data appears anywhere in this repository.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · React Router · Recharts · Lucide · qrcode
