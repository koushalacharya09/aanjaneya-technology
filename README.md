# Aanjaneya Technology

Production marketing + lead-gen site for **Aanjaneya Technology** (Jaipur).

Stack: Next.js App Router, TypeScript, Tailwind v4, Prisma + Neon, Resend, Upstash, Auth.js, Cloudflare Turnstile.

## Run locally

```bash
pnpm install
cp .env.example .env.local
# fill DATABASE_URL (optional for UI), AUTH_SECRET, etc.
pnpm db:generate
pnpm db:push          # when DATABASE_URL is set
pnpm db:seed          # optional sample lead
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Purpose |
|--------|---------|
| `pnpm dev` | Dev server |
| `pnpm build` | Prisma generate + production build |
| `pnpm start` | Start production server |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm test` | Vitest unit tests |
| `pnpm test:e2e` | Playwright smoke + axe |

## Environment variables

See `.env.example`:

- `NEXT_PUBLIC_SITE_URL` — canonical apex URL (no www)
- `DATABASE_URL` — Neon Postgres
- `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`, `RESEND_FROM_EMAIL`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` (optional locally)
- `AUTH_SECRET`, `AUTH_ADMIN_EMAIL`, `AUTH_ADMIN_PASSWORD`
- `NEXT_PUBLIC_GA4_MEASUREMENT_ID`, `NEXT_PUBLIC_CLARITY_ID`
- `CRM_WEBHOOK_URL` (optional stub)

## Service providers

1. **Neon** — create a project, copy the connection string to `DATABASE_URL`, run `pnpm db:push`.
2. **Resend** — API key + verified sender; set notify inbox.
3. **Upstash** — Redis REST URL/token for rate limits (in-memory fallback if empty).
4. **Turnstile** — Cloudflare widget site + secret keys.
5. **Auth.js** — generate `AUTH_SECRET` (`openssl rand -base64 32`).

## Add a service page

1. Create `src/content/services/your-slug.ts` matching the existing service shape.
2. Export it from `src/content/services/index.ts`.
3. Add a short entry to `services` in `src/content/site.ts` (nav + homepage).
4. Add primary keyword in `src/content/seo/keyword-map.ts`.

The route `/services/[slug]` is generated automatically.

## Add an industry page

1. Create `src/content/industries/your-slug.ts`.
2. Export from `src/content/industries/index.ts`.
3. Add nav entry in `src/content/site.ts` `industries` array.
4. Add keyword in `keyword-map.ts`.

## Deploy (Vercel)

1. Push to GitHub; import the repo in Vercel.
2. Set env vars for Preview and Production (separate Neon DBs recommended).
3. Domains: add apex + www; redirect **www → apex** (non-www canonical).
4. After deploy: Search Console sitemap (`/sitemap.xml`), Bing Webmaster, GA4, Google Business Profile website = homepage with NAP matching `content/site.ts`.

## Post-launch SEO checklist

- [ ] Submit sitemap to Google Search Console
- [ ] Verify Bing Webmaster
- [ ] Connect GA4 (+ Clarity if used)
- [ ] GBP website link → homepage; NAP identical to site
- [ ] Replace all `[PLACEHOLDER: …]` values
- [ ] Run Lighthouse on Home, one service, one industry, Quote

## Brand notes

- Logo: geometric “A” + saffron flame (`components/brand/Logo.tsx`)
- Colours / type: `src/styles/tokens.css`
- No invented clients, stats, awards, or ranking guarantees
