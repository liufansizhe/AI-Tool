import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getToolById, getAllTools } from '@/data/tools';
import { getCategoryById } from '@/data/categories';
import { ExternalLink, ArrowLeft, Star, Check, X } from 'lucide-react';
import { getPriceLabel, getPriceClass } from '@/lib/utils';

interface ToolPageProps {
  params: { id: string };
}

export function generateMetadata({ params }: ToolPageProps): Metadata {
  const tool = getToolById(params.id);

  if (!tool) {
    return {
      title: '工具未找到 - AI工具箱',
    };
  }

  return {
    title: `${tool.name} - ${tool.description}`,
    description: tool.fullDescription || tool.description,
  };
}

export function generateStaticParams() {
  const tools = getAllTools();
  return tools.map((tool) => ({
    id: tool.id,
  }));
}

export default function ToolPage({ params }: ToolPageProps) {
  const tool = getToolById(params.id);

  if (!tool) {
    notFound();
  }

  const category = getCategoryById(tool.category);
  const priceLabel = getPriceLabel(tool.isFree, tool.hasPaidPlan);
  const priceClass = getPriceClass(tool.isFree, tool.hasPaidPlan);

  // 获取工具名称的首字母作为图标
  const initial = tool.name.charAt(0).toUpperCase();

  // 生成一个基于工具名称的稳定颜色
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-orange-500',
    'bg-red-500',
  ];
  const colorIndex = tool.name.charCodeAt(0) % colors.length;
  const iconBgColor = colors[colorIndex];

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              href="/"
              className="inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              返回首页
            </Link>
          </div>
        </div>

        {/* Tool Info */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
              {/* Icon */}
              <div
                className={`w-20 h-20 ${iconBgColor} rounded-2xl flex items-center justify-center text-white text-3xl font-bold flex-shrink-0`}
              >
                {initial}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {tool.name}
                  </h1>
                  {tool.featured && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                      <Star className="w-3 h-3 fill-current" />
                      精选
                    </span>
                  )}
                  {tool.isNew && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      新上线
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${priceClass}`}>
                    {priceLabel}
                  </span>
                  {category && (
                    <Link
                      href={`/category/${category.id}`}
                      className="text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      {category.name}
                    </Link>
                  )}
                </div>

                {tool.priceInfo && (
                  <p className="text-gray-600">{tool.priceInfo}</p>
                )}
              </div>

              {/* CTA Button */}
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
              >
                <ExternalLink className="w-5 h-5" />
                访问官网
              </a>
            </div>

            {/* Description */}
            <div className="border-t border-gray-100 pt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">工具简介</h2>
              <p className="text-gray-600 leading-relaxed">
                {tool.fullDescription || tool.description}
              </p>
            </div>

            {/* Tags */}
            <div className="border-t border-gray-100 pt-8 mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">功能标签</h2>
              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Price Details */}
            <div className="border-t border-gray-100 pt-8 mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">价格信息</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tool.isFree ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-400'}`}>
                    {tool.isFree ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {tool.isFree ? '提供免费版' : '不提供免费版'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tool.hasPaidPlan ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-400'}`}>
                    {tool.hasPaidPlan ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {tool.hasPaidPlan ? '提供付费版' : '完全免费'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
