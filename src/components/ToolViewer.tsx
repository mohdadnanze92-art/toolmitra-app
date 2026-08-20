import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Star,
  Sparkles,
  ShieldCheck,
  Share2,
  Home,
  Check,
} from 'lucide-react';
import { ToolRegistryEntry, resolveTool, getToolItem } from '../registry/ToolRegistry';
import { CATEGORIES, TOOLS_DATABASE } from '../data/toolsData';

interface Props {
  toolEntry: ToolRegistryEntry;
  onBackToHome: () => void;
  onLoadTool: (toolId: string) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export default function ToolViewer({
  toolEntry,
  onBackToHome,
  onLoadTool,
  isFavorite,
  onToggleFavorite,
}: Props) {
  const [copiedLink, setCopiedLink] = useState(false);

  // Execute initialization logic for the active tool/page
  useEffect(() => {
    if (toolEntry.init) {
      toolEntry.init();
    }
  }, [toolEntry.id]);

  const category = CATEGORIES.find((c) => c.id === toolEntry.category);

  // Find related tools in same category (only for tools, not legal pages)
  const relatedTools = !toolEntry.isLegalPage
    ? TOOLS_DATABASE.filter(
        (t) => t.category === toolEntry.category && t.id !== toolEntry.id
      ).slice(0, 3)
    : [];

  const handleShareTool = () => {
    const pageUrl = window.location.href;
    navigator.clipboard.writeText(pageUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center">
      {/* Top Sticky Navigation Bar with Prominent Back to Home Button */}
      <div className="w-full bg-zinc-900/70 border-b border-zinc-800/80 sticky top-16 z-30 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          {/* Prominent Back to Home Button at the top */}
          <button
            id="btn-viewer-back-home-top"
            type="button"
            onClick={onBackToHome}
            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-xs sm:text-sm font-bold flex items-center gap-2 transition border border-zinc-700 shadow-sm cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-indigo-400 group-hover:-translate-x-1 transition-transform" />
            <span>&larr; Back to Home</span>
          </button>

          {/* Breadcrumb Path */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-400">
            <button
              onClick={onBackToHome}
              className="hover:text-zinc-200 flex items-center gap-1 transition"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <span>/</span>
            <span className="text-zinc-400">
              {toolEntry.isLegalPage ? 'Company & Legal' : category?.name || 'Tools'}
            </span>
            <span>/</span>
            <span className="text-white font-medium truncate max-w-[200px]">
              {toolEntry.title}
            </span>
          </div>

          {/* Actions: Share & Favorite */}
          <div className="flex items-center gap-2">
            <button
              id="btn-share-tool-view"
              type="button"
              onClick={handleShareTool}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium flex items-center gap-1.5 border border-zinc-700 transition cursor-pointer"
              title="Copy Direct Link"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="hidden sm:inline text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-zinc-400" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>

            {!toolEntry.isLegalPage && (
              <button
                id="btn-favorite-tool-view"
                type="button"
                onClick={() => onToggleFavorite(toolEntry.id)}
                className={`p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition border cursor-pointer ${
                  isFavorite
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
                }`}
                title={isFavorite ? 'Saved to Favorites' : 'Save Tool'}
              >
                <Star
                  className={`w-4 h-4 ${
                    isFavorite ? 'fill-amber-400 text-amber-400' : 'text-zinc-400'
                  }`}
                />
                <span className="hidden sm:inline">
                  {isFavorite ? 'Saved' : 'Save'}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Active Viewport Container */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex-1 flex flex-col">
        {/* Dynamic Header Card for Tools & Pages */}
        {!toolEntry.isLegalPage ? (
          <div className="mb-6 sm:mb-8 p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-3xl sm:text-4xl shadow-inner shrink-0">
                {toolEntry.emoji}
              </div>
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight">
                    {toolEntry.title}
                  </h1>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    100% Free
                  </span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {category?.name || 'Online Tool'}
                  </span>
                </div>
                <p className="text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
                  {toolEntry.description}
                </p>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end gap-1.5 text-xs text-zinc-400 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-zinc-800/80">
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                Private &amp; In-Browser
              </span>
              <span className="text-[11px] text-zinc-400">No account required</span>
            </div>
          </div>
        ) : null}

        {/* Dynamic Tool Content Body from ToolRegistry */}
        <div
          id={`active-tool-content-${toolEntry.id}`}
          className="p-5 sm:p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-2xl relative"
        >
          {toolEntry.render({ onClose: onBackToHome })}
        </div>

        {/* Bottom Prominent Back to Home Button & Related Tools */}
        <div className="mt-10 pt-8 border-t border-zinc-800/80 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              id="btn-viewer-back-home-bottom"
              type="button"
              onClick={onBackToHome}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm flex items-center justify-center gap-2.5 border border-zinc-700 transition shadow-lg cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 text-indigo-400 group-hover:-translate-x-1.5 transition-transform" />
              <span>&larr; Back to Home Dashboard</span>
            </button>

            <span className="text-xs text-zinc-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Explore 15+ other free online tools on ToolMitra
            </span>
          </div>

          {/* Related Tools Quick Switcher */}
          {relatedTools.length > 0 && (
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/60">
              <span className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
                More {category?.name || 'Related'} Tools:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedTools.map((rt) => (
                  <button
                    key={rt.id}
                    type="button"
                    onClick={() => onLoadTool(rt.id)}
                    className="p-3 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-left transition flex items-center gap-3 group cursor-pointer"
                  >
                    <span className="text-xl p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 group-hover:scale-110 transition-transform">
                      {rt.emoji}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-zinc-200 group-hover:text-white truncate">
                        {rt.title}
                      </h4>
                      <p className="text-[11px] text-zinc-400 truncate">
                        {rt.tag}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
