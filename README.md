# Abhishek Pal - Portfolio

Personal portfolio site: a dark single page in a pink and purple palette, with a case study per project.

Stack: Next.js 16 (App Router, static export), React 19, TypeScript, hand-written CSS. No UI or animation
libraries: every effect is a small component in `src/components/`.

**How the code works:** [`docs/README.md`](docs/README.md).

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
```

Deploy `out/` to any static host (Vercel, Netlify, GitHub Pages, S3). On Vercel, import the repo and deploy; no
settings needed.

## Edit your content

| What | Where |
| --- | --- |
| Name, roles, intro, about text, email, GitHub, LinkedIn, resume | `src/data/profile.ts` |
| Stats and capability cards | `src/data/profile.ts` |
| Projects (text, stack, highlights, live and repo links) | `src/data/projects.ts` |
| The animated mockup for each project | `src/components/ProjectVisual.tsx` |

Empty links are hidden, so the site works before you fill them in.

## Features

- Hero code card that types out a Next.js component describing you, with a live cycling `builds` value
- Interactive 3D point globe behind the hero, reacting to the pointer
- Magnetic buttons, custom cursor with labels
- Scroll progress bar, scroll-driven reveals, word-by-word about text, count-up stats
- Project cards with 3D tilt and glare, each with an animated CSS mockup
- Stack explorer: pick a technology to see which projects use it
- A working terminal (`help`, `projects`, `open <name>`, `matrix`, ...)
- Command palette on Ctrl+K / Cmd+K
- Case study page per project with a "next project" link
- Mobile menu, reduced-motion support, keyboard access

## Share this project

`npm run share` writes `portfolio-share/` with setup scripts (Node, Bash and PowerShell) that recreate this
project on another machine, an update script, and paste-sized parts. See `HOW-TO-SETUP.md` inside it.
