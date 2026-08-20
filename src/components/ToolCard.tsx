import React from 'react';
import { Star, ArrowRight, Sparkles, Zap, Flame } from 'lucide-react';
import { ToolItem } from '../types';

interface Props {
  key?: React.Key;
  tool: ToolItem;
  onUseTool: (tool: ToolItem) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export default function ToolCard({ tool, onUseTool, isFavorite, onToggleFavorite }: Props) {
  const getBadgeStyle = (tag: string) => {
    switch (tag) {
      case 'Popular':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Trending':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'AI Powered':
        return 'bg-violet-500/10 text-violet-400 border-violet-500/20';
      default:
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    }
  };

  return (
    <div
      id={`tool-card-${tool.id}`}
      onClick={() => onUseTool(tool)}
      className="group relative rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900 p-5 flex flex-col justify-between gap-4 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-xl hover:shadow-indigo-950/20"
    >
      {/* Top Details & Favorite Star */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl p-2 rounded-xl bg-zinc-950/80 border border-zinc-800/80 shadow-inner">
              {tool.emoji}
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getBadgeStyle(tool.tag)}`}>
              {tool.tag}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(tool.id);
            }}
            className={`p-2 rounded-xl transition cursor-pointer ${
              isFavorite
                ? 'bg-amber-500/20 text-amber-400'
                : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/80'
            }`}
            title={isFavorite ? 'Remove from Saved' : 'Save Tool'}
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
          </button>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-base font-bold text-zinc-100 group-hover:text-white transition tracking-tight">
            {tool.title}
          </h3>
          <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed line-clamp-2">
            {tool.description}
          </p>
        </div>
      </div>

      {/* Card Footer with Use Tool Button */}
      <div className="flex items-center justify-between pt-3 border-t border-zinc-800/60 mt-auto">
        <span className="text-[11px] font-medium text-zinc-500">{tool.views || 'Free Online'}</span>

        <button
          id={`btn-use-tool-${tool.id}`}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onUseTool(tool);
          }}
          className="py-2 px-3.5 rounded-xl bg-zinc-800 group-hover:bg-indigo-600 text-xs font-semibold text-zinc-200 group-hover:text-white transition-all duration-200 flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <span>Use Tool</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
