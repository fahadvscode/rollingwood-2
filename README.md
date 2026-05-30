# Rollingwood Townhomes Brampton (Site 2)

Marketing site for Rollingwood Townhomes Brampton (Next.js).

## Images

All site images live in `public/img/` and are served from your domain (not Supabase Storage).

To refresh assets from the source site: `pnpm download-images`

## Environment variables

Set these in [Vercel](https://vercel.com) → Project → Settings → Environment Variables (leads only):

| Variable | Where | Secret? |
|----------|--------|---------|
| `NEXT_PUBLIC_SITE_URL` | Build + SEO | No |
| `NEXT_PUBLIC_SUPABASE_URL` | Server (leads API) | No |
| `SUPABASE_ANON_KEY` | Server only (API routes) | Yes — use server env, not `NEXT_PUBLIC_` |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only (optional) | Yes — never expose to browser |

Copy `.env.example` to `.env.local` for local development. Do not commit `.env.local`.

## Security

See [SECURITY.md](./SECURITY.md) for the full checklist.

- Lead form posts to `/api/leads` (server-side only; no Supabase client in the browser).
- Supabase keys live in **Vercel env vars** and `.env.local` locally — never in Git.
- `SUPABASE_ANON_KEY` must **not** use the `NEXT_PUBLIC_` prefix.
- `rollingwood_leads` RLS should allow **insert only** for `anon` (see `supabase/rollingwood_leads.sql`).
- Security headers: `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy` (see `next.config.mjs`).

## Deploy

```bash
pnpm install
pnpm build
```

Repo: [github.com/fahadvscode/rollingwood-2](https://github.com/fahadvscode/rollingwood-2) · Live: [www.rollingwoodtowns.ca](https://www.rollingwoodtowns.ca)
