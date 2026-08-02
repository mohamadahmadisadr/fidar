import React from 'react';
import { X, CheckCircle2, Languages, Loader2, Upload, Sparkles, Image as ImageIcon } from 'lucide-react';
import { ServiceProductItem, FirestoreCategory } from '../../types';
import { FormLang, ProductFeaturesRaw, INDUSTRIAL_PRESET_IMAGES } from './types';

interface ProductEditModalProps {
  isOpen: boolean;
  editingProduct: Partial<ServiceProductItem> | null;
  setEditingProduct: React.Dispatch<React.SetStateAction<Partial<ServiceProductItem> | null>>;
  categories: FirestoreCategory[];
  isSaving: boolean;
  formLang: FormLang;
  setFormLang: (lang: FormLang) => void;
  productFeaturesRaw: ProductFeaturesRaw;
  setProductFeaturesRaw: React.Dispatch<React.SetStateAction<ProductFeaturesRaw>>;
  showPresetPicker: boolean;
  setShowPresetPicker: (show: boolean) => void;
  onImageFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: (e: React.FormEvent) => void;
  onClose: () => void;
}

export const ProductEditModal: React.FC<ProductEditModalProps> = ({
  isOpen,
  editingProduct,
  setEditingProduct,
  categories,
  isSaving,
  formLang,
  setFormLang,
  productFeaturesRaw,
  setProductFeaturesRaw,
  showPresetPicker,
  setShowPresetPicker,
  onImageFileUpload,
  onSave,
  onClose,
}) => {
  if (!isOpen || !editingProduct) return null;

  return (
    <>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in">
              <div className="bg-white border rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[92vh] overflow-y-auto">
                <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
                  <div>
                    <h3 className="text-xl font-black text-[#1A1A1A]">
                      {editingProduct.id ? 'Edit Product' : 'Add New Product'}
                    </h3>
                    <p className="text-xs text-slate-500">Provide product metadata and multilingual copy (EN / DE / FA)</p>
                  </div>
                  <button onClick={() => onClose()} disabled={isSaving} className="p-2 rounded-xl hover:bg-slate-100">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={onSave} className="space-y-6">
                  {/* Product Metadata Section */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Category Division *</label>
                      <select
                        required
                        disabled={isSaving}
                        value={editingProduct.category || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                        className="w-full p-3.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold focus:border-[#002B66] focus:ring-4 focus:ring-[#002B66]/10 focus:outline-none disabled:opacity-60"
                      >
                        <option value="" disabled>Select a category...</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.nameEn}>
                            {cat.nameEn} {cat.nameDe ? `(${cat.nameDe})` : ''}
                          </option>
                        ))}
                        {editingProduct.category && !categories.some(c => c.nameEn === editingProduct.category) && (
                          <option value={editingProduct.category}>{editingProduct.category}</option>
                        )}
                      </select>
                    </div>

                    {/* Enhanced Image Uploader & Manager */}
                    <div className="space-y-1.5 sm:col-span-2 bg-[#F8FAFC] border border-[#E5E7EB] p-4 rounded-2xl space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                          <ImageIcon className="w-4 h-4 text-[#002B66]" />
                          <span>Product Image (File Upload, Presets or URL)</span>
                        </label>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setShowPresetPicker(true)}
                            className="px-3 py-1.5 rounded-lg bg-[#FDB813]/20 hover:bg-[#FDB813] text-[#002B66] font-bold text-[11px] flex items-center gap-1 border border-[#FDB813] transition-all cursor-pointer"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Pick Stock Photo</span>
                          </button>

                          <label className="px-3 py-1.5 bg-[#002B66] text-white rounded-lg text-[11px] font-bold cursor-pointer hover:bg-[#001D47] transition-colors flex items-center gap-1">
                            <Upload className="w-3.5 h-3.5 text-[#FDB813]" />
                            <span>Upload File</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={onImageFileUpload}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          disabled={isSaving}
                          placeholder="Paste Image URL or choose file above (https://...)"
                          value={editingProduct.imageUrl || ''}
                          onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                          className="flex-1 p-3 rounded-xl border border-slate-200 bg-white text-xs focus:border-[#002B66] focus:outline-none disabled:opacity-60"
                        />
                        {editingProduct.imageUrl && (
                          <button
                            type="button"
                            onClick={() => setEditingProduct({ ...editingProduct, imageUrl: '' })}
                            className="p-2.5 rounded-xl bg-slate-200 hover:bg-red-500 hover:text-white text-slate-700 text-xs font-bold transition-colors shrink-0"
                            title="Clear image"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      {/* Thumbnail Preview */}
                      {editingProduct.imageUrl && (
                        <div className="flex items-center gap-3 pt-1">
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-[#E5E7EB] shrink-0 shadow-sm">
                            <img
                              src={editingProduct.imageUrl}
                              alt="Preview"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          </div>
                          <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Image Linked & Preview Active
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Multilingual Content Tabs */}
                  <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                      <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <Languages className="w-4 h-4 text-[#002B66]" />
                        <span>Multilingual Copy & Features</span>
                      </span>

                      <div className="flex items-center bg-white p-1 rounded-xl border border-[#E5E7EB]">
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

                    {/* English Product Tab */}
                    {formLang === 'en' && (
                      <div className="space-y-4 animate-in fade-in">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">🇬🇧 Product Title (English) *</label>
                          <input
                            type="text"
                            required
                            disabled={isSaving}
                            value={editingProduct.titleEn || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, titleEn: e.target.value })}
                            className="w-full p-3.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold focus:border-[#002B66] focus:ring-4 focus:ring-[#002B66]/10 focus:outline-none disabled:opacity-60"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">🇬🇧 Description (English)</label>
                          <textarea
                            rows={3}
                            disabled={isSaving}
                            value={editingProduct.descEn || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, descEn: e.target.value })}
                            className="w-full p-3.5 rounded-xl border border-slate-200 bg-white text-sm focus:border-[#002B66] focus:ring-4 focus:ring-[#002B66]/10 focus:outline-none disabled:opacity-60"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">🇬🇧 Key Features / Specs (English - 1 item per line)</label>
                          <textarea
                            rows={3}
                            disabled={isSaving}
                            placeholder={"High heat resistance\nPrecision engineered\nStandardized alloy grade"}
                            value={productFeaturesRaw.en}
                            onChange={(e) => setProductFeaturesRaw({ ...productFeaturesRaw, en: e.target.value })}
                            className="w-full p-3.5 rounded-xl border border-slate-200 bg-white text-sm font-mono focus:border-[#002B66] focus:ring-4 focus:ring-[#002B66]/10 focus:outline-none disabled:opacity-60"
                          />
                        </div>
                      </div>
                    )}

                    {/* German Product Tab */}
                    {formLang === 'de' && (
                      <div className="space-y-4 animate-in fade-in">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">🇩🇪 Product Title (German / Deutsch)</label>
                          <input
                            type="text"
                            disabled={isSaving}
                            value={editingProduct.titleDe || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, titleDe: e.target.value })}
                            className="w-full p-3.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold focus:border-[#002B66] focus:ring-4 focus:ring-[#002B66]/10 focus:outline-none disabled:opacity-60"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">🇩🇪 Description (German / Deutsch)</label>
                          <textarea
                            rows={3}
                            disabled={isSaving}
                            value={editingProduct.descDe || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, descDe: e.target.value })}
                            className="w-full p-3.5 rounded-xl border border-slate-200 bg-white text-sm focus:border-[#002B66] focus:ring-4 focus:ring-[#002B66]/10 focus:outline-none disabled:opacity-60"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">🇩🇪 Key Features / Specs (German - 1 item per line)</label>
                          <textarea
                            rows={3}
                            disabled={isSaving}
                            placeholder={"Hohe Hitzebeständigkeit\nPräzisionstechnik"}
                            value={productFeaturesRaw.de}
                            onChange={(e) => setProductFeaturesRaw({ ...productFeaturesRaw, de: e.target.value })}
                            className="w-full p-3.5 rounded-xl border border-slate-200 bg-white text-sm font-mono focus:border-[#002B66] focus:ring-4 focus:ring-[#002B66]/10 focus:outline-none disabled:opacity-60"
                          />
                        </div>
                      </div>
                    )}

                    {/* Persian Product Tab */}
                  </div>

                  <div className="flex justify-end gap-3 pt-3 border-t border-[#E5E7EB]">
                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={() => onClose()}
                      className="px-5 py-3 border rounded-xl font-bold text-slate-600 hover:bg-slate-100 text-xs disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-7 py-3 bg-[#002B66] text-white rounded-xl font-bold text-xs shadow-md hover:bg-[#001D47] active:scale-95 transition-transform flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSaving && <Loader2 className="w-4 h-4 animate-spin text-[#FDB813]" />}
                      <span>{isSaving ? 'Saving Product...' : 'Save Product to Firestore'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

      {/* STOCK PRESET IMAGE PICKER MODAL */}
      {showPresetPicker && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
                <div className="bg-white border rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#D49B0D]" />
                      <h3 className="font-black text-lg text-[#1A1A1A]">Curated Industrial Image Gallery</h3>
                    </div>
                    <button onClick={() => setShowPresetPicker(false)} className="p-1 rounded-xl hover:bg-slate-100">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600">Select any high-resolution industrial photo to insert its URL directly into the product form:</p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-[60vh] overflow-y-auto p-1">
                    {INDUSTRIAL_PRESET_IMAGES.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setEditingProduct({ ...editingProduct, imageUrl: img.url });
                          setShowPresetPicker(false);
                        }}
                        className="group relative rounded-2xl overflow-hidden border border-[#E5E7EB] hover:border-[#002B66] hover:ring-2 hover:ring-[#002B66]/20 transition-all text-left bg-slate-50 cursor-pointer"
                      >
                        <div className="h-28 w-full overflow-hidden">
                          <img src={img.url} alt={img.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <div className="p-2 text-[11px] font-bold text-slate-800 line-clamp-2 leading-tight">
                          {img.label}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => setShowPresetPicker(false)}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
                    >
                      Close Gallery
                    </button>
                  </div>
                </div>
              </div>
      )}
    </>
  );
};
