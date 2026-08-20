import React from 'react';
import { Home, Grid, Zap, Flame, Star, Search } from 'lucide-react';
import { CategoryId } from '../types';

interface Props {
  selectedCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  showFavoritesOnly: boolean;
  onToggleFavoritesOnly: () => void;
  onOpenSearch: () => void;
  onScrollToSection: (sectionId: string) => void;
  favoritesCount: number;
}

export default function MobileBottomNav({
  selectedCategory,
  onSelectCategory,
  showFavoritesOnly,
  onToggleFavoritesOnly,
  onOpenSearch,
  onScrollToSection,
  favoritesCount,
}: Props) {
  return (
    <div
      id="mobile-bottom-nav"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-lg border-t border-zinc-800/80 px-2 py-1.5 pb-safe"
    >
      <div className="flex items-center justify-around">
        {/* Home */}
        <button
          type="button"
          onClick={() => {
            onSelectCategory('all');
            if (showFavoritesOnly) onToggleFavoritesOnly();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 p-2 rounded-xl text-[10px] font-medium transition ${
            selectedCategory === 'all' && !showFavoritesOnly
              ? 'text-indigo-400 font-bold'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>

        {/* Categories */}
        <button
          type="button"
          onClick={() => onScrollToSection('categories-section')}
          className="flex flex-col items-center gap-0.5 p-2 rounded-xl text-[10px] font-medium text-zinc-400 hover:text-zinc-200 transition"
        >
          <Grid className="w-4 h-4" />
          <span>Categories</span>
        </button>

        {/* Quick Search */}
        <button
          type="button"
          onClick={onOpenSearch}
          className="flex flex-col items-center gap-0.5 p-2 rounded-xl text-[10px] font-medium text-zinc-400 hover:text-zinc-200 transition"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white -mt-3 shadow-lg shadow-indigo-600/30">
            <Search className="w-3.5 h-3.5" />
          </div>
          <span className="text-zinc-300 font-semibold">Search</span>
        </button>

        {/* Popular */}
        <button
          type="button"
          onClick={() => {
            onSelectCategory('all');
            onScrollToSection('popular-tools-section');
          }}
          className="flex flex-col items-center gap-0.5 p-2 rounded-xl text-[10px] font-medium text-zinc-400 hover:text-zinc-200 transition"
        >
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Popular</span>
        </button>

        {/* Saved */}
        <button
          type="button"
          onClick={onToggleFavoritesOnly}
          className={`flex flex-col items-center gap-0.5 p-2 rounded-xl text-[10px] font-medium relative transition ${
            showFavoritesOnly ? 'text-amber-400 font-bold' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Star className={`w-4 h-4 ${showFavoritesOnly ? 'fill-amber-400' : ''}`} />
          <span>Saved</span>
          {favoritesCount > 0 && (
            <span className="absolute top-1 right-2 w-3.5 h-3.5 rounded-full bg-amber-500 text-zinc-950 font-bold text-[8px] flex items-center justify-center">
              {favoritesCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
