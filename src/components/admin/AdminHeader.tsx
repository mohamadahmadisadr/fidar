import React from 'react';
import { Search, X, RefreshCw, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ServiceProductItem, FirestoreCategory, ConsultationRecord } from '../../types';
import { AdminSection } from './types';

interface AdminHeaderProps {
  activeSection: AdminSection;
  products: ServiceProductItem[];
  categories: FirestoreCategory[];
  inquiries: ConsultationRecord[];
  loading: boolean;
  isSaving: boolean;
  saveStatus: string | null;
  setSaveStatus: (status: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onRefresh: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeSection,
  products,
  categories,
  inquiries,
  loading,
  isSaving,
  saveStatus,
  setSaveStatus,
  searchQuery,
  setSearchQuery,
  onRefresh,
}) => {
  return (
    <>
          {/* Top App Bar */}
          <header className="bg-white border-b border-[#E5E7EB] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 shadow-sm">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-black text-[#1A1A1A] tracking-tight">
                {activeSection === 'overview' && 'Dashboard Overview'}
                {activeSection === 'site' && 'Company & Contact Information'}
                {activeSection === 'heroAbout' && 'Hero & About Us Multilingual Content'}
                {activeSection === 'products' && 'Products & Services Catalog'}
                {activeSection === 'categories' && 'Product Categories Taxonomy'}
                {activeSection === 'inquiries' && 'Customer Inquiries & Form Submissions'}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Firestore Sync</span>
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Quick Search */}
              {(activeSection === 'products' || activeSection === 'inquiries') && (
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search title, category, message..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#002B66] focus:ring-2 focus:ring-[#002B66]/10 focus:outline-none"
                  />
                </div>
              )}

              <button
                onClick={onRefresh}
                disabled={loading || isSaving}
                className="p-2.5 rounded-xl border border-[#E5E7EB] hover:bg-slate-100 text-slate-700 transition-colors flex items-center gap-1 text-xs font-bold cursor-pointer disabled:opacity-50"
                title="Reload Firestore Data"
              >
                <RefreshCw className={`w-4 h-4 text-[#002B66] ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Sync DB</span>
              </button>
            </div>
          </header>

          {/* Global Notification Banner */}
          {saveStatus && (
            <div className="bg-[#002B66] text-[#FDB813] px-6 py-2.5 text-xs font-bold flex items-center justify-between shadow-inner shrink-0 animate-in fade-in">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>{saveStatus}</span>
              </span>
              <button onClick={() => setSaveStatus(null)} className="text-white hover:text-[#FDB813]">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
    </>
  );
};
