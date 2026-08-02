import React from 'react';
import { 
  Star, Quote, Building, Award, CheckCircle2, ShieldCheck
} from 'lucide-react';
import { TranslationStructure } from '../../types';

interface TestimonialsSectionProps {
  t: TranslationStructure;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ t }) => {
  return (
    <section className="py-20 bg-slate-900/40 relative border-t border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold tracking-widest uppercase">
            {t.testimonials.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.testimonials.title}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            {t.testimonials.subtitle}
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {t.testimonials.items.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-950 border border-slate-800 hover:border-amber-500/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 relative transition-all duration-300 shadow-xl hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-slate-300 text-sm italic leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{item.author}</h4>
                  <p className="text-xs text-amber-400 font-medium">{item.role}</p>
                  <p className="text-[11px] text-slate-400">{item.company}</p>
                </div>

                <div className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400">
                  <Quote className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Partners & Accreditation Section */}
        <div className="pt-12 border-t border-slate-800/80 text-center space-y-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {t.testimonials.partnersTitle}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center opacity-80 hover:opacity-100 transition-opacity">
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-center gap-3">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
              <div className="text-left">
                <p className="text-xs font-bold text-white">WKO Austria</p>
                <p className="text-[10px] text-slate-400">Wirtschaftskammer Wien</p>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-center gap-3">
              <Award className="w-6 h-6 text-amber-400" />
              <div className="text-left">
                <p className="text-xs font-bold text-white">ISO 9001</p>
                <p className="text-[10px] text-slate-400">Quality Management</p>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-center gap-3">
              <Building className="w-6 h-6 text-amber-400" />
              <div className="text-left">
                <p className="text-xs font-bold text-white">AEO Customs</p>
                <p className="text-[10px] text-slate-400">Authorized Operator</p>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              <div className="text-left">
                <p className="text-xs font-bold text-white">EU Trade Network</p>
                <p className="text-[10px] text-slate-400">Certified Partner</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
