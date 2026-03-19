import { Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'chat',
    name: 'AI对话',
    icon: 'MessageSquare',
    description: 'ChatGPT类对话工具',
    order: 1,
  },
  {
    id: 'image',
    name: 'AI绘画',
    icon: 'Palette',
    description: '文生图、图生图工具',
    order: 2,
  },
  {
    id: 'writing',
    name: 'AI写作',
    icon: 'PenTool',
    description: '文案、文章、代码生成',
    order: 3,
  },
  {
    id: 'video',
    name: 'AI视频',
    icon: 'Video',
    description: '视频生成、剪辑工具',
    order: 4,
  },
  {
    id: 'audio',
    name: 'AI音频',
    icon: 'Music',
    description: '语音合成、音乐生成',
    order: 5,
  },
  {
    id: 'code',
    name: '编程助手',
    icon: 'Code',
    description: '代码补全、AI编程',
    order: 6,
  },
  {
    id: 'productivity',
    name: '效率工具',
    icon: 'Zap',
    description: 'PPT、会议、笔记工具',
    order: 7,
  },
  {
    id: 'design',
    name: '设计工具',
    icon: 'Layout',
    description: '图片编辑、设计辅助',
    order: 8,
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getAllCategories(): Category[] {
  return categories.sort((a, b) => a.order - b.order);
}
