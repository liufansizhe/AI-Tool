'use client';

import LanguageProvider from '@/i18n/LanguageProvider';
import { Analytics } from '@vercel/analytics/next';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <Analytics />
      {children}
    </LanguageProvider>
  );
}
