'use client';

import { useTranslation } from 'react-i18next';

export default function LanguageToggle() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'ru' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-semibold text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
    >
      {i18n.language.toUpperCase()}
    </button>
  );
}
