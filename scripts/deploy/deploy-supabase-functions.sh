#!/usr/bin/env bash

set -euo pipefail

if [[ -z "${SUPABASE_PROJECT_REF:-}" ]]; then
  echo "SUPABASE_PROJECT_REF is required to deploy edge functions."
  exit 1
fi

echo "Deploying Supabase Edge Functions to project ${SUPABASE_PROJECT_REF}..."
supabase functions deploy --project-ref "${SUPABASE_PROJECT_REF}" --use-api

