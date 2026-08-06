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
  aliases?: string[];
}

/**
 * Treat formatting differences as the same category. Firestore currently has
 * equivalent values such as "Ferrous & Non-ferrous alloys" and
 * "Ferrous and Non-ferrous alloys" in different documents.
 */
function normalizeCategoryKey(value: string): string {
  return value
    .toLocaleLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function getCategoryAliases(...values: Array<string | undefined>): string[] {
  return Array.from(new Set(
    values
      .flatMap((value) => value ? value.split(',') : [])
      .map(normalizeCategoryKey)
      .filter(Boolean),
  ));
}

/** True when a product belongs to the given category id. */
function matchesCategory(item: ServiceProductItem, categoryId: string, aliases: string[] = []): boolean {
  const itemCat = (item.category || '').trim();
  if (categoryId === UNCATEGORIZED_ID) return itemCat === '';
  if (!itemCat) return false;
  const itemKey = normalizeCategoryKey(itemCat);
  return [normalizeCategoryKey(categoryId), ...aliases].includes(itemKey);
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
  // Normalize the keys and support comma-separated taxonomy aliases so
  // formatting or legacy naming differences do not create duplicate public
  // categories. For example, the taxonomy stores
  // "Ferrous and Non-ferrous alloys, Pure Metals, Precious Alloys", while
  // older products use its first segment as their category.
  const categoryList = useMemo<CategoryOption[]>(() => {
    const list: CategoryOption[] = [];
    const categoryByAlias = new Map<string, CategoryOption>();

    const addCategory = (
      id: string,
      label: string,
      icon: string | undefined,
      aliases: string[],
    ) => {
      const normalizedAliases = getCategoryAliases(id, ...aliases);
      const existing = normalizedAliases
        .map((alias) => categoryByAlias.get(alias))
        .find(Boolean);

      if (existing) {
        existing.aliases = Array.from(new Set([...(existing.aliases || []), ...normalizedAliases]));
        normalizedAliases.forEach((alias) => categoryByAlias.set(alias, existing));
        return;
      }

      const option: CategoryOption = {
        id,
        label,
        icon,
        count: 0,
        aliases: normalizedAliases,
      };
      list.push(option);
      normalizedAliases.forEach((alias) => categoryByAlias.set(alias, option));
    };

    categories.forEach((cat) => {
      const label = lang === 'de' ? (cat.nameDe || cat.nameEn) : cat.nameEn;
      const catKey = cat.nameEn || cat.id;
      if (label && !/^\d+$/.test(label)) {
        addCategory(catKey, label, cat.icon, [cat.nameEn, cat.nameDe, cat.id]);
      }
    });

    products.forEach((p) => {
      if (p.category && !/^\d+$/.test(p.category)) {
        addCategory(p.category, p.category, undefined, [p.category]);
      }
    });

    const withCounts = list.map((cat) => ({
      ...cat,
      count: products.filter((p) => matchesCategory(p, cat.id, cat.aliases)).length,
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
    const activeOption = categoryList.find((category) => category.id === activeCategory);
    return products.filter((item) => matchesCategory(item, activeCategory, activeOption?.aliases));
  }, [products, activeCategory, categoryList]);

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
