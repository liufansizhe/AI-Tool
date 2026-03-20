'use client';

import { Tool } from '@/types';
import ToolCard from './ToolCard';
import { useLanguage } from '@/i18n/LanguageProvider';

interface ToolListProps {
  tools: Tool[];
  /** Direct title text, takes priority over titleKey */
  title?: string;
  /** 翻译 key，用于从 messages 中获取标题 */
  titleKey?: string;
  /** 翻译 key 的插值参数 */
  titleParams?: Record<string, string>;
  showCount?: boolean;
  /** 直接显示的空状态文本，优先于 emptyKey */
  emptyMessage?: string;
  /** 翻译 key，用于空状态文本 */
  emptyKey?: string;
}

export default function ToolList({
  tools,
  title,
  titleKey,
  titleParams,
  showCount = true,
  emptyMessage,
  emptyKey,
}: ToolListProps) {
  const { t } = useLanguage();

  const resolvedTitle = title ?? (titleKey ? t(titleKey, titleParams) : undefined);
  const resolvedEmpty = emptyMessage ?? (emptyKey ? t(emptyKey) : t('toolList.empty'));

  if (tools.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="text-gray-500">{resolvedEmpty}</p>
      </div>
    );
  }

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {resolvedTitle && (
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{resolvedTitle}</h2>
            {showCount && (
              <span className="text-gray-500 text-sm">
                {t('toolList.count', { count: String(tools.length) })}
              </span>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
