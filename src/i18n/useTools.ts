import { useLanguage } from './LanguageProvider';
import { tools as allTools } from '@/data/tools';
import { Tool } from '@/types';

// Tool translations type
type ToolTranslation = {
  description: string;
  fullDescription: string;
  tags: string[];
};

// Helper to get translated tool data
export function useTools() {
  const { t, locale, messages } = useLanguage();

  const getToolTranslation = (toolId: string): Partial<ToolTranslation> | null => {
    // Check if we have tool translations in messages
    const toolTranslations = (messages as Record<string, unknown>).toolsData as
      Record<string, ToolTranslation> | undefined;

    if (toolTranslations?.[toolId]) {
      return toolTranslations[toolId];
    }
    return null;
  };

  const getLocalizedTool = (tool: Tool): Tool => {
    const translation = getToolTranslation(tool.id);

    if (translation) {
      return {
        ...tool,
        description: translation.description || tool.description,
        fullDescription: translation.fullDescription || tool.fullDescription,
        tags: translation.tags || tool.tags,
      };
    }

    // If no translation found, return original
    return tool;
  };

  const getLocalizedTools = (): Tool[] => {
    return allTools.map(getLocalizedTool);
  };

  return {
    tools: getLocalizedTools(),
    getToolById: (id: string) => {
      const tool = allTools.find(t => t.id === id);
      return tool ? getLocalizedTool(tool) : undefined;
    },
    getToolsByCategory: (categoryId: string) => {
      return allTools
        .filter(t => t.category === categoryId)
        .map(getLocalizedTool);
    },
  };
}
