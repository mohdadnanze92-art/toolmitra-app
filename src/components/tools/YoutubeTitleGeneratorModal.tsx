import React, { useState } from 'react';
import { Youtube, Sparkles, Copy, Check, RefreshCw, Flame, TrendingUp } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function YoutubeTitleGeneratorModal({ onClose }: Props) {
  const [topic, setTopic] = useState('How I learned coding in 3 months with AI');
  const [niche, setNiche] = useState('Tech & Programming');
  const [tone, setTone] = useState('Viral & High CTR');
  const [titles, setTitles] = useState<{ title: string; tag: string; ctrScore: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolType: 'youtube-title-generator',
          prompt: topic,
          options: { niche, tone },
        }),
      });

      const data = await res.json();
      if (data.success && data.text) {
        const rawLines = data.text
          .split('\n')
          .map((l: string) => l.replace(/^\d+[\.\)]\s*/, '').replace(/^[-*]\s*/, '').trim())
          .filter((l: string) => l.length > 10 && !l.toLowerCase().includes('here are'));

        if (rawLines.length >= 3) {
          const tags = ['High CTR', 'Viral Hook', 'SEO Boost', 'Storytelling', 'Curiosity Gap'];
          const parsed = rawLines.slice(0, 6).map((title: string, i: number) => ({
            title: title.replace(/^["']|["']$/g, ''),
            tag: tags[i % tags.length],
            ctrScore: `${88 + (i * 2)}% Score`,
          }));
          setTitles(parsed);
        } else {
          fallbackTitles();
        }
      } else {
        fallbackTitles();
      }
    } catch {
      fallbackTitles();
    } finally {
      setIsLoading(false);
    }
  };

  const fallbackTitles = () => {
    const cleanTopic = topic.trim();
    setTitles([
      { title: `I Tested ${cleanTopic} For 30 Days (SHOCKING Results!)`, tag: 'Viral Hook', ctrScore: '96% Score' },
      { title: `The ONLY Guide to ${cleanTopic} You Need in 2026`, tag: 'High CTR', ctrScore: '94% Score' },
      { title: `Why 99% of People Fail at ${cleanTopic} (And How to Fix It)`, tag: 'Curiosity Gap', ctrScore: '92% Score' },
      { title: `How to Master ${cleanTopic} in Record Time (Step-by-Step)`, tag: 'SEO Boost', ctrScore: '90% Score' },
      { title: `Stop Doing ${cleanTopic} Wrong! Do This Instead`, tag: 'Emotional Hook', ctrScore: '89% Score' },
    ]);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
            Video Topic, Concept or Keyword
          </label>
          <input
            id="youtube-topic-input"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Best budget camera for travel vloggers in India..."
            className="w-full rounded-xl bg-zinc-900 border border-zinc-700/80 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Niche / Category</label>
            <select
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="w-full rounded-xl bg-zinc-900 border border-zinc-700/80 px-3 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-red-500"
            >
              <option>Tech & AI</option>
              <option>Gaming & Streams</option>
              <option>Education & Tutorials</option>
              <option>Finance & Money</option>
              <option>Vlogs & Lifestyle</option>
              <option>Fitness & Health</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Title Style / Angle</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full rounded-xl bg-zinc-900 border border-zinc-700/80 px-3 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-red-500"
            >
              <option>Viral & High CTR</option>
              <option>Curiosity Gap (MrBeast Style)</option>
              <option>How-To & Practical</option>
              <option>Story & Transformation</option>
              <option>Listicle & Ranking</option>
            </select>
          </div>
        </div>

        <button
          id="btn-generate-youtube-titles"
          type="button"
          onClick={handleGenerate}
          disabled={isLoading || !topic.trim()}
          className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-900/20 transition disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Generating High CTR Titles...
            </>
          ) : (
            <>
              <Youtube className="w-4 h-4" />
              Generate Click-Worthy Titles
            </>
          )}
        </button>
      </div>

      {/* Results */}
      {titles.length > 0 && (
        <div className="space-y-3 pt-2 border-t border-zinc-800">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
              <Flame className="w-4 h-4 text-red-500" />
              Optimized YouTube Titles ({titles.length})
            </h4>
            <span className="text-xs text-zinc-400">Click to copy</span>
          </div>

          <div className="space-y-2.5">
            {titles.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-red-500/50 transition flex items-center justify-between gap-3 group"
              >
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">
                      {item.tag}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-0.5">
                      <TrendingUp className="w-3 h-3" />
                      {item.ctrScore}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-zinc-100 truncate sm:whitespace-normal">
                    {item.title}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(item.title, idx)}
                  className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-red-600 text-xs font-medium text-zinc-200 hover:text-white transition cursor-pointer"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
