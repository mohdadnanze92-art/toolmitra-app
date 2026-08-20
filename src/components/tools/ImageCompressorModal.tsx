import React, { useState, useRef } from 'react';
import { Upload, Download, Sliders, Image as ImageIcon, CheckCircle, RefreshCw, AlertCircle } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function ImageCompressorModal({ onClose }: Props) {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [quality, setQuality] = useState<number>(75);
  const [format, setFormat] = useState<'image/jpeg' | 'image/webp' | 'image/png'>('image/jpeg');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setOriginalFile(file);
    setOriginalSize(file.size);
    const url = URL.createObjectURL(file);
    setOriginalUrl(url);
    compressImage(file, quality, format);
  };

  const compressImage = (file: File, q: number, mimeType: string) => {
    setIsProcessing(true);
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Max dimension cap for fast in-browser compression
        const maxDim = 2400;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setIsProcessing(false);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        const qualityFactor = q / 100;
        canvas.toBlob(
          (blob) => {
            if (blob) {
              if (compressedUrl) URL.revokeObjectURL(compressedUrl);
              const newUrl = URL.createObjectURL(blob);
              setCompressedUrl(newUrl);
              setCompressedSize(blob.size);
            }
            setIsProcessing(false);
          },
          mimeType,
          qualityFactor
        );
      };
    };
    reader.readAsDataURL(file);
  };

  const handleQualityChange = (newQuality: number) => {
    setQuality(newQuality);
    if (originalFile) {
      compressImage(originalFile, newQuality, format);
    }
  };

  const handleFormatChange = (newFormat: 'image/jpeg' | 'image/webp' | 'image/png') => {
    setFormat(newFormat);
    if (originalFile) {
      compressImage(originalFile, quality, newFormat);
    }
  };

  const savingsPercent = originalSize > 0 && compressedSize > 0
    ? Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))
    : 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Upload Zone */}
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
            <h4 className="text-sm font-semibold text-zinc-100">Click or Drag & Drop Image Here</h4>
            <p className="text-xs text-zinc-400 mt-1">Supports JPG, PNG, and WebP (Up to 25MB)</p>
          </div>
          <span className="text-[11px] font-medium px-3 py-1 rounded-full bg-zinc-800 text-zinc-300">
            🔒 100% Private — Processed entirely in your browser
          </span>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Controls */}
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-300 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-400" />
                Compression Quality: {quality}%
              </span>
              <span className="text-xs font-medium text-emerald-400">
                {savingsPercent > 0 ? `Saved ${savingsPercent}% file size` : 'Optimizing...'}
              </span>
            </div>

            <input
              type="range"
              min="10"
              max="95"
              step="5"
              value={quality}
              onChange={(e) => handleQualityChange(Number(e.target.value))}
              className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Output Format</label>
                <select
                  value={format}
                  onChange={(e) => handleFormatChange(e.target.value as any)}
                  className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-blue-500"
                >
                  <option value="image/jpeg">JPG (Smallest size)</option>
                  <option value="image/webp">WebP (Modern high efficiency)</option>
                  <option value="image/png">PNG (Lossless)</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-300 transition flex items-center justify-center gap-1.5"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                    accept="image/jpeg,image/png,image/webp,image/jpg"
                    className="hidden"
                  />
                  <RefreshCw className="w-3.5 h-3.5" />
                  Choose Different Image
                </button>
              </div>
            </div>
          </div>

          {/* Before & After Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-medium">Original</span>
                <span className="font-semibold text-zinc-200">{formatBytes(originalSize)}</span>
              </div>
              <div className="h-44 rounded-lg bg-black/40 border border-zinc-800/80 flex items-center justify-center overflow-hidden">
                <img src={originalUrl} alt="Original" className="max-h-full max-w-full object-contain" />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-900/60 border border-blue-500/30 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-blue-400 font-medium">Compressed ({format.split('/')[1].toUpperCase()})</span>
                <span className="font-semibold text-emerald-400">{formatBytes(compressedSize)}</span>
              </div>
              <div className="h-44 rounded-lg bg-black/40 border border-zinc-800/80 flex items-center justify-center overflow-hidden relative">
                {isProcessing ? (
                  <div className="flex flex-col items-center gap-2 text-zinc-400">
                    <RefreshCw className="w-6 h-6 animate-spin text-blue-400" />
                    <span className="text-xs">Compressing...</span>
                  </div>
                ) : (
                  compressedUrl && (
                    <img src={compressedUrl} alt="Compressed" className="max-h-full max-w-full object-contain" />
                  )
                )}
              </div>
            </div>
          </div>

          {/* Download Button */}
          {compressedUrl && (
            <a
              id="btn-download-compressed-image"
              href={compressedUrl}
              download={`toolmitra-compressed-${originalFile?.name || 'image'}.${format.split('/')[1]}`}
              className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download Compressed Image ({savingsPercent}% Smaller)
            </a>
          )}
        </div>
      )}
    </div>
  );
}
