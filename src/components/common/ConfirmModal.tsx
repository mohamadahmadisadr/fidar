import React from 'react';
import { X, AlertCircle } from 'lucide-react';
import { ConfirmDialogState } from '../admin/types';

interface ConfirmModalProps {
  dialog: ConfirmDialogState | null;
  onClose: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  dialog,
  onClose,
}) => {
  if (!dialog) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in">
      <div className="bg-white border border-[#E5E7EB] rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl relative text-center">
        <button
          onClick={() => onClose()}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto shadow-sm">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-black text-[#1A1A1A]">{dialog.title}</h3>
          <p className="text-xs text-slate-600 font-medium leading-relaxed max-w-xs mx-auto">
            {dialog.message}
          </p>
        </div>

        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onClose()}
            className="w-full py-3.5 rounded-xl border border-[#E5E7EB] text-slate-700 text-xs font-bold hover:bg-slate-100 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              const action = dialog.onConfirm;
              onClose();
              action();
            }}
            className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black shadow-md transition-all cursor-pointer"
          >
            {dialog.confirmLabel || 'Delete Permanently'}
          </button>
        </div>
      </div>
    </div>
  );
};
