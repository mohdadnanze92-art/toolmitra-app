import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Wand2,
  Layers,
  Crop,
  Sliders,
  SunMedium,
  Compass,
  ArrowLeft,
  Flame,
  CheckCircle2,
  FileText,
  Palette
} from 'lucide-react';

interface Props {
  onClose?: () => void;
}

const VISUAL_STYLES = [
  { id: 'photorealistic', label: 'Photorealistic 8K', desc: 'Hyper-detailed, raw DSLR photography, 8k resolution' },
  { id: 'cinematic', label: 'Cinematic 35mm Film', desc: 'Arri Alexa, anamorphic lens, movie still, color graded' },
  { id: 'cyberpunk', label: 'Cyberpunk Neon', desc: 'Futuristic, neon glowing lights, rainy pavement reflections' },
  { id: 'pixar-3d', label: '3D Pixar / Disney Render', desc: 'Unreal Engine 5, Octane render, cute stylization, subsurface scattering' },
  { id: 'anime-ghibli', label: 'Anime / Studio Ghibli', desc: 'Hayao Miyazaki hand-drawn style, lush painted backgrounds' },
  { id: 'digital-art', label: 'Digital Art Masterpiece', desc: 'ArtStation trending, dramatic composition, concept art' },
  { id: 'minimalist-vector', label: 'Minimalist Vector Art', desc: 'Clean lines, flat pastel palette, modern iconographic design' },
  { id: 'dark-fantasy', label: 'Dark Fantasy / Elden Ring', desc: 'Grim, gothic architecture, dramatic volumetric lighting' },
  { id: 'oil-painting', label: 'Classic Oil Painting', desc: 'Textured canvas strokes, Rembrandt chiaroscuro lighting' },
  { id: 'retro-synthwave', label: 'Retro Synthwave 80s', desc: 'Purple and magenta sunset, wireframe grid, VHS aesthetic' },
  { id: 'isometric-3d', label: 'Isometric 3D Diorama', desc: 'Low-poly clean miniature diorama, tilt-shift lens' },
  { id: 'watercolor', label: 'Dreamy Watercolor', desc: 'Splashes of soft wet-on-wet watercolor on textured paper' },
];

const ASPECT_RATIOS = [
  { id: '16:9', label: '16:9', name: 'Widescreen (YouTube / Landscape)', arCode: '--ar 16:9' },
  { id: '9:16', label: '9:16', name: 'Vertical (Instagram Reels / TikTok / Shorts)', arCode: '--ar 9:16' },
  { id: '1:1', label: '1:1', name: 'Square (Instagram Post / Profile / Avatar)', arCode: '--ar 1:1' },
  { id: '4:5', label: '4:5', name: 'Portrait (Instagram Feed Optimal)', arCode: '--ar 4:5' },
  { id: '3:2', label: '3:2', name: 'Classic DSLR (Standard Photography)', arCode: '--ar 3:2' },
  { id: '4:3', label: '4:3', name: 'Classic Standard (Tablets / Vintage)', arCode: '--ar 4:3' },
  { id: '21:9', label: '21:9', name: 'Ultrawide (Cinematic Panoramic Banner)', arCode: '--ar 21:9' },
];

const LIGHTING_OPTIONS = [
  { id: 'golden-hour', label: '🌅 Golden Hour Sunset' },
  { id: 'studio-softbox', label: '💡 Studio Softbox Lighting' },
  { id: 'cyber-neon', label: '🟣 Moody Neon Glow' },
  { id: 'volumetric-fog', label: '🌫️ Volumetric God Rays' },
  { id: 'dramatic-cinematic', label: '🎬 High Contrast Rim Light' },
  { id: 'natural-diffused', label: '☀️ Soft Overcast Daylight' },
];

const TARGET_PLATFORMS = [
  { id: 'midjourney', label: 'Midjourney v6.1' },
  { id: 'dalle3', label: 'DALL-E 3 / ChatGPT' },
  { id: 'flux', label: 'Flux.1 Dev / Schnell' },
  { id: 'sdxl', label: 'Stable Diffusion XL' },
  { id: 'imagen3', label: 'Google Imagen 3' },
  { id: 'chatgpt-claude', label: 'ChatGPT / Claude (General Prompt)' },
];

