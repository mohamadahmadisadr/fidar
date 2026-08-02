import { useState, useEffect, useCallback } from 'react';
import {
  loginAdminWithGoogle,
  logoutAdmin,
  subscribeToAuthChanges,
  DEFAULT_ADMIN_EMAILS,
  User,
} from '../services';
import { ADMIN_DEV_BYPASS, PUBLIC_ADMIN } from '../devFlags';

/** True when the sign-in gate is disabled, locally or in a public-test build. */
const AUTH_GATE_DISABLED = ADMIN_DEV_BYPASS || PUBLIC_ADMIN;

/** Stand-in user shown when the sign-in gate is disabled. */
const DEV_USER = {
  email: 'guest@testing',
  displayName: 'Guest (not signed in)',
  photoURL: null,
} as unknown as User;

function isEmailAllowed(email: string | null, adminEmails?: string[]): boolean {
  const normalized = (email || '').toLowerCase().trim();
  const allowedList = (adminEmails && adminEmails.length > 0 ? adminEmails : DEFAULT_ADMIN_EMAILS)
    .map((e) => e.toLowerCase().trim());
  return allowedList.includes(normalized);
}

/**
 * Encapsulates Google authentication, session status, and the authorized
 * admin-email whitelist check. Any signed-in account outside the whitelist is
 * immediately signed back out.
 */
export function useAdminAuth(adminEmails?: string[]) {
  const [currentUser, setCurrentUser] = useState<User | null>(AUTH_GATE_DISABLED ? DEV_USER : null);
  const [isAuthenticated, setIsAuthenticated] = useState(AUTH_GATE_DISABLED);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    if (AUTH_GATE_DISABLED) return;

    const unsubscribe = subscribeToAuthChanges(async (user) => {
      if (!user) {
        setCurrentUser(null);
        setIsAuthenticated(false);
        return;
      }

      if (isEmailAllowed(user.email, adminEmails)) {
        setCurrentUser(user);
        setIsAuthenticated(true);
        setLoginError(null);
      } else {
        setCurrentUser(null);
        setIsAuthenticated(false);
        setLoginError(`Access Denied: Google account (${user.email}) is not authorized as an Admin.`);
        await logoutAdmin();
      }
    });
    return () => unsubscribe();
  }, [adminEmails]);

  const login = useCallback(async () => {
    setIsLoggingIn(true);
    setLoginError(null);
    try {
      const user = await loginAdminWithGoogle();
      if (!isEmailAllowed(user.email, adminEmails)) {
        setLoginError(`Access Denied: Google account (${user.email}) is not authorized as an Admin.`);
        await logoutAdmin();
        setIsAuthenticated(false);
        setCurrentUser(null);
      } else {
        setCurrentUser(user);
        setIsAuthenticated(true);
      }
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        setLoginError('Sign-in cancelled. Please complete sign-in via Google popup window.');
      } else if (err.code === 'auth/unauthorized-domain') {
        setLoginError('Domain not authorized in Firebase Console. Please add domain under Firebase Auth > Settings > Authorized Domains.');
      } else {
        setLoginError(err.message || 'Google Sign-In failed. Ensure Google Provider is enabled in Firebase Console.');
      }
    } finally {
      setIsLoggingIn(false);
    }
  }, [adminEmails]);

  const logout = useCallback(async () => {
    await logoutAdmin();
    setIsAuthenticated(false);
    setCurrentUser(null);
  }, []);

  return { currentUser, isAuthenticated, isLoggingIn, loginError, login, logout, setLoginError };
}
