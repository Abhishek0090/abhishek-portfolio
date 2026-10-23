# 04 - Interactive components

Each effect is one component with one job. Most follow the same pattern: a `ref` to the DOM node, a
`useEffect` that adds listeners or starts a `requestAnimationFrame` loop, and a cleanup that removes them.
Values that change every frame are written straight to `element.style` instead of React state, so React does
not re-render 60 times a second.

## Cursor

`Cursor.tsx` only runs on devices with a fine pointer (`matchMedia("(pointer: fine)")`), so touch screens keep
their normal behaviour. It adds `has-cursor` to `<html>`, which hides the system cursor in CSS.

- The dot follows the pointer exactly. The ring eases toward it each frame (`rx += (x - rx) * 0.18`).
- On `pointermove` it finds the closest link, button, input or `[data-cursor]` element. Hovering any of them
  grows the ring. If the element has `data-cursor="Open"`, the ring fills and shows that word.

To label something: `<a data-cursor="View">`.

## Hero globe

`HeroCanvas.tsx` draws on a 2D canvas.

- 900 points sit on a sphere using a Fibonacci (golden-angle) spiral, which spaces them evenly.
- Each frame rotates them around Y and X, applies a simple perspective divide, and draws a square per point.
  Points nearer the viewer are bigger and brighter.
- The pointer sets a target tilt; the actual tilt eases toward it. Points within 140 px of the pointer turn
  pink and grow.
- 140 stars drift upward and twinkle, with a small parallax from the tilt.
- An `IntersectionObserver` stops the loop when the hero is off screen. With reduced motion it draws one
  frame and stops.
- The canvas is scaled by `devicePixelRatio` (capped at 2) so it stays sharp on retina screens.

## Hero code card

`HeroEditor.tsx` holds the code as lines of `[class, text]` tokens (`kw`, `fn`, `tag`, `attr`, `str`, `p`),
coloured in CSS. A counter grows by two characters every 22 ms, and each render shows that many characters
with a caret at the end. The `BUILDS` token is a placeholder: once typing finishes it becomes a `RoleCycler`
over `profile.builds`. The card is wrapped in `Tilt`, and four `.float-badge` pills bob around it. With
reduced motion the code appears complete at once.

## Text effects

- `RoleCycler.tsx`: a small state machine (typing, holding, deleting) driven by `setTimeout`.
- `WordReveal.tsx`: splits the paragraph into `<span>`s. On scroll it works out how far the paragraph has
  travelled through the viewport and adds `is-lit` to that share of the words.

## Scroll effects

- `Reveal.tsx`: wraps content, observes it once, adds `.is-in`, then disconnects. The look comes from the
  `variant` prop (`up`, `fade`, `left`, `scale`, `clip`), styled in CSS. `delay` staggers siblings.
- `Counter.tsx`: counts up with an ease-out curve the first time it is seen.
- `ScrollProgress.tsx`: sets `transform: scaleX(progress)` on a fixed bar, throttled to one update per frame.

## Pointer effects

- `Magnetic.tsx`: moves its child a fraction (`strength`) of the distance between the pointer and the
  element's centre. A CSS transition springs it back on leave.
- `Tilt.tsx`: converts the pointer position into `--rx` / `--ry` rotation and `--mx` / `--my` percentages.
  CSS uses the rotation for the 3D tilt and the percentages to place a radial glare or spotlight. Ignored for
  touch input.

## Command palette

`CommandPalette.tsx` listens for Ctrl+K / Cmd+K and for a `palette:open` window event (the nav button
dispatches it). Commands are built from the sections, every project, and whichever links are set. Typing
filters them; arrow keys move; Enter runs. Escape or a click outside closes it.

## Stack explorer

`StackExplorer.tsx` lists `allSkills` (sorted by how many projects use each). Hovering or clicking a chip
sets the active skill; projects that do not use it fade to 22% opacity and leave the tab order.

## Terminal

`Terminal.tsx` keeps an array of output lines in state. Enter parses the input into a command and arguments
and appends the result. Supported commands: `help`, `whoami`, `projects` / `ls`, `open <name>` / `cd`,
`skills`, `contact`, `date`, `matrix`, `echo`, `sudo`, `clear`.

- Tab completes command names and project slugs after `open `.
- Up and Down walk through history.
- `matrix` mounts `MatrixRain.tsx` for five seconds.

To add a command, add a `case` to the `switch` in `run()` and a line to `HELP`.

## Contact

There is no backend. Submitting the form builds a `mailto:` link with the subject and body filled in and
opens the visitor's mail app. The email itself is a button that copies it to the clipboard.
