import React, { useState } from 'react';
import { 
  Newspaper, Calendar, Clock, ArrowRight, X, Bookmark
} from 'lucide-react';
import { TranslationStructure } from '../../types';

interface NewsSectionProps {
  t: TranslationStructure;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ t }) => {
  const [selectedNews, setSelectedNews] = useState<any | null>(null);

  return (
    <section id="news" className="py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold tracking-widest uppercase">
            {t.news.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.news.title}
          </h2>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.news.items.map((item) => (
            <article
              key={item.id}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20">
                    {item.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {item.readTime}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                  <span>{item.date}</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-slate-400 text-xs leading-relaxed">
                  {item.snippet}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800">
                <button
                  onClick={() => setSelectedNews(item)}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Artikel Lesen</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* News Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs text-amber-400 font-bold">
                <span>{selectedNews.category}</span>
                <span>•</span>
                <span>{selectedNews.date}</span>
              </div>

              <h3 className="text-2xl font-bold text-white">
                {selectedNews.title}
              </h3>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-slate-300 text-sm leading-relaxed space-y-3">
                <p>{selectedNews.snippet}</p>
                <p>
                  Als führendes Dienstleistungsunternehmen in Österreich überwacht FIDAR BS kontinuierlich rechtliche und wirtschaftliche Rahmenbedingungen, um unseren Mandanten stets vorausschauende Sicherheit zu bieten.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedNews(null)}
                className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm hover:brightness-110"
              >
                Schließen
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
