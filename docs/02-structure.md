# 02 - Project structure

```text
portfolio/
  next.config.ts            output: "export" (static site in out/)
  package.json              scripts: dev, build, start, share
  tsconfig.json             "@/..." points at src/
  scripts/
    make-share.mjs          builds portfolio-share/ (see chapter 06)
  docs/                     these chapters
  src/
    app/
      layout.tsx            fonts, metadata, global chrome (nav, cursor, footer...)
      page.tsx              the home page sections
      globals.css           all styles
      work/[slug]/page.tsx  case study page, one per project
    data/
      profile.ts            your details, skills, stats, capabilities
      projects.ts           projects + allSkills
    components/             see the table below
```

## Components

| File | Client? | Purpose |
| --- | --- | --- |
| `BackToTop.tsx` | yes | Footer button that scrolls to the top |
| `CommandPalette.tsx` | yes | Ctrl+K / Cmd+K search over sections, projects and actions |
| `Contact.tsx` | yes | Contact form (opens a pre-filled email), copy-email button, social links |
| `Counter.tsx` | yes | Counts a number up when it scrolls into view |
| `Cursor.tsx` | yes | Dot + trailing ring cursor; shows labels from `data-cursor` |
| `Footer.tsx` | no | Name, title, links, local time, back to top |
| `HeroCanvas.tsx` | yes | The rotating point globe and stars behind the hero |
| `HeroEditor.tsx` | yes | The code card in the hero: types out a component, then cycles `profile.builds` |
| `LocalTime.tsx` | yes | Live clock in your time zone |
| `Magnetic.tsx` | yes | Pulls its child toward the pointer |
| `MatrixRain.tsx` | yes | Full-screen falling characters for the terminal's `matrix` command |
| `Nav.tsx` | yes | Header, scroll state, mobile menu |
| `ProjectCard.tsx` | no | One project row on the home page |
| `ProjectVisual.tsx` | no | The animated CSS mockup for each project |
| `Reveal.tsx` | yes | Adds `.is-in` when its element scrolls into view |
| `RoleCycler.tsx` | yes | Types, holds and deletes each role in turn |
| `ScrollProgress.tsx` | yes | The bar along the top that fills as you scroll |
| `StackExplorer.tsx` | yes | Technology chips that filter the project list |
| `Terminal.tsx` | yes | The working shell on the home page |
| `Tilt.tsx` | yes | 3D tilt toward the pointer; sets `--mx` / `--my` for spotlights |
| `WordReveal.tsx` | yes | Lights up the about text word by word as you scroll |

`ProjectCard`, `ProjectVisual` and `Footer` are server components that render client components inside them.
