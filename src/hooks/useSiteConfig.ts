import { useState, useEffect, useCallback } from 'react';
import { SiteConfig } from '../types';
import { defaultSiteConfig, fetchSiteConfigFromFirestore } from '../services';

/**
 * Loads the site configuration from Firestore and exposes a refresh handler.
 * Falls back to `defaultSiteConfig` while loading or on failure.
 */
export function useSiteConfig(autoLoad: boolean = true) {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(defaultSiteConfig);
  const [loading, setLoading] = useState(false);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const config = await fetchSiteConfigFromFirestore();
      setSiteConfig(config);
      return config;
    } catch (err) {
      console.error('Failed to load site config from Firestore:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoLoad) reload();
  }, [autoLoad, reload]);

  return { siteConfig, setSiteConfig, loading, reload };
}
