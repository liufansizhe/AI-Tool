import { Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'chat',
    icon: 'MessageSquare',
    order: 1,
  },
  {
    id: 'image',
    icon: 'Palette',
    order: 2,
  },
  {
    id: 'writing',
    icon: 'PenTool',
    order: 3,
  },
  {
    id: 'video',
    icon: 'Video',
    order: 4,
  },
  {
    id: 'audio',
    icon: 'Music',
    order: 5,
  },
  {
    id: 'code',
    icon: 'Code',
    order: 6,
  },
  {
    id: 'productivity',
    icon: 'Zap',
    order: 7,
  },
  {
    id: 'design',
    icon: 'Layout',
    order: 8,
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getAllCategories(): Category[] {
  return categories.sort((a, b) => a.order - b.order);
}

// Get translated category name
export function getCategoryName(id: string, t: (key: string) => string): string {
  return t(`categories.${id}`);
}

// Get translated category description
export function getCategoryDescription(id: string, t: (key: string) => string): string {
  return t(`categories.${id}Desc`);
}
