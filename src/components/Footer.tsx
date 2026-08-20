import React from 'react';
import { Sparkles, Heart, ShieldCheck, Mail, Info, FileText, AlertTriangle, Phone, MessageSquare } from 'lucide-react';
import { CategoryId } from '../types';
import { CATEGORIES } from '../data/toolsData';

interface Props {
  onLoadPage: (pageId: string) => void;
  onSelectCategory: (cat: CategoryId) => void;
}

export default function Footer({ onLoadPage, onSelectCategory }: Props) {
  return (
    <footer id="toolmitra-footer" className="border-t border-zinc-800/80 bg-zinc-950 text-zinc-400 pb-20 md:pb-12 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-zinc-800/60">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-[1px]">
                <div className="w-full h-full bg-zinc-950 rounded-[11px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                </div>
              </div>
              <span className="text-lg font-black text-white tracking-tight">ToolMitra AI</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              <strong className="text-zinc-200">Har Kaam Ka Smart Online Tool.</strong> All-in-one smart online tool platform built by <strong className="text-indigo-300">Mohd Adnan</strong> offering free, client-side, privacy-first AI &amp; web utilities.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Free &bull; Zero Data Logging</span>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">Tool Categories</h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectCategory(cat.id);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="hover:text-indigo-400 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{cat.emoji}</span>
                    <span>{cat.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tools Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">Popular Utilities</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onLoadPage('ai-prompt-generator')}
                  className="hover:text-indigo-400 transition cursor-pointer text-left"
                >
                  AI Prompt Generator
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onLoadPage('qr-code-generator')}
                  className="hover:text-indigo-400 transition cursor-pointer text-left"
                >
                  QR Code Generator (UPI / WiFi)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onLoadPage('image-compressor')}
                  className="hover:text-indigo-400 transition cursor-pointer text-left"
                >
                  Image Compressor
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onLoadPage('emi-calculator')}
                  className="hover:text-indigo-400 transition cursor-pointer text-left"
                >
                  EMI Calculator (Loan)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onLoadPage('youtube-title-generator')}
                  className="hover:text-indigo-400 transition cursor-pointer text-left"
                >
                  YouTube Viral Title Generator
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Company Links using single page navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">Company &amp; Legal</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  id="footer-link-about"
                  type="button"
                  onClick={() => onLoadPage('about')}
                  className="hover:text-indigo-300 text-zinc-300 transition flex items-center gap-1.5 cursor-pointer group"
                >
                  <Info className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
                  <span>About ToolMitra</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-contact"
                  type="button"
                  onClick={() => onLoadPage('contact')}
                  className="hover:text-indigo-300 text-zinc-300 transition flex items-center gap-1.5 cursor-pointer group"
                >
                  <Mail className="w-3.5 h-3.5 text-violet-400 group-hover:scale-110 transition-transform" />
                  <span>Contact &amp; Support</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-privacy"
                  type="button"
                  onClick={() => onLoadPage('privacy')}
                  className="hover:text-indigo-300 text-zinc-300 transition flex items-center gap-1.5 cursor-pointer group"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-terms"
                  type="button"
                  onClick={() => onLoadPage('terms')}
                  className="hover:text-indigo-300 text-zinc-300 transition flex items-center gap-1.5 cursor-pointer group"
                >
                  <FileText className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
                  <span>Terms &amp; Conditions</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-disclaimer"
                  type="button"
                  onClick={() => onLoadPage('disclaimer')}
                  className="hover:text-indigo-300 text-zinc-300 transition flex items-center gap-1.5 cursor-pointer group"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>Disclaimer</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Founder Direct Quick Connect Banner */}
        <div className="py-6 border-b border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-zinc-300">
            <span className="font-semibold text-white">Founder &amp; Owner:</span>
            <span>Mohd Adnan</span>
            <span className="text-zinc-600">&bull;</span>
            <a
              href="mailto:mohd.adnan.ze92@gmail.com"
              className="text-indigo-400 hover:text-indigo-300 transition underline underline-offset-2 flex items-center gap-1"
            >
              <Mail className="w-3 h-3" />
              <span>mohd.adnan.ze92@gmail.com</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:+919193393089"
              className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 flex items-center gap-1.5 transition text-[11px] font-medium"
            >
              <Phone className="w-3 h-3 text-indigo-400" />
              <span>+91 9193393089</span>
            </a>
            <a
              href="https://wa.me/919193393089"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5 transition text-[11px] font-semibold"
            >
              <MessageSquare className="w-3 h-3" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 text-center sm:text-left">
          <div>
            &copy; {new Date().getFullYear()} ToolMitra AI. Built by <strong className="text-zinc-400">Mohd Adnan</strong>. Free for commercial and personal use.
          </div>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for creators worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
