import React from 'react';
import { Inbox } from 'lucide-react';
import { ConsultationRecord } from '../../types';

interface AdminInquiriesSectionProps {
  inquiries: ConsultationRecord[];
  pendingInquiriesCount: number;
  isSaving: boolean;
  onToggleStatus: (id: string, currentStatus: string) => void;
  onDelete: (id: string) => void;
}

export const AdminInquiriesSection: React.FC<AdminInquiriesSectionProps> = ({
  inquiries,
  pendingInquiriesCount,
  isSaving,
  onToggleStatus,
  onDelete,
}) => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="bg-white p-6 rounded-3xl border border-[#E5E7EB] shadow-sm flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-[#1A1A1A]">Customer Inquiries & Form Submissions</h3>
          <p className="text-xs text-slate-500">Live feed of messages submitted through Contact Form & Quote Modals</p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
          <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-lg">{pendingInquiriesCount} Pending</span>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg">{inquiries.length - pendingInquiriesCount} Completed</span>
        </div>
      </div>

      <div className="space-y-4">
        {inquiries.length === 0 ? (
          <div className="p-12 bg-white text-center border rounded-2xl text-slate-500 text-xs font-medium space-y-2">
            <Inbox className="w-8 h-8 text-slate-300 mx-auto" />
            <p>No customer form submissions found in Firestore database.</p>
          </div>
        ) : (
          inquiries.map((inq) => (
            <div key={inq.id} className="bg-white border border-[#E5E7EB] p-6 rounded-3xl space-y-4 shadow-sm hover:border-[#002B66] transition-all">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#E5E7EB]">
                <div>
                  <div className="flex items-center gap-3">
                    <h4 className="font-black text-base text-[#1A1A1A]">{inq.name}</h4>
                    <span className={`px-3 py-0.5 rounded-full text-[10px] font-bold ${
                      inq.status === 'completed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      {inq.status || 'pending'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    Email: <a href={`mailto:${inq.email}`} className="text-[#002B66] underline">{inq.email}</a> 
                    {inq.phone && ` • Phone: ${inq.phone}`}
                    {inq.company && ` • Company: ${inq.company}`}
                  </p>
                </div>
                <span className="text-[11px] font-mono text-slate-400">{new Date(inq.createdAt).toLocaleString()}</span>
              </div>

              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E5E7EB] space-y-2 text-xs">
                <p className="font-bold text-[#002B66]">Requested Division / Service: {inq.service}</p>
                {inq.message && <p className="text-slate-700 leading-relaxed whitespace-pre-line font-medium">{inq.message}</p>}
              </div>

              <div className="flex items-center justify-end gap-3 pt-1">
                <button
                  onClick={() => onToggleStatus(inq.id!, inq.status)}
                  disabled={isSaving}
                  className="px-4 py-2 rounded-xl border border-[#E5E7EB] text-xs font-bold text-slate-700 hover:bg-[#002B66] hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                >
                  Mark as {inq.status === 'completed' ? 'Pending' : 'Completed'}
                </button>
                <button
                  onClick={() => onDelete(inq.id!)}
                  disabled={isSaving}
                  className="px-4 py-2 rounded-xl bg-red-50 text-red-600 text-xs font-bold hover:bg-red-600 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
