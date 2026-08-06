import React from 'react';
import { X, ShieldCheck, Scale } from 'lucide-react';
import { Language, TranslationStructure, SiteConfig } from '../../types';

interface LegalModalProps {
  type: 'impressum' | 'privacy' | null;
  onClose: () => void;
  t: TranslationStructure;
  lang: Language;
  siteConfig?: SiteConfig;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose, t, lang, siteConfig }) => {
  if (!type) return null;

  const address = lang === 'de'
    ? (siteConfig?.topBar?.addressDe || t.topBar.address)
    : (siteConfig?.topBar?.addressEn || t.topBar.address);
  const phone = siteConfig?.topBar?.phone || '+43-6642466336';
  const email = siteConfig?.topBar?.email || 'info@fidarbs.at';
  const emailSecondary = siteConfig?.topBar?.emailSecondary || 'fidar.bs@gmail.com';
  const contactPerson = siteConfig?.topBar?.contactPerson || 'Reza Jafari';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white border border-[#E5E7EB] rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200"
          aria-label={t.legal.close}
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'impressum' ? (
          <div className="space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
            <div className="flex items-center gap-3 pb-3 border-b border-[#E5E7EB]">
              <Scale className="w-6 h-6 text-[#002B66]" />
              <div>
                <h3 className="text-xl font-black text-[#1A1A1A]">{t.legal.impressum.title}</h3>
                <p className="text-xs text-slate-500">{t.legal.impressum.subtitle}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-[#1A1A1A] text-base">{t.legal.impressum.ownerTitle}</h4>
              <p className="font-bold text-[#002B66]">Fidar BestSupplier GmbH</p>
              <p className="whitespace-pre-line">{address}</p>
            </div>

            <div className="space-y-1 text-xs">
              <p><span className="font-bold text-[#1A1A1A]">{t.legal.impressum.businessSubjectLabel}</span> {t.legal.impressum.businessSubject}</p>
              <p><span className="font-bold text-[#1A1A1A]">{t.legal.impressum.foundingYearLabel}</span> {t.legal.impressum.foundingYear}</p>
              <p><span className="font-bold text-[#1A1A1A]">{t.legal.impressum.contactPersonLabel}</span> {contactPerson}</p>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#E5E7EB]">
              <h4 className="font-bold text-[#1A1A1A]">{t.legal.impressum.contactTitle}</h4>
              <p>{t.legal.impressum.phoneLabel} {phone}</p>
              <p>{t.legal.impressum.emailLabel} {email} / {emailSecondary}</p>
              <p>{t.legal.impressum.websiteLabel} https://fidarbs.at</p>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#E5E7EB] text-slate-500 text-xs">
              <h4 className="font-bold text-[#1A1A1A] text-xs">{t.legal.impressum.disclaimerTitle}</h4>
              <p>{t.legal.impressum.disclaimerText}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
            <div className="flex items-center gap-3 pb-3 border-b border-[#E5E7EB]">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              <div>
                <h3 className="text-xl font-black text-[#1A1A1A]">{t.legal.privacy.title}</h3>
                <p className="text-xs text-slate-500">{t.legal.privacy.subtitle}</p>
              </div>
            </div>

            {t.legal.privacy.sections.map((section, index) => (
              <div key={section.title} className="space-y-2">
                <h4 className="font-bold text-[#1A1A1A]">{section.title}</h4>
                <p>{section.body}</p>
                {index === 0 && (
                  <p>Fidar BestSupplier GmbH, {address} ({email}).</p>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end pt-4 border-t border-[#E5E7EB]">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#002B66] text-white font-bold text-xs hover:bg-[#001D47]"
          >
            {t.legal.close}
          </button>
        </div>
      </div>
    </div>
  );
};
