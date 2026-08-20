import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Menu,
  X,
  Star,
  Zap,
  Info,
  Mail,
  Shield,
  FileText,
  AlertTriangle,
  Grid,
  TrendingUp,
  Bookmark,
} from 'lucide-react';
import { CategoryId } from '../types';
import { CATEGORIES } from '../data/toolsData';

interface Props {
  onOpenSearch: () => void;
  onSelectCategory: (cat: CategoryId) => void;
  selectedCategory: CategoryId;
  favoritesCount: number;
  onToggleFavoritesOnly: () => void;
  showFavoritesOnly: boolean;
  onOpenPage: (pageId: string) => void;
  onScrollToSection: (sectionId: string) => void;
  onGoHome?: () => void;
}

export default function Header({
  onOpenSearch,
  onSelectCategory,
  selectedCategory,
  favoritesCount,
  onToggleFavoritesOnly,
  showFavoritesOnly,
  onOpenPage,
  onScrollToSection,
  onGoHome,
}: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileNavClick = (callback: () => void) => {
    callback();
    setMobileMenuOpen(false);
  };

  const handleHomeNavigation = () => {
    if (onGoHome) onGoHome();
    onSelectCategory('all');
    if (showFavoritesOnly) onToggleFavoritesOnly();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        id="toolmitra-header"
        className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div
            id="brand-logo"
            onClick={handleHomeNavigation}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[1.5px] shadow-md shadow-indigo-500/20 group-hover:scale-105 transition">
              <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-indigo-400 group-hover:text-white transition" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-black tracking-tight bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                  ToolMitra
                </span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  AI
                </span>
              </div>
              <span className="text-[10px] text-zinc-400 -mt-0.5 hidden xs:inline">
                Smart Online Tools
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              id="nav-link-all"
              type="button"
              onClick={() => {
                if (onGoHome) onGoHome();
                onSelectCategory('all');
                if (showFavoritesOnly) onToggleFavoritesOnly();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedCategory === 'all' && !showFavoritesOnly
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              All Tools
            </button>
            <button
              id="nav-link-popular"
              type="button"
              onClick={() => {
                if (onGoHome) onGoHome();
                onSelectCategory('all');
                setTimeout(() => onScrollToSection('popular-tools-section'), 50);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition"
            >
              Popular
            </button>
            <button
              id="nav-link-trending"
              type="button"
              onClick={() => {
                if (onGoHome) onGoHome();
                onSelectCategory('all');
                setTimeout(() => onScrollToSection('trending-tools-section'), 50);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition"
            >
              Trending
            </button>
            <button
              id="nav-link-categories"
              type="button"
              onClick={() => {
                if (onGoHome) onGoHome();
                setTimeout(() => onScrollToSection('categories-section'), 50);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition"
            >
              Categories
            </button>
            <button
              id="nav-link-about"
              type="button"
              onClick={() => onOpenPage('about')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition"
            >
              About
            </button>
            <button
              id="nav-link-contact"
              type="button"
              onClick={() => onOpenPage('contact')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/30 transition"
            >
              Contact
            </button>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-2">
            {/* Search Trigger Button */}
            <button
              id="header-search-btn"
              type="button"
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs transition cursor-pointer"
              title="Search tools"
            >
              <Search className="w-4 h-4 text-zinc-400" />
              <span className="hidden sm:inline">Search a tool...</span>
              <kbd className="hidden lg:inline text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400 font-mono">
                /
              </kbd>
            </button>

            {/* Saved / Favorites Toggle */}
            <button
              id="header-favorites-btn"
              type="button"
              onClick={onToggleFavoritesOnly}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                showFavoritesOnly
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border-zinc-800'
              }`}
              title="View Saved Tools"
            >
              <Star className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span className="hidden sm:inline">Saved</span>
              {favoritesCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 text-[10px] flex items-center justify-center font-bold">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              id="header-menu-btn"
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Slide-over */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer-backdrop"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            id="mobile-drawer-content"
            className="w-4/5 max-w-xs h-full bg-zinc-950 border-l border-zinc-800 p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                  <span className="font-bold text-sm text-white">ToolMitra AI</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Categories Navigation */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 px-2">
                  Explore Categories
                </span>
                <button
                  type="button"
                  onClick={() =>
                    handleMobileNavClick(() => {
                      onSelectCategory('all');
                      if (showFavoritesOnly) onToggleFavoritesOnly();
                    })
                  }
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition ${
                    selectedCategory === 'all' && !showFavoritesOnly
                      ? 'bg-zinc-800 text-white font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                  All Tools
                </button>

                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() =>
                      handleMobileNavClick(() => {
                        onSelectCategory(cat.id);
                        if (showFavoritesOnly) onToggleFavoritesOnly();
                      })
                    }
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition ${
                      selectedCategory === cat.id && !showFavoritesOnly
                        ? 'bg-zinc-800 text-white font-semibold'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                    }`}
                  >
                    <span>{cat.emoji}</span>
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Quick Sections */}
              <div className="space-y-1 pt-3 border-t border-zinc-800/80">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 px-2">
                  Quick Navigation
                </span>
                <button
                  type="button"
                  onClick={() =>
                    handleMobileNavClick(() => {
                      onScrollToSection('popular-tools-section');
                    })
                  }
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-zinc-900 transition"
                >
                  <Zap className="w-4 h-4 text-amber-400" />
                  Popular Tools
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleMobileNavClick(() => {
                      onScrollToSection('trending-tools-section');
                    })
                  }
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-zinc-900 transition"
                >
                  <TrendingUp className="w-4 h-4 text-red-400" />
                  Trending Tools
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleMobileNavClick(() => {
                      if (!showFavoritesOnly) onToggleFavoritesOnly();
                    })
                  }
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-zinc-900 transition"
                >
                  <div className="flex items-center gap-2.5">
                    <Star className="w-4 h-4 text-amber-400" />
                    Saved Tools
                  </div>
                  {favoritesCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold">
                      {favoritesCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Info & Legal Pages */}
              <div className="space-y-1 pt-3 border-t border-zinc-800/80">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 px-2">
                  Company & Legal
                </span>
                <button
                  type="button"
                  onClick={() => handleMobileNavClick(() => onOpenPage('about'))}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-zinc-900 transition"
                >
                  <Info className="w-3.5 h-3.5 text-indigo-400" />
                  About ToolMitra
                </button>
                <button
                  type="button"
                  onClick={() => handleMobileNavClick(() => onOpenPage('contact'))}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-zinc-900 transition"
                >
                  <Mail className="w-3.5 h-3.5 text-violet-400" />
                  Contact & Support
                </button>
                <button
                  type="button"
                  onClick={() => handleMobileNavClick(() => onOpenPage('privacy'))}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-zinc-900 transition"
                >
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  Privacy Policy
                </button>
                <button
                  type="button"
                  onClick={() => handleMobileNavClick(() => onOpenPage('terms'))}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-zinc-900 transition"
                >
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  Terms & Conditions
                </button>
                <button
                  type="button"
                  onClick={() => handleMobileNavClick(() => onOpenPage('disclaimer'))}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-zinc-900 transition"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  Disclaimer
                </button>
              </div>
            </div>

            {/* Drawer Bottom */}
            <div className="pt-4 border-t border-zinc-800 text-[11px] text-zinc-500 text-center">
              ToolMitra AI &bull; 100% Free Tools
            </div>
          </div>
        </div>
      )}
    </>
  );
}
