import React from 'react';
import { Zap, Sparkles, ArrowRight } from 'lucide-react';
import { ToolItem } from '../types';
import ToolCard from './ToolCard';

interface Props {
  tools: ToolItem[];
  onUseTool: (tool: ToolItem) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export default function PopularTools({ tools, onUseTool, favorites, onToggleFavorite }: Props) {
  const popularTools = tools.filter((t) => t.isPopular);

  return (
    <section id="popular-tools-section" className="px-4 sm:px-6 max-w-7xl mx-auto w-full py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              Popular Tools
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Featured
              </span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Essential everyday online tools ready to use with instant results
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Popular Tools */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {popularTools.map((tool) => (
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
