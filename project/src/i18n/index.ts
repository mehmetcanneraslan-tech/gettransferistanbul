import tr from './tr';
import en from './en';
import de from './de';
import fr from './fr';
import it from './it';

export type Language = 'tr' | 'en' | 'de' | 'fr' | 'it';

export const languages: Record<Language, { name: string; flag: string }> = {
  tr: { name: 'Türkçe', flag: '🇹🇷' },
  en: { name: 'English', flag: '🇬🇧' },
  de: { name: 'Deutsch', flag: '🇩🇪' },
  fr: { name: 'Français', flag: '🇫🇷' },
  it: { name: 'Italiano', flag: '🇮🇹' }
};

export const translations = {
  tr,
  en,
  de,
  fr,
  it
};

export type TranslationKeys = typeof tr;
