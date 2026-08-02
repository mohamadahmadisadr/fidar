import React, { useState, useEffect } from 'react';
import { translations } from './locales';
import { Language } from './types';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { AboutSection } from './components/sections/AboutSection';
import { ContactSection } from './components/sections/ContactSection';
import { QuoteModal } from './components/common/QuoteModal';
import { LegalModal } from './components/common/LegalModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { trackPageView } from './services';
import { useSiteConfig } from './hooks/useSiteConfig';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('fidar_user_lang');
    if (saved === 'en' || saved === 'de') {
      return saved as Language;
    }
    // Anything else (including the retired 'fa') falls back to German.
    return 'de';
  });

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('fidar_user_lang', newLang);
  };
  const [activeSection, setActiveSection] = useState<string>('home');
  const { siteConfig, reload: loadSiteConfig } = useSiteConfig();

  // Route Path Detection (/admin or #/admin or #admin)
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const p = window.location.pathname.toLowerCase();
    const h = window.location.hash.toLowerCase();
    return (p.startsWith('/admin') || h.startsWith('#/admin') || h === '#admin') ? '/admin' : '/';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const p = window.location.pathname.toLowerCase();
      const h = window.location.hash.toLowerCase();
      if (p.startsWith('/admin') || h.startsWith('#/admin') || h === '#admin') {
        setCurrentPath('/admin');
      } else {
        setCurrentPath('/');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Global Secret Shortcut Listener: Ctrl + Shift + A (or Cmd + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        navigateTo('/admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateTo = (path: string) => {
    if (path === '/admin') {
      window.history.pushState({}, '', '/admin');
    } else {
      window.history.pushState({}, '', '/');
    }
    setCurrentPath(path);
  };
  
  // Modal states
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteService, setQuoteService] = useState<string | undefined>(undefined);
  const [legalType, setLegalType] = useState<'impressum' | 'privacy' | null>(null);

  const t = translations[lang];

  // Dynamically switch document language & title
  useEffect(() => {
    const htmlElem = document.documentElement;
    if (lang === 'de') {
      htmlElem.setAttribute('dir', 'ltr');
      htmlElem.setAttribute('lang', 'de');
      document.title = 'Fidar BestSupplier GmbH | Import & Export von Industrieanlagen - Wien';
    } else {
      htmlElem.setAttribute('dir', 'ltr');
      htmlElem.setAttribute('lang', 'en');
      document.title = 'Fidar BestSupplier GmbH | International Trading & Industrial Solutions';
    }
  }, [lang]);

  useEffect(() => {
    if (currentPath !== '/admin') {
      trackPageView(lang);
    }
  }, [currentPath, lang]);

  const handleOpenQuoteWithService = (serviceName: string) => {
    setQuoteService(serviceName);
    setIsQuoteOpen(true);
  };

  const handleOpenGeneralQuote = () => {
    setQuoteService(undefined);
    setIsQuoteOpen(true);
  };

  const handleExploreServices = () => {
    setActiveSection('services');
    const elem = document.getElementById('services');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If path is /admin, render Standalone Full-Page Admin Dashboard
  if (currentPath === '/admin') {
    return (
      <AdminDashboard
        onReturnToSite={() => navigateTo('/')}
        onRefreshSiteData={loadSiteConfig}
      />
    );
  }

  // Otherwise render Public Website
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#FDB813] selection:text-[#002B66] font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header Navigation */}
      <Header
        lang={lang}
        setLang={handleSetLang}
        t={t}
        siteConfig={siteConfig}
        onOpenQuote={handleOpenGeneralQuote}
        onOpenLegal={(type) => setLegalType(type)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content Sections */}
      <main className="w-full">
        {/* 1. Home / Hero Section */}
        <HeroSection
          t={t}
          lang={lang}
          siteConfig={siteConfig}
          onOpenQuote={handleOpenGeneralQuote}
          onExploreServices={handleExploreServices}
        />

        {/* 2. Products & Services Section - Connected to Firestore Database */}
        <ServicesSection
          t={t}
          lang={lang}
          onOpenQuoteWithService={handleOpenQuoteWithService}
        />

        {/* 3. About Us Section */}
        <AboutSection
          t={t}
          lang={lang}
          siteConfig={siteConfig}
        />

        {/* 4. Contact Us Section */}
        <ContactSection
          t={t}
          lang={lang}
          siteConfig={siteConfig}
          initialService={quoteService}
        />
      </main>

      {/* Footer */}
      <Footer
        t={t}
        siteConfig={siteConfig}
        onOpenLegal={(type) => setLegalType(type)}
        onOpenAdmin={() => navigateTo('/admin')}
        setActiveSection={setActiveSection}
      />

      {/* Consultation Request Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        t={t}
        initialService={quoteService}
      />

      {/* Legal Information Modal (Impressum & DSGVO Privacy) */}
      <LegalModal
        type={legalType}
        onClose={() => setLegalType(null)}
        t={t}
        siteConfig={siteConfig}
      />
    </div>
  );
}
