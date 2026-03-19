export const locales = ['zh', 'en', 'hi', 'ko', 'ja'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'zh';

export const localeLabels: Record<Locale, string> = {
  zh: '中文',
  en: 'English',
  hi: 'हिन्दी',
  ko: '한국어',
  ja: '日本語',
};

export const localeFlags: Record<Locale, string> = {
  zh: '🇨🇳',
  en: '🇬🇧',
  hi: '🇮🇳',
  ko: '🇰🇷',
  ja: '🇯🇵',
};
