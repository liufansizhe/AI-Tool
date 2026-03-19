import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import CategoryFilter from '@/components/CategoryFilter';
import ToolList from '@/components/ToolList';
import Footer from '@/components/Footer';
import { getCategoryById, getAllCategories } from '@/data/categories';
import { getToolsByCategory } from '@/data/tools';

interface CategoryPageProps {
  params: { id: string };
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const category = getCategoryById(params.id);

  if (!category) {
    return {
      title: '分类未找到 - AI工具箱',
    };
  }

  return {
    title: `${category.name} - AI工具箱`,
    description: `发现最好的${category.name}，${category.description}`,
  };
}

export function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    id: category.id,
  }));
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryById(params.id);

  if (!category) {
    notFound();
  }

  const tools = getToolsByCategory(params.id);

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Category Header */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {category.name}
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {category.description}
              </p>
            </div>
          </div>
        </section>

        <CategoryFilter currentCategory={params.id} />

        <ToolList
          tools={tools}
          title={`${category.name}工具`}
          showCount={true}
          emptyMessage="该分类下暂无工具，敬请期待"
        />
      </main>
      <Footer />
    </>
  );
}
