import { useState, useEffect, useCallback, useMemo } from 'react';
import { ServiceProductItem, FirestoreCategory, Language } from '../types';
import { fetchServicesFromFirestore, fetchCategoriesFromFirestore } from '../services';

export const UNCATEGORIZED_ID = '__uncategorized';

const UNCATEGORIZED_LABELS: Record<Language, string> = {
  en: 'Other Products',
  de: 'Weitere Produkte',
};

export interface CategoryOption {
  id: string;
  label: string;
  icon?: string;
  count: number;
}

/** True when a product belongs to the given category id. */
function matchesCategory(item: ServiceProductItem, categoryId: string): boolean {
  const itemCat = (item.category || '').trim();
  if (categoryId === UNCATEGORIZED_ID) return itemCat === '';
  if (!itemCat) return false;
  return itemCat.toLowerCase() === categoryId.toLowerCase().trim() || itemCat === categoryId;
}

/**
 * Loads products and categories from Firestore and derives the merged,
 * localized category list plus the active-category filtering.
 *
 * `activeCategory` starts as `null`: the public page shows the category
 * picker first and only lists products once a category is chosen.
 */
export function useProducts(lang: Language = 'en') {
  const [products, setProducts] = useState<ServiceProductItem[]>([]);
  const [categories, setCategories] = useState<FirestoreCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const [cats, prods] = await Promise.all([
        fetchCategoriesFromFirestore(),
        fetchServicesFromFirestore(),
      ]);
      setCategories(cats);
      setProducts(prods);
    } catch (err) {
      console.error('Error loading Firestore product data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  // Merge the Firestore `categories` collection with categories referenced by
  // products, skipping numeric-only labels which come from malformed docs.
  const categoryList = useMemo<CategoryOption[]>(() => {
    const list: CategoryOption[] = [];
    const addedIds = new Set<string>();

    categories.forEach((cat) => {
      const label = lang === 'de' ? (cat.nameDe || cat.nameEn) : cat.nameEn;
      const catKey = cat.nameEn || cat.id;
      if (label && !/^\d+$/.test(label) && !addedIds.has(catKey)) {
        addedIds.add(catKey);
        list.push({ id: catKey, label, icon: cat.icon, count: 0 });
      }
    });

    products.forEach((p) => {
      if (p.category && !/^\d+$/.test(p.category) && !addedIds.has(p.category)) {
        addedIds.add(p.category);
        list.push({ id: p.category, label: p.category, count: 0 });
      }
    });

    const withCounts = list.map((cat) => ({
      ...cat,
      count: products.filter((p) => matchesCategory(p, cat.id)).length,
    }));

    // Keep products that carry no category reachable instead of hiding them.
    const uncategorized = products.filter((p) => matchesCategory(p, UNCATEGORIZED_ID)).length;
    if (uncategorized > 0) {
      withCounts.push({
        id: UNCATEGORIZED_ID,
        label: UNCATEGORIZED_LABELS[lang],
        icon: 'Package',
        count: uncategorized,
      });
    }

    return withCounts;
  }, [categories, products, lang]);

  const filteredProducts = useMemo(() => {
    if (!activeCategory) return [];
    return products.filter((item) => matchesCategory(item, activeCategory));
  }, [products, activeCategory]);

  const activeCategoryOption = useMemo(
    () => categoryList.find((c) => c.id === activeCategory) ?? null,
    [categoryList, activeCategory],
  );

  return {
    products,
    setProducts,
    categories,
    setCategories,
    loading,
    reload,
    activeCategory,
    setActiveCategory,
    activeCategoryOption,
    categoryList,
    filteredProducts,
  };
}
