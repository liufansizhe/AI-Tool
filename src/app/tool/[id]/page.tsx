import { Metadata } from 'next';
import { getToolById, getAllTools } from '@/data/tools';
import ToolDetailClient from './ToolDetailClient';

interface ToolPageProps {
  params: { id: string };
}

export function generateMetadata({ params }: ToolPageProps): Metadata {
  const tool = getToolById(params.id);

  if (!tool) {
    return {
      title: 'Tool Not Found - AI Toolbox',
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
  return <ToolDetailClient toolId={params.id} />;
}
