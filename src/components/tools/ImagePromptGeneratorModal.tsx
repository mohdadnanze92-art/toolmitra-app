import React, { useState } from 'react';
import { Sparkles, Copy, Check, RefreshCw, Palette, Camera, Sliders } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function ImagePromptGeneratorModal({ onClose }: Props) {
  const [subject, setSubject] = useState('Cyberpunk street samurai drinking tea in neon rain');
  const [style, setStyle] = useState('Cinematic Photorealism');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [lighting, setLighting] = useState('Volumetric Neon & Golden Hour');
  const [engine, setEngine] = useState('Midjourney v6');
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!subject.trim()) return;
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolType: 'image-prompt-generator',
          prompt: subject,
          options: { style, aspectRatio, lighting, engine },
        }),
      });

      const data = await res.json();
      if (data.success && data.text) {
        const lines = data.text
          .split(/(?:\n\n|\r\n\r\n|Prompt \d+:|Option \d+:)/)
          .map((p: string) => p.trim())
          .filter((p: string) => p.length > 20);

        if (lines.length > 0) {
          setResults(lines);
        } else {
          setResults([data.text]);
        }
      } else {
        // High quality fallback image prompts
        const arTag = aspectRatio === '16:9' ? '--ar 16:9' : aspectRatio === '9:16' ? '--ar 9:16' : aspectRatio === '1:1' ? '--ar 1:1' : '--ar 4:3';
        setResults([
          `A hyper-detailed, breathtaking masterpiece of ${subject}, ${style.toLowerCase()}, ${lighting.toLowerCase()}, captured on 35mm lens, f/1.8 aperture, intricate textures, octane render, 8k resolution, cinematic color grading ${arTag} --v 6.0 --style raw`,
          `Award-winning conceptual digital artwork depicting ${subject}, cinematic atmosphere, subtle lens flare, dramatic shadows, vibrant palette, Unreal Engine 5 render, trending on ArtStation, ultra-detailed ${arTag} --q 2`,
          `Studio editorial portrait of ${subject}, ray-tracing reflections, atmospheric haze, moody contrast, crisp focus, master lighting setup, photorealistic skin details ${arTag}`,
        ]);
      }
    } catch {
      setResults([
        `Photorealistic capture of ${subject}, ${style}, ${lighting}, 8k resolution, cinematic lighting, ultra-detailed, depth of field --ar ${aspectRatio}`,
        `Concept art painting of ${subject}, dynamic lighting, vibrant color palette, highly detailed textures, trending on ArtStation --ar ${aspectRatio}`,
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Input controls */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
            Subject or Image Idea
          </label>
          <textarea
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            rows={2}
            placeholder="e.g. Royal Bengal Tiger in an enchanted crystal forest with glowing butterflies..."
            className="w-full rounded-xl bg-zinc-900 border border-zinc-700/80 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition resize-none"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Art Style</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full rounded-xl bg-zinc-900 border border-zinc-700/80 px-2.5 py-2 text-xs text-zinc-200 focus:outline-none focus:border-fuchsia-500"
            >
              <option>Cinematic Photorealism</option>
              <option>3D Pixar / Disney Animation</option>
              <option>Anime & Studio Ghibli</option>
              <option>Cyberpunk Neon</option>
              <option>Oil Painting & Baroque</option>
              <option>Minimalist Vector / Isometric</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Aspect Ratio</label>
            <select
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value)}
              className="w-full rounded-xl bg-zinc-900 border border-zinc-700/80 px-2.5 py-2 text-xs text-zinc-200 focus:outline-none focus:border-fuchsia-500"
            >
              <option value="16:9">16:9 (Landscape / YouTube)</option>
              <option value="9:16">9:16 (Story / Reel / Shorts)</option>
              <option value="1:1">1:1 (Square / Instagram)</option>
              <option value="4:3">4:3 (Classic Display)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Lighting</label>
            <select
              value={lighting}
              onChange={(e) => setLighting(e.target.value)}
              className="w-full rounded-xl bg-zinc-900 border border-zinc-700/80 px-2.5 py-2 text-xs text-zinc-200 focus:outline-none focus:border-fuchsia-500"
            >
              <option>Volumetric Neon & Glow</option>
              <option>Golden Hour & Warm Sun</option>
              <option>Moody Studio Softbox</option>
              <option>Dramatic Rim Light</option>
              <option>Bioluminescent Ethereal</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Target Engine</label>
            <select
              value={engine}
              onChange={(e) => setEngine(e.target.value)}
              className="w-full rounded-xl bg-zinc-900 border border-zinc-700/80 px-2.5 py-2 text-xs text-zinc-200 focus:outline-none focus:border-fuchsia-500"
            >
              <option>Midjourney v6</option>
              <option>DALL·E 3</option>
              <option>Stable Diffusion XL</option>
              <option>Ideogram / Flux</option>
            </select>
          </div>
        </div>

        <button
          id="btn-generate-image-prompt"
          type="button"
          onClick={handleGenerate}
          disabled={isLoading || !subject.trim()}
          className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-fuchsia-900/20 transition disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Crafting Artistic Prompts...
            </>
          ) : (
            <>
              <Palette className="w-4 h-4" />
              Generate Image Prompts
            </>
          )}
        </button>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4 pt-2 border-t border-zinc-800">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-fuchsia-400" />
              Ready-to-Paste Image Prompts ({results.length})
            </h4>
          </div>

          <div className="space-y-3">
            {results.map((promptText, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-fuchsia-500/50 transition flex flex-col gap-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20">
                    Style Variation #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(promptText, idx)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-fuchsia-600 text-xs font-medium text-zinc-200 hover:text-white transition cursor-pointer"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy Prompt
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-zinc-300 whitespace-pre-line leading-relaxed font-mono bg-black/30 p-3 rounded-lg border border-zinc-800/50">
                  {promptText}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
