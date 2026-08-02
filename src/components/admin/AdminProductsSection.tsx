import React from 'react';
import { Wrench, Plus, Trash2, Edit3 } from 'lucide-react';
import { ServiceProductItem, FirestoreCategory } from '../../types';

interface AdminProductsSectionProps {
  products: ServiceProductItem[];
  filteredProducts: ServiceProductItem[];
  categories: FirestoreCategory[];
  isSaving: boolean;
  productCategoryFilter: string;
  setProductCategoryFilter: (filter: string) => void;
  onEditProduct: (product: Partial<ServiceProductItem>) => void;
  onDeleteProduct: (product: ServiceProductItem) => void;
}

export const AdminProductsSection: React.FC<AdminProductsSectionProps> = ({
  products,
  filteredProducts,
  categories,
  isSaving,
  productCategoryFilter,
  setProductCategoryFilter,
  onEditProduct,
  onDeleteProduct,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-[#E5E7EB] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#FDB813]/20 rounded-2xl text-[#002B66]">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-[#1A1A1A]">Products & Services Catalog</h3>
            <p className="text-xs text-slate-500">Real-time CRUD operations on Firestore collection</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Category Filter */}
          <select
            value={productCategoryFilter}
            onChange={(e) => setProductCategoryFilter(e.target.value)}
            className="p-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none bg-white"
          >
            <option value="all">All Categories ({products.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.nameEn}>{c.nameEn}</option>
            ))}
          </select>

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
            className="px-5 py-3 bg-[#002B66] text-white rounded-xl font-bold text-xs hover:bg-[#001D47] flex items-center gap-2 cursor-pointer shadow-md shrink-0 active:scale-95 transition-transform disabled:opacity-50"
          >
            <Plus className="w-4 h-4 text-[#FDB813]" />
            <span>Create New Product</span>
          </button>
        </div>
      </div>

      {/* Products Grid Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map((prod) => (
          <div key={prod.id} className="bg-white border border-[#E5E7EB] p-5 rounded-3xl space-y-4 flex flex-col justify-between shadow-sm hover:border-[#002B66] transition-all">
            <div className="space-y-3">
              {prod.imageUrl ? (
                <div className="w-full h-40 rounded-2xl overflow-hidden bg-slate-100 border border-[#E5E7EB]">
                  <img src={prod.imageUrl} alt={prod.titleEn} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-full h-28 rounded-2xl bg-slate-50 border border-dashed flex items-center justify-center text-slate-400 text-xs font-medium">
                  No Image Provided
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-md bg-[#002B66]/10 text-[#002B66]">
                  {prod.category}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-base text-[#1A1A1A]">{prod.titleEn}</h4>
                {prod.titleDe && <p className="text-xs text-slate-500 font-medium">{prod.titleDe}</p>}
              </div>

              {prod.descEn && (
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">{prod.descEn}</p>
              )}
            </div>

            <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-mono">ID: {prod.id}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onEditProduct(prod)}
                  disabled={isSaving}
                  className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-[#002B66] hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                  title="Edit Product"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDeleteProduct(prod)}
                  disabled={isSaving}
                  className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                  title="Delete Product"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
