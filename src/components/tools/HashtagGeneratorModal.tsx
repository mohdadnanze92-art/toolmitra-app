import React, { useState } from 'react';
import { Hash, Copy, Check, RefreshCw, Flame, Sparkles } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function HashtagGeneratorModal({ onClose }: Props) {
  const [keyword, setKeyword] = useState('travel vlogger in himalayas');
  const [platform, setPlatform] = useState('Instagram Reels');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!keyword.trim()) return;
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolType: 'hashtag-generator',
          prompt: keyword,
          options: { platform },
        }),
      });

      const data = await res.json();
      if (data.success && data.text) {
        const matches = data.text.match(/#[a-zA-Z0-9_]+/g);
        if (matches && matches.length >= 5) {
          setHashtags(Array.from(new Set(matches)));
        } else {
          fallbackHashtags();
        }
      } else {
        fallbackHashtags();
      }
    } catch {
      fallbackHashtags();
    } finally {
      setIsLoading(false);
    }
  };

  const fallbackHashtags = () => {
    const clean = keyword.toLowerCase().replace(/[^a-z0-9]/g, '');
    const genericTags = [
      `#${clean || 'trending'}`,
      `#${clean || 'viral'}reels`,
      `#${clean || 'explore'}page`,
      '#viralreels',
      '#trendingnow',
      '#explore',
      '#instadaily',
      '#contentcreator',
      '#foryou',
      '#fyp',
      '#instagood',
      '#reelitfeelit',
      '#viralvideo',
      '#creatorlife',
      '#growthhacks',
      '#algorithmboost',
    ];
    setHashtags(genericTags);
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(hashtags.join(' '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
            Topic, Niche or Keyword
          </label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g. fitness workout, street food, crypto trading..."
            className="w-full rounded-xl bg-zinc-900 border border-zinc-700/80 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-pink-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Target Platform</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full rounded-xl bg-zinc-900 border border-zinc-700/80 px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-pink-500"
          >
            <option>Instagram Reels & Posts</option>
            <option>TikTok & Shorts</option>
            <option>YouTube & Community</option>
            <option>LinkedIn Professional</option>
            <option>X / Twitter Trending</option>
          </select>
        </div>

        <button
          type="button"
          onClick={handleGenerate}
          disabled={isLoading || !keyword.trim()}
          className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-900/20 transition cursor-pointer disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Scraping Trending Hashtags...
            </>
          ) : (
            <>
              <Flame className="w-4 h-4" />
              Generate Viral Hashtags
            </>
          )}
        </button>
      </div>

      {/* Results */}
      {hashtags.length > 0 && (
        <div className="space-y-3 pt-2 border-t border-zinc-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
              <Hash className="w-4 h-4 text-pink-400" />
              Generated Hashtags ({hashtags.length})
            </span>
            <button
              type="button"
              onClick={handleCopyAll}
              className="py-1.5 px-3 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-xs font-semibold flex items-center gap-1.5 transition"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Copied All
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy All
                </>
              )}
            </button>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 flex flex-wrap gap-1.5 max-h-48 overflow-y-auto">
            {hashtags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs px-2.5 py-1 rounded-full bg-zinc-800 text-pink-300 border border-pink-500/20 hover:bg-pink-500/10 cursor-pointer transition"
                onClick={() => {
                  navigator.clipboard.writeText(tag);
                }}
                title="Click to copy single tag"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
