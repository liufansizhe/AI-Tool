'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Locale, defaultLocale } from './config';

// 静态导入所有语言文件
import zhMessages from '../../messages/zh.json';
import enMessages from '../../messages/en.json';
import hiMessages from '../../messages/hi.json';
import koMessages from '../../messages/ko.json';
import jaMessages from '../../messages/ja.json';

const messagesMap: Record<Locale, typeof zhMessages> = {
  zh: zhMessages,
  en: enMessages,
  hi: hiMessages,
  ko: koMessages,
  ja: jaMessages,
};

type Messages = typeof zhMessages;

interface LanguageContextType {
  locale: Locale;
  messages: Messages;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

interface LanguageProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
}

export default function LanguageProvider({ children, initialLocale }: LanguageProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale || defaultLocale);
  const [messages, setMessages] = useState<Messages>(messagesMap[defaultLocale]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && messagesMap[savedLocale]) {
      setLocaleState(savedLocale);
      setMessages(messagesMap[savedLocale]);
    } else {
      setMessages(messagesMap[locale]);
    }
    setIsLoading(false);
  }, []);

  const setLocale = (newLocale: Locale) => {
    if (messagesMap[newLocale]) {
      setLocaleState(newLocale);
      setMessages(messagesMap[newLocale]);
      localStorage.setItem('locale', newLocale);
    }
  };

  const t = (key: string, params?: Record<string, string>): string => {
    const keys = key.split('.');
    let value: unknown = messages;

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }

    if (typeof value !== 'string') {
      return key;
    }

    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (_, paramKey) => params[paramKey] || `{{${paramKey}}}`);
    }

    return value;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <LanguageContext.Provider value={{ locale, messages, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
