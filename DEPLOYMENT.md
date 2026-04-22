# Deployment

This repository uses a split deployment model:

- frontend deploys through Vercel Git integration
- backend deploys through GitHub Actions + Supabase CLI

## Frontend

The frontend lives in `web/`.

### Recommended setup

1. Import this GitHub repository into Vercel.
2. Set the project root directory to `web`.
3. Add the required Vercel environment variables.
4. Let Vercel handle preview and production deployments from Git pushes.

### Required Vercel environment variables

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Notes:

- `NEXT_PUBLIC_SUPABASE_URL` is safe for browser exposure.
- `SUPABASE_SERVICE_ROLE_KEY` must remain a server-only secret in Vercel.
- The frontend CI workflow validates the app, but Vercel Git integration is the deployment mechanism.

### Frontend CI

GitHub Actions workflow:

- `.github/workflows/frontend-ci.yml`

This runs:

- `npm ci`
- `npm run lint`
- `npm run build`

for the `web/` project on pushes to `main` and pull requests targeting `main`.

## Supabase Backend

The backend lives in `supabase/`.

GitHub Actions workflow:

- `.github/workflows/supabase-deploy.yml`

This workflow:

1. installs the Supabase CLI
2. links the repo to the target Supabase project
3. pushes database migrations
4. deploys all Edge Functions under `supabase/functions/`

### Required GitHub repository secrets

- `SUPABASE_ACCESS_TOKEN`
- `SUPABASE_DB_PASSWORD`
- `SUPABASE_PROJECT_REF`

### Runtime secrets

Runtime secrets for deployed Edge Functions should be stored in the Supabase project itself, not in this repository.

Examples:

- `OPENAI_API_KEY`

## Edge Function deployment behavior

Function deployment uses:

- `scripts/deploy/deploy-supabase-functions.sh`

That script deploys all local functions with:

- `supabase functions deploy --project-ref <ref> --use-api`

This means newly added functions are included automatically on future backend deploys.

## Current function config

The `process-readme` function is configured in `supabase/config.toml` to deploy without JWT verification, matching its current behavior.
