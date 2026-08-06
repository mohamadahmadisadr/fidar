import React, { useState, useRef, useEffect } from 'react';
import {
  Globe, Building2, Briefcase, Cpu, Truck, ArrowRight, CheckCircle2, ChevronRight, ChevronDown,
  ArrowLeft, Check, X, Loader2, Package, Layers, Wrench
} from 'lucide-react';
import { TranslationStructure, Language, ServiceProductItem } from '../../types';
import { useProducts } from '../../hooks/useProducts';

interface ServicesSectionProps {
  t: TranslationStructure;
  lang: Language;
  onOpenQuoteWithService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  t,
  lang,
  onOpenQuoteWithService,
}) => {
  const [selectedService, setSelectedService] = useState<ServiceProductItem | null>(null);
  const {
    loading,
    activeCategory,
    setActiveCategory,
    activeCategoryOption,
    categoryList,
    filteredProducts: filteredItems,
  } = useProducts(lang);

  const sectionRef = useRef<HTMLElement | null>(null);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const categoryMenuRef = useRef<HTMLDivElement | null>(null);

  // Close the category dropdown on outside click / Escape.
  useEffect(() => {
    if (!isCategoryMenuOpen) return;

    const handlePointerDown = (e: MouseEvent) => {
      if (!categoryMenuRef.current?.contains(e.target as Node)) {
        setIsCategoryMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCategoryMenuOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCategoryMenuOpen]);

  /** Switching category mid-scroll would drop the user into the middle of a
   *  different list, so always bring them back to the top of the section. */
  const goToCategory = (categoryId: string | null) => {
    setActiveCategory(categoryId);
    setIsCategoryMenuOpen(false);
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const getIcon = (iconName: string, className = 'w-6 h-6 text-[#002B66]') => {
    switch (iconName) {
      case 'Building2': return <Building2 className={className} />;
      case 'Briefcase': return <Briefcase className={className} />;
      case 'Cpu': return <Cpu className={className} />;
      case 'Truck': return <Truck className={className} />;
      case 'Layers': return <Layers className={className} />;
      case 'Wrench': return <Wrench className={className} />;
      case 'Package': return <Package className={className} />;
      case 'Globe':
      default: return <Globe className={className} />;
    }
  };

  const getItemTitle = (item: ServiceProductItem) => {
    if (lang === 'de') return item.titleDe || item.titleEn;
    return item.titleEn;
  };

  const getItemDesc = (item: ServiceProductItem) => {
    if (lang === 'de') return item.descDe || item.descEn;
    return item.descEn;
  };

  const getItemFeatures = (item: ServiceProductItem): string[] => {
    if (lang === 'de') return item.featuresDe || item.featuresEn || [];
    return item.featuresEn || [];
  };

  return (
    <section ref={sectionRef} id="services" className="py-20 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight">
            {t.services.ui.title}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg italic font-medium">
            {activeCategory
              ? t.services.ui.activeSubtitle
              : t.services.ui.chooseCategorySubtitle}
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="py-20 text-center flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 text-[#002B66] animate-spin" />
            <p className="text-slate-600 text-sm font-medium">
              {t.services.ui.loading}
            </p>
          </div>
        ) : !activeCategory ? (
          /* Step 1 — Category picker: no products are listed until one is chosen */
          categoryList.length === 0 ? (
            <div className="py-16 text-center bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-8 space-y-4 max-w-xl mx-auto shadow-sm">
              <div className="w-12 h-12 bg-[#FDB813]/20 rounded-full flex items-center justify-center mx-auto text-[#002B66]">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#1A1A1A]">
                {t.services.ui.noCategories}
              </h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryList.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => goToCategory(cat.id)}
                  className="group text-left bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#002B66] rounded-2xl p-6 flex items-center gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#FDB813] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform shrink-0">
                    {getIcon(cat.icon || 'Layers', 'w-7 h-7 text-[#002B66]')}
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <h3 className="text-lg font-bold text-[#1A1A1A] group-hover:text-[#002B66] transition-colors leading-snug truncate">
                      {cat.label}
                    </h3>
                    <p className="text-xs font-semibold text-slate-600">
                      {cat.count}{' '}
                      {cat.count === 1
                        ? t.services.ui.productSingular
                        : t.services.ui.productPlural}
                    </p>
                  </div>

                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#002B66] transition-colors shrink-0" />
                </button>
              ))}
            </div>
          )
        ) : (
          /* Step 2 — Products of the selected category only */
          <>
            {/* Sticky context bar: stays visible while scrolling the list, so
                the user always knows where they are and can switch or go back
                without scrolling back to the top. */}
            <div className="sticky top-14 z-40 mb-8 rounded-2xl border border-[#E5E7EB] bg-white/90 backdrop-blur-md shadow-lg shadow-slate-900/5 px-3 sm:px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    onClick={() => goToCategory(null)}
                    aria-label={t.services.ui.backToCategoriesAria}
                    className="inline-flex items-center gap-2 px-2.5 sm:px-3.5 py-2 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-slate-700 text-xs sm:text-sm font-extrabold hover:border-[#002B66] hover:text-[#002B66] transition-all cursor-pointer shrink-0"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">
                      {t.services.ui.categories}
                    </span>
                  </button>

                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-extrabold text-[#1A1A1A] truncate leading-tight">
                      {activeCategoryOption?.label || activeCategory}
                    </h3>
                    <p className="text-[11px] font-semibold text-slate-500">
                      {filteredItems.length}{' '}
                      {filteredItems.length === 1
                        ? t.services.ui.productSingular
                        : t.services.ui.productPlural}
                    </p>
                  </div>
                </div>

                {/* Category switcher — a dropdown instead of a long tab strip,
                    which kept the products pushed below the fold. */}
                {categoryList.length > 1 && (
                  <div className="relative shrink-0" ref={categoryMenuRef}>
                    <button
                      onClick={() => setIsCategoryMenuOpen((open) => !open)}
                      aria-haspopup="listbox"
                      aria-expanded={isCategoryMenuOpen}
                      className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer border ${
                        isCategoryMenuOpen
                          ? 'bg-[#002B66] text-white border-[#002B66] shadow-md'
                          : 'bg-white text-slate-700 border-[#E5E7EB] hover:border-[#002B66] hover:text-[#002B66]'
                      }`}
                    >
                      <Layers className="w-4 h-4" />
                      <span className="hidden sm:inline">
                        {t.services.ui.switchCategory}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${isCategoryMenuOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {isCategoryMenuOpen && (
                      <div
                        role="listbox"
                        className="absolute right-0 mt-2 w-64 max-h-[60vh] overflow-y-auto bg-white border border-[#E5E7EB] rounded-2xl shadow-2xl p-2 space-y-1 z-50"
                      >
                        {categoryList.map((cat) => {
                          const isActive = activeCategory === cat.id;

                          return (
                            <button
                              key={cat.id}
                              role="option"
                              aria-selected={isActive}
                              onClick={() => goToCategory(cat.id)}
                              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-left text-sm font-bold transition-colors cursor-pointer ${
                                isActive
                                  ? 'bg-[#002B66] text-white'
                                  : 'text-slate-700 hover:bg-[#F8FAFC] hover:text-[#002B66]'
                              }`}
                            >
                              <span className="flex-1 truncate">{cat.label}</span>
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                                  isActive ? 'bg-[#FDB813] text-[#002B66]' : 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                {cat.count}
                              </span>
                              {isActive && <Check className="w-4 h-4 text-[#FDB813] shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {filteredItems.length === 0 ? (
              <div className="py-16 text-center bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-8 space-y-4 max-w-xl mx-auto shadow-sm">
                <div className="w-12 h-12 bg-[#FDB813]/20 rounded-full flex items-center justify-center mx-auto text-[#002B66]">
                  <Package className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1A]">
                  {t.services.ui.noProducts}
                </h3>
                <div className="flex items-center justify-center pt-2">
                  <button
                    onClick={() => goToCategory(null)}
                    className="px-4 py-2 bg-[#002B66] text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    {t.services.ui.allCategories}
                  </button>
                </div>
              </div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const title = getItemTitle(item);
              const desc = getItemDesc(item);
              const features = getItemFeatures(item);

              return (
                <div
                  key={item.id}
                  className="group bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#002B66] rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    {/* Image preview if provided in Firestore. Fixed box, but the
                        whole image is always shown: object-contain letterboxes
                        instead of cropping. */}
                    {item.imageUrl && (
                      <div className="w-full h-44 rounded-xl overflow-hidden border border-[#E5E7EB] bg-white flex items-center justify-center p-2">
                        <img
                          src={item.imageUrl}
                          alt={title}
                          className="max-w-full max-h-full w-auto h-auto object-contain"
                        />
                      </div>
                    )}

                    {/* Header */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-10 h-10 rounded-xl bg-[#FDB813] p-2 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform shrink-0">
                        {getIcon(item.icon)}
                      </div>
                      {item.category && (
                        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-white text-[#002B66] border border-[#E5E7EB] truncate max-w-[180px]">
                          {t.services.categories[item.category]}
                        </span>
                      )}
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-lg font-bold text-[#1A1A1A] group-hover:text-[#002B66] transition-colors leading-snug">
                      {title}
                    </h3>
                    {desc && (
                      <p className="text-slate-600 text-xs leading-relaxed">
                        {desc}
                      </p>
                    )}

                    {/* Feature Bullets */}
                    {features.length > 0 && (
                      <ul className="space-y-1.5 pt-3 border-t border-[#E5E7EB]">
                        {features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs font-medium text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#D49B0D] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-5 mt-5 border-t border-[#E5E7EB] flex items-center justify-between">
                    <button
                      onClick={() => setSelectedService(item)}
                      className="text-xs font-bold text-[#002B66] hover:text-[#001D47] flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>{t.services.ui.details}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onOpenQuoteWithService(title)}
                      className="px-3.5 py-2 rounded-xl bg-[#002B66] text-white text-xs font-bold shadow-sm hover:bg-[#001D47] transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <span>{t.services.ui.inquire}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
            </div>
            )}

            {/* End of list — don't leave the user at a dead end after scrolling */}
            {filteredItems.length > 0 && (
              <div className="mt-12 pt-8 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
                <p className="text-sm font-semibold text-slate-600">
                  {t.services.ui.notFoundPrompt}
                </p>
                <button
                  onClick={() => goToCategory(null)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#002B66] text-white text-xs sm:text-sm font-bold shadow-md hover:bg-[#001D47] transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{t.services.ui.browseOther}</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            {selectedService.imageUrl && (
              <div className="w-full h-56 rounded-xl overflow-hidden border border-[#E5E7EB] bg-white flex items-center justify-center p-3">
                <img
                  src={selectedService.imageUrl}
                  alt={getItemTitle(selectedService)}
                  className="max-w-full max-h-full w-auto h-auto object-contain"
                />
              </div>
            )}

            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#FDB813] rounded-xl">
                {getIcon(selectedService.icon)}
              </div>
              <div>
                {selectedService.category && (
                  <span className="text-xs text-[#002B66] font-black uppercase tracking-wider">
                    {selectedService.category}
                  </span>
                )}
                <h3 className="text-2xl font-bold text-[#1A1A1A]">
                  {getItemTitle(selectedService)}
                </h3>
              </div>
            </div>

            {getItemDesc(selectedService) && (
              <p className="text-slate-600 text-sm leading-relaxed">
                {getItemDesc(selectedService)}
              </p>
            )}

            {getItemFeatures(selectedService).length > 0 && (
              <div className="space-y-3 bg-[#F8FAFC] p-4 rounded-xl border border-[#E5E7EB]">
                <h4 className="text-xs font-bold text-[#002B66] uppercase tracking-wider">
                  {t.services.ui.specifications}
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {getItemFeatures(selectedService).map((f: string, i: number) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#D49B0D] shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#E5E7EB]">
              <button
                onClick={() => setSelectedService(null)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900"
              >
                {t.services.ui.close}
              </button>
              <button
                onClick={() => {
                  const title = getItemTitle(selectedService);
                  setSelectedService(null);
                  onOpenQuoteWithService(title);
                }}
                className="px-6 py-2.5 rounded-xl text-sm font-bold bg-[#002B66] text-white shadow-md hover:bg-[#001D47] flex items-center gap-2"
              >
                <span>{t.services.ui.inquire}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
