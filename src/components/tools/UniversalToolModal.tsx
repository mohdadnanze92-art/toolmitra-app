import React, { useEffect } from 'react';
import { X, Star, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';
import { ToolItem } from '../../types';
import AiPromptGeneratorModal from './AiPromptGeneratorModal';
import ImagePromptGeneratorModal from './ImagePromptGeneratorModal';
import YoutubeTitleGeneratorModal from './YoutubeTitleGeneratorModal';
import ImageCompressorModal from './ImageCompressorModal';
import ImageResizerModal from './ImageResizerModal';
import EmiCalculatorModal from './EmiCalculatorModal';
import AgeCalculatorModal from './AgeCalculatorModal';
import PercentageCalculatorModal from './PercentageCalculatorModal';
import DiscountCalculatorModal from './DiscountCalculatorModal';
import GstCalculatorModal from './GstCalculatorModal';
import QrCodeGeneratorModal from './QrCodeGeneratorModal';
import WordCounterModal from './WordCounterModal';
import PasswordGeneratorModal from './PasswordGeneratorModal';
import HashtagGeneratorModal from './HashtagGeneratorModal';
import TextCaseConverterModal from './TextCaseConverterModal';

interface Props {
  tool: ToolItem | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export default function UniversalToolModal({ tool, onClose, isFavorite, onToggleFavorite }: Props) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!tool) return null;

  const renderToolBody = () => {
    switch (tool.id) {
      case 'ai-prompt-generator':
        return <AiPromptGeneratorModal onClose={onClose} />;
      case 'image-prompt-generator':
        return <ImagePromptGeneratorModal onClose={onClose} />;
      case 'youtube-title-generator':
        return <YoutubeTitleGeneratorModal onClose={onClose} />;
      case 'image-compressor':
        return <ImageCompressorModal onClose={onClose} />;
      case 'image-resizer':
        return <ImageResizerModal onClose={onClose} />;
      case 'emi-calculator':
        return <EmiCalculatorModal onClose={onClose} />;
      case 'age-calculator':
        return <AgeCalculatorModal onClose={onClose} />;
      case 'percentage-calculator':
        return <PercentageCalculatorModal onClose={onClose} />;
      case 'discount-calculator':
        return <DiscountCalculatorModal onClose={onClose} />;
      case 'gst-calculator':
        return <GstCalculatorModal onClose={onClose} />;
      case 'qr-code-generator':
        return <QrCodeGeneratorModal onClose={onClose} />;
      case 'word-counter':
        return <WordCounterModal onClose={onClose} />;
      case 'password-generator':
        return <PasswordGeneratorModal onClose={onClose} />;
      case 'hashtag-generator':
        return <HashtagGeneratorModal onClose={onClose} />;
      case 'text-case-converter':
        return <TextCaseConverterModal onClose={onClose} />;
      default:
        return <AiPromptGeneratorModal onClose={onClose} />;
    }
  };

  return (
    <div
      id="tool-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="tool-modal-container"
        className="bg-zinc-950 border border-zinc-800 rounded-t-3xl sm:rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-800/80 bg-zinc-900/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-2xl sm:text-3xl p-2 rounded-xl bg-zinc-900 border border-zinc-800">
              {tool.emoji}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">{tool.title}</h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  100% Free
                </span>
              </div>
              <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">{tool.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              id="btn-favorite-modal"
              type="button"
              onClick={() => onToggleFavorite(tool.id)}
              className={`p-2 rounded-xl transition cursor-pointer ${
                isFavorite
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
              title={isFavorite ? 'Remove from Saved' : 'Save to Favorites'}
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
            </button>
            <button
              id="btn-close-tool-modal"
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 overscroll-contain">
          {renderToolBody()}
        </div>

        {/* Modal Footer Note */}
        <div className="px-5 py-3 border-t border-zinc-800/60 bg-zinc-900/40 text-[11px] text-zinc-400 flex items-center justify-between shrink-0">
          <span className="flex items-center gap-1.5 text-zinc-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            ToolMitra AI &bull; Instant & Private in your browser
          </span>
          <span className="text-zinc-400 font-mono text-[10px]">No login needed</span>
        </div>
      </div>
    </div>
  );
}
