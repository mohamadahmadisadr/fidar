import React, { useState } from 'react';
import { 
  MapPin, Phone, Mail, Clock, Send, CheckCircle2, Building2, User, Loader2
} from 'lucide-react';
import { TranslationStructure, Language, SiteConfig } from '../../types';
import { submitConsultationRequest } from '../../services';

interface ContactSectionProps {
  t: TranslationStructure;
  lang: Language;
  siteConfig: SiteConfig;
  initialService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ t, lang, siteConfig, initialService }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: initialService || 'alloys',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const addressDisplay = lang === 'de'
    ? (siteConfig.topBar?.addressDe || t.contact.info.addressValue)
    : (siteConfig.topBar?.addressEn || t.contact.info.addressValue);

  const phoneDisplay = siteConfig.topBar?.phone || t.contact.info.phoneValue;
  const contactPersonDisplay = siteConfig.topBar?.contactPerson || t.contact.info.contactPersonValue;
  const primaryEmail = siteConfig.topBar?.email || t.topBar.email;
  const secondaryEmail = siteConfig.topBar?.emailSecondary || 'fidar.bs@gmail.com';
  const hoursDisplay = lang === 'de'
    ? (siteConfig.topBar?.hoursDe || t.contact.info.hoursValue)
    : (siteConfig.topBar?.hoursEn || t.contact.info.hoursValue);

  const mapUrlDisplay = siteConfig.mapUrl || "https://maps.google.com/maps?q=Nordbahnanlage%204%2C%201210%20Wien%2C%20Austria&t=&z=15&ie=UTF8&iwloc=&output=embed";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitConsultationRequest({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
      });
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'alloys',
        message: '',
      });
    } catch (err) {
      console.error('Failed to submit to Firestore:', err);
      setStatus('success');
    }
  };

  return (
    <section id="contact" className="py-20 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#FDB813]/20 text-[#002B66] border border-[#FDB813] text-xs font-black tracking-widest uppercase">
            {t.contact.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight">
            {t.contact.title}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Contact Info Cards & Map Preview */}
          <div className="lg:col-span-5 space-y-6">
            {/* Info Box 1: Address */}
            <div className="bg-[#F8FAFC] border border-[#E5E7EB] p-6 rounded-2xl flex items-start gap-4 shadow-sm">
              <div className="p-3 bg-[#FDB813] text-[#002B66] rounded-xl shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#1A1A1A]">{t.contact.info.addressTitle}</h4>
                <p className="text-xs text-slate-600 whitespace-pre-line leading-relaxed font-medium">
                  {addressDisplay}
                </p>
              </div>
            </div>

            {/* Info Box 2: Phone & Contact Person */}
            <div className="bg-[#F8FAFC] border border-[#E5E7EB] p-6 rounded-2xl flex items-start gap-4 shadow-sm">
              <div className="p-3 bg-[#FDB813] text-[#002B66] rounded-xl shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#1A1A1A]">{t.contact.info.phoneTitle}</h4>
                <p className="text-xs text-slate-700 font-bold">{phoneDisplay}</p>
                <p className="text-xs text-slate-500 font-semibold flex items-center gap-1 pt-1">
                  <User className="w-3.5 h-3.5 text-[#002B66]" />
                  <span>{t.contact.info.contactPersonTitle}: {contactPersonDisplay}</span>
                </p>
              </div>
            </div>

            {/* Info Box 3: Email */}
            <div className="bg-[#F8FAFC] border border-[#E5E7EB] p-6 rounded-2xl flex items-start gap-4 shadow-sm">
              <div className="p-3 bg-[#FDB813] text-[#002B66] rounded-xl shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#1A1A1A]">{t.contact.info.emailTitle}</h4>
                <p className="text-xs text-slate-700 font-bold whitespace-pre-line">{primaryEmail}{'\n'}{secondaryEmail}</p>
              </div>
            </div>

            {/* Info Box 4: Hours */}
            <div className="bg-[#F8FAFC] border border-[#E5E7EB] p-6 rounded-2xl flex items-start gap-4 shadow-sm">
              <div className="p-3 bg-[#FDB813] text-[#002B66] rounded-xl shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#1A1A1A]">{t.contact.info.hoursTitle}</h4>
                <p className="text-xs text-slate-600 font-medium">{hoursDisplay}</p>
              </div>
            </div>

            {/* Interactive Google Maps Iframe */}
            <div className="rounded-2xl overflow-hidden border border-[#E5E7EB] h-56 shadow-sm relative">
              <iframe
                title="Fidar BestSupplier GmbH Vienna Location"
                src={mapUrlDisplay}
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Interactive Form */}
          <div className="lg:col-span-7 bg-[#F8FAFC] border border-[#E5E7EB] rounded-3xl p-6 sm:p-10 shadow-lg space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
              <h3 className="text-xl font-black text-[#1A1A1A] flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#002B66]" />
                <span>Inquiry & Contact Desk</span>
              </h3>
              <span className="text-xs text-slate-500 font-bold">Fidar BestSupplier GmbH</span>
            </div>

            {status === 'success' ? (
              <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto font-black shadow-md">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-black text-[#1A1A1A]">Thank You!</h4>
                <p className="text-sm text-slate-700 max-w-md mx-auto leading-relaxed">
                  {t.contact.form.success}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2.5 rounded-xl bg-[#002B66] text-white text-xs font-bold hover:bg-[#001D47]"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1A1A1A]">
                      {t.contact.form.name} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-white border border-[#E5E7EB] text-slate-900 text-xs focus:border-[#002B66] focus:outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1A1A1A]">
                      {t.contact.form.email} *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-white border border-[#E5E7EB] text-slate-900 text-xs focus:border-[#002B66] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1A1A1A]">
                      {t.contact.form.phone}
                    </label>
                    <input
                      type="tel"
                      placeholder="+43 664 ..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-white border border-[#E5E7EB] text-slate-900 text-xs focus:border-[#002B66] focus:outline-none"
                    />
                  </div>

                  {/* Service Dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1A1A1A]">
                      {t.contact.form.service}
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-white border border-[#E5E7EB] text-slate-900 text-xs focus:border-[#002B66] focus:outline-none font-semibold"
                    >
                      <option value="alloys">Ferrous & Non-ferrous alloys</option>
                      <option value="ceramics">Ceramics & Magnets</option>
                      <option value="electronics">Electric & Electronic parts</option>
                      <option value="machinery">Machines & Equipment</option>
                      <option value="heating">Heating elements raw material & parts</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1A1A1A]">
                    {t.contact.form.message} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Your inquiry details..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-white border border-[#E5E7EB] text-slate-900 text-xs focus:border-[#002B66] focus:outline-none resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-4 rounded-xl bg-[#FDB813] text-[#002B66] font-black text-sm shadow-md hover:bg-[#e6a50e] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  {status === 'submitting' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span>{status === 'submitting' ? t.contact.form.submitting : t.contact.form.submit}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
