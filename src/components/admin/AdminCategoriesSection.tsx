import React from 'react';
import { Plus, Trash2, Edit3 } from 'lucide-react';
import { FirestoreCategory } from '../../types';

interface AdminCategoriesSectionProps {
  categories: FirestoreCategory[];
  isSaving: boolean;
  setEditingCategory: (category: Partial<FirestoreCategory> | null) => void;
  setIsCategoryModalOpen: (open: boolean) => void;
  onDeleteCategory: (category: FirestoreCategory) => void;
}

export const AdminCategoriesSection: React.FC<AdminCategoriesSectionProps> = ({
  categories,
  isSaving,
  setEditingCategory,
  setIsCategoryModalOpen,
  onDeleteCategory,
}) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-3xl border border-[#E5E7EB] shadow-sm flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-[#1A1A1A]">Product Categories Taxonomy</h3>
          <p className="text-xs text-slate-500">Manage divisions shown on the public Products page filter</p>
        </div>

        <button
          onClick={() => {
            setEditingCategory({ nameEn: '', nameDe: '', icon: 'Globe' });
            setIsCategoryModalOpen(true);
          }}
          disabled={isSaving}
          className="px-5 py-3 bg-[#002B66] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
        >
          <Plus className="w-4 h-4 text-[#FDB813]" />
          <span>Add New Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white border border-[#E5E7EB] p-5 rounded-2xl flex items-center justify-between shadow-sm hover:border-[#002B66] transition-all">
            <div className="space-y-1">
              <h4 className="font-bold text-base text-[#1A1A1A]">{cat.nameEn}</h4>
              <p className="text-xs text-slate-500 font-medium">🇩🇪 {cat.nameDe || '—'}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setEditingCategory({
                    id: cat.id,
                    nameEn: cat.nameEn,
                    nameDe: cat.nameDe,
                    icon: cat.icon || 'Globe'
                  });
                  setIsCategoryModalOpen(true);
                }}
                disabled={isSaving}
                className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-[#002B66] hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                title="Edit Category"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDeleteCategory(cat)}
                disabled={isSaving}
                className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
                title="Delete Category"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
