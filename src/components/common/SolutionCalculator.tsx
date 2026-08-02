import React, { useState } from 'react';
import { 
  Calculator, ArrowRight, CheckCircle2, Clock, DollarSign, Globe2, Sparkles, Building2, Briefcase, Cpu, Truck
} from 'lucide-react';
import { TranslationStructure } from '../../types';

interface SolutionCalculatorProps {
  t: TranslationStructure;
  onOpenQuoteWithDetails: (details: { division: string; budget: string; region: string; timeline: string }) => void;
}

export const SolutionCalculator: React.FC<SolutionCalculatorProps> = ({
  t,
  onOpenQuoteWithDetails,
}) => {
  const [division, setDivision] = useState<string>('trade');
  const [budget, setBudget] = useState<string>('medium');
  const [region, setRegion] = useState<string>('austria');
  const [timeline, setTimeline] = useState<string>('normal');

  const divisionsMap: Record<string, string> = {
    trade: 'Trade & Import/Export',
    construction: 'Construction & Civil Engineering',
    consulting: 'Strategic Corporate Advisory',
    technology: 'IT & Digital Transformation',
    logistics: 'Global Freight & Logistics',
  };

  const budgetMap: Record<string, { label: string; range: string }> = {
    small: { label: 'Small Scale (< €50.000)', range: '€10,000 – €50,000' },
    medium: { label: 'Medium Project (€50k – €250k)', range: '€50,000 – €250,000' },
    large: { label: 'Corporate Scope (€250k – €1M)', range: '€250,000 – €1,000,000' },
    enterprise: { label: 'Enterprise / Infrastructure (€1M+)', range: '€1,000,000+' },
  };

  const regionMap: Record<string, string> = {
    austria: 'Austria (DACH Region)',
    eu: 'European Union',
    mena: 'Middle East & Asia',
    global: 'Global Cross-Border',
  };

  const timelineMap: Record<string, string> = {
    fast: 'Fast-Track (< 1 Month)',
    normal: 'Standard (1 – 3 Months)',
    extended: 'Comprehensive (3 – 6 Months)',
    long: 'Long-Term Program (6+ Months)',
  };

  const calculateEstimate = () => {
    let duration = '2 - 4 Weeks';
    let team = '2 Senior Specialists';

    if (timeline === 'fast') duration = '1 - 3 Weeks';
    if (timeline === 'normal') duration = '1 - 2 Months';
    if (timeline === 'extended') duration = '3 - 5 Months';
    if (timeline === 'long') duration = '6 - 12 Months';

    if (budget === 'small') team = '2 Specialists';
    if (budget === 'medium') team = '4 Specialists + Legal Lead';
    if (budget === 'large') team = 'Full Project Taskforce (6+ Experts)';
    if (budget === 'enterprise') team = 'Dedicated Executive Unit';

    return {
      duration,
      team,
      budgetRange: budgetMap[budget].range,
    };
  };

  const estimate = calculateEstimate();

  return (
    <section id="calculator" className="py-20 bg-slate-900/60 relative border-t border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold tracking-widest uppercase">
            <Calculator className="w-3.5 h-3.5" />
            <span>{t.calculator.tag}</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.calculator.title}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            {t.calculator.subtitle}
          </p>
        </div>

        {/* Interactive Widget Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          {/* Controls Form Column */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Division Selection */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                1. {t.calculator.industryLabel}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {Object.entries(divisionsMap).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setDivision(key)}
                    className={`p-3 rounded-xl text-xs font-semibold border text-left transition-all cursor-pointer flex items-center justify-between ${
                      division === key
                        ? 'bg-amber-500/15 border-amber-500 text-amber-400 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span>{label}</span>
                    {division === key && <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Budget Scope */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                2. {t.calculator.budgetLabel}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {Object.entries(budgetMap).map(([key, val]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setBudget(key)}
                    className={`p-3 rounded-xl text-xs font-semibold border text-left transition-all cursor-pointer flex items-center justify-between ${
                      budget === key
                        ? 'bg-amber-500/15 border-amber-500 text-amber-400 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span>{val.label}</span>
                    {budget === key && <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Region Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  3. {t.calculator.regionLabel}
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold focus:border-amber-500 focus:outline-none"
                >
                  {Object.entries(regionMap).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  4. {t.calculator.timelineLabel}
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold focus:border-amber-500 focus:outline-none"
                >
                  {Object.entries(timelineMap).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Real-time Results Summary Column */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-amber-500/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Projektprofil
                </span>
                <span className="px-2.5 py-1 bg-amber-500/20 text-amber-400 rounded-full text-[11px] font-extrabold">
                  FIDAR Estimate
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-400">{t.calculator.estimatedCost}</p>
                  <p className="text-2xl sm:text-3xl font-extrabold gold-gradient-text">
                    {estimate.budgetRange}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <p className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {t.calculator.estimatedTime}
                    </p>
                    <p className="text-sm font-bold text-white mt-1">
                      {estimate.duration}
                    </p>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <p className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Globe2 className="w-3.5 h-3.5 text-blue-400" />
                      Empfohlenes Team
                    </p>
                    <p className="text-xs font-bold text-slate-200 mt-1">
                      {estimate.team}
                    </p>
                  </div>
                </div>

                <div className="pt-2 text-xs text-slate-400 space-y-1">
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Inkl. Österreichische ÖNORM / EU-Compliance</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Inkl. Vertraulichkeitsvereinbarung (NDA)</span>
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              onClick={() => onOpenQuoteWithDetails({
                division: divisionsMap[division],
                budget: budgetMap[budget].label,
                region: regionMap[region],
                timeline: timelineMap[timeline]
              })}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-extrabold text-sm shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>{t.calculator.submitInquiry}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
