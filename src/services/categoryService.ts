import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebaseApp';
import { FirestoreCategory } from '../types/category';

export function getIconForCategory(catName: string): string {
  const lower = catName.toLowerCase();
  if (lower.includes('alloy') || lower.includes('metal')) return 'Cpu';
  if (lower.includes('ceramic')) return 'Layers';
  if (lower.includes('electric') || lower.includes('electron')) return 'Cpu';
  if (lower.includes('machine') || lower.includes('equipment')) return 'Truck';
  if (lower.includes('magnet')) return 'Cpu';
  if (lower.includes('heating')) return 'Wrench';
  return 'Globe';
}

export function normalizeCategoryDoc(docId: string, data: Record<string, any>, sourceCollection = 'categories'): FirestoreCategory {
  const getStr = (val: any): string => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    if (typeof val === 'object') {
      return val.en || val.de || val.german || val.english || val.title || val.name || '';
    }
    return String(val);
  };

  const nameEn = getStr(data.en || data.nameEn || data.name_en || data.titleEn || data.title_en || (data.name && typeof data.name === 'object' ? data.name.en : '') || data.name || data.title || data.label || docId);
  const nameDe = getStr(data.de || data.nameDe || data.name_de || data.titleDe || data.title_de || (data.name && typeof data.name === 'object' ? data.name.de : '') || (data.name && typeof data.name === 'string' ? data.name : '') || nameEn);
  const icon = typeof data.icon === 'string' ? data.icon : getIconForCategory(nameEn || nameDe);

  return {
    id: docId,
    nameEn,
    nameDe,
    icon,
    rawData: data,
    sourceCollection,
  };
}

export async function fetchCategoriesFromFirestore(): Promise<FirestoreCategory[]> {
  const collectionsToTry = ['categories', 'products'];
  const categoriesMap = new Map<string, FirestoreCategory>();

  for (const colName of collectionsToTry) {
    try {
      const colRef = collection(db, colName);
      const snapshot = await getDocs(colRef);
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        // A standalone product also has `titleEn`/`nameEn`, so only legacy
        // category containers from the products collection are eligible there.
        // Otherwise every product becomes a fake category that cannot be
        // deleted from the categories collection.
        const isCategoryDocument = colName === 'categories'
          ? Boolean(
              data.en || data.de || data.nameEn || data.nameDe
              || data.titleEn || data.titleDe || data.name || data.label
              || Array.isArray(data.items),
            )
          : Array.isArray(data.items);

        if (isCategoryDocument) {
          const cat = normalizeCategoryDoc(docSnap.id, data, colName);
          if (cat.nameEn && !categoriesMap.has(cat.nameEn)) {
            categoriesMap.set(cat.nameEn, cat);
          }
        }
      });
    } catch (err) {
      console.error(`Error fetching categories from collection ${colName}:`, err);
    }
  }

  return Array.from(categoriesMap.values());
}

export async function saveCategoryToFirestore(category: Partial<FirestoreCategory>): Promise<void> {
  const catId = category.id || `cat_${Date.now()}`;
  const docRef = doc(db, 'categories', catId);
  await setDoc(docRef, {
    en: category.nameEn || '',
    de: category.nameDe || category.nameEn || '',
    icon: category.icon || 'Globe',
  });
}

export async function deleteCategoryFromFirestore(
  category: Pick<FirestoreCategory, 'id' | 'sourceCollection'> | string,
): Promise<void> {
  const categoryId = typeof category === 'string' ? category : category.id;
  const sourceCollection = typeof category === 'string'
    ? 'categories'
    : category.sourceCollection || 'categories';
  const docRef = doc(db, sourceCollection, categoryId);
  await deleteDoc(docRef);
}
