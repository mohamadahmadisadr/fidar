import React from 'react';
import { 
  ArrowRight
} from 'lucide-react';
import { TranslationStructure, Language, SiteConfig } from '../../types';

interface HeroSectionProps {
  t: TranslationStructure;
  lang: Language;
  siteConfig: SiteConfig;
  onOpenQuote: () => void;
  onExploreServices: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  t,
  lang,
  siteConfig,
  onOpenQuote,
  onExploreServices,
}) => {
  const titleText = lang === 'de'
    ? (siteConfig.hero?.titleDe || t.hero.title)
    : (siteConfig.hero?.titleEn || t.hero.title);

  const highlightText = lang === 'de'
    ? (siteConfig.hero?.highlightDe || t.hero.highlight)
    : (siteConfig.hero?.highlightEn || t.hero.highlight);

  const subtitleText = lang === 'de'
    ? (siteConfig.hero?.subtitleDe || t.hero.subtitle)
    : (siteConfig.hero?.subtitleEn || t.hero.subtitle);

  return (
    <section id="home" className="relative">
      {/* Hero Industrial Banner with Dark Overlay */}
      <div className="relative min-h-[500px] lg:min-h-[560px] flex items-center justify-center bg-slate-900 overflow-hidden">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80"
          alt="Fidar BestSupplier Industrial Banner"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
        />
        {/* Dark Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#002B66]/90 via-slate-950/85 to-[#002B66]/90" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-8 py-20 text-center space-y-6 z-10">
          {/* Breadcrumbs */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-white uppercase tracking-wider">
            <span className="text-[#FDB813] font-black">Home</span>
          </div>

          {/* Centered Page Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
            {titleText}{' '}
            <span className="text-[#FDB813] block mt-2">
              {highlightText}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-200 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            {subtitleText}
          </p>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenQuote}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-black text-sm bg-[#FDB813] text-[#002B66] hover:bg-[#e6a50e] shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>{t.hero.ctaSecondary}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreServices}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t.hero.ctaPrimary}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Highlights Bar below Banner */}
      <div className="bg-white py-10 border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 text-center shadow-sm">
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-[#002B66]">
                {t.hero.stats.experience}
              </p>
              <p className="text-xs sm:text-sm font-bold text-slate-600">
                {t.hero.stats.experienceLabel}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-[#D49B0D]">
                {t.hero.stats.projects}
              </p>
              <p className="text-xs sm:text-sm font-bold text-slate-600">
                {t.hero.stats.projectsLabel}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-[#002B66]">
                {t.hero.stats.countries}
              </p>
              <p className="text-xs sm:text-sm font-bold text-slate-600">
                {t.hero.stats.countriesLabel}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-emerald-700">
                {t.hero.stats.satisfaction}
              </p>
              <p className="text-xs sm:text-sm font-bold text-slate-600">
                {t.hero.stats.satisfactionLabel}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
