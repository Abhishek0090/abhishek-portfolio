# 01 - Overview

The site is a portfolio for Abhishek Pal: one long home page plus a case study page for each project.

## Stack

| Part | Choice | Why |
| --- | --- | --- |
| Framework | Next.js 16, App Router | File-based routes, static generation, `next/font` |
| UI | React 19, TypeScript | Typed data files catch mistakes when editing content |
| Styling | One hand-written `globals.css` | Full control over the look; no class soup |
| Animation | CSS keyframes, transitions, `requestAnimationFrame`, `IntersectionObserver` | No libraries to load or update |
| Fonts | Geist (text and headings), Geist Mono (code and labels) | Loaded and self-hosted by `next/font/google` at build time |
| Output | Static export (`out/`) | Any static host works; nothing runs on a server |

The only runtime dependencies are `next`, `react` and `react-dom`.

## How a page is put together

```text
layout.tsx (every page)
  grain + gridlines         ambient background layers
  ScrollProgress            bar along the top
  Cursor                    custom cursor (mouse only)
  Nav                       header, clock, Ctrl+K button, mobile menu
  CommandPalette            hidden until Ctrl+K
  <main> page </main>
  Footer

page.tsx (home)
  Hero (copy + code card) -> Marquee -> About -> Work -> Capabilities -> Stack explorer -> Terminal -> Contact

work/[slug]/page.tsx (case study)
  Title -> animated mockup -> Overview + Stack -> Highlights -> Under the hood -> Next project
```

## Server and client components

Pages and layout are server components: they render to static HTML at build time. Anything that needs the
browser (pointer, scroll, timers, keyboard) is a small client component marked `"use client"`. Server
components pass data into them as props. This keeps most of the page as plain HTML and only hydrates the
interactive parts.

## Data flow

All text comes from two files:

- `src/data/profile.ts`: name, roles, intro, about, links, stats, capability cards
- `src/data/projects.ts`: the five projects and the derived `allSkills` list

Components import from these files. Nothing is fetched at runtime.
