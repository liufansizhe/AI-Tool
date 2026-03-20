'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Header from '@/components/Header';
import CategoryFilter from '@/components/CategoryFilter';
import ToolList from '@/components/ToolList';
import Footer from '@/components/Footer';
import { searchTools } from '@/data/tools';
import { Search } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const results = query ? searchTools(query) : [];
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Search Header */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('search.title')}
              </h1>
              {query && (
                <p className="text-lg text-gray-600">
                  &quot;<span className="font-semibold text-blue-600">{query}</span>&quot; {t('search.resultFor')}
                </p>
              )}
            </div>
          </div>
        </section>

        <CategoryFilter />

        <ToolList
          tools={results}
          title={query
            ? t('search.foundCount', { count: String(results.length) })
            : t('search.placeholder')}
          showCount={false}
          emptyMessage={query ? t('search.noResult') : t('search.startSearch')}
        />
      </main>
      <Footer />
    </>
  );
}

function SearchFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchContent />
    </Suspense>
  );
}
