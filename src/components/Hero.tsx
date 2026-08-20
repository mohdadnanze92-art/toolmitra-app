import React from 'react';
import { Search, Sparkles, Zap, Shield, Flame, CheckCircle, ArrowRight } from 'lucide-react';
import { CategoryId } from '../types';
import { CATEGORIES } from '../data/toolsData';

interface Props {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  totalToolsCount: number;
}

export default function Hero({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  totalToolsCount,
}: Props) {
  return (
    <section
      id="hero-section"
      className="relative pt-6 sm:pt-12 pb-8 sm:pb-12 px-4 sm:px-6 overflow-hidden flex flex-col items-center text-center"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[600px] h-64 sm:h-80 bg-indigo-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-pink-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Trust Badges */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300 shadow-sm mb-4">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="font-semibold text-white">Free AI & Online Tools</span>
        <span className="text-zinc-600">•</span>
        <span className="text-zinc-400">No Login Required</span>
      </div>

      {/* Main Title & Hinglish / Hindi Tagline */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl leading-[1.15]">
        Har Kaam Ka <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Smart Online Tool</span>
      </h1>

      {/* Subtitle */}
      <p className="mt-3.5 sm:mt-4 text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
        Everything you need in one place. Generate viral AI prompts, compress photos, calculate loan EMIs, compute GST, and level up your social media — 100% free forever.
      </p>

      {/* Live Search Bar */}
      <div className="w-full max-w-2xl mt-6 sm:mt-8 relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-focus-within:opacity-75 transition duration-300"></div>
        <div className="relative flex items-center bg-zinc-900 rounded-2xl border border-zinc-700/80 shadow-2xl p-1.5 focus-within:border-indigo-500 transition">
          <div className="pl-3.5 pr-2 text-zinc-400">
            <Search className="w-5 h-5 group-focus-within:text-indigo-400 transition" />
          </div>
          <input
            id="hero-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search for a tool (e.g. EMI Calculator, Image Compressor, AI Prompt...)"
            className="w-full bg-transparent text-sm sm:text-base text-zinc-100 placeholder-zinc-500 focus:outline-none py-2 px-1"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="px-2.5 py-1 text-xs text-zinc-400 hover:text-white bg-zinc-800 rounded-lg mr-1 transition"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Quick Search Suggestions / Popular Queries */}
      <div className="mt-3 flex items-center gap-1.5 flex-wrap justify-center text-xs text-zinc-500">
        <span className="font-medium text-zinc-400">Popular:</span>
        {['AI Prompt', 'Image Compressor', 'EMI Calculator', 'Age Calculator', 'YouTube Title', 'GST'].map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => onSearchChange(tag)}
            className="px-2 py-0.5 rounded-md bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800/80 transition"
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Key Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl w-full mt-8 pt-6 border-t border-zinc-800/60">
        <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/60 text-center">
          <span className="text-base sm:text-lg font-black text-white font-mono">15+</span>
          <p className="text-[11px] text-zinc-400">Smart Tools</p>
        </div>
        <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/60 text-center">
          <span className="text-base sm:text-lg font-black text-emerald-400 font-mono">100%</span>
          <p className="text-[11px] text-zinc-400">Free Forever</p>
        </div>
        <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/60 text-center">
          <span className="text-base sm:text-lg font-black text-indigo-400 font-mono">0</span>
          <p className="text-[11px] text-zinc-400">Login Required</p>
        </div>
        <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/60 text-center">
          <span className="text-base sm:text-lg font-black text-pink-400 font-mono">Instant</span>
          <p className="text-[11px] text-zinc-400">Browser Results</p>
        </div>
      </div>
    </section>
  );
}
