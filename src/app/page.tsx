import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CategoryFilter from '@/components/CategoryFilter';
import ToolList from '@/components/ToolList';
import Footer from '@/components/Footer';
import { getAllTools, getFeaturedTools } from '@/data/tools';

export default function Home() {
  const allTools = getAllTools();
  const featuredTools = getFeaturedTools();

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <CategoryFilter />

        {/* Featured Tools Section */}
        {featuredTools.length > 0 && (
          <section className="py-12 bg-gradient-to-b from-white to-gray-50">
            <ToolList
              tools={featuredTools}
              titleKey="toolList.featured"
              showCount={false}
            />
          </section>
        )}

        {/* All Tools Section */}
        <section className="py-12">
          <ToolList
            tools={allTools}
            titleKey="toolList.all"
            showCount={true}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
