'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Header from '@/components/Header';
import CategoryFilter from '@/components/CategoryFilter';
import ToolList from '@/components/ToolList';
import Footer from '@/components/Footer';
import { searchTools } from '@/data/tools';
import { Search } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const results = query ? searchTools(query) : [];

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
                搜索结果
              </h1>
              {query && (
                <p className="text-lg text-gray-600">
                  &quot;<span className="font-semibold text-blue-600">{query}</span>&quot; 的搜索结果
                </p>
              )}
            </div>
          </div>
        </section>

        <CategoryFilter />

        <ToolList
          tools={results}
          title={query ? `找到 ${results.length} 个相关工具` : '请输入搜索关键词'}
          showCount={false}
          emptyMessage={query ? '没有找到相关工具，试试其他关键词吧' : '请输入搜索关键词开始搜索'}
        />
      </main>
      <Footer />
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">加载中...</div>}>
      <SearchContent />
    </Suspense>
  );
}
