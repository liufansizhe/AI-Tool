export const locales = ['zh', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'zh';

import zh from './messages/zh.json';
import en from './messages/en.json';

export const messages: Record<Locale, typeof zh> = {
  zh,
  en,
};
