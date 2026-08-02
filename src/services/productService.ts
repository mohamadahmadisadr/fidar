import { collection, getDocs, doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebaseApp';
import { ServiceProductItem } from '../types/product';
import { getIconForCategory } from './categoryService';

export function normalizeServiceDoc(docId: string, data: Record<string, any>): ServiceProductItem {
  const getStr = (val: any): string => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    if (typeof val === 'object') {
      return val.en || val.de || val.german || val.english || val.title || val.name || val.text || '';
    }
    return String(val);
  };

  const titleEn = getStr(data.en || data.titleEn || data.title_en || data.nameEn || data.name_en || (data.title && typeof data.title === 'object' ? data.title.en : '') || (data.name && typeof data.name === 'object' ? data.name.en : '') || data.title || data.name);
  const titleDe = getStr(data.de || data.titleDe || data.title_de || data.nameDe || data.name_de || (data.title && typeof data.title === 'object' ? data.title.de : '') || (data.name && typeof data.name === 'object' ? data.name.de : '') || titleEn);

  const rawCat = data.category || data.categoryName || data.category_name || data.categoryId || data.category_id || data.type || '';
  const category = getStr(rawCat);

  const descEn = getStr(data.descEn || data.desc_en || data.descriptionEn || data.description_en || (data.description && typeof data.description === 'object' ? data.description.en : '') || (data.desc && typeof data.desc === 'object' ? data.desc.en : '') || data.desc || data.description || data.details || data.text || '');
  const descDe = getStr(data.descDe || data.desc_de || data.descriptionDe || data.description_de || (data.description && typeof data.description === 'object' ? data.description.de : '') || (data.desc && typeof data.desc === 'object' ? data.desc.de : '') || data.desc || data.description || data.details || data.text || '') || descEn;

  const parseFeatures = (val: any): string[] => {
    if (!val) return [];
    if (Array.isArray(val)) {
      return val.map(v => getStr(v)).filter(Boolean);
    }
    if (typeof val === 'string' && val.trim().length > 0) return [val];
    if (typeof val === 'object') {
      const arr = val.en || val.de || Object.values(val);
      if (Array.isArray(arr)) return arr.map(v => getStr(v)).filter(Boolean);
    }
    return [];
  };

  const featuresEn = parseFeatures(data.featuresEn || data.features_en || data.features || data.specs || data.bullets);
  const featuresDe = parseFeatures(data.featuresDe || data.features_de);

  const icon = typeof data.icon === 'string' ? data.icon : getIconForCategory(category || titleEn);
  const imageUrl = getStr(data.image || data.imageUrl || data.image_url || data.img);

  return {
    id: docId,
    titleDe: titleDe || titleEn || docId,
    titleEn: titleEn || docId,
    category,
    descDe,
    descEn,
    featuresDe: featuresDe.length ? featuresDe : featuresEn,
    featuresEn,
    icon,
    imageUrl,
    rawData: data,
  };
}

