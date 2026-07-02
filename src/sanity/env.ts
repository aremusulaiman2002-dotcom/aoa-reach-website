// Env vars are validated at runtime; the build can proceed without them.
// If a value is missing at request time, Sanity API calls will fail clearly.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ''
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-02-01'
