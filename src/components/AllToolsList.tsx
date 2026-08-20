import React from 'react';
import { Sparkles, Grid, Search, XCircle } from 'lucide-react';
import { ToolItem, CategoryId } from '../types';
import ToolCard from './ToolCard';

interface Props {
  tools: ToolItem[];
  selectedCategory: CategoryId;
  searchQuery: string;
  onClearSearch: () => void;
  onUseTool: (tool: ToolItem) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  showFavoritesOnly: boolean;
}

export default function AllToolsList({
  tools,
  selectedCategory,
  searchQuery,
  onClearSearch,
  onUseTool,
  favorites,
  onToggleFavorite,
  showFavoritesOnly,
}: Props) {
  return (
    <section id="all-tools-grid-section" className="px-4 sm:px-6 max-w-7xl mx-auto w-full py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            {showFavoritesOnly ? (
              '⭐ Your Saved Tools'
            ) : searchQuery ? (
              `Search Results for "${searchQuery}"`
            ) : selectedCategory === 'all' ? (
              'All Online Tools'
            ) : (
              'Filtered Tools'
            )}
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
              {tools.length}
            </span>
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            {showFavoritesOnly
              ? 'Easily access your bookmarked tools in one click'
              : 'Click any tool to open the interactive runner'}
          </p>
        </div>

        {searchQuery && (
          <button
            type="button"
            onClick={onClearSearch}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 transition"
          >
            <XCircle className="w-4 h-4" />
            Clear Search
          </button>
        )}
      </div>

      {/* Grid or Empty State */}
      {tools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              onUseTool={onUseTool}
              isFavorite={favorites.includes(tool.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 text-center flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-zinc-400">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">No tools found</h4>
            <p className="text-xs text-zinc-400 mt-1 max-w-sm">
              {showFavoritesOnly
                ? 'You haven’t saved any tools yet. Click the star icon on any tool card to add it to your favorites!'
                : `We couldn't find any tool matching "${searchQuery}". Try searching for "EMI", "AI", or "Image".`}
            </p>
          </div>
          {searchQuery && (
            <button
              type="button"
              onClick={onClearSearch}
              className="mt-2 py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
            >
              Reset Search Filter
            </button>
          )}
        </div>
      )}
    </section>
  );
}