export async function fetchServicesFromFirestore(): Promise<ServiceProductItem[]> {
  const items: ServiceProductItem[] = [];
  const collectionsToTry = ['categories', 'products', 'services'];

  for (const colName of collectionsToTry) {
    try {
      const colRef = collection(db, colName);
      const snapshot = await getDocs(colRef);

      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const categoryNameEn = data.en || data.nameEn || data.titleEn || data.category || 'Products';

        if (Array.isArray(data.items) && data.items.length > 0) {
          data.items.forEach((subItem: any, index: number) => {
            const subTitleEn = subItem.en || subItem.nameEn || subItem.titleEn || subItem.title || subItem.name || `Item ${index + 1}`;
            const subTitleDe = subItem.de || subItem.nameDe || subItem.titleDe || subTitleEn;

            const subImage = subItem.image || subItem.imageUrl || subItem.img || '';

            const descEn = subItem.descEn || subItem.descriptionEn || subItem.desc || subItem.description || subItem.details || '';
            const descDe = subItem.descDe || subItem.descriptionDe || subItem.desc || subItem.description || subItem.details || descEn;

            let featuresEn: string[] = [];
            if (Array.isArray(subItem.features) && subItem.features.length > 0) {
              featuresEn = subItem.features.map((f: any) => typeof f === 'string' ? f : (f.en || f.de || String(f)));
            }

            let featuresDe: string[] = [];
            if (Array.isArray(subItem.featuresDe) && subItem.featuresDe.length > 0) {
              featuresDe = subItem.featuresDe.map((f: any) => typeof f === 'string' ? f : (f.de || f.en || String(f)));
            } else {
              featuresDe = featuresEn;
            }


            items.push({
              id: `${docSnap.id}-${index}`,
              titleEn: subTitleEn,
              titleDe: subTitleDe,
              category: categoryNameEn,
              descEn,
              descDe,
              featuresEn,
              featuresDe,
              icon: getIconForCategory(categoryNameEn),
              imageUrl: subImage,
              rawData: subItem,
              sourceCollection: colName,
              sourceDocId: docSnap.id,
              sourceItemIndex: index,
            });
          });
        } else if (data.titleEn || data.titleDe || data.nameEn || data.name || data.title) {
          items.push({
            ...normalizeServiceDoc(docSnap.id, data),
            sourceCollection: colName,
            sourceDocId: docSnap.id,
          });
        }
      });
    } catch (err) {
      console.error(`Firestore fetch error on collection ${colName}:`, err);
    }
  }

  return items;
}

function toProductPayload(item: Partial<ServiceProductItem>) {
  return {
    titleEn: item.titleEn || '',
    titleDe: item.titleDe || item.titleEn || '',
    category: item.category || 'General',
    descEn: item.descEn || '',
    descDe: item.descDe || item.descEn || '',
    featuresEn: item.featuresEn || [],
    featuresDe: item.featuresDe || item.featuresEn || [],
    icon: item.icon || 'Globe',
    imageUrl: item.imageUrl || '',
  };
}

/**
 * Merge an edit into an existing `items[]` sub-item.
 *
 * Sub-items are legacy-shaped: the reader in `fetchServicesFromFirestore` picks
 * the first key that exists from an alias chain (title prefers `en`, features
 * prefer `features`, ...). Writing only the canonical key therefore leaves a
 * higher-priority stale alias in place and the edit appears to do nothing, so
 * every alias for a field is written with the new value.
 */
function toSubItemPayload(existing: Record<string, any>, payload: ReturnType<typeof toProductPayload>) {
  const merged: Record<string, any> = { ...existing };

  const setAll = (keys: string[], value: any) => {
    for (const key of keys) merged[key] = value;
  };

  // Title — reader precedence: en > nameEn > titleEn > title > name
  setAll(['en', 'nameEn', 'titleEn', 'title', 'name'], payload.titleEn);
  // German title — reader precedence: de > nameDe > titleDe
  setAll(['de', 'nameDe', 'titleDe'], payload.titleDe);

  // Descriptions — `desc`/`description`/`details` are shared legacy fallbacks,
  // so anchor them to the English copy and set the language-specific keys.
  setAll(['descEn', 'descriptionEn', 'desc', 'description', 'details'], payload.descEn);
  setAll(['descDe', 'descriptionDe'], payload.descDe);

  // Features — reader precedence: features (English), featuresDe
  setAll(['features', 'featuresEn'], payload.featuresEn);
  setAll(['featuresDe'], payload.featuresDe);

  // Image — reader precedence: image > imageUrl > img
  setAll(['image', 'imageUrl', 'img'], payload.imageUrl);

  merged.icon = payload.icon;

  return merged;
}

/** The category name a parent document represents, using the reader's precedence. */
function parentCategoryName(data: Record<string, any>): string {
  return data.en || data.nameEn || data.titleEn || data.category || '';
}

