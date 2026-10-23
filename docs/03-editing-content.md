# 03 - Editing content

## Your details

Open `src/data/profile.ts`.

| Field | Shown in |
| --- | --- |
| `name` | Nav, hero greeting and code card, footer, page titles |
| `headline` | Hero title line, footer, page title |
| `roles` | Terminal `whoami` |
| `builds` | Cycled inside the hero code card (`builds="..."`) |
| `intro` | Hero paragraph, meta description, terminal `whoami` |
| `about` | The word-by-word about paragraph |
| `skills` | Your core stack: the marquee strip and the terminal `skills` command |
| `location`, `timezone` | Hero kicker, contact note, clocks |
| `links.email` | Contact form target, copy-email button, palette and terminal |
| `links.github`, `links.linkedin`, `links.resume` | Contact links, palette, terminal |

Leave a link as `""` and everything that uses it is hidden. Until `links.email` is set, the contact form
button reads "Email coming soon" and is disabled.

`stats` and `capabilities` in the same file feed the numbers rows (the first three also appear under the hero buttons) and the "What I bring" cards.

The hero headline ("I build fast, realtime web products.") is written in `src/app/page.tsx`.

## Projects

Open `src/data/projects.ts`. Each project has:

| Field | Use |
| --- | --- |
| `slug` | URL: `/work/<slug>`; also picks the mockup in `ProjectVisual.tsx` |
| `index` | The "01", "02" label |
| `name`, `tagline`, `category`, `year` | Card and case study headings |
| `accent` | Hex colour used for that project's highlights, borders and glow |
| `summary` | Case study overview |
| `stack` | Chips; also feeds the stack explorer and marquee |
| `highlights` | Three cards on the case study |
| `details` | The "Under the hood" list |
| `liveUrl`, `repoUrl` | Optional; when set, buttons appear on the case study |

Order in the array is the order on the site.

## Add a project

1. Add an entry to `projects` in `src/data/projects.ts`.
2. Add a mockup in `src/components/ProjectVisual.tsx`: a new `case "<slug>"` in the switch and a small
   component that returns `<div className="pv pv-yourname">...</div>`.
3. Style it in `globals.css` under "Project visuals". `.pv` is already absolutely positioned to fill the card,
   and `var(--accent)` is the project's colour.

If you skip step 2, the card shows the accent gradient with no mockup, which still looks fine.

The case study page, palette entry, terminal `open` command and stack explorer pick up the new project
automatically.

## Remove a project

Delete its entry from `projects`. Optionally delete its `case` and component in `ProjectVisual.tsx` and its
`.pv-*` styles.

## Use a screenshot instead of a mockup

Put the image in `public/` (e.g. `public/work/railbook.png`) and return it from `ProjectVisual`:

```tsx
case "railbook":
  return <img src="/work/railbook.png" alt="" className="pv" style={{ objectFit: "cover" }} />;
```
