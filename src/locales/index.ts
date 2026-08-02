import { Language, TranslationStructure } from '../types/translation';
import { de } from './de';
import { en } from './en';

export const translations: Record<Language, TranslationStructure> = { de, en };

export { de, en };
export type { Language, TranslationStructure };
