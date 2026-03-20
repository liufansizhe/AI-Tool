import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import CategoryFilter from '@/components/CategoryFilter';
import ToolList from '@/components/ToolList';
import Footer from '@/components/Footer';
import { getCategoryById, getAllCategories } from '@/data/categories';
import { getToolsByCategory } from '@/data/tools';
import { useLanguage } from '@/i18n/LanguageProvider';
import CategoryPageClient from './CategoryPageClient';

interface CategoryPageProps {
  params: { id: string };
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const category = getCategoryById(params.id);

  if (!category) {
    return {
      title: 'AI Toolbox',
    };
  }

  // Fallback translations for static generation
  const translations: Record<string, { title: string; description: string }> = {
    chat: { title: 'AI Chat', description: 'ChatGPT-like chat tools including ChatGPT, Claude and other conversational models' },
    image: { title: 'AI Art', description: 'Text-to-image and image-to-image tools including Midjourney, Stable Diffusion and other art models' },
    writing: { title: 'AI Writing', description: 'Copywriting, article, and code generation tools to improve writing efficiency' },
    video: { title: 'AI Video', description: 'Video generation and editing tools for creating and editing video content' },
    audio: { title: 'AI Audio', description: 'Voice synthesis and music generation tools for creating audio and music content' },
    code: { title: 'Coding', description: 'Code completion and AI programming assistants to improve development efficiency' },
    productivity: { title: 'Productivity', description: 'PPT, meeting, note-taking and other productivity tools' },
    design: { title: 'Design', description: 'Image editing and design assistance tools' },
  };

  const translation = translations[category.id] || { title: category.id, description: '' };

  return {
    title: `${translation.title} - AI Toolbox`,
    description: translation.description,
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

  return <CategoryPageClient category={category} tools={tools} params={params} />;
}
