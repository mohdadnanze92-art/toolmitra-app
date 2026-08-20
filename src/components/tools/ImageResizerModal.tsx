import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, RefreshCw, Lock, Unlock, Crop, Image as ImageIcon } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function ImageResizerModal({ onClose }: Props) {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  const [origWidth, setOrigWidth] = useState<number>(0);
  const [origHeight, setOrigHeight] = useState<number>(0);
  const [targetWidth, setTargetWidth] = useState<number>(1080);
  const [targetHeight, setTargetHeight] = useState<number>(1080);
  const [lockRatio, setLockRatio] = useState<boolean>(true);
  const [outputFormat, setOutputFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/jpeg');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setOriginalFile(file);
    const url = URL.createObjectURL(file);
    setOriginalUrl(url);

    const img = new Image();
    img.src = url;
    img.onload = () => {
      setOrigWidth(img.width);
      setOrigHeight(img.height);
      setTargetWidth(img.width);
      setTargetHeight(img.height);
      performResize(img, img.width, img.height, outputFormat);
    };
  };

  const handleWidthChange = (val: number) => {
    setTargetWidth(val);
    if (lockRatio && origWidth > 0) {
      const calculatedHeight = Math.round((val * origHeight) / origWidth);
      setTargetHeight(calculatedHeight);
      triggerResize(val, calculatedHeight);
    } else {
      triggerResize(val, targetHeight);
    }
  };

  const handleHeightChange = (val: number) => {
    setTargetHeight(val);
    if (lockRatio && origHeight > 0) {
      const calculatedWidth = Math.round((val * origWidth) / origHeight);
      setTargetWidth(calculatedWidth);
      triggerResize(calculatedWidth, val);
    } else {
      triggerResize(targetWidth, val);
    }
  };

  const triggerResize = (w: number, h: number) => {
    if (!originalUrl || w <= 0 || h <= 0) return;
    const img = new Image();
    img.src = originalUrl;
    img.onload = () => {
      performResize(img, w, h, outputFormat);
    };
  };

  const performResize = (img: HTMLImageElement, w: number, h: number, format: string) => {
    setIsProcessing(true);
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsProcessing(false);
      return;
    }

    ctx.drawImage(img, 0, 0, w, h);
    canvas.toBlob(
      (blob) => {
        if (blob) {
          if (resizedUrl) URL.revokeObjectURL(resizedUrl);
          const newUrl = URL.createObjectURL(blob);
          setResizedUrl(newUrl);
        }
        setIsProcessing(false);
      },
      format,
      0.92
    );
  };

  const applyPreset = (w: number, h: number) => {
    setTargetWidth(w);
    setTargetHeight(h);
    triggerResize(w, h);
  };

  return (
    <div className="flex flex-col gap-6">
      {!originalUrl ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files?.[0]) handleFileSelect(e.dataTransfer.files[0]);
          }}
          className="border-2 border-dashed border-zinc-700 hover:border-blue-500 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 bg-zinc-900/50 hover:bg-zinc-900 cursor-pointer transition text-center group"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            accept="image/jpeg,image/png,image/webp,image/jpg"
            className="hidden"
          />
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-105 transition">
            <Upload className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-zinc-100">Upload Image to Resize</h4>
            <p className="text-xs text-zinc-400 mt-1">Scale pixels, maintain aspect ratios, or use social presets</p>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Presets */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-zinc-400 font-semibold">Presets:</span>
            {[
              { name: 'IG Square (1080×1080)', w: 1080, h: 1080 },
              { name: 'IG Story/Reel (1080×1920)', w: 1080, h: 1920 },
              { name: 'YouTube Thumb (1280×720)', w: 1280, h: 720 },
              { name: 'Full HD (1920×1080)', w: 1920, h: 1080 },
            ].map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => applyPreset(p.w, p.h)}
                className="px-2.5 py-1 rounded-lg text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition"
              >
                {p.name}
              </button>
            ))}
          </div>

          {/* Dimension Controls */}
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Width (px)</label>
              <input
                type="number"
                value={targetWidth}
                onChange={(e) => handleWidthChange(Number(e.target.value))}
                className="w-full rounded-lg bg-zinc-950 border border-zinc-700 px-3 py-2 text-xs text-zinc-100 font-mono focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Height (px)</label>
              <input
                type="number"
                value={targetHeight}
                onChange={(e) => handleHeightChange(Number(e.target.value))}
                className="w-full rounded-lg bg-zinc-950 border border-zinc-700 px-3 py-2 text-xs text-zinc-100 font-mono focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLockRatio(!lockRatio)}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 border transition ${
                  lockRatio
                    ? 'bg-blue-500/20 text-blue-400 border-blue-500/40'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800'
                }`}
              >
                {lockRatio ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                {lockRatio ? 'Ratio Locked' : 'Unlocked'}
              </button>
            </div>
          </div>

          {/* Preview Canvas */}
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400 font-medium">Original: {origWidth}×{origHeight} px</span>
              <span className="text-blue-400 font-semibold">Resized Output: {targetWidth}×{targetHeight} px</span>
            </div>
            <div className="h-52 rounded-lg bg-black/50 border border-zinc-800 flex items-center justify-center overflow-hidden">
              {isProcessing ? (
                <div className="flex items-center gap-2 text-zinc-400 text-xs">
                  <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />
                  Scaling...
                </div>
              ) : resizedUrl ? (
                <img src={resizedUrl} alt="Resized" className="max-h-full max-w-full object-contain" />
              ) : null}
            </div>
          </div>

          {/* Download */}
          {resizedUrl && (
            <a
              href={resizedUrl}
              download={`toolmitra-resized-${targetWidth}x${targetHeight}.jpg`}
              className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download Resized Image ({targetWidth} × {targetHeight} px)
            </a>
          )}
        </div>
      )}
    </div>
  );
}
