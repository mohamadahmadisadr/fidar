import React from 'react';
import { Phone, MapPin, Globe, Plus, Trash2, Save, ShieldCheck, UserCheck, Loader2 } from 'lucide-react';
import { SiteConfig } from '../../types';
import { DEFAULT_ADMIN_EMAILS } from '../../services';
import { FormLang } from './types';

interface AdminCompanySectionProps {
  siteConfig: SiteConfig;
  setSiteConfig: React.Dispatch<React.SetStateAction<SiteConfig>>;
  isSaving: boolean;
  formLang: FormLang;
  setFormLang: (lang: FormLang) => void;
  newAdminEmailInput: string;
  setNewAdminEmailInput: (value: string) => void;
  onSave: () => void;
  onAddAdminEmail: (e: React.FormEvent) => void;
  onRemoveAdminEmail: (email: string) => void;
}

export const AdminCompanySection: React.FC<AdminCompanySectionProps> = ({
  siteConfig,
  setSiteConfig,
  isSaving,
  formLang,
  setFormLang,
  newAdminEmailInput,
  setNewAdminEmailInput,
  onSave,
  onAddAdminEmail,
  onRemoveAdminEmail,
}) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Authorized Admin Google Emails Management Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E7EB] shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
          <div>
            <h3 className="text-lg font-black text-[#1A1A1A] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#002B66]" />
              <span>Authorized Admin Emails (Google Sign-In)</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Only Google accounts listed below will be granted access to the Admin Dashboard.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            {(siteConfig.adminEmails && siteConfig.adminEmails.length > 0 ? siteConfig.adminEmails : DEFAULT_ADMIN_EMAILS).map((email) => (
              <div key={email} className="flex items-center justify-between p-3.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs">
                <div className="flex items-center gap-2 font-mono font-bold text-[#002B66]">
                  <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{email}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveAdminEmail(email)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Remove Admin Access"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <form onSubmit={onAddAdminEmail} className="flex items-center gap-2 pt-2">
            <input
              type="email"
              placeholder="Add new admin email (e.g. user@gmail.com)..."
              value={newAdminEmailInput}
              onChange={(e) => setNewAdminEmailInput(e.target.value)}
              className="flex-1 p-3 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#002B66] focus:ring-2 focus:ring-[#002B66]/10 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-3 bg-[#002B66] hover:bg-[#001D47] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4 text-[#FDB813]" />
              <span>Add Email</span>
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E7EB] shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
          <h3 className="text-lg font-black text-[#1A1A1A] flex items-center gap-2">
            <Phone className="w-5 h-5 text-[#002B66]" />
            <span>Contact Information & Phone Numbers</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Phone Number *</label>
            <input
              type="text"
              disabled={isSaving}
              value={siteConfig.topBar.phone}
              onChange={(e) => setSiteConfig({
                ...siteConfig,
                topBar: { ...siteConfig.topBar, phone: e.target.value }
              })}
              className="w-full p-3.5 rounded-xl border border-slate-200 text-sm font-semibold focus:border-[#002B66] focus:ring-4 focus:ring-[#002B66]/10 focus:outline-none disabled:opacity-60"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Contact Person Name</label>
            <input
              type="text"
              disabled={isSaving}
              value={siteConfig.topBar.contactPerson}
              onChange={(e) => setSiteConfig({
                ...siteConfig,
                topBar: { ...siteConfig.topBar, contactPerson: e.target.value }
              })}
              className="w-full p-3.5 rounded-xl border border-slate-200 text-sm font-semibold focus:border-[#002B66] focus:ring-4 focus:ring-[#002B66]/10 focus:outline-none disabled:opacity-60"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Primary Support Email (info@fidarbs.at)</label>
            <input
              type="email"
              disabled={isSaving}
              value={siteConfig.topBar.email}
              onChange={(e) => setSiteConfig({
                ...siteConfig,
                topBar: { ...siteConfig.topBar, email: e.target.value }
              })}
              className="w-full p-3.5 rounded-xl border border-slate-200 text-sm font-semibold focus:border-[#002B66] focus:ring-4 focus:ring-[#002B66]/10 focus:outline-none disabled:opacity-60"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Secondary Email (fidar.bs@gmail.com)</label>
            <input
              type="email"
              disabled={isSaving}
              value={siteConfig.topBar.emailSecondary}
              onChange={(e) => setSiteConfig({
                ...siteConfig,
                topBar: { ...siteConfig.topBar, emailSecondary: e.target.value }
              })}
              className="w-full p-3.5 rounded-xl border border-slate-200 text-sm font-semibold focus:border-[#002B66] focus:ring-4 focus:ring-[#002B66]/10 focus:outline-none disabled:opacity-60"
            />
          </div>
        </div>
      </div>

      {/* Multilingual Office Address Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E7EB] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
          <h3 className="text-lg font-black text-[#1A1A1A] flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#002B66]" />
            <span>Multilingual Address & Working Hours</span>
          </h3>

          {/* Form Language Selector */}
          <div className="flex items-center bg-[#F8FAFC] p-1 rounded-xl border border-[#E5E7EB]">
            <button
              type="button"
              onClick={() => setFormLang('en')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                formLang === 'en' ? 'bg-[#002B66] text-white shadow' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🇬🇧 English
            </button>
            <button
              type="button"
              onClick={() => setFormLang('de')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                formLang === 'de' ? 'bg-[#002B66] text-white shadow' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🇩🇪 Deutsch
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {formLang === 'en' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <span>🇬🇧 Office Address (English)</span>
                </label>
                <textarea
                  rows={3}
                  disabled={isSaving}
                  value={siteConfig.topBar.addressEn}
                  onChange={(e) => setSiteConfig({
                    ...siteConfig,
                    topBar: { ...siteConfig.topBar, addressEn: e.target.value }
                  })}
                  className="w-full p-4 rounded-xl border border-slate-200 text-sm focus:border-[#002B66] focus:ring-4 focus:ring-[#002B66]/10 focus:outline-none disabled:opacity-60"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">🇬🇧 Working Hours (English)</label>
                <input
                  type="text"
                  disabled={isSaving}
                  value={siteConfig.topBar.hoursEn}
                  onChange={(e) => setSiteConfig({
                    ...siteConfig,
                    topBar: { ...siteConfig.topBar, hoursEn: e.target.value }
                  })}
                  className="w-full p-3.5 rounded-xl border border-slate-200 text-sm focus:border-[#002B66] focus:ring-4 focus:ring-[#002B66]/10 focus:outline-none disabled:opacity-60"
                />
              </div>
            </div>
          )}

          {formLang === 'de' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <span>🇩🇪 Office Address (German / Deutsch)</span>
                </label>
                <textarea
                  rows={3}
                  disabled={isSaving}
                  value={siteConfig.topBar.addressDe}
                  onChange={(e) => setSiteConfig({
                    ...siteConfig,
                    topBar: { ...siteConfig.topBar, addressDe: e.target.value }
                  })}
                  className="w-full p-4 rounded-xl border border-slate-200 text-sm focus:border-[#002B66] focus:ring-4 focus:ring-[#002B66]/10 focus:outline-none disabled:opacity-60"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">🇩🇪 Working Hours (German / Deutsch)</label>
                <input
                  type="text"
                  disabled={isSaving}
                  value={siteConfig.topBar.hoursDe}
                  onChange={(e) => setSiteConfig({
                    ...siteConfig,
                    topBar: { ...siteConfig.topBar, hoursDe: e.target.value }
                  })}
                  className="w-full p-3.5 rounded-xl border border-slate-200 text-sm focus:border-[#002B66] focus:ring-4 focus:ring-[#002B66]/10 focus:outline-none disabled:opacity-60"
                />
              </div>
            </div>
          )}


          <div className="pt-2">
            <label className="text-xs font-bold text-slate-700">Google Maps Embed URL</label>
            <input
              type="text"
              disabled={isSaving}
              value={siteConfig.mapUrl}
              onChange={(e) => setSiteConfig({ ...siteConfig, mapUrl: e.target.value })}
              className="w-full mt-1 p-3.5 rounded-xl border border-slate-200 text-xs focus:border-[#002B66] focus:outline-none font-mono disabled:opacity-60"
            />
          </div>
        </div>
      </div>

      {/* Social Links Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E7EB] shadow-sm space-y-4">
        <h3 className="text-lg font-black text-[#1A1A1A] flex items-center gap-2">
          <Globe className="w-5 h-5 text-[#002B66]" />
          <span>Social Media Links</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700">Facebook URL</label>
            <input
              type="text"
              disabled={isSaving}
              value={siteConfig.social.facebook}
              onChange={(e) => setSiteConfig({
                ...siteConfig,
                social: { ...siteConfig.social, facebook: e.target.value }
              })}
              className="w-full p-3 rounded-xl border border-slate-200 focus:border-[#002B66] focus:outline-none text-xs disabled:opacity-60"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700">LinkedIn URL</label>
            <input
              type="text"
              disabled={isSaving}
              value={siteConfig.social.linkedin}
              onChange={(e) => setSiteConfig({
                ...siteConfig,
                social: { ...siteConfig.social, linkedin: e.target.value }
              })}
              className="w-full p-3 rounded-xl border border-slate-200 focus:border-[#002B66] focus:outline-none text-xs disabled:opacity-60"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700">Twitter URL</label>
            <input
              type="text"
              disabled={isSaving}
              value={siteConfig.social.twitter}
              onChange={(e) => setSiteConfig({
                ...siteConfig,
                social: { ...siteConfig.social, twitter: e.target.value }
              })}
              className="w-full p-3 rounded-xl border border-slate-200 focus:border-[#002B66] focus:outline-none text-xs disabled:opacity-60"
            />
          </div>
        </div>
      </div>



      <div className="flex justify-end pt-2">
        <button
          onClick={onSave}
          disabled={isSaving}
          className="px-8 py-4 bg-[#002B66] text-white rounded-2xl font-black text-sm hover:bg-[#001D47] flex items-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-transform disabled:opacity-50"
        >
          {isSaving ? (
            <Loader2 className="w-5 h-5 text-[#FDB813] animate-spin" />
          ) : (
            <Save className="w-5 h-5 text-[#FDB813]" />
          )}
          <span>{isSaving ? 'Saving to Firestore...' : 'Save Company & Address Info to Firestore'}</span>
        </button>
      </div>
    </div>
  );
};
