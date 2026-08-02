import React, { useState } from 'react';
import { 
  Phone, Mail, MapPin, Menu, X, ArrowRight,
  Facebook, Linkedin, Twitter
} from 'lucide-react';
import { Language, TranslationStructure, SiteConfig } from '../../types';

interface HeaderProps {
  lang: Language;
  setLang: (l: Language) => void;
  t: TranslationStructure;
  siteConfig: SiteConfig;
  onOpenQuote: () => void;
  onOpenLegal: (type: 'impressum' | 'privacy') => void;
  activeSection: string;
  setActiveSection: (s: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  setLang,
  t,
  siteConfig,
  onOpenQuote,
  onOpenLegal,
  activeSection,
  setActiveSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const phoneDisplay = siteConfig.topBar?.phone || t.topBar.phone;
  const emailDisplay = siteConfig.topBar?.email || t.topBar.email;
  const addressDisplay = lang === 'de'
    ? (siteConfig.topBar?.addressDe || t.topBar.address)
    : (siteConfig.topBar?.addressEn || t.topBar.address);

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'services', label: t.nav.services },
    { id: 'about', label: t.nav.about },
    { id: 'contact', label: t.nav.contact },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 1. Top Header Bar (Scrolls up in natural document flow) */}
      <div className="bg-[#ABC2E8] text-[#002B66] py-3 px-4 sm:px-8 border-b border-[#92aedb]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Company Logo & Brand Title (Left) */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
          >
            <img
              src="/logo.png"
              alt="Fidar BestSupplier GmbH Logo"
              className="h-12 w-auto object-contain group-hover:scale-105 transition-transform"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-[#002B66]">
                  Fidar BestSupplier <span className="text-[#1A1A1A]">GmbH</span>
                </span>
              </div>
              <p className="text-[11px] text-[#002B66]/80 font-bold tracking-wider">
                Industrial Import & Export • Vienna
              </p>
            </div>
          </button>

          {/* Contact Info (Right) */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-4 text-xs sm:text-sm font-semibold text-[#002B66]">
            <a
              href={`tel:${phoneDisplay.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 hover:text-[#1A1A1A] transition-colors bg-white/40 px-3 py-1.5 rounded-lg border border-[#002B66]/10"
            >
              <Phone className="w-4 h-4 text-[#002B66]" />
              <span>{phoneDisplay}</span>
            </a>
            <a
              href={`mailto:${emailDisplay}`}
              className="flex items-center gap-1.5 hover:text-[#1A1A1A] transition-colors bg-white/40 px-3 py-1.5 rounded-lg border border-[#002B66]/10"
            >
              <Mail className="w-4 h-4 text-[#002B66]" />
              <span>{emailDisplay}</span>
            </a>
            <div className="hidden lg:flex items-center gap-1.5 bg-white/40 px-3 py-1.5 rounded-lg border border-[#002B66]/10">
              <MapPin className="w-4 h-4 text-[#002B66]" />
              <span className="truncate max-w-xs">{addressDisplay}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Primary Navigation App Bar (Sticks flush to top-0 when user scrolls past top bar) */}
      <nav className="sticky top-0 z-50 bg-[#FDB813] text-[#1A1A1A] py-2.5 px-4 sm:px-8 border-b border-[#e0a20f] shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Social Media Icons (Left) */}
          <div className="flex items-center gap-2">
            <a
              href={siteConfig.social?.facebook || "https://www.facebook.com/Codevz/"}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-[#002B66]/10 hover:bg-[#002B66] text-[#002B66] hover:text-[#FDB813] transition-all"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href={siteConfig.social?.linkedin || "https://www.linkedin.com/"}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-[#002B66]/10 hover:bg-[#002B66] text-[#002B66] hover:text-[#FDB813] transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={siteConfig.social?.twitter || "https://twitter.com/codevz2"}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-[#002B66]/10 hover:bg-[#002B66] text-[#002B66] hover:text-[#FDB813] transition-all"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>

          {/* Horizontal Navigation Menu (Right) */}
          <div className="hidden md:flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#002B66] text-white shadow-md'
                      : 'text-[#002B66] hover:bg-[#002B66]/10'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Language Selector Dropdown / Buttons */}
            <div className="flex items-center bg-[#002B66] p-1 rounded-lg ml-2">
              <button
                onClick={() => setLang('de')}
                className={`px-2.5 py-1 rounded text-xs font-black transition-all ${
                  lang === 'de'
                    ? 'bg-[#FDB813] text-[#002B66]'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                DE
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded text-xs font-black transition-all ${
                  lang === 'en'
                    ? 'bg-[#FDB813] text-[#002B66]'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* Quote Action Button */}
            <button
              onClick={onOpenQuote}
              className="ml-3 px-4 py-2 rounded-lg bg-[#002B66] hover:bg-[#001D47] text-white text-xs font-black tracking-wide shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>{t.topBar.getQuote}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Controls: Language Selector & Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="flex items-center bg-[#002B66] p-1 rounded-lg shadow-sm">
              <button
                onClick={() => setLang('de')}
                className={`px-2 py-0.5 rounded text-[11px] font-black transition-all ${
                  lang === 'de' ? 'bg-[#FDB813] text-[#002B66]' : 'text-white/80 hover:text-white'
                }`}
              >
                DE
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 rounded text-[11px] font-black transition-all ${
                  lang === 'en' ? 'bg-[#FDB813] text-[#002B66]' : 'text-white/80 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#002B66] text-[#FDB813] focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FDB813] border-t border-[#002B66]/20 px-4 py-4 mt-2 space-y-3">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2.5 rounded-lg text-left text-sm font-bold transition-colors ${
                    activeSection === item.id
                      ? 'bg-[#002B66] text-white'
                      : 'text-[#002B66] hover:bg-[#002B66]/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-[#002B66]/20 flex items-center justify-between">
              {/* Language selection in mobile drawer */}
              <div className="flex items-center bg-[#002B66] p-1 rounded-lg">
                <button
                  onClick={() => setLang('de')}
                  className={`px-3 py-1 rounded text-xs font-bold ${
                    lang === 'de' ? 'bg-[#FDB813] text-[#002B66]' : 'text-white'
                  }`}
                >
                  DE
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-3 py-1 rounded text-xs font-bold ${
                    lang === 'en' ? 'bg-[#FDB813] text-[#002B66]' : 'text-white'
                  }`}
                >
                  EN
                </button>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="px-4 py-2 rounded-lg bg-[#002B66] text-white text-xs font-bold"
              >
                {t.topBar.getQuote}
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
