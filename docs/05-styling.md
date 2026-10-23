# 05 - Styling and animation

All styles live in `src/app/globals.css`, split into labelled sections (`/* ===== Hero ===== */` and so on).
Class names are plain and descriptive (`.work-card`, `.stack-chip`). Project mockups use a `pv-` prefix.

## Tokens

Defined on `:root`:

| Token | Value | Use |
| --- | --- | --- |
| `--bg`, `--bg-2` | near-black violets | Page and card backgrounds |
| `--surface`, `--surface-2` | white at 3% / 6% | Glassy panels |
| `--line`, `--line-2` | white at 8% / 15% | Borders and dividers |
| `--text`, `--muted`, `--dim` | light to dark grey | Text levels |
| `--pink`, `--purple` | `#ff4d8d`, `#8a3ffc` | Brand colours |
| `--grad` | pink to magenta to purple | Buttons, logo, highlighted words, active chips |
| `--green` | `#3ddc84` | The "available" status dot only |
| `--accent` | defaults to pink | Overridden per project with an inline style |
| `--gutter` | `clamp(16px, 4vw, 56px)` | Side padding everywhere |
| `--ease` | `cubic-bezier(0.16, 1, 0.3, 1)` | The "expo out" curve used by almost every transition |

To change the brand colours, change `--pink`, `--purple` and `--grad` (and the matching `rgba(255,77,141,...)`
and `rgba(138,63,252,...)` values, which are the same colours with transparency). The globe colours are in
`HeroCanvas.tsx`.

## Per-project colour

Cards and case studies set `style={{ "--accent": project.accent }}`. Anything inside that uses
`var(--accent)` or `color-mix(in srgb, var(--accent) 40%, transparent)` picks up the project's colour.

## Reveal variants

`Reveal` adds `.reveal .reveal-<variant>`; `.is-in` returns everything to its natural state.

| Variant | Starts as |
| --- | --- |
| `up` | 48 px lower, transparent |
| `fade` | transparent |
| `left` | 32 px to the left, transparent |
| `scale` | 94% size, slightly lower, transparent |
| `clip` | clipped away from the bottom, so text wipes up |

## Hero entrance

Hero elements use `.hero-in` with a `--d` delay custom property. They fade up once on load, left column first,
then the code card.

## Text tricks

- `.grad-text`: the pink-purple gradient clipped to text, used for highlighted words.
- `.roll` + `data-text`: the label slides up on hover and a pink copy (from `attr(data-text)`) slides in
  under it. Used in the nav and contact links.

## Ambient layers

- `.grain`: an inline SVG noise texture, at 3% opacity on top of
  everything (`pointer-events: none`).
- `.gridlines`: an 88 px grid that fades out down the page with a radial mask.
- `body::before`: a soft purple-pink glow in the top-right corner.

## Responsive rules

| Breakpoint | Changes |
| --- | --- |
| up to 1080 px | Nav links become a full-screen menu that opens with a growing circle; the hero code card moves under the text; work rows stack; stack explorer, contact and case study grids become one column; capability cards go to two columns |
| up to 720 px | Nav always has its glass background; Ctrl+K hint hidden; code card text shrinks; stats go two by two; cards one column |

The nav drops `backdrop-filter` while the mobile menu is open, because an ancestor with a backdrop filter
traps `position: fixed` children inside its own box.

## Reduced motion

Under `prefers-reduced-motion: reduce` every animation and transition runs in effectively zero time, reveals
start visible, the globe draws a single frame, counters show their final value and the hero code card shows its
code complete.
