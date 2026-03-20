import { Locale } from '@/i18n/config';

// Import all language messages
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

export function getMetadata(locale: Locale) {
  const messages = messagesMap[locale];
  const metadata = messages.metadata;

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
}

export function getMetadataForRoute(params: { locale: string }) {
  const locale = params.locale as Locale;
  return getMetadata(locale || 'zh');
}