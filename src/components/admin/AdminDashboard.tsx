import React, { useState, useEffect, useMemo } from 'react';
import { Loader2 } from 'lucide-react';
import {
  SiteConfig, ServiceProductItem, FirestoreCategory, ConsultationRecord, AnalyticsStats,
} from '../../types';
import {
  DEFAULT_ADMIN_EMAILS,
  defaultSiteConfig, fetchSiteConfigFromFirestore, updateSiteConfigInFirestore,
  fetchServicesFromFirestore, saveProductToFirestore, deleteProductFromFirestore,
  fetchCategoriesFromFirestore, saveCategoryToFirestore, deleteCategoryFromFirestore,
  fetchRecentConsultations, updateConsultationStatusInFirestore, deleteConsultationInFirestore,
  fetchAnalyticsStatsFromFirestore,
} from '../../services';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { ADMIN_DEV_BYPASS, USE_FIREBASE_EMULATOR, PUBLIC_ADMIN } from '../../devFlags';
import { AdminSection, FormLang, ConfirmDialogState, ProductFeaturesRaw } from './types';
import { ConfirmModal } from '../common/ConfirmModal';
import { AdminLoginLock } from './AdminLoginLock';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { AdminOverviewSection } from './AdminOverviewSection';
import { AdminCompanySection } from './AdminCompanySection';
import { AdminHeroAboutSection } from './AdminHeroAboutSection';
import { AdminProductsSection } from './AdminProductsSection';
import { AdminCategoriesSection } from './AdminCategoriesSection';
import { AdminInquiriesSection } from './AdminInquiriesSection';
import { ProductEditModal } from './ProductEditModal';
import { CategoryEditModal } from './CategoryEditModal';

