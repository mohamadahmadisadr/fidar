import React from 'react';
import { Phone, MessageSquare, Layers, Wrench, ChevronRight, Plus, Eye, Inbox, Languages } from 'lucide-react';
import { ServiceProductItem, FirestoreCategory, ConsultationRecord, AnalyticsStats } from '../../types';
import { AdminSection } from './types';

interface AdminOverviewSectionProps {
  analyticsStats: AnalyticsStats;
  products: ServiceProductItem[];
  categories: FirestoreCategory[];
  inquiries: ConsultationRecord[];
  pendingInquiriesCount: number;
  isSaving: boolean;
  setActiveSection: (section: AdminSection) => void;
  onEditProduct: (product: Partial<ServiceProductItem>) => void;
}

export const AdminOverviewSection: React.FC<AdminOverviewSectionProps> = ({
  analyticsStats,
  products,
  categories,
  inquiries,
  pendingInquiriesCount,
  isSaving,
  setActiveSection,
  onEditProduct,
}) => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-[#E5E7EB] p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500">Total Products</p>
            <p className="text-3xl font-black text-[#002B66] mt-1">{products.length}</p>
            <p className="text-[10px] text-slate-500 font-medium mt-1">Stored in Firestore</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#002B66]/10 text-[#002B66] flex items-center justify-center">
            <Wrench className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-[#E5E7EB] p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500">Categories</p>
            <p className="text-3xl font-black text-[#D49B0D] mt-1">{categories.length}</p>
            <p className="text-[10px] text-slate-500 font-medium mt-1">Taxonomy divisions</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#FDB813]/20 text-[#002B66] flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-[#E5E7EB] p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500">Pending Inquiries</p>
            <p className="text-3xl font-black text-amber-600 mt-1">{pendingInquiriesCount}</p>
            <p className="text-[10px] text-slate-500 font-medium mt-1">Action required</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Inbox className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-[#E5E7EB] p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500">Multilingual Engine</p>
            <p className="text-3xl font-black text-emerald-700 mt-1">3</p>
            <p className="text-[10px] text-slate-500 font-medium mt-1">🇬🇧 EN • 🇩🇪 DE • 🇮🇷 FA</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Languages className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Visitor Analytics Widget */}
      <div className="bg-white border border-[#E5E7EB] p-6 rounded-3xl shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#E5E7EB] pb-3">
          <div>
            <h3 className="text-base font-black text-[#1A1A1A] flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#002B66]" />
              <span>Live Traffic & Visitor Analytics (100% Free Plan)</span>
            </h3>
            <p className="text-xs text-slate-500">Tracked in real-time via Cloud Firestore & Firebase Analytics</p>
          </div>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-full border border-emerald-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
            Real-Time Tracking Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl space-y-1">
            <p className="text-xs font-bold text-slate-500">Today's Visits</p>
            <p className="text-2xl font-black text-[#002B66]">{analyticsStats.todayVisits}</p>
            <p className="text-[10px] text-slate-400 font-mono">Date: {analyticsStats.lastVisitedDate || 'Today'}</p>
          </div>

          <div className="p-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl space-y-1">
            <p className="text-xs font-bold text-slate-500">This Month's Visits</p>
            <p className="text-2xl font-black text-[#D49B0D]">{analyticsStats.monthVisits}</p>
            <p className="text-[10px] text-slate-400 font-mono">Month: {analyticsStats.lastVisitedMonth || 'Current Month'}</p>
          </div>

          <div className="p-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl space-y-1">
            <p className="text-xs font-bold text-slate-500">Total All-Time Visits</p>
            <p className="text-2xl font-black text-emerald-700">{analyticsStats.totalVisits}</p>
            <p className="text-[10px] text-slate-400 font-mono">Language: 🇬🇧 {analyticsStats.visitsByLang.en} • 🇩🇪 {analyticsStats.visitsByLang.de} • 🇮🇷 {analyticsStats.visitsByLang.fa}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions & Recent Submissions Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Quick Shortcuts */}
        <div className="lg:col-span-4 bg-white border border-[#E5E7EB] p-6 rounded-2xl shadow-sm space-y-4">
          <h3 className="text-base font-bold text-[#1A1A1A]">Quick Administration Actions</h3>
          <div className="space-y-2 text-xs">
            <button
              onClick={() => {
                onEditProduct({
                  titleEn: '', titleDe: '',
                  category: categories[0]?.nameEn || 'Ferrous and Non-ferrous alloys',
                  descEn: '', descDe: '',
                  featuresEn: [], featuresDe: [],
                  icon: 'Globe', imageUrl: ''
                });
              }}
              disabled={isSaving}
              className="w-full p-3.5 rounded-xl bg-[#F8FAFC] hover:bg-[#002B66] hover:text-white border text-slate-800 font-bold flex items-center justify-between transition-all cursor-pointer disabled:opacity-50"
            >
              <span className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#002B66]" />
                <span>Add New Product</span>
              </span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>

            <button
              onClick={() => setActiveSection('site')}
              disabled={isSaving}
              className="w-full p-3.5 rounded-xl bg-[#F8FAFC] hover:bg-[#002B66] hover:text-white border text-slate-800 font-bold flex items-center justify-between transition-all cursor-pointer disabled:opacity-50"
            >
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#002B66]" />
                <span>Edit Company Phone & Address</span>
              </span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>

            <button
              onClick={() => setActiveSection('inquiries')}
              disabled={isSaving}
              className="w-full p-3.5 rounded-xl bg-[#F8FAFC] hover:bg-[#002B66] hover:text-white border text-slate-800 font-bold flex items-center justify-between transition-all cursor-pointer disabled:opacity-50"
            >
              <span className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#002B66]" />
                <span>View Customer Submissions</span>
              </span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>
          </div>
        </div>

        {/* Recent Inquiries List */}
        <div className="lg:col-span-8 bg-white border border-[#E5E7EB] p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#1A1A1A]">Recent Customer Form Submissions</h3>
            <button
              onClick={() => setActiveSection('inquiries')}
              className="text-xs font-bold text-[#002B66] hover:underline"
            >
              View All Inbox →
            </button>
          </div>

          <div className="space-y-3">
            {inquiries.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">No customer inquiries submitted yet.</p>
            ) : (
              inquiries.slice(0, 5).map((inq) => (
                <div key={inq.id} className="p-3.5 bg-[#F8FAFC] border rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-2 font-bold text-[#1A1A1A]">
                      <span>{inq.name}</span>
                      <span className="text-[10px] text-slate-500">({inq.email})</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5">Requested: {inq.service}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    inq.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {inq.status || 'pending'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
