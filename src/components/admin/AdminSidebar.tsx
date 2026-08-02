import React from 'react';
import {
  Building2, MessageSquare, Layers, Wrench, ChevronRight, FileText,
  LayoutDashboard, LogOut, ArrowUpRight
} from 'lucide-react';
import { ServiceProductItem, FirestoreCategory, ConsultationRecord } from '../../types';
import { User } from '../../services';
import { AdminSection } from './types';

interface AdminSidebarProps {
  activeSection: AdminSection;
  setActiveSection: (section: AdminSection) => void;
  products: ServiceProductItem[];
  categories: FirestoreCategory[];
  inquiries: ConsultationRecord[];
  pendingInquiriesCount: number;
  currentUser: User | null;
  isSaving: boolean;
  onLogout: () => void;
  onReturnToSite: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeSection,
  setActiveSection,
  products,
  categories,
  inquiries,
  pendingInquiriesCount,
  currentUser,
  isSaving,
  onLogout,
  onReturnToSite,
}) => {
  return (
    <>
        <div className="lg:hidden bg-[#002B66] text-white p-3 space-y-2 border-b border-white/10 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Logo" className="h-8 w-auto object-contain bg-white/10 p-1 rounded-lg" />
              <span className="font-extrabold text-sm text-[#FDB813]">FIDAR Admin</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onReturnToSite}
                disabled={isSaving}
                className="px-2.5 py-1.5 rounded-lg bg-white/10 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer"
              >
                <ArrowUpRight className="w-3.5 h-3.5 text-[#FDB813]" />
                <span>Site</span>
              </button>
              <button
                onClick={onLogout}
                disabled={isSaving}
                className="p-1.5 rounded-lg bg-red-500/20 text-red-300 hover:text-white cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs font-bold scroll-smooth">
            <button
              onClick={() => setActiveSection('overview')}
              disabled={isSaving}
              className={`px-3 py-1.5 rounded-lg shrink-0 cursor-pointer ${activeSection === 'overview' ? 'bg-[#FDB813] text-[#002B66]' : 'bg-white/10 text-white'}`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveSection('products')}
              disabled={isSaving}
              className={`px-3 py-1.5 rounded-lg shrink-0 cursor-pointer ${activeSection === 'products' ? 'bg-[#FDB813] text-[#002B66]' : 'bg-white/10 text-white'}`}
            >
              Products ({products.length})
            </button>
            <button
              onClick={() => setActiveSection('categories')}
              disabled={isSaving}
              className={`px-3 py-1.5 rounded-lg shrink-0 cursor-pointer ${activeSection === 'categories' ? 'bg-[#FDB813] text-[#002B66]' : 'bg-white/10 text-white'}`}
            >
              Categories ({categories.length})
            </button>
            <button
              onClick={() => setActiveSection('inquiries')}
              disabled={isSaving}
              className={`px-3 py-1.5 rounded-lg shrink-0 cursor-pointer ${activeSection === 'inquiries' ? 'bg-[#FDB813] text-[#002B66]' : 'bg-white/10 text-white'}`}
            >
              Inquiries ({pendingInquiriesCount})
            </button>
            <button
              onClick={() => setActiveSection('site')}
              disabled={isSaving}
              className={`px-3 py-1.5 rounded-lg shrink-0 cursor-pointer ${activeSection === 'site' ? 'bg-[#FDB813] text-[#002B66]' : 'bg-white/10 text-white'}`}
            >
              Company Info
            </button>
            <button
              onClick={() => setActiveSection('heroAbout')}
              disabled={isSaving}
              className={`px-3 py-1.5 rounded-lg shrink-0 cursor-pointer ${activeSection === 'heroAbout' ? 'bg-[#FDB813] text-[#002B66]' : 'bg-white/10 text-white'}`}
            >
              Hero/About Copy
            </button>
          </div>
        </div>


        <aside className="hidden lg:flex w-72 bg-[#002B66] text-white shrink-0 flex-col justify-between border-r border-[#001D47]">
          <div>
            {/* Brand Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="Logo" className="h-10 w-auto object-contain bg-white/10 p-1 rounded-lg" />
                <div>
                  <h2 className="font-black text-base tracking-tight text-white">FIDAR Studio</h2>
                  <span className="text-[10px] text-[#ABC2E8] font-bold tracking-wider uppercase block">Content Control</span>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="p-4 space-y-1.5 text-xs font-bold">
              <button
                onClick={() => setActiveSection('overview')}
                disabled={isSaving}
                className={`w-full p-3.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  activeSection === 'overview'
                    ? 'bg-[#FDB813] text-[#002B66] shadow-md font-black'
                    : 'text-slate-200 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <LayoutDashboard className="w-4.5 h-4.5" />
                  <span>Dashboard Overview</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>

              <button
                onClick={() => setActiveSection('site')}
                disabled={isSaving}
                className={`w-full p-3.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  activeSection === 'site'
                    ? 'bg-[#FDB813] text-[#002B66] shadow-md font-black'
                    : 'text-slate-200 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-4.5 h-4.5" />
                  <span>Company & Contact Data</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>

              <button
                onClick={() => setActiveSection('heroAbout')}
                disabled={isSaving}
                className={`w-full p-3.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  activeSection === 'heroAbout'
                    ? 'bg-[#FDB813] text-[#002B66] shadow-md font-black'
                    : 'text-slate-200 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4.5 h-4.5" />
                  <span>Hero & About Content</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>

              <button
                onClick={() => setActiveSection('products')}
                disabled={isSaving}
                className={`w-full p-3.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  activeSection === 'products'
                    ? 'bg-[#FDB813] text-[#002B66] shadow-md font-black'
                    : 'text-slate-200 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Wrench className="w-4.5 h-4.5" />
                  <span>Products & Services</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold">
                  {products.length}
                </span>
              </button>

              <button
                onClick={() => setActiveSection('categories')}
                disabled={isSaving}
                className={`w-full p-3.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  activeSection === 'categories'
                    ? 'bg-[#FDB813] text-[#002B66] shadow-md font-black'
                    : 'text-slate-200 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4.5 h-4.5" />
                  <span>Categories Taxonomy</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold">
                  {categories.length}
                </span>
              </button>

              <button
                onClick={() => setActiveSection('inquiries')}
                disabled={isSaving}
                className={`w-full p-3.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  activeSection === 'inquiries'
                    ? 'bg-[#FDB813] text-[#002B66] shadow-md font-black'
                    : 'text-slate-200 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4.5 h-4.5" />
                  <span>Inquiries Inbox</span>
                </div>
                {pendingInquiriesCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-black animate-pulse">
                    {pendingInquiriesCount}
                  </span>
                )}
              </button>
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-white/10 space-y-3">
            {currentUser && (
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
                {currentUser.photoURL ? (
                  <img src={currentUser.photoURL} alt={currentUser.displayName || 'Admin'} className="w-8 h-8 rounded-full border border-[#FDB813]" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#FDB813] text-[#002B66] font-bold flex items-center justify-center shrink-0">
                    {(currentUser.displayName || currentUser.email || 'A').charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-white truncate text-[11px]">{currentUser.displayName || 'Google Admin'}</p>
                  <p className="text-[10px] text-[#ABC2E8] truncate">{currentUser.email}</p>
                </div>
              </div>
            )}

            <button
              onClick={onReturnToSite}
              disabled={isSaving}
              className="w-full p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <ArrowUpRight className="w-4 h-4 text-[#FDB813]" />
              <span>Return to Live Website</span>
            </button>

            <button
              onClick={onLogout}
              disabled={isSaving}
              className="w-full p-3 rounded-xl bg-red-500/20 hover:bg-red-500 text-red-200 hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out Google Account</span>
            </button>
          </div>
        </aside>

    </>
  );
};
