import React, { useState } from 'react';
import { Type, AlignLeft, Clock, Mic, Sparkles, Copy, Check, Trash2 } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function WordCounterModal({ onClose }: Props) {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const getStats = () => {
    const trimmed = text.trim();
    const words = trimmed === '' ? 0 : trimmed.split(/\s+/).length;
    const charsWithSpaces = text.length;
    const charsWithoutSpaces = text.replace(/\s/g, '').length;
    const sentences = trimmed === '' ? 0 : trimmed.split(/[.!?]+/).filter(Boolean).length;
    const paragraphs = trimmed === '' ? 0 : text.split(/\n+/).filter((p) => p.trim() !== '').length;
    const readingTimeMinutes = (words / 200).toFixed(1); // 200 WPM
    const speakingTimeMinutes = (words / 130).toFixed(1); // 130 WPM

    return {
      words,
      charsWithSpaces,
      charsWithoutSpaces,
      sentences,
      paragraphs,
      readingTimeMinutes,
      speakingTimeMinutes,
    };
  };

  const stats = getStats();

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="p-3 rounded-xl bg-zinc-900 border border-sky-500/30 text-center">
          <span className="text-[11px] text-sky-400 font-medium">Total Words</span>
          <p className="text-2xl font-black text-white font-mono mt-0.5">{stats.words}</p>
        </div>
        <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
          <span className="text-[11px] text-zinc-400">Characters</span>
          <p className="text-2xl font-bold text-zinc-200 font-mono mt-0.5">{stats.charsWithSpaces}</p>
        </div>
        <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
          <span className="text-[11px] text-zinc-400">Sentences</span>
          <p className="text-2xl font-bold text-zinc-200 font-mono mt-0.5">{stats.sentences}</p>
        </div>
        <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
          <span className="text-[11px] text-zinc-400">Paragraphs</span>
          <p className="text-2xl font-bold text-zinc-200 font-mono mt-0.5">{stats.paragraphs}</p>
        </div>
      </div>

      {/* Text Area */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-zinc-300">Type or Paste Your Text Below</label>
          <div className="flex items-center gap-2">
            {text && (
              <button
                type="button"
                onClick={() => setText('')}
                className="text-xs text-zinc-400 hover:text-red-400 flex items-center gap-1 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={handleCopy}
              disabled={!text}
              className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition disabled:opacity-30"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Text</span>
                </>
              )}
            </button>
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={7}
          placeholder="Start typing your essay, blog article, social media post, or script here..."
          className="w-full rounded-xl bg-zinc-900 border border-zinc-700/80 p-4 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition leading-relaxed resize-none"
        />
      </div>

      {/* Reading & Speaking Times */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-zinc-200">Reading Time</div>
            <div className="text-xs text-zinc-400 font-mono">
              ~{stats.readingTimeMinutes} mins (at 200 wpm)
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-zinc-200">Speaking Time</div>
            <div className="text-xs text-zinc-400 font-mono">
              ~{stats.speakingTimeMinutes} mins (at 130 wpm)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
