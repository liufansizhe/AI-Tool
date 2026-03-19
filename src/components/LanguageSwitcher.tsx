'use client';

import { useState } from 'react';
import { locales, localeLabels, localeFlags, type Locale } from '@/i18n/config';
import { Globe, ChevronDown } from 'lucide-react';

interface LanguageSwitcherProps {
  currentLocale: Locale;
  onChange: (locale: Locale) => void;
}

export default function LanguageSwitcher({ currentLocale, onChange }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span>{localeFlags[currentLocale]}</span>
        <span className="hidden sm:inline">{localeLabels[currentLocale]}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50">
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => {
                  onChange(locale);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors ${
                  locale === currentLocale ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                }`}
              >
                <span>{localeFlags[locale]}</span>
                <span>{localeLabels[locale]}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
