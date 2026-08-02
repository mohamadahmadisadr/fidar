import React from 'react';
import { Save, Loader2 } from 'lucide-react';
import { SiteConfig } from '../../types';
import { FormLang } from './types';

interface AdminHeroAboutSectionProps {
  siteConfig: SiteConfig;
  setSiteConfig: React.Dispatch<React.SetStateAction<SiteConfig>>;
  isSaving: boolean;
  formLang: FormLang;
  setFormLang: (lang: FormLang) => void;
  onSave: () => void;
}

export const AdminHeroAboutSection: React.FC<AdminHeroAboutSectionProps> = ({
  siteConfig,
  setSiteConfig,
  isSaving,
  formLang,
  setFormLang,
  onSave,
}) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E7EB] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
          <h3 className="text-lg font-black text-[#1A1A1A]">Hero & About Us Copy Engine</h3>

          {/* Form Language Selector */}
          <div className="flex items-center bg-[#F8FAFC] p-1 rounded-xl border border-[#E5E7EB]">
            <button
              type="button"
              onClick={() => setFormLang('en')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                formLang === 'en' ? 'bg-[#002B66] text-white shadow' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🇬🇧 English
            </button>
            <button
              type="button"
              onClick={() => setFormLang('de')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                formLang === 'de' ? 'bg-[#002B66] text-white shadow' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🇩🇪 Deutsch
            </button>
          </div>
        </div>

        {/* English Content Form */}
        {formLang === 'en' && (
          <div className="space-y-5 animate-in fade-in">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">🇬🇧 Hero Banner Subtitle (English)</label>
              <textarea
                rows={3}
                disabled={isSaving}
                value={siteConfig.hero.subtitleEn}
                onChange={(e) => setSiteConfig({
                  ...siteConfig,
                  hero: { ...siteConfig.hero, subtitleEn: e.target.value }
                })}
                className="w-full p-4 rounded-xl border border-slate-200 text-sm focus:border-[#002B66] focus:ring-4 focus:ring-[#002B66]/10 focus:outline-none disabled:opacity-60"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">🇬🇧 About Paragraph 1 (English)</label>
              <textarea
                rows={3}
                disabled={isSaving}
                value={siteConfig.about.desc1En}
                onChange={(e) => setSiteConfig({
                  ...siteConfig,
                  about: { ...siteConfig.about, desc1En: e.target.value }
                })}
                className="w-full p-4 rounded-xl border border-slate-200 text-sm focus:border-[#002B66] focus:ring-4 focus:ring-[#002B66]/10 focus:outline-none disabled:opacity-60"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">🇬🇧 About Paragraph 2 / Order Policy (English)</label>
              <textarea
                rows={3}
                disabled={isSaving}
                value={siteConfig.about.desc2En}
                onChange={(e) => setSiteConfig({
                  ...siteConfig,
                  about: { ...siteConfig.about, desc2En: e.target.value }
                })}
                className="w-full p-4 rounded-xl border border-slate-200 text-sm focus:border-[#002B66] focus:ring-4 focus:ring-[#002B66]/10 focus:outline-none disabled:opacity-60"
              />
            </div>
          </div>
        )}

        {/* German Content Form */}
        {formLang === 'de' && (
          <div className="space-y-5 animate-in fade-in">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">🇩🇪 Hero Banner Subtitle (German / Deutsch)</label>
              <textarea
                rows={3}
                disabled={isSaving}
                value={siteConfig.hero.subtitleDe}
                onChange={(e) => setSiteConfig({
                  ...siteConfig,
                  hero: { ...siteConfig.hero, subtitleDe: e.target.value }
                })}
                className="w-full p-4 rounded-xl border border-slate-200 text-sm focus:border-[#002B66] focus:ring-4 focus:ring-[#002B66]/10 focus:outline-none disabled:opacity-60"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">🇩🇪 About Paragraph 1 (German / Deutsch)</label>
              <textarea
                rows={3}
                disabled={isSaving}
                value={siteConfig.about.desc1De}
                onChange={(e) => setSiteConfig({
                  ...siteConfig,
                  about: { ...siteConfig.about, desc1De: e.target.value }
                })}
                className="w-full p-4 rounded-xl border border-slate-200 text-sm focus:border-[#002B66] focus:ring-4 focus:ring-[#002B66]/10 focus:outline-none disabled:opacity-60"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">🇩🇪 About Paragraph 2 / Order Policy (German / Deutsch)</label>
              <textarea
                rows={3}
                disabled={isSaving}
                value={siteConfig.about.desc2De}
                onChange={(e) => setSiteConfig({
                  ...siteConfig,
                  about: { ...siteConfig.about, desc2De: e.target.value }
                })}
                className="w-full p-4 rounded-xl border border-slate-200 text-sm focus:border-[#002B66] focus:ring-4 focus:ring-[#002B66]/10 focus:outline-none disabled:opacity-60"
              />
            </div>
          </div>
        )}

        {/* Persian Content Form */}

      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={onSave}
          disabled={isSaving}
          className="px-8 py-4 bg-[#002B66] text-white rounded-2xl font-black text-sm hover:bg-[#001D47] flex items-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-transform disabled:opacity-50"
        >
          {isSaving ? (
            <Loader2 className="w-5 h-5 text-[#FDB813] animate-spin" />
          ) : (
            <Save className="w-5 h-5 text-[#FDB813]" />
          )}
          <span>{isSaving ? 'Saving to Firestore...' : 'Save Multilingual Hero & About Copy to Firestore'}</span>
        </button>
      </div>
    </div>
  );
};
