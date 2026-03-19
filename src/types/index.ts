export interface Tool {
  id: string;
  name: string;
  description: string;
  fullDescription?: string;
  url: string;
  category: string;
  tags: string[];
  isFree: boolean;
  hasPaidPlan: boolean;
  priceInfo?: string;
  featured?: boolean;
  isNew?: boolean;
  order?: number;
  icon?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description?: string;
  order: number;
}
