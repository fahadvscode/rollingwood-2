# Security

## What is safe in GitHub

- Source code, images, and `.env.example` (placeholders only)
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SITE_URL` are public by design

## What must never be committed

- `.env.local` or any file containing real keys
- `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- `.vercel/` project link files

`.gitignore` blocks these paths. Before each push, run:

```bash
git status
git diff --cached
```

Confirm no `.env*` files with real values are staged.

## Vercel

Store secrets only in **Project → Settings → Environment Variables**:

| Variable | Exposure |
|----------|----------|
| `NEXT_PUBLIC_SITE_URL` | Public (build + browser) |
| `NEXT_PUBLIC_SUPABASE_URL` | Public (project URL only) |
| `SUPABASE_ANON_KEY` | **Server only** — no `NEXT_PUBLIC_` prefix |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server only** — optional; bypasses RLS if used |

Do not paste keys into the Vercel dashboard comments, commit messages, or issue titles.

## Supabase

- Run `supabase/rollingwood_leads.sql` so RLS allows **insert only** for `anon` on `rollingwood_leads`.
- Prefer `SUPABASE_ANON_KEY` on Vercel (current setup). Only add `SUPABASE_SERVICE_ROLE_KEY` if you need admin operations—and never expose it to the client.
- Rotate keys in Supabase → Project Settings → API if a key is ever leaked.

## If a key is exposed

1. Rotate the key in Supabase immediately.
2. Update Vercel environment variables.
3. Redeploy production.
4. Review Supabase logs for unusual inserts.

## Reporting

For security concerns about this site, contact the site operator directly.
