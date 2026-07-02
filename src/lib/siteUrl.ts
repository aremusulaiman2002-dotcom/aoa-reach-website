/**
 * Single source of truth for the production base URL.
 * Set NEXT_PUBLIC_SITE_URL in your environment to override.
 * Trailing slash is always stripped.
 */
export const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aoareach.org').replace(/\/$/, '')
