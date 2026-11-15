<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# This repo

Static marketing/SEO site for a cabinet shop. No test suite — `pnpm check`
(tsc + eslint) is the fast gate, `pnpm build` is the real one. Package manager
is **pnpm**, never npm.

- `src/lib/site.ts` is the only source of NAP (name/address/phone/email). Never
  hardcode contact info in a page or reintroduce `NEXT_PUBLIC_BUSINESS_*` vars.
- Canonical host is the apex `vitrincabinetry.com`; `www` 301s to it in `vercel.json`.
- Contact form posts to the PxlPeak leads API (`src/app/api/contact/route.ts`),
  not to email. There is no database in this app.
- Lightning CSS drops `-webkit-backdrop-filter` when paired with the standard
  property — write only `backdrop-filter`.
- To check a change in a real browser (screenshots, Lighthouse, Core Web
  Vitals), use the `chrome-devtools` MCP server.

## Deploying

Production deploys come only from Git. A push or merge to `main` triggers the
Vercel production build, and a pushed branch or pull request gets a preview.

- Do not run `vercel deploy`, `vercel --prod` or `vercel redeploy` unless the
  owner asks for that specific deploy. A CLI deploy is a second paid build of
  code that Git builds anyway, and it can publish uncommitted work that the
  next Git deploy silently overwrites. From 2026-10-21 to 2026-11-14, 199 CLI
  deploys helped push the Vercel team past its spend cap, which paused every
  site on 2026-11-14.
- Push related commits together. Every push to `main` is a full build.
- `scripts/vercel-ignore-build.sh` (the `ignoreCommand` in `vercel.json`) skips
  the build when only root-level Markdown, root dot-directories, `docs/`,
  `analysis/`, `tmp/`, `outputs/` or test files changed. Markdown below the
  root, such as blog posts, still builds. The canonical copy is
  `tier1/pxlpeak.com/scripts/vercel-ignore-build.sh` in `~/Desktop/websites`:
  edit it there, then copy it to each site.
