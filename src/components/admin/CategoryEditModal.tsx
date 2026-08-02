import React from 'react';
import { X, Loader2 } from 'lucide-react';
import { FirestoreCategory } from '../../types';

interface CategoryEditModalProps {
  isOpen: boolean;
  editingCategory: Partial<FirestoreCategory> | null;
  setEditingCategory: React.Dispatch<React.SetStateAction<Partial<FirestoreCategory> | null>>;
  isSaving: boolean;
  onSave: (e: React.FormEvent) => void;
  onClose: () => void;
}

export const CategoryEditModal: React.FC<CategoryEditModalProps> = ({
  isOpen,
  editingCategory,
  setEditingCategory,
  isSaving,
  onSave,
  onClose,
}) => {
  if (!isOpen || !editingCategory) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md">
      <div className="bg-white border rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
          <h3 className="font-black text-lg text-[#1A1A1A]">Add / Edit Category Taxonomy</h3>
          <button onClick={() => onClose()} disabled={isSaving} className="p-1 rounded-xl hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">🇬🇧 Category Name (English) *</label>
            <input
              type="text"
              required
              disabled={isSaving}
              placeholder="e.g. Ferrous and Non-ferrous alloys"
              value={editingCategory.nameEn || ''}
              onChange={(e) => setEditingCategory({ ...editingCategory, nameEn: e.target.value })}
              className="w-full p-3.5 rounded-xl border border-slate-200 text-sm font-semibold focus:border-[#002B66] focus:ring-4 focus:ring-[#002B66]/10 focus:outline-none disabled:opacity-60"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">🇩🇪 Category Name (German / Deutsch)</label>
            <input
              type="text"
              disabled={isSaving}
              placeholder="Eisen- und Nichteisenlegierungen"
              value={editingCategory.nameDe || ''}
              onChange={(e) => setEditingCategory({ ...editingCategory, nameDe: e.target.value })}
              className="w-full p-3.5 rounded-xl border border-slate-200 text-sm font-semibold focus:border-[#002B66] focus:ring-4 focus:ring-[#002B66]/10 focus:outline-none disabled:opacity-60"
            />
          </div>


          <div className="flex justify-end gap-3 pt-4 border-t border-[#E5E7EB]">
            <button type="button" onClick={() => onClose()} disabled={isSaving} className="px-5 py-2.5 border rounded-xl font-bold text-xs text-slate-600 disabled:opacity-50">Cancel</button>
            <button type="submit" disabled={isSaving} className="px-6 py-2.5 bg-[#002B66] text-white rounded-xl font-bold text-xs shadow-md hover:bg-[#001D47] flex items-center gap-2 disabled:opacity-50">
              {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin text-[#FDB813]" />}
              <span>{isSaving ? 'Saving Category...' : 'Save Category'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
