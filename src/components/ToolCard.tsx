'use client';

import Link from 'next/link';
import { Tool } from '@/types';
import { Star, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { getPriceClass } from '@/lib/utils';

interface ToolCardProps {
  tool: Tool;
}

// Tool translations type
type ToolTranslation = {
  description: string;
  fullDescription: string;
  tags: string[];
};

export default function ToolCard({ tool }: ToolCardProps) {
  const { t, messages } = useLanguage();

  // Get tool translation
  const toolTranslations = (messages as Record<string, unknown>).toolsData as
    Record<string, ToolTranslation> | undefined;
  const translation = toolTranslations?.[tool.id];

  const getPriceKey = (isFree: boolean, hasPaidPlan: boolean): string => {
    if (isFree && !hasPaidPlan) return 'tools.price.free';
    if (isFree && hasPaidPlan) return 'tools.price.freemium';
    return 'tools.price.paid';
  };

  const priceLabel = t(getPriceKey(tool.isFree, tool.hasPaidPlan));
  const priceClass = getPriceClass(tool.isFree, tool.hasPaidPlan);

  // Use translated or original description/tags
  const description = translation?.description || tool.description;
  const tags = translation?.tags || tool.tags;

  // Generate icon from tool name
  const initial = tool.name.charAt(0).toUpperCase();

  // Generate stable color based on tool name
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
    <div className="group relative bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-blue-300 transition-all duration-200">
      {/* Featured Badge */}
      {tool.featured && (
        <div className="absolute -top-2 -right-2 flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium shadow-sm">
          <Star className="w-3 h-3 fill-current" />
          <span>{t('tools.featured')}</span>
        </div>
      )}

      {/* New Badge */}
      {tool.isNew && !tool.featured && (
        <div className="absolute -top-2 -right-2 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium shadow-sm">
          {t('tools.new')}
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        {/* Icon */}
        <div
          className={`w-12 h-12 ${iconBgColor} rounded-xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0`}
        >
          {initial}
        </div>

        {/* Title & Price */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 truncate">{tool.name}</h3>
          </div>
          <span
            className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${priceClass}`}
          >
            {priceLabel}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Link
          href={`/tool/${tool.id}`}
          className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors text-center"
        >
          {t('tools.viewDetails')}
        </Link>
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          title={t('tools.visit') as string}
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Price Info */}
      {(messages as any).priceInfo?.[tool.id] && (
        <p className="mt-3 text-xs text-gray-500 text-center">
          {(messages as any).priceInfo[tool.id]}
        </p>
      )}
    </div>
  );
}
