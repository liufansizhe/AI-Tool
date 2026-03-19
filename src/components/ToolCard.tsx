import Link from 'next/link';
import { Tool } from '@/types';
import { Star, ExternalLink } from 'lucide-react';
import { getPriceLabel, getPriceClass } from '@/lib/utils';

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
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
    <div className="group relative bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-blue-300 transition-all duration-200">
      {/* Featured Badge */}
      {tool.featured && (
        <div className="absolute -top-2 -right-2 flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium shadow-sm">
          <Star className="w-3 h-3 fill-current" />
          <span>精选</span>
        </div>
      )}

      {/* New Badge */}
      {tool.isNew && !tool.featured && (
        <div className="absolute -top-2 -right-2 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium shadow-sm">
          新上线
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
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tool.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {tool.tags.slice(0, 3).map((tag) => (
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
          查看详情
        </Link>
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          title="访问官网"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Price Info */}
      {tool.priceInfo && (
        <p className="mt-3 text-xs text-gray-500 text-center">
          {tool.priceInfo}
        </p>
      )}
    </div>
  );
}
