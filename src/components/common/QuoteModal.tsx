import React, { useState, useEffect } from 'react';
import { 
  X, Send, CheckCircle2, ShieldCheck, Building2, Loader2
} from 'lucide-react';
import { TranslationStructure } from '../../types';
import { submitConsultationRequest } from '../../services';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: TranslationStructure;
  initialService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  t,
  initialService,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: initialService || 'Ferrous & Non-ferrous alloys',
    message: '',
  });

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitConsultationRequest({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service: formData.service,
        message: formData.message,
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Failed to save to Firestore:', err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white border border-[#E5E7EB] rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          disabled={submitting}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#FDB813] rounded-xl text-[#002B66]">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-[#002B66] font-black uppercase tracking-wider">
              Fidar BestSupplier GmbH
            </span>
            <h3 className="text-2xl font-black text-[#1A1A1A]">
              {t.topBar.getQuote}
            </h3>
          </div>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-black text-[#1A1A1A]">Message Sent</h4>
            <p className="text-slate-600 text-sm max-w-md mx-auto">
              Thank you for contacting Fidar BestSupplier GmbH. We will get back to you as soon as possible.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-[#002B66] text-white font-bold text-xs"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1A1A]">Name *</label>
                <input
                  type="text"
                  required
                  disabled={submitting}
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white border border-[#E5E7EB] text-slate-900 text-xs focus:border-[#002B66] focus:outline-none disabled:opacity-60"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1A1A]">Email Address *</label>
                <input
                  type="email"
                  required
                  disabled={submitting}
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white border border-[#E5E7EB] text-slate-900 text-xs focus:border-[#002B66] focus:outline-none disabled:opacity-60"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1A1A]">Phone Number</label>
                <input
                  type="tel"
                  disabled={submitting}
                  placeholder="+43 664 ..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white border border-[#E5E7EB] text-slate-900 text-xs focus:border-[#002B66] focus:outline-none disabled:opacity-60"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1A1A]">Company / Organization</label>
                <input
                  type="text"
                  disabled={submitting}
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white border border-[#E5E7EB] text-slate-900 text-xs focus:border-[#002B66] focus:outline-none disabled:opacity-60"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1A1A1A]">Product / Service</label>
              <input
                type="text"
                disabled={submitting}
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full p-3 rounded-xl bg-white border border-[#E5E7EB] text-slate-900 text-xs focus:border-[#002B66] focus:outline-none disabled:opacity-60"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1A1A1A]">Message / Product Inquiry</label>
              <textarea
                rows={3}
                disabled={submitting}
                placeholder="Details about raw materials, parts or equipment needed..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-3 rounded-xl bg-white border border-[#E5E7EB] text-slate-900 text-xs focus:border-[#002B66] focus:outline-none resize-none disabled:opacity-60"
              />
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-600">
              <span className="flex items-center gap-1 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Direct Inquiry to Fidar BestSupplier GmbH
              </span>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 rounded-xl bg-[#002B66] text-white font-black text-xs shadow-md hover:bg-[#001D47] flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {submitting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#FDB813]" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                <span>{submitting ? 'Sending...' : 'Submit Message'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
