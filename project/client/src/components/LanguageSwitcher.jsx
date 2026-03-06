import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-3 py-1.5 rounded-lg font-semibold text-sm transition-colors duration-150 ${
          i18n.language === 'en'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => handleLanguageChange('ur')}
        className={`px-3 py-1.5 rounded-lg font-semibold text-sm transition-colors duration-150 ${
          i18n.language === 'ur'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        اردو
      </button>
    </div>
  );
}
