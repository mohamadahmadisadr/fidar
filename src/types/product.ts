export interface ServiceProductItem {
  id: string;
  titleDe: string;
  titleEn: string;
  category: string;
  descDe: string;
  descEn: string;
  featuresDe: string[];
  featuresEn: string[];
  icon: string;
  imageUrl?: string;
  rawData?: Record<string, any>;

  /**
   * Where this item actually lives in Firestore. Most products are stored as
   * entries inside a parent document's `items` array rather than as their own
   * document, so saving has to write back to that array element in place.
   * Absent means the item is (or will become) a standalone `products/` doc.
   */
  sourceCollection?: string;
  sourceDocId?: string;
  sourceItemIndex?: number;
}
