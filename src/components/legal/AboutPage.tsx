import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Code2,
  Lock,
  Heart,
  Cpu,
  Smartphone,
  Globe2,
  CheckCircle2,
  Mail,
  User,
  ArrowRight,
} from 'lucide-react';

interface Props {
  onOpenContact?: () => void;
}

export default function AboutPage({ onOpenContact }: Props) {
  return (
    <div className="space-y-8 text-zinc-100">
      {/* Header Banner */}
      <div className="border-b border-zinc-800/80 pb-6">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Our Vision &amp; Mission</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          About ToolMitra AI
        </h2>
        <p className="text-sm text-zinc-400 mt-2 max-w-3xl leading-relaxed">
          An all-in-one smart online tool platform built by <strong className="text-zinc-200">Mohd Adnan</strong> offering free, client-side, privacy-first AI and web utilities for creators, professionals, and students.
        </p>
      </div>

      {/* Core Mission Spotlight Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-zinc-950 border border-indigo-500/20 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold">
            Har Kaam Ka Smart Online Tool
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight max-w-2xl">
            Empowering everyday digital tasks with instant, frictionless &amp; private online utilities.
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-3xl leading-relaxed">
            The modern web is filled with bloated software, aggressive ads, hidden credit cards, and forced registrations just to resize a photo or generate a simple QR code. <strong>ToolMitra AI</strong> was engineered to bring back high-speed, 100% private, and completely free web utilities directly inside your browser.
          </p>
        </div>
      </div>

      {/* Founder & Engineering Story */}
      <div className="p-6 sm:p-7 rounded-3xl bg-zinc-950/90 border border-zinc-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-xl shadow-lg">
              MA
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Mohd Adnan</h3>
                <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 text-[10px] font-bold border border-indigo-500/20">
                  Creator &amp; Architect
                </span>
              </div>
              <p className="text-xs text-zinc-400">Software Engineer &bull; Open Web Advocate</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="mailto:mohd.adnan.ze92@gmail.com"
              className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-semibold text-zinc-200 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-indigo-400" />
              <span>Email Founder</span>
            </a>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
          "I designed ToolMitra with a simple belief: the tools we use every single day—whether writing Midjourney visual prompts, converting text casing, compressing an identity card photo, or calculating EMI loans—should be fast, lightweight, visually appealing, and respectful of user data."
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Pillar 1 */}
        <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Lock className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-white">100% Client-Side Privacy</h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Image compression, calculations, and text transformations happen strictly inside your browser's memory without unauthorized server uploads.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Cpu className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-white">Modern AI Workflows</h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Engineered prompt builders for Midjourney v6, DALL-E 3, Flux, and ChatGPT with rich visual style selectors and aspect ratio formats.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-emerald-500/20 flex items-center justify-center text-amber-400">
            <Zap className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-white">Zero Account Requirement</h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            No signup forms, passwords, or subscriptions. All 15+ utilities are instantly accessible the moment you open the page.
          </p>
        </div>

        {/* Pillar 4 */}
        <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Smartphone className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-white">Mobile-First Android Precision</h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Crafted with responsive layouts, 44px+ touch targets, and offline-ready local storage so it works seamlessly on any mobile phone.
          </p>
        </div>
      </div>
    </div>
  );
}
