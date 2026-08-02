/**
 * Build/runtime switches.
 *
 * Two different safety levels here — read carefully before adding to this file.
 */

/* -------------------------------------------------------------------------
 * LOCAL ONLY — AND-ed with `import.meta.env.DEV`, which Vite replaces with the
 * literal `false` in production builds, so these branches are removed from the
 * shipped bundle entirely. Safe by construction.
 * ---------------------------------------------------------------------- */

/** Skip Google Sign-In locally. Cannot reach production. */
export const ADMIN_DEV_BYPASS =
  import.meta.env.DEV && import.meta.env.VITE_ADMIN_DEV_BYPASS === 'true';

/** Point Firestore/Auth at local emulators. Cannot reach production. */
export const USE_FIREBASE_EMULATOR =
  import.meta.env.DEV && import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true';

/* -------------------------------------------------------------------------
 * SHIPS TO PRODUCTION — deliberately NOT gated on DEV.
 * ---------------------------------------------------------------------- */

/**
 * Removes the sign-in gate from /admin in a deployed build, so anyone with the
 * URL can open the admin panel. Intended for time-boxed external testing.
 *
 * This only removes the UI gate. Firestore security rules are the real control:
 * for a public admin to actually function, `firestore.rules` must also permit
 * unauthenticated writes to the content collections.
 *
 * Enable at build time only, never in a committed .env:
 *   VITE_PUBLIC_ADMIN=true npm run build
 *
 * A normal `npm run build` leaves the sign-in gate in place.
 */
export const PUBLIC_ADMIN = import.meta.env.VITE_PUBLIC_ADMIN === 'true';
