export interface FirestoreCategory {
  id: string;
  nameEn: string;
  nameDe: string;
  icon?: string;
  rawData?: Record<string, any>;
  /** The collection containing the category document. */
  sourceCollection?: string;
}
