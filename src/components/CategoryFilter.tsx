import React from 'react';
import { Sparkles, Image, Calculator, Share2, Type, Grid } from 'lucide-react';
import { CategoryId } from '../types';
import { CATEGORIES } from '../data/toolsData';

interface Props {
  selectedCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  toolsCountByCategory: Record<string, number>;
}

export default function CategoryFilter({
  selectedCategory,
  onSelectCategory,
  toolsCountByCategory,
}: Props) {
  const allCategories = [
    {
      id: 'all' as CategoryId,
      name: 'All Tools',
      emoji: '⚡',
      icon: 'Grid',
      description: 'Explore all available tools in one place',
      gradient: 'from-zinc-800 to-zinc-900',
    },
    ...CATEGORIES,
  ];

  return (
    <section id="categories-section" className="px-4 sm:px-6 max-w-7xl mx-auto w-full py-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <span>Explore by Category</span>
          </h2>
          <p className="text-xs text-zinc-400">Select a category to filter the toolset</p>
        </div>
      </div>

      {/* Horizontal Scrollable Category Pills (Optimized for Android Touch & Desktop) */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none snap-x">
        {allCategories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = toolsCountByCategory[cat.id] || 0;

          return (
            <button
              key={cat.id}
              id={`cat-pill-${cat.id}`}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`snap-start shrink-0 px-3.5 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-zinc-800 text-white border-indigo-500/80 shadow-lg shadow-indigo-950/40 ring-1 ring-indigo-500/50'
                  : 'bg-zinc-900/70 text-zinc-300 border-zinc-800/80 hover:bg-zinc-800 hover:text-white hover:border-zinc-700'
              }`}
            >
              <span className="text-base">{cat.emoji}</span>
              <span className="whitespace-nowrap">{cat.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                  isSelected ? 'bg-indigo-500 text-white' : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
