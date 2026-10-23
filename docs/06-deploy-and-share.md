# 06 - Build, deploy and share

## Build

```bash
npm run build
```

`next.config.ts` sets `output: "export"`, so the build writes a fully static site to `out/`:

- `out/index.html`: the home page
- `out/work/<slug>.html`: one case study per project (from `generateStaticParams`)
- `out/_next/`: scripts, CSS and the self-hosted fonts

`dynamicParams = false` on the case study route means any slug not in `projects.ts` is a 404.

To preview the export locally, serve `out/` with any static server, for example `npx serve out`.
(`npm start` runs `next start`, which does not serve a static export.)

## Deploy

| Host | Steps |
| --- | --- |
| Vercel | Push to GitHub, import the repo, deploy. Framework and output are detected. |
| Netlify | Build command `npm run build`, publish directory `out`. |
| GitHub Pages | Build, then publish `out/`. If the site lives under `/<repo>/`, add `basePath: "/<repo>"` to `next.config.ts`. |
| Any web server | Upload the contents of `out/`. Configure it to try `<path>.html` for clean URLs. |

## Share the project: `npm run share`

`scripts/make-share.mjs` packs the whole project (code, docs, config; not `node_modules`, `.next`, `out` or
`.env*` files) into `portfolio-share/`:

| File | Use |
| --- | --- |
| `portfolio-setup.mjs` | New machine with Node: `node portfolio-setup.mjs`, then `npm ci` and `npm run dev` |
| `portfolio-setup.sh` | New machine, macOS / Linux / Git Bash: `bash portfolio-setup.sh` |
| `portfolio-setup.ps1` | New machine, Windows PowerShell: `powershell -ExecutionPolicy Bypass -File .\portfolio-setup.ps1` |
| `portfolio-update.mjs` | Bring an existing copy up to date; removes files this version dropped; reinstalls packages if they changed |
| `parts/` | The setup script split into pieces under 90 KB each, for pasting through a chat or codeshare |
| `HOW-TO-SETUP.md` | Step-by-step instructions with sizes and file counts |

How it works:

- Node scripts: the files are stored as gzipped, base64-encoded JSON inside the script. Running it decodes
  each file, writes it, and checks it against a SHA-256 hash.
- Bash and PowerShell scripts: the files are stored as a gzipped tar, base64-encoded. The script decodes it
  and extracts with the system `tar` (built into macOS, Linux, Git Bash and Windows 10 or newer).
- The setup script refuses to write into a folder that holds a different project unless you pass `--force`.
- The update script records the files it installed in `.portfolio-files.json`, so the next update can
  remove files that a later version no longer has. Your own files are never touched.

Run `npm run share` again after each change to regenerate the scripts. `portfolio-share/` is in `.gitignore`.
