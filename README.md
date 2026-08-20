# QJC_website

A personal website built with Next.js and TypeScript.

## Sections

- Home
- Life
- Thoughts
- Work
- CV

## Development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Data ownership

This repository is the application boundary for the QJC personal website.

Durable, user-created QJC website data must be stored only in the `QJC_website` schema of the Supabase project `glwmhidielyxskiwenqb`.

The existing `public` tables belong to the separate D_E website and must not be used for new QJC website features. The `D_E_website` schema is a logical view of those existing D_E resources and is also outside the QJC data boundary.

Static site content such as page copy, CV content, layout, styles, and source-controlled assets remains in this GitHub repository. Browser `localStorage` may be used only for temporary UI state or one-time migration, never as the canonical store for durable QJC content.

The Thoughts feature uses `QJC_website.thoughts`, and QJC editor membership uses `QJC_website.editors`.
