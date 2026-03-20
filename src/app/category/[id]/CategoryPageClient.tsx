'use client';

import Header from '@/components/Header';
import CategoryFilter from '@/components/CategoryFilter';
import ToolList from '@/components/ToolList';
import Footer from '@/components/Footer';
import { useLanguage } from '@/i18n/LanguageProvider';
import { useState, useEffect } from 'react';
import { Category } from '@/types';
import { Tool } from '@/types';

interface CategoryPageClientProps {
  category: Category;
  tools: Tool[];
  params: { id: string };
}

export default function CategoryPageClient({ category, tools, params }: CategoryPageClientProps) {
  const { t } = useLanguage();

  // Get translated category name and description (client-side only)
  const [categoryName, setCategoryName] = useState('');
  const [categoryDesc, setCategoryDesc] = useState('');

  useEffect(() => {
    setCategoryName(t(`categories.${category.id}`));
    setCategoryDesc(t(`categories.${category.id}Desc`));
  }, [category.id, t]);

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Category Header */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {categoryName}
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {categoryDesc}
              </p>
            </div>
          </div>
        </section>

        <CategoryFilter currentCategory={params.id} />

        <ToolList
          tools={tools}
          titleKey="toolList.categoryTools"
          titleParams={{ name: categoryName }}
          showCount={true}
          emptyKey="toolList.categoryEmpty"
        />
      </main>
      <Footer />
    </>
  );
}