interface AdminDashboardProps {
  onReturnToSite: () => void;
  onRefreshSiteData: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onReturnToSite, onRefreshSiteData }) => {
  const [newAdminEmailInput, setNewAdminEmailInput] = useState('');

  // Active Admin Section
  const [activeSection, setActiveSection] = useState<AdminSection>('overview');

  // Form active editing language tab (EN / DE / FA)
  const [formLang, setFormLang] = useState<FormLang>('en');

  // Firestore Data States
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(defaultSiteConfig);

  // Google Auth + admin-email whitelist enforcement
  const {
    currentUser,
    isAuthenticated,
    isLoggingIn,
    loginError,
    login: handleGoogleLogin,
    logout: handleLogout,
  } = useAdminAuth(siteConfig.adminEmails);

  const [products, setProducts] = useState<ServiceProductItem[]>([]);
  const [categories, setCategories] = useState<FirestoreCategory[]>([]);
  const [inquiries, setInquiries] = useState<ConsultationRecord[]>([]);
  const [analyticsStats, setAnalyticsStats] = useState<AnalyticsStats>({
    totalVisits: 0, todayVisits: 0, monthVisits: 0, lastVisitedDate: '', lastVisitedMonth: '', visitsByLang: { en: 0, de: 0, fa: 0 }
  });

  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savingMessage, setSavingMessage] = useState('Saving data to Cloud Firestore...');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Custom In-Panel Confirmation Modal State
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState | null>(null);

  // Preset Image Picker Modal state
  const [showPresetPicker, setShowPresetPicker] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');

  // Product Edit/Create Modal
  const [editingProduct, setEditingProduct] = useState<Partial<ServiceProductItem> | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productFeaturesRaw, setProductFeaturesRaw] = useState<ProductFeaturesRaw>({ en: '', de: '' });

  // Category Edit/Create Modal
  const [editingCategory, setEditingCategory] = useState<Partial<FirestoreCategory> | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [config, prods, cats, inqs, stats] = await Promise.all([
        fetchSiteConfigFromFirestore(),
        fetchServicesFromFirestore(),
        fetchCategoriesFromFirestore(),
        fetchRecentConsultations(),
        fetchAnalyticsStatsFromFirestore(),
      ]);
      setSiteConfig(config);
      setProducts(prods);
      setCategories(cats);
      setInquiries(inqs);
      setAnalyticsStats(stats);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  const askConfirmation = (title: string, message: string, onConfirmAction: () => void, confirmLabel: string = 'Delete Permanently') => {
    setConfirmDialog({
      title,
      message,
      confirmLabel,
      onConfirm: onConfirmAction,
    });
  };

  const handleSaveSiteConfig = async () => {
    setIsSaving(true);
    setSavingMessage('Updating Site & Contact Settings in Firestore...');
    setSaveStatus('Saving site settings...');
    try {
      await updateSiteConfigInFirestore(siteConfig);
      setSaveStatus('✓ Site settings successfully updated!');
      onRefreshSiteData();
      setTimeout(() => setSaveStatus(null), 3500);
    } catch (err) {
      console.error('Error updating site_config:', err);
      setSaveStatus('Failed to save settings.');
    } finally {
      setIsSaving(false);
    }
  };

  // Product CRUD
  const handleOpenEditProduct = (prod: Partial<ServiceProductItem>) => {
    setEditingProduct(prod);
    setProductFeaturesRaw({
      en: (prod.featuresEn || []).join('\n'),
      de: (prod.featuresDe || []).join('\n'),
    });
    setIsProductModalOpen(true);
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      askConfirmation('File Size Limit', 'The selected image is larger than 5MB. Please choose a smaller image file.', () => {}, 'OK');
      return;
    }
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      if (result && editingProduct) {
        setEditingProduct({ ...editingProduct, imageUrl: result });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    // Convert raw multiline string into features array
    const featuresEn = productFeaturesRaw.en.split('\n').map(s => s.trim()).filter(Boolean);
    const featuresDe = productFeaturesRaw.de.split('\n').map(s => s.trim()).filter(Boolean);

    const payload: Partial<ServiceProductItem> = {
      ...editingProduct,
      featuresEn,
      featuresDe: featuresDe.length ? featuresDe : featuresEn,
    };

    setIsSaving(true);
    setSavingMessage('Saving Product to Firestore...');
    setSaveStatus('Saving product...');
    try {
      await saveProductToFirestore(payload);
      setSaveStatus('✓ Product saved successfully!');
      setIsProductModalOpen(false);
      setEditingProduct(null);
      await loadAllData();
      onRefreshSiteData();
      setTimeout(() => setSaveStatus(null), 3500);
    } catch (err) {
      console.error('Error saving product:', err);
      setSaveStatus('Failed to save product.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProduct = (product: ServiceProductItem) => {
    askConfirmation(
      'Delete Product',
      'Are you sure you want to permanently delete this product? This action cannot be undone.',
      async () => {
        setIsSaving(true);
        setSavingMessage('Deleting Product from Firestore...');
        try {
          await deleteProductFromFirestore(product);
          setSaveStatus('✓ Product deleted!');
          await loadAllData();
          onRefreshSiteData();
          setTimeout(() => setSaveStatus(null), 3500);
        } catch (err) {
          console.error('Error deleting product:', err);
        } finally {
          setIsSaving(false);
        }
      }
    );
  };

  // Category CRUD
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    setIsSaving(true);
    setSavingMessage('Saving Category Taxonomy to Firestore...');
    try {
      await saveCategoryToFirestore(editingCategory);
      setIsCategoryModalOpen(false);
      setEditingCategory(null);
      setSaveStatus('✓ Category saved!');
      await loadAllData();
      onRefreshSiteData();
      setTimeout(() => setSaveStatus(null), 3500);
    } catch (err) {
      console.error('Error saving category:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteCategory = (category: FirestoreCategory) => {
    askConfirmation(
      'Delete Category',
      `Are you sure you want to delete “${category.nameEn}” from your product taxonomy?`,
      async () => {
        setIsSaving(true);
        setSavingMessage('Deleting Category from Firestore...');
        try {
          await deleteCategoryFromFirestore(category);
          setSaveStatus('✓ Category deleted!');
          await loadAllData();
          onRefreshSiteData();
          setTimeout(() => setSaveStatus(null), 3500);
        } catch (err) {
          console.error('Error deleting category:', err);
          setSaveStatus('Failed to delete category.');
        } finally {
          setIsSaving(false);
        }
      }
    );
  };

  // Inquiry Status & Delete
  const handleToggleInquiryStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    setIsSaving(true);
    setSavingMessage('Updating Customer Inquiry Status...');
    try {
      await updateConsultationStatusInFirestore(id, nextStatus);
      await loadAllData();
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteInquiry = (id: string) => {
    askConfirmation(
      'Delete Inquiry Record',
      'Are you sure you want to delete this customer inquiry record from Firestore?',
      async () => {
        setIsSaving(true);
        setSavingMessage('Deleting Inquiry Record...');
        try {
          await deleteConsultationInFirestore(id);
          await loadAllData();
        } catch (err) {
          console.error('Error deleting inquiry:', err);
        } finally {
          setIsSaving(false);
        }
      }
    );
  };

  const handleAddAdminEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const emailToAdd = newAdminEmailInput.trim().toLowerCase();
    if (!emailToAdd) return;
    if (!emailToAdd.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    const currentList = siteConfig.adminEmails && siteConfig.adminEmails.length > 0 ? siteConfig.adminEmails : DEFAULT_ADMIN_EMAILS;
    if (currentList.map(e => e.toLowerCase()).includes(emailToAdd)) {
      alert('This email is already in the allowed admin list.');
      return;
    }
    setSiteConfig({
      ...siteConfig,
      adminEmails: [...currentList, emailToAdd],
    });
    setNewAdminEmailInput('');
  };

  const handleRemoveAdminEmail = (emailToRemove: string) => {
    const currentList = siteConfig.adminEmails && siteConfig.adminEmails.length > 0 ? siteConfig.adminEmails : DEFAULT_ADMIN_EMAILS;
    if (currentList.length <= 1) {
      alert('At least one admin email must remain in the allowed list.');
      return;
    }
    setSiteConfig({
      ...siteConfig,
      adminEmails: currentList.filter(e => e.toLowerCase() !== emailToRemove.toLowerCase()),
    });
  };

  // Filtered Products List
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      const matchCat = productCategoryFilter === 'all' || prod.category === productCategoryFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q || 
        (prod.titleEn || '').toLowerCase().includes(q) || 
        (prod.titleDe || '').toLowerCase().includes(q) || 
        (prod.category || '').toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [products, productCategoryFilter, searchQuery]);

  const pendingInquiriesCount = inquiries.filter(i => i.status !== 'completed').length;

  // Render Login Lock Screen if unauthenticated
  if (!isAuthenticated) {
    return (
      <AdminLoginLock
        isLoggingIn={isLoggingIn}
        loginError={loginError}
        onGoogleLogin={handleGoogleLogin}
        onReturnToSite={onReturnToSite}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col lg:flex-row font-['Plus_Jakarta_Sans',sans-serif] relative">

      {/* Shown whenever the sign-in gate is off, so an open instance is obvious. */}
      {(ADMIN_DEV_BYPASS || PUBLIC_ADMIN) && (
        <div className="fixed top-0 inset-x-0 z-[60] bg-red-600 text-white text-[11px] font-black text-center py-1 tracking-wide">
          {PUBLIC_ADMIN
            ? 'OPEN TEST INSTANCE — no sign-in required · changes affect live data'
            : `DEV AUTH BYPASS ACTIVE — not signed in${USE_FIREBASE_EMULATOR ? ' · using local emulators' : ' · LIVE Firestore'}`}
        </div>
      )}

      {/* GLOBAL IN-PANEL CONFIRMATION DIALOG MODAL */}
      <ConfirmModal dialog={confirmDialog} onClose={() => setConfirmDialog(null)} />

      {/* GLOBAL LOADING MODAL OVERLAY */}
      {isSaving && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E7EB] shadow-2xl max-w-sm w-full text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#002B66]/10 text-[#002B66] flex items-center justify-center mx-auto">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-black text-[#1A1A1A]">Processing Action...</h3>
              <p className="text-xs text-slate-600 font-medium">{savingMessage}</p>
            </div>
            <div className="pt-2">
              <span className="text-[10px] uppercase font-mono bg-[#FDB813]/20 text-[#002B66] px-3 py-1 rounded-full font-bold">
                Cloud Firestore Sync
              </span>
            </div>
          </div>
        </div>
      )}

      {/* NAVIGATION: mobile top bar + desktop left sidebar */}
      <AdminSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        products={products}
        categories={categories}
        inquiries={inquiries}
        pendingInquiriesCount={pendingInquiriesCount}
        currentUser={currentUser}
        isSaving={isSaving}
        onLogout={handleLogout}
        onReturnToSite={onReturnToSite}
      />

      {/* MAIN ADMIN WORKSPACE */}
      <main className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          activeSection={activeSection}
          products={products}
          categories={categories}
          inquiries={inquiries}
          loading={loading}
          isSaving={isSaving}
          saveStatus={saveStatus}
          setSaveStatus={setSaveStatus}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onRefresh={loadAllData}
        />

        {/* Main Section Workspace */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">

          {activeSection === 'overview' && (
            <AdminOverviewSection
              analyticsStats={analyticsStats}
              products={products}
              categories={categories}
              inquiries={inquiries}
              pendingInquiriesCount={pendingInquiriesCount}
              isSaving={isSaving}
              setActiveSection={setActiveSection}
              onEditProduct={handleOpenEditProduct}
            />
          )}

          {activeSection === 'site' && (
            <AdminCompanySection
              siteConfig={siteConfig}
              setSiteConfig={setSiteConfig}
              isSaving={isSaving}
              formLang={formLang}
              setFormLang={setFormLang}
              newAdminEmailInput={newAdminEmailInput}
              setNewAdminEmailInput={setNewAdminEmailInput}
              onSave={handleSaveSiteConfig}
              onAddAdminEmail={handleAddAdminEmail}
              onRemoveAdminEmail={handleRemoveAdminEmail}
            />
          )}

          {activeSection === 'heroAbout' && (
            <AdminHeroAboutSection
              siteConfig={siteConfig}
              setSiteConfig={setSiteConfig}
              isSaving={isSaving}
              formLang={formLang}
              setFormLang={setFormLang}
              onSave={handleSaveSiteConfig}
            />
          )}

          {activeSection === 'products' && (
            <AdminProductsSection
              products={products}
              filteredProducts={filteredProducts}
              categories={categories}
              isSaving={isSaving}
              productCategoryFilter={productCategoryFilter}
              setProductCategoryFilter={setProductCategoryFilter}
              onEditProduct={handleOpenEditProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          )}

          {activeSection === 'categories' && (
            <AdminCategoriesSection
              categories={categories}
              isSaving={isSaving}
              setEditingCategory={setEditingCategory}
              setIsCategoryModalOpen={setIsCategoryModalOpen}
              onDeleteCategory={handleDeleteCategory}
            />
          )}

          {activeSection === 'inquiries' && (
            <AdminInquiriesSection
              inquiries={inquiries}
              pendingInquiriesCount={pendingInquiriesCount}
              isSaving={isSaving}
              onToggleStatus={handleToggleInquiryStatus}
              onDelete={handleDeleteInquiry}
            />
          )}

        </div>
      </main>

      {/* PRODUCT CREATE / EDIT MULTILINGUAL MODAL (+ stock image picker) */}
      <ProductEditModal
        isOpen={isProductModalOpen}
        editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}
        categories={categories}
        isSaving={isSaving}
        formLang={formLang}
        setFormLang={setFormLang}
        productFeaturesRaw={productFeaturesRaw}
        setProductFeaturesRaw={setProductFeaturesRaw}
        showPresetPicker={showPresetPicker}
        setShowPresetPicker={setShowPresetPicker}
        onImageFileUpload={handleImageFileUpload}
        onSave={handleSaveProduct}
        onClose={() => setIsProductModalOpen(false)}
      />

      {/* CATEGORY CREATE / EDIT MULTILINGUAL MODAL */}
      <CategoryEditModal
        isOpen={isCategoryModalOpen}
        editingCategory={editingCategory}
        setEditingCategory={setEditingCategory}
        isSaving={isSaving}
        onSave={handleSaveCategory}
        onClose={() => setIsCategoryModalOpen(false)}
      />

    </div>
  );
};
