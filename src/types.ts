export type CategoryId = 'all' | 'ai' | 'photo' | 'calc' | 'social' | 'lang';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  emoji: string;
  icon: string;
  description: string;
  count?: number;
  gradient: string;
}

export interface ToolItem {
  id: string;
  title: string;
  category: CategoryId;
  emoji: string;
  description: string;
  tag: 'Popular' | 'Trending' | 'AI Powered' | 'Free Utility' | 'Essential';
  isPopular?: boolean;
  isTrending?: boolean;
  views?: string;
  iconColor?: string;
  bgGradient?: string;
  actionText?: string;
}

export type InfoModalType = 'about' | 'contact' | 'privacy' | 'terms' | 'disclaimer' | null;

export interface FilterState {
  category: CategoryId;
  searchQuery: string;
  onlyFavorites: boolean;
}