const INSPIRATION_IDEAS = [
  'Futuristic Cyberpunk Tokyo street in heavy rain with neon reflections',
  'Majestic crystal dragon soaring through a cosmic nebula galaxy',
  'Cozy warm coffee shop with steaming latte on a rainy autumn evening',
  'Vintage 1970s classic race car drifting on Monaco coastal road',
  'Ancient mystical library with towering floating glowing books',
  'Minimalist modern geometric ceramic coffee mug on marble table',
  'Cute fluffy baby fox wearing a woolen knitted winter sweater',
];

export default function AiPromptGeneratorModal({ onClose }: Props) {
  const [userIdea, setUserIdea] = useState('Futuristic Cyberpunk Tokyo street in heavy rain with neon reflections');
  const [selectedStyle, setSelectedStyle] = useState('photorealistic');
  const [selectedAspectRatio, setSelectedAspectRatio] = useState('16:9');
  const [selectedLighting, setSelectedLighting] = useState('golden-hour');
  const [targetPlatform, setTargetPlatform] = useState('midjourney');
  const [negativePromptEnabled, setNegativePromptEnabled] = useState(true);
  
  // Results
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [variations, setVariations] = useState<{ title: string; prompt: string }[]>([]);
  const [negativePrompt, setNegativePrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedMain, setCopiedMain] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Generate prompts using smart deterministic synthesis + backend AI
  const handleGenerate = async () => {
    if (!userIdea.trim()) return;
    setIsLoading(true);
    setCopiedMain(false);
    setCopiedIndex(null);

    const styleObj = VISUAL_STYLES.find((s) => s.id === selectedStyle);
    const arObj = ASPECT_RATIOS.find((a) => a.id === selectedAspectRatio);
    const lightObj = LIGHTING_OPTIONS.find((l) => l.id === selectedLighting);

    const styleDesc = styleObj ? styleObj.desc : 'hyper-detailed';
    const arCode = arObj ? arObj.arCode : '--ar 16:9';
    const lightText = lightObj ? lightObj.label.replace(/^[^\w\s]+/, '').trim() : 'cinematic lighting';

    try {
      const res = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolType: 'ai-prompt-generator',
          prompt: userIdea,
          options: {
            visualStyle: styleObj?.label,
            styleDesc,
            aspectRatio: selectedAspectRatio,
            lighting: lightText,
            targetPlatform,
          },
        }),
      });

      const data = await res.json();
      if (data.success && data.text) {
        const text = data.text.trim();
        // Set main formatted prompt
        setGeneratedPrompt(
          targetPlatform === 'midjourney'
            ? `/imagine prompt: ${text} ${arCode} --v 6.1 --style raw`
            : text
        );
        
        setVariations([
          {
            title: '🎨 Highly Detailed & Atmospheric',
            prompt: `${text}, ${styleDesc}, ${lightText}, shot on 35mm lens, f/1.8 aperture, octane render, masterpiece ${arCode}`,
          },
          {
            title: '✨ Minimalist & Direct',
            prompt: `${userIdea}, in the style of ${styleObj?.label}, clean composition, striking visual ${arCode}`,
          },
          {
            title: '🎬 Ultra-Cinematic Movie Still',
            prompt: `Cinematic wide shot of ${userIdea}, ${lightText}, volumetric lighting, 8k resolution, IMAX film capture ${arCode}`,
          },
        ]);

        setNegativePrompt(
          'blur, low quality, distorted anatomy, watermark, text, signature, duplicate artifacts, oversaturated, deformed hands'
        );
      } else {
        throw new Error('Fallback needed');
      }
    } catch {
      // High craft deterministic fallback engine
      const masterPrompt = `${userIdea}, ${styleDesc}, ${lightText}, intricate details, hyper-realistic textures, 8k UHD, masterpiece composition ${arCode} --v 6.1`;
      
      setGeneratedPrompt(
        targetPlatform === 'midjourney' ? `/imagine prompt: ${masterPrompt}` : masterPrompt
      );

      setVariations([
        {
          title: '🎨 Highly Detailed & Atmospheric',
          prompt: `${userIdea}, ${styleDesc}, ${lightText}, hyper-detailed textures, volumetric depth, award-winning photography, photorealistic, 8k ${arCode}`,
        },
        {
          title: '✨ Minimalist & Focused',
          prompt: `${userIdea}, in the style of ${styleObj?.label}, dramatic composition, elegant negative space ${arCode}`,
        },
        {
          title: '🎬 Ultra-Cinematic Epic Movie Still',
          prompt: `Cinematic movie still of ${userIdea}, filmed on Arri Alexa 65, Panavision anamorphic lenses, ${lightText}, color graded, atmospheric haze ${arCode}`,
        },
      ]);

      setNegativePrompt(
        'blurry, poorly drawn face, bad anatomy, deformed limbs, cropped, low resolution, watermark, grainy, out of focus'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Generate on first mount if empty
  React.useEffect(() => {
    if (!generatedPrompt) {
      handleGenerate();
    }
  }, []);

  const handleCopy = (text: string, isMain: boolean, index?: number) => {
    navigator.clipboard.writeText(text);
    if (isMain) {
      setCopiedMain(true);
      setTimeout(() => setCopiedMain(false), 2000);
    } else if (typeof index === 'number') {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  return (
    <div id="prompt-generator-tool-container" className="w-full flex flex-col gap-8">
      {/* Top Banner & Quick Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>AI Prompt Generator</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                Midjourney / DALL-E 3 / Flux
              </span>
            </h2>
            <p className="text-xs text-zinc-400">
              Transform simple ideas into master-crafted prompts with styles, ratios &amp; parameters.
            </p>
          </div>
        </div>

        {onClose && (
          <button
            id="btn-prompt-top-back-home"
            type="button"
            onClick={onClose}
            className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-2 border border-zinc-700 transition cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-violet-400 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Dashboard</span>
          </button>
        )}
      </div>

      {/* Main Grid: Left Controls / Right Output Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. User Idea Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="prompt-user-idea-input"
                className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-violet-400" />
                <span>1. Your Idea or Subject (Prompt Concept)</span>
              </label>
              <span className="text-[11px] text-zinc-400">
                {userIdea.length} characters
              </span>
            </div>
            
            <div className="relative">
              <textarea
                id="prompt-user-idea-input"
                value={userIdea}
                onChange={(e) => setUserIdea(e.target.value)}
                rows={3}
                placeholder="e.g. Cyberpunk samurai meditating on top of a futuristic skyscraper..."
                className="w-full rounded-2xl bg-zinc-950/80 border border-zinc-700/80 px-4 py-3.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition resize-none shadow-inner"
              />
              {userIdea && (
                <button
                  type="button"
                  onClick={() => setUserIdea('')}
                  className="absolute top-3 right-3 text-xs text-zinc-400 hover:text-zinc-200 bg-zinc-800 px-2 py-1 rounded-md transition"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Inspiration Chips */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-semibold text-zinc-400 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                Try quick ideas:
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                {INSPIRATION_IDEAS.map((idea, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setUserIdea(idea)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700/60 transition truncate max-w-[280px] cursor-pointer text-left"
                    title={idea}
                  >
                    {idea}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Visual Style Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
              <Palette className="w-4 h-4 text-pink-400" />
              <span>2. Visual Style &amp; Artistic Direction</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {VISUAL_STYLES.map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => setSelectedStyle(style.id)}
                  className={`p-2.5 rounded-xl text-left transition border cursor-pointer flex flex-col justify-between ${
                    selectedStyle === style.id
                      ? 'bg-violet-600/20 border-violet-500 text-white shadow-sm ring-1 ring-violet-500'
                      : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                  }`}
                >
                  <span className="text-xs font-bold truncate block">{style.label}</span>
                  <span className="text-[10px] text-zinc-400 truncate mt-0.5 block">
                    {style.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Aspect Ratio & Target Platform Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Aspect Ratio */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                <Crop className="w-4 h-4 text-emerald-400" />
                <span>3. Aspect Ratio</span>
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {ASPECT_RATIOS.map((ar) => (
                  <button
                    key={ar.id}
                    type="button"
                    onClick={() => setSelectedAspectRatio(ar.id)}
                    className={`px-2.5 py-2 rounded-xl text-left transition border cursor-pointer ${
                      selectedAspectRatio === ar.id
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold ring-1 ring-emerald-500'
                        : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 text-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{ar.label}</span>
                      <span className="text-[10px] opacity-75 font-mono">{ar.arCode}</span>
                    </div>
                    <span className="text-[9px] text-zinc-400 block truncate mt-0.5">
                      {ar.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Target Platform & Lighting */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-indigo-400" />
                  <span>Target AI Engine</span>
                </label>
                <select
                  value={targetPlatform}
                  onChange={(e) => setTargetPlatform(e.target.value)}
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-700/80 px-3 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-violet-500 cursor-pointer"
                >
                  {TARGET_PLATFORMS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                  <SunMedium className="w-4 h-4 text-amber-400" />
                  <span>Lighting &amp; Atmosphere</span>
                </label>
                <select
                  value={selectedLighting}
                  onChange={(e) => setSelectedLighting(e.target.value)}
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-700/80 px-3 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-violet-500 cursor-pointer"
                >
                  {LIGHTING_OPTIONS.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 4. Generate Button */}
          <button
            id="btn-generate-prompt"
            type="button"
            onClick={handleGenerate}
            disabled={isLoading || !userIdea.trim()}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2.5 transition active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Crafting Master Prompt...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5 text-amber-300" />
                <span>Generate Optimized AI Prompt</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Output & Copy to Clipboard Box (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5 sticky top-28">
          {/* Main Primary Output Box */}
          <div className="rounded-3xl bg-zinc-950 border border-violet-500/40 p-5 shadow-2xl relative overflow-hidden flex flex-col gap-4">
            {/* Top Bar of Output Box */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
                  Generated Prompt (Ready to Use)
                </span>
              </div>
              <span className="text-[11px] font-mono text-zinc-400">
                {generatedPrompt ? `${generatedPrompt.length} chars` : '0 chars'}
              </span>
            </div>

            {/* Prompt Content Area */}
            <div
              id="generated-prompt-output-box"
              className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-zinc-100 text-sm font-mono leading-relaxed select-all min-h-[140px] max-h-[260px] overflow-y-auto relative"
            >
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-32 gap-3 text-zinc-400">
                  <RefreshCw className="w-6 h-6 animate-spin text-violet-400" />
                  <span className="text-xs">Applying styles, ratios &amp; parameters...</span>
                </div>
              ) : generatedPrompt ? (
                <p className="break-words whitespace-pre-wrap">{generatedPrompt}</p>
              ) : (
                <p className="text-zinc-500 italic text-xs">
                  Click &apos;Generate Optimized AI Prompt&apos; to create your master prompt...
                </p>
              )}
            </div>

            {/* Prominent Copy to Clipboard Button */}
            <button
              id="btn-copy-main-prompt"
              type="button"
              onClick={() => handleCopy(generatedPrompt, true)}
              disabled={!generatedPrompt || isLoading}
              className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-md ${
                copiedMain
                  ? 'bg-emerald-600 text-white'
                  : 'bg-violet-600 hover:bg-violet-500 text-white'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {copiedMain ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Prompt to Clipboard</span>
                </>
              )}
            </button>

            {/* Parameter Badges */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700">
                AR: {selectedAspectRatio}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700">
                Engine: {targetPlatform}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700">
                Style: {selectedStyle}
              </span>
            </div>
          </div>

          {/* Prompt Variations Card */}
          {variations.length > 0 && (
            <div className="rounded-2xl bg-zinc-950/70 border border-zinc-800/80 p-4 flex flex-col gap-3">
              <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>Alternative Style Variations</span>
              </span>

              <div className="space-y-2.5">
                {variations.map((v, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-zinc-200">{v.title}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(v.prompt, false, i)}
                        className="text-[11px] px-2 py-0.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition flex items-center gap-1 cursor-pointer"
                      >
                        {copiedIndex === i ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-[11px] font-mono text-zinc-400 line-clamp-2 select-all">
                      {v.prompt}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Negative Prompt Box */}
          {negativePrompt && (
            <div className="rounded-2xl bg-zinc-950/70 border border-zinc-800/80 p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />
                  <span>Negative Prompt (What to Avoid)</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(negativePrompt, false, 999)}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition flex items-center gap-1 cursor-pointer"
                >
                  {copiedIndex === 999 ? (
                    <span className="text-emerald-400">Copied</span>
                  ) : (
                    <span>Copy Negative</span>
                  )}
                </button>
              </div>
              <p className="text-[11px] font-mono text-zinc-400 bg-zinc-900 p-2.5 rounded-xl border border-zinc-800 select-all">
                {negativePrompt}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
