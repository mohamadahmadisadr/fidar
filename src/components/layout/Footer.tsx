import React, { useState } from 'react';
import { 
  Building2, Phone, Mail, MapPin, ArrowUp, Facebook, Linkedin, Twitter
} from 'lucide-react';
import { TranslationStructure, SiteConfig } from '../../types';

interface FooterProps {
  t: TranslationStructure;
  siteConfig: SiteConfig;
  onOpenLegal: (type: 'impressum' | 'privacy') => void;
  onOpenAdmin?: () => void;
  setActiveSection: (s: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  t,
  siteConfig,
  onOpenLegal,
  onOpenAdmin,
  setActiveSection,
}) => {
  const scrollTo = (id: string) => {
    setActiveSection(id);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const phoneDisplay = siteConfig.topBar?.phone || t.topBar.phone;
  const primaryEmail = siteConfig.topBar?.email || t.topBar.email;
  const secondaryEmail = siteConfig.topBar?.emailSecondary || 'fidar.bs@gmail.com';
  const addressDisplay = siteConfig.topBar?.addressDe || t.topBar.address;

  const [clickCount, setClickCount] = useState(0);

  const handleCopyrightClick = () => {
    const next = clickCount + 1;
    setClickCount(next);
    if (next >= 3) {
      setClickCount(0);
      if (onOpenAdmin) onOpenAdmin();
    }
  };

  return (
    <footer className="bg-[#002B66] text-white pt-16 pb-8 border-t border-[#001D47]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Company Profile */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="shrink-0 rounded-xl border border-white/70 bg-white/90 p-2 shadow-lg shadow-black/20 backdrop-blur-sm">
                <img
                  src="/logo.png"
                  alt="Fidar BestSupplier GmbH Logo"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="text-center">
                <h3 className="font-black text-xl text-white tracking-tight">
                  Fidar BestSupplier <span className="text-[#FDB813]">GmbH</span>
                </h3>
                <p className="text-[11px] text-[#ABC2E8] font-bold tracking-wider">
                  Import & Export
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={siteConfig.social?.facebook || "https://www.facebook.com/Codevz/"}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-[#FDB813] text-white hover:text-[#002B66] transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social?.linkedin || "https://www.linkedin.com/"}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-[#FDB813] text-[#002B66] transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social?.twitter || "https://twitter.com/codevz2"}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-[#FDB813] text-white hover:text-[#002B66] transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-black text-[#FDB813] uppercase tracking-wider">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-200">
              <li>
                <button onClick={() => scrollTo('home')} className="hover:text-[#FDB813] transition-colors">
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('services')} className="hover:text-[#FDB813] transition-colors">
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('about')} className="hover:text-[#FDB813] transition-colors">
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('contact')} className="hover:text-[#FDB813] transition-colors">
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Headquarters */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-black text-[#FDB813] uppercase tracking-wider">
              About Our Company
            </h4>
            <div className="space-y-2 text-xs text-slate-200 font-medium">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FDB813] shrink-0 mt-0.5" />
                <span>{addressDisplay}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FDB813] shrink-0" />
                <span>{phoneDisplay}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FDB813] shrink-0" />
                <span>{primaryEmail} / {secondaryEmail}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#ABC2E8]">
          <p onClick={handleCopyrightClick} className="cursor-pointer select-none">{t.footer.copyright}</p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onOpenLegal('impressum')}
              className="hover:text-white transition-colors"
            >
              {t.nav.impressum}
            </button>
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-white transition-colors"
            >
              {t.nav.privacy}
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/10 hover:bg-[#FDB813] text-white hover:text-[#002B66] transition-all ml-2"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
