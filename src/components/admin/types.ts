export type AdminSection = 'overview' | 'site' | 'heroAbout' | 'products' | 'categories' | 'inquiries';

export type FormLang = 'en' | 'de';

export interface ConfirmDialogState {
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
}

export interface ProductFeaturesRaw {
  en: string;
  de: string;
}

export const INDUSTRIAL_PRESET_IMAGES = [
  { label: 'Ferrous Alloys & Billets', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80' },
  { label: 'Stainless Steel Coil', url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80' },
  { label: 'Precision Engineering & Gears', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80' },
  { label: 'Electric & Circuit Boards', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80' },
  { label: 'Heating Elements & Wires', url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80' },
  { label: 'Industrial Valves & Pumps', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80' },
  { label: 'Heavy Metallurgy Plant', url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80' },
  { label: 'Raw Materials & Chemical Drums', url: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80' },
];
