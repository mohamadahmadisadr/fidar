import React, { useState } from 'react';
import { 
  Building2, MapPin, Calendar, CheckCircle, ExternalLink, X, ArrowUpRight
} from 'lucide-react';
import { TranslationStructure } from '../../types';

interface PortfolioSectionProps {
  t: TranslationStructure;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ t }) => {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  return (
    <section id="projects" className="py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold tracking-widest uppercase">
            {t.projects.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.projects.title}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.projects.items.map((project) => (
            <div
              key={project.id}
              className="group bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between"
            >
              <div>
                {/* Image Aspect Box */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />

                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-amber-400 border border-amber-500/30 text-xs font-bold">
                    {project.category}
                  </span>

                  <span className="absolute bottom-3 right-4 px-2.5 py-0.5 rounded bg-slate-950/80 text-slate-300 text-[11px] font-semibold flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    {project.year}
                  </span>
                </div>

                {/* Content Details */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{project.location}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-slate-400 text-xs leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Result Badge */}
              <div className="p-6 pt-0 border-t border-slate-800/80 mt-4">
                <div className="pt-4 flex items-center justify-between">
                  <div className="bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{project.result}</span>
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-amber-500 hover:text-slate-950 transition-colors cursor-pointer"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-64 rounded-xl overflow-hidden relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs text-amber-400 font-bold uppercase tracking-wider">
                <span>{selectedProject.category}</span>
                <span>•</span>
                <span>{selectedProject.location}</span>
                <span>•</span>
                <span>{selectedProject.year}</span>
              </div>

              <h3 className="text-2xl font-bold text-white">
                {selectedProject.title}
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed">
                {selectedProject.description}
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-amber-500/30 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-amber-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-400">Erreichter Meilenstein</p>
                <p className="text-sm font-extrabold text-amber-300">{selectedProject.result}</p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedProject(null)}
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
