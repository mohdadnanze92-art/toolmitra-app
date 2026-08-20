import React from 'react';
import { TrendingUp, Flame } from 'lucide-react';
import { ToolItem } from '../types';
import ToolCard from './ToolCard';

interface Props {
  tools: ToolItem[];
  onUseTool: (tool: ToolItem) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export default function TrendingTools({ tools, onUseTool, favorites, onToggleFavorite }: Props) {
  const trendingTools = tools.filter((t) => t.isTrending && !t.isPopular);

  return (
    <section id="trending-tools-section" className="px-4 sm:px-6 max-w-7xl mx-auto w-full py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              Trending Tools
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                Top Utilities
              </span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              High-utility calculators, QR codes, and text generators
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Trending Tools */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {trendingTools.map((tool) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            onUseTool={onUseTool}
            isFavorite={favorites.includes(tool.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </section>
  );
}
