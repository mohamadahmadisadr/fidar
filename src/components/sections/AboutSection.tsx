import React, { useState } from 'react';
import { 
  Building2, Globe, ShieldCheck, ShoppingCart, MapPin, Image as ImageIcon
} from 'lucide-react';
import { TranslationStructure, Language, SiteConfig } from '../../types';

interface AboutSectionProps {
  t: TranslationStructure;
  lang: Language;
  siteConfig: SiteConfig;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ t, lang, siteConfig }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'capabilities' | 'orderPolicy' | 'exportScope'>('overview');
  const [visualMode, setVisualMode] = useState<'image' | 'map'>('image');
  const [imgError, setImgError] = useState(false);

  const tagText = lang === 'de'
    ? (siteConfig.about?.tagDe || t.about.tag)
    : (siteConfig.about?.tagEn || t.about.tag);

  const titleText = lang === 'de'
    ? (siteConfig.about?.titleDe || t.about.title)
    : (siteConfig.about?.titleEn || t.about.title);

  const subtitleText = lang === 'de'
    ? (siteConfig.about?.subtitleDe || t.about.subtitle)
    : (siteConfig.about?.subtitleEn || t.about.subtitle);

  const desc1Text = lang === 'de'
    ? (siteConfig.about?.desc1De || t.about.description1)
    : (siteConfig.about?.desc1En || t.about.description1);

  const desc2Text = lang === 'de'
    ? (siteConfig.about?.desc2De || t.about.description2)
    : (siteConfig.about?.desc2En || t.about.description2);

  const tabOverview = lang === 'de'
    ? (siteConfig.about?.tabs?.overviewDe || t.about.overviewContent)
    : (siteConfig.about?.tabs?.overviewEn || t.about.overviewContent);

  const tabCapabilities = lang === 'de'
    ? (siteConfig.about?.tabs?.capabilitiesDe || t.about.capabilitiesContent)
    : (siteConfig.about?.tabs?.capabilitiesEn || t.about.capabilitiesContent);

  const tabOrderPolicy = lang === 'de'
    ? (siteConfig.about?.tabs?.orderPolicyDe || t.about.orderPolicyContent)
    : (siteConfig.about?.tabs?.orderPolicyEn || t.about.orderPolicyContent);

  const tabExportScope = lang === 'de'
    ? (siteConfig.about?.tabs?.exportScopeDe || t.about.exportScopeContent)
    : (siteConfig.about?.tabs?.exportScopeEn || t.about.exportScopeContent);

  const mapUrl = siteConfig.mapUrl || "https://maps.google.com/maps?q=Nordbahnanlage%204%2C%201210%20Wien%2C%20Austria&t=&z=15&ie=UTF8&iwloc=&output=embed";

  return (
    <section id="about" className="py-20 bg-[#F8FAFC] border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative">
              {/* Visual Mode Selector Tabs */}
              <div className="absolute top-4 left-4 z-20 flex items-center bg-white/90 backdrop-blur-md p-1 rounded-xl border border-[#E5E7EB] shadow-md">
                <button
                  type="button"
                  onClick={() => setVisualMode('image')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    visualMode === 'image'
                      ? 'bg-[#002B66] text-white shadow'
                      : 'text-slate-700 hover:text-[#002B66]'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Photo</span>
                </button>
                <button
                  type="button"
                  onClick={() => setVisualMode('map')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    visualMode === 'map'
                      ? 'bg-[#002B66] text-white shadow'
                      : 'text-slate-700 hover:text-[#002B66]'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Vienna Map</span>
                </button>
              </div>

              {/* Main Visual Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-lg bg-white h-96 group">
                {visualMode === 'image' && !imgError ? (
                  <>
                    <img
                      src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
                      alt="Fidar BestSupplier GmbH Vienna Industrial Facility"
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#002B66]/90 via-[#002B66]/20 to-transparent" />
                  </>
                ) : (
                  /* Interactive Google Maps Iframe */
                  <iframe
                    title="Fidar BestSupplier GmbH Location Vienna"
                    src={mapUrl}
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                )}

                {/* Badge Overlay */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-[#E5E7EB] shadow-xl z-10">
                  <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="Logo" className="h-10 w-auto object-contain" />
                    <div>
                      <p className="text-sm font-black text-[#002B66]">Fidar BestSupplier GmbH</p>
                      <p className="text-xs text-slate-600 font-bold">Established in Vienna in 2019</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quality Seal Badge */}
              <div className="absolute -top-6 -right-6 hidden sm:flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-xl z-20">
                <div className="w-10 h-10 rounded-full bg-[#002B66] text-[#FDB813] flex items-center justify-center font-black text-xs border border-[#002B66]">
                  AUT
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-[#1A1A1A]">Vienna, Austria</p>
                  <p className="text-[10px] text-slate-500 font-medium">Nordbahnanlage 4, 1210 Wien</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Copy & Interactive Tabs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-[#FDB813]/20 text-[#002B66] border border-[#FDB813] text-xs font-black tracking-widest uppercase">
                {tagText}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight leading-tight">
                About <span className="text-[#002B66]">{titleText}</span>
              </h2>
            </div>

            <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-semibold">
              {subtitleText}
            </p>

            <div className="space-y-3 text-slate-600 text-sm leading-relaxed">
              <p>{desc1Text}</p>
              <p>{desc2Text}</p>
            </div>

            {/* Interactive Tabs */}
            <div className="pt-4 space-y-4">
              <div className="flex items-center justify-start gap-2 border-b border-[#E5E7EB] pb-2 overflow-x-auto no-scrollbar scroll-smooth">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
                    activeTab === 'overview'
                      ? 'bg-[#002B66] text-white shadow'
                      : 'bg-white border border-[#E5E7EB] text-slate-700 hover:text-[#002B66]'
                  }`}
                >
                  {t.about.tabs.overview}
                </button>
                <button
                  onClick={() => setActiveTab('capabilities')}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
                    activeTab === 'capabilities'
                      ? 'bg-[#002B66] text-white shadow'
                      : 'bg-white border border-[#E5E7EB] text-slate-700 hover:text-[#002B66]'
                  }`}
                >
                  {t.about.tabs.capabilities}
                </button>
                <button
                  onClick={() => setActiveTab('orderPolicy')}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
                    activeTab === 'orderPolicy'
                      ? 'bg-[#002B66] text-white shadow'
                      : 'bg-white border border-[#E5E7EB] text-slate-700 hover:text-[#002B66]'
                  }`}
                >
                  {t.about.tabs.orderPolicy}
                </button>
                <button
                  onClick={() => setActiveTab('exportScope')}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
                    activeTab === 'exportScope'
                      ? 'bg-[#002B66] text-white shadow'
                      : 'bg-white border border-[#E5E7EB] text-slate-700 hover:text-[#002B66]'
                  }`}
                >
                  {t.about.tabs.exportScope}
                </button>
              </div>

              {/* Tab Content Box */}
              <div className="bg-white border border-[#E5E7EB] p-6 rounded-2xl min-h-[140px] flex items-center shadow-sm">
                {activeTab === 'overview' && (
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#FDB813] text-[#002B66] rounded-xl shrink-0">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed font-medium">
                      {tabOverview}
                    </p>
                  </div>
                )}

                {activeTab === 'capabilities' && (
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#ABC2E8] text-[#002B66] rounded-xl shrink-0">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed font-medium">
                      {tabCapabilities}
                    </p>
                  </div>
                )}

                {activeTab === 'orderPolicy' && (
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#FDB813] text-[#002B66] rounded-xl shrink-0">
                      <ShoppingCart className="w-6 h-6" />
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed font-medium">
                      {tabOrderPolicy}
                    </p>
                  </div>
                )}

                {activeTab === 'exportScope' && (
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#002B66] text-[#FDB813] rounded-xl shrink-0">
                      <Globe className="w-6 h-6" />
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed font-medium">
                      {tabExportScope}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
