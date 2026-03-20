'use client';

import { Search, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageProvider';

// Hot tags for search - mapped from translation keys
const hotTagsMap: Record<string, string[]> = {
  zh: ['ChatGPT', 'ai绘画', '写作助手', '视频生成', '编程助手'],
  en: ['ChatGPT', 'AI Art', 'Writing Assistant', 'Video Generation', 'Coding Assistant'],
  hi: ['ChatGPT', 'AI कला', 'लेखन सहायक', 'वीडियो जनरेशन', 'कोडिंग सहायक'],
  ko: ['ChatGPT', 'AI 아트', '글쓰기 도우미', '비디오 생성', '코딩 도우미'],
  ja: ['ChatGPT', 'AIアート', 'ライティングアシスタント', 'ビデオ生成', 'コーディングアシスタント'],
};

export default function Hero() {
  const { t, locale } = useLanguage();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleTagClick = (tag: string) => {
    router.push(`/search?q=${encodeURIComponent(tag)}`);
  };

  const hotTags = hotTagsMap[locale] || hotTagsMap['zh'];

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          <span>{t('hero.badge')}</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          {t('hero.title')}
          <span className="text-blue-600"> {t('hero.titleHighlight')}</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          {t('hero.subtitle')}
        </p>

        {/* Search Box */}
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder={t('hero.searchPlaceholder') as string}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-14 pr-32 text-gray-900 bg-white border border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              {t('nav.search')}
            </button>
          </div>
        </form>

        {/* Hot Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-gray-500 text-sm">{t('hero.popularSearches')}：</span>
          {hotTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
