'use client';

import { useState, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@/public/locales/en/common.json';
import ru from '@/public/locales/ru/common.json';

export default function I18nProvider({
                                       children,
                                     }: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!i18n.isInitialized) {
      i18n
        .use(initReactI18next)
        .init({
          resources: { en: { translation: en }, ru: { translation: ru } },
          lng: 'ru',
          fallbackLng: 'ru',
          interpolation: { escapeValue: false },
        })
        .then(() => setReady(true));
    } else {
      setReady(true);
    }
  }, []);

  if (!ready) return null;
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