const sameCategory = (a: string, b: string) =>
  a.toLowerCase().trim() === b.toLowerCase().trim();

/** Find the `categories` document representing a category name, if one exists. */
async function findCategoryDocByName(name: string) {
  const snapshot = await getDocs(collection(db, 'categories'));
  for (const docSnap of snapshot.docs) {
    if (sameCategory(parentCategoryName(docSnap.data()), name)) return docSnap;
  }
  return null;
}

export async function saveProductToFirestore(item: Partial<ServiceProductItem>): Promise<void> {
  const payload = toProductPayload(item);

  // Item lives inside a parent document's `items` array: update that element in
  // place instead of creating a new top-level doc (which would duplicate it).
  if (item.sourceDocId && typeof item.sourceItemIndex === 'number') {
    const parentRef = doc(db, item.sourceCollection || 'categories', item.sourceDocId);
    const parentSnap = await getDoc(parentRef);

    if (parentSnap.exists()) {
      const parentData = parentSnap.data();
      const currentItems = Array.isArray(parentData.items) ? [...parentData.items] : [];

      if (item.sourceItemIndex < currentItems.length) {
        const existing = currentItems[item.sourceItemIndex];
        const updated = toSubItemPayload(existing, payload);

        // A sub-item's category is derived from its parent document, so a
        // category change means moving the item to a different parent.
        if (sameCategory(parentCategoryName(parentData), payload.category)) {
          currentItems[item.sourceItemIndex] = updated;
          await updateDoc(parentRef, { items: currentItems });
          return;
        }

        const targetDoc = await findCategoryDocByName(payload.category);

        // Detach from the old parent first so a failure can't duplicate it.
        currentItems.splice(item.sourceItemIndex, 1);
        await updateDoc(parentRef, { items: currentItems });

        if (targetDoc) {
          const targetData = targetDoc.data();
          const targetItems = Array.isArray(targetData.items) ? [...targetData.items] : [];
          targetItems.push(updated);
          await updateDoc(targetDoc.ref, { items: targetItems });
          return;
        }
        // No category document to move into: fall through to a standalone doc.
      }
    }
  }

  // Standalone product document. An item detached from an `items[]` array has a
  // synthetic composite id ("<docId>-<index>") that must not become a real doc
  // id, so it gets a fresh one. Otherwise write back to the doc it came from,
  // in its own collection, so it is updated rather than copied into `products`.
  const cameFromArray = typeof item.sourceItemIndex === 'number';
  const prodId = (!cameFromArray && item.id) || `prod_${Date.now()}`;
  const targetCollection = (!cameFromArray && item.sourceCollection) || 'products';
  await setDoc(doc(db, targetCollection, prodId), payload);
}

export async function deleteProductFromFirestore(item: ServiceProductItem | string): Promise<void> {
  const prodId = typeof item === 'string' ? item : item.id;
  const source = typeof item === 'string' ? null : item;

  // Item lives inside a parent document's `items` array: splice it out there.
  if (source?.sourceDocId && typeof source.sourceItemIndex === 'number') {
    const parentRef = doc(db, source.sourceCollection || 'categories', source.sourceDocId);
    const parentSnap = await getDoc(parentRef);

    if (parentSnap.exists()) {
      const parentData = parentSnap.data();
      const currentItems = Array.isArray(parentData.items) ? [...parentData.items] : [];

      if (source.sourceItemIndex < currentItems.length) {
        currentItems.splice(source.sourceItemIndex, 1);
        await updateDoc(parentRef, { items: currentItems });
        return;
      }
    }
  }

  try {
    await deleteDoc(doc(db, 'products', prodId));
  } catch (err) {
    console.error('Error deleting from products collection:', err);
  }
  try {
    await deleteDoc(doc(db, 'services', prodId));
  } catch (err) {
    // ignore
  }
}
