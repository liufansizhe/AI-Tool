'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { categories } from '@/data/categories';
import { useLanguage } from '@/i18n/LanguageProvider';
import {
  MessageSquare,
  Palette,
  PenTool,
  Video,
  Music,
  Code,
  Zap,
  Layout,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageSquare,
  Palette,
  PenTool,
  Video,
  Music,
  Code,
  Zap,
  Layout,
};

// Category ID to translation key mapping
const categoryKeyMap: Record<string, string> = {
  chat: 'chat',
  image: 'image',
  writing: 'writing',
  video: 'video',
  audio: 'audio',
  code: 'code',
  productivity: 'productivity',
  design: 'design',
};

interface CategoryFilterProps {
  currentCategory?: string;
}

export default function CategoryFilter({ currentCategory }: CategoryFilterProps) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const { t } = useLanguage();

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
          <Link
            href="/"
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              isHome && !currentCategory
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span className="font-medium">{t('categories.all')}</span>
          </Link>
          {categories.map((category) => {
            const Icon = iconMap[category.icon];
            const isActive = currentCategory === category.id;
            const key = categoryKeyMap[category.id] || category.id;

            return (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span className="font-medium">{t(`categories.${key}`)}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
