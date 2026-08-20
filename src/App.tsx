import React, { useState, useEffect, useMemo } from 'react';
import { CategoryId, ToolItem } from './types';
import { CATEGORIES, TOOLS_DATABASE } from './data/toolsData';
import { ToolRegistry, resolveTool, ToolRegistryEntry } from './registry/ToolRegistry';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryFilter from './components/CategoryFilter';
import PopularTools from './components/PopularTools';
import TrendingTools from './components/TrendingTools';
import AllToolsList from './components/AllToolsList';
import ToolViewer from './components/ToolViewer';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';

declare global {
  interface Window {
    ToolRegistry: Record<string, ToolRegistryEntry>;
    loadTool: (toolId: string, pushHistory?: boolean) => void;
    showPage: (pageId: string) => void;
  }
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active Tool/Page ID state for SPA tool-viewer container: null = Home View
  const [activeToolId, setActiveToolId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '').trim();
      if (hash && hash !== 'home' && hash !== 'home-view') {
        const resolved = resolveTool(hash);
        return resolved ? resolved.id : null;
      }
    }
    return null;
  });

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('toolmitra_favorites');
      return saved ? JSON.parse(saved) : ['ai-prompt-generator', 'emi-calculator', 'image-compressor'];
    } catch {
      return ['ai-prompt-generator', 'emi-calculator', 'image-compressor'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('toolmitra_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites', e);
    }
  }, [favorites]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Removed from saved tools');
        return prev.filter((item) => item !== id);
      } else {
        showToast('⭐ Tool saved to favorites!');
        return [...prev, id];
      }
    });
  };

  /**
   * Global SPA Navigation Function: loadTool(toolId)
   * 1. Hides #home-view
   * 2. Injects / activates tool from ToolRegistry into #tool-viewer
   * 3. Executes required JS logic for that tool
   * 4. Updates browser history pushState
   */
  const loadTool = (toolId: string, pushHistory = true) => {
    const clean = toolId.replace(/^#/, '').trim();
    if (!clean || clean === 'home' || clean === 'home-view') {
      // Clear tool viewer and show home-view
      setActiveToolId(null);
      if (pushHistory && typeof window !== 'undefined') {
        const newUrl = `${window.location.pathname}${window.location.search}`;
        window.history.pushState({ toolId: null, pageId: 'home-view' }, '', newUrl);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const resolved = resolveTool(clean);
    if (resolved) {
      setActiveToolId(resolved.id);
      if (pushHistory && typeof window !== 'undefined') {
        const newUrl = `${window.location.pathname}${window.location.search}#${resolved.id}`;
        window.history.pushState({ toolId: resolved.id, pageId: `${resolved.id}-view` }, '', newUrl);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      console.warn(`[ToolRegistry] Tool not found: "${toolId}". Returning to home.`);
      setActiveToolId(null);
    }
  };

  // Expose loadTool and ToolRegistry to global window object
  useEffect(() => {
    window.ToolRegistry = ToolRegistry;
    window.loadTool = (toolId: string, pushHistory = true) => loadTool(toolId, pushHistory);
    window.showPage = (pageId: string) => loadTool(pageId, true);
  }, []);

  // Browser History popstate handler (back/forward navigation)
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.toolId !== undefined) {
        if (event.state.toolId) {
          loadTool(event.state.toolId, false);
        } else {
          setActiveToolId(null);
        }
      } else {
        const hash = window.location.hash.replace('#', '').trim();
        if (hash && hash !== 'home' && hash !== 'home-view') {
          loadTool(hash, false);
        } else {
          setActiveToolId(null);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Keyboard shortcut '/' for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        if (activeToolId !== null) {
          loadTool('home-view', true);
        }
        e.preventDefault();
        setTimeout(() => {
          const searchInput = document.getElementById('hero-search-input');
          if (searchInput) {
            searchInput.focus();
            window.scrollTo({ top: 120, behavior: 'smooth' });
          }
        }, 50);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeToolId]);

  // Filter tools for Homepage
  const filteredTools = useMemo(() => {
    return TOOLS_DATABASE.filter((tool) => {
      if (selectedCategory !== 'all' && tool.category !== selectedCategory) {
        return false;
      }
      if (showFavoritesOnly && !favorites.includes(tool.id)) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const titleMatch = tool.title.toLowerCase().includes(q);
        const descMatch = tool.description.toLowerCase().includes(q);
        const tagMatch = tool.tag.toLowerCase().includes(q);
        const catMatch = tool.category.toLowerCase().includes(q);
        return titleMatch || descMatch || tagMatch || catMatch;
      }
      return true;
    });
  }, [selectedCategory, searchQuery, showFavoritesOnly, favorites]);

  // Count tools by category
  const toolsCountByCategory = useMemo(() => {
    const counts: Record<string, number> = { all: TOOLS_DATABASE.length };
    CATEGORIES.forEach((c) => {
      counts[c.id] = TOOLS_DATABASE.filter((t) => t.category === c.id).length;
    });
    return counts;
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    if (activeToolId !== null) {
      loadTool('home-view', true);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenSearch = () => {
    if (activeToolId !== null) {
      loadTool('home-view', true);
    }
    setTimeout(() => {
      const searchInput = document.getElementById('hero-search-input');
      if (searchInput) {
        searchInput.focus();
        window.scrollTo({ top: 120, behavior: 'smooth' });
      }
    }, 100);
  };

  // 'Use Tool' handler mapping to loadTool
  const handleUseTool = (tool: ToolItem) => {
    loadTool(tool.id, true);
  };

  const isBrowsingAll = selectedCategory === 'all' && !searchQuery && !showFavoritesOnly;

  // Active tool/page entry from ToolRegistry
  const activeToolEntry = useMemo(() => {
    if (!activeToolId) return null;
    return resolveTool(activeToolId) || null;
  }, [activeToolId]);

  return (
    <div
      id="toolmitra-app-root"
      className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white"
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs font-semibold shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          {toastMessage}
        </div>
      )}

      {/* Persistent Site Header */}
      <Header
        onOpenSearch={handleOpenSearch}
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        favoritesCount={favorites.length}
        onToggleFavoritesOnly={() => setShowFavoritesOnly((prev) => !prev)}
        showFavoritesOnly={showFavoritesOnly}
        onOpenPage={(pageId) => loadTool(pageId, true)}
        onScrollToSection={handleScrollToSection}
        onGoHome={() => loadTool('home-view', true)}
      />

      {/* SPA Main Structure: Only Two Main Containers (<div id="home-view"> and <div id="tool-viewer">) */}
      <main className="flex-1 flex flex-col">
        {/* ========================================================================= */}
        {/* 1. HOME VIEW CONTAINER: <div id="home-view"> */}
        {/* ========================================================================= */}
        <div
          id="home-view"
          style={{ display: activeToolEntry ? 'none' : 'block' }}
          className="w-full flex-1"
        >
          {/* Hero Section */}
          <Hero
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            totalToolsCount={TOOLS_DATABASE.length}
          />

          {/* Category Pills Filter */}
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              if (showFavoritesOnly) setShowFavoritesOnly(false);
            }}
            toolsCountByCategory={toolsCountByCategory}
          />

          {/* If viewing All (default view), show structured Popular + Trending + All layout */}
          {isBrowsingAll ? (
            <>
              {/* Popular Tools Section */}
              <PopularTools
                tools={TOOLS_DATABASE}
                onUseTool={handleUseTool}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />

              {/* Trending Tools Section */}
              <TrendingTools
                tools={TOOLS_DATABASE}
                onUseTool={handleUseTool}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />

              {/* All / More Tools List */}
              <AllToolsList
                tools={filteredTools}
                selectedCategory={selectedCategory}
                searchQuery={searchQuery}
                onClearSearch={() => setSearchQuery('')}
                onUseTool={handleUseTool}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                showFavoritesOnly={showFavoritesOnly}
              />
            </>
          ) : (
            /* Filtered or Search View */
            <AllToolsList
              tools={filteredTools}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              onClearSearch={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setShowFavoritesOnly(false);
              }}
              onUseTool={handleUseTool}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              showFavoritesOnly={showFavoritesOnly}
            />
          )}
        </div>

        {/* ========================================================================= */}
        {/* 2. TOOL VIEWER CONTAINER: <div id="tool-viewer"> */}
        {/* ========================================================================= */}
        <div
          id="tool-viewer"
          style={{ display: activeToolEntry ? 'block' : 'none' }}
          className="w-full flex-1"
        >
          {activeToolEntry && (
            <ToolViewer
              toolEntry={activeToolEntry}
              onBackToHome={() => loadTool('home-view', true)}
              onLoadTool={(id) => loadTool(id, true)}
              isFavorite={favorites.includes(activeToolEntry.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
        </div>
      </main>

      {/* Footer with SPA loadPage navigation */}
      <Footer
        onLoadPage={(pageId) => loadTool(pageId, true)}
        onSelectCategory={(cat) => {
          if (activeToolId !== null) loadTool('home-view', true);
          setSelectedCategory(cat);
          if (showFavoritesOnly) setShowFavoritesOnly(false);
        }}
      />

      {/* Mobile-first bottom navigation bar */}
      <MobileBottomNav
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          if (activeToolId !== null) loadTool('home-view', true);
          setSelectedCategory(cat);
          if (showFavoritesOnly) setShowFavoritesOnly(false);
        }}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavoritesOnly={() => {
          if (activeToolId !== null) loadTool('home-view', true);
          setShowFavoritesOnly((prev) => !prev);
        }}
        onOpenSearch={handleOpenSearch}
        onScrollToSection={handleScrollToSection}
        favoritesCount={favorites.length}
      />
    </div>
  );
}
