import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@/public/locales/en/common.json';
import ru from '@/public/locales/ru/common.json';

export function initI18n() {
  if (typeof window !== 'undefined' && !i18n.isInitialized) {
    i18n.use(initReactI18next).init({
      resources: { en: { translation: en }, ru: { translation: ru } },
      lng: 'en',
      fallbackLng: 'en',
      interpolation: { escapeValue: false },
    });
  }
  return i18n;
}
