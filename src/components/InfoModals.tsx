import React, { useState } from 'react';
import { X, ShieldCheck, Mail, Info, FileText, AlertTriangle, CheckCircle2, Send } from 'lucide-react';
import { InfoModalType } from '../types';

interface Props {
  type: InfoModalType;
  onClose: () => void;
}

export default function InfoModals({ type, onClose }: Props) {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSent, setContactSent] = useState(false);

  if (!type) return null;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactMsg) return;
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      onClose();
    }, 2500);
  };

  const getModalConfig = () => {
    switch (type) {
      case 'about':
        return {
          title: 'About ToolMitra AI',
          icon: Info,
          content: (
            <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              <p>
                <strong>ToolMitra AI</strong> is India's most versatile free platform for AI generators, photo utilities, financial calculators, and social media tools — designed with the mission: <span className="text-indigo-400 font-semibold">"Har Kaam Ka Smart Online Tool"</span>.
              </p>
              <h4 className="text-sm font-bold text-white pt-2">Why ToolMitra AI?</h4>
              <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
                <li><strong className="text-zinc-200">100% Free:</strong> No hidden credit systems, paywalls, or mandatory signups.</li>
                <li><strong className="text-zinc-200">Privacy-First:</strong> Browser-based tools (like Image Compressor, Word Counter, Age Calculator) process your files and data directly on your device.</li>
                <li><strong className="text-zinc-200">Mobile-First Android Experience:</strong> Fast loading, touch targets, and lightweight bundle designed for every smartphone and screen size.</li>
                <li><strong className="text-zinc-200">Gemini Powered:</strong> Powered by modern generative AI capabilities for creative prompts and viral hooks.</li>
              </ul>
            </div>
          ),
        };

      case 'contact':
        return {
          title: 'Contact & Tool Requests',
          icon: Mail,
          content: (
            <div className="space-y-4 text-xs sm:text-sm">
              <p className="text-zinc-400 leading-relaxed">
                Have a tool suggestion, feature request, or partnership inquiry? Send us a message and our team will get back to you!
              </p>

              {contactSent ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center flex flex-col items-center gap-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  <h4 className="text-sm font-bold text-white">Thank You for Your Feedback!</h4>
                  <p className="text-xs text-zinc-400">We have received your message and will review your tool request shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Adnan"
                      className="w-full rounded-xl bg-zinc-900 border border-zinc-700/80 px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-xl bg-zinc-900 border border-zinc-700/80 px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Message or Tool Request</label>
                    <textarea
                      required
                      rows={3}
                      value={contactMsg}
                      onChange={(e) => setContactMsg(e.target.value)}
                      placeholder="Describe what new tool you'd like to see or your query..."
                      className="w-full rounded-xl bg-zinc-900 border border-zinc-700/80 px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          ),
        };

      case 'privacy':
        return {
          title: 'Privacy Policy',
          icon: ShieldCheck,
          content: (
            <div className="space-y-3 text-xs text-zinc-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
              <p>Last Updated: August 2026</p>
              <h4 className="text-sm font-bold text-white">1. Data Minimization</h4>
              <p>ToolMitra AI is built around privacy-by-design. We do not require account registration, email verification, or credit card information to use any of our standard tools.</p>
              <h4 className="text-sm font-bold text-white">2. In-Browser Local Processing</h4>
              <p>Utilities such as the Image Compressor, Age Calculator, Word Counter, Password Generator, and GST Calculator run purely within your browser using standard HTML5 Canvas and JavaScript. Your files are not transmitted to any remote database.</p>
              <h4 className="text-sm font-bold text-white">3. Local Storage</h4>
              <p>We store your saved favorite tools and UI preferences locally in your web browser via localStorage. You can clear this anytime by resetting your browser cookies or cache.</p>
            </div>
          ),
        };

      case 'terms':
        return {
          title: 'Terms & Conditions',
          icon: FileText,
          content: (
            <div className="space-y-3 text-xs text-zinc-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
              <p>Last Updated: August 2026</p>
              <h4 className="text-sm font-bold text-white">1. Acceptance of Terms</h4>
              <p>By using ToolMitra AI, you agree to access our online services for lawful, creative, educational, and business purposes in compliance with applicable laws.</p>
              <h4 className="text-sm font-bold text-white">2. Free Commercial & Personal License</h4>
              <p>All outputs generated using ToolMitra AI tools (including prompts, converted text, compressed imagery, and calculations) are 100% free for your commercial and personal use without royalty requirements.</p>
              <h4 className="text-sm font-bold text-white">3. Availability</h4>
              <p>We strive for 99.9% uptime, but tools are provided on an "as is" and "as available" basis.</p>
            </div>
          ),
        };

      case 'disclaimer':
        return {
          title: 'Disclaimer',
          icon: AlertTriangle,
          content: (
            <div className="space-y-3 text-xs text-zinc-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
              <h4 className="text-sm font-bold text-white">General & Financial Information Disclaimer</h4>
              <p>The calculators (such as the EMI Calculator and GST Calculator) are intended for estimation, planning, and informational purposes only. Actual loan EMIs, bank charges, and tax assessments may vary according to financial institutions, processing fees, and government regulatory revisions.</p>
              <h4 className="text-sm font-bold text-white">AI Content Disclaimer</h4>
              <p>AI prompt and title generators produce suggestions based on artificial intelligence algorithms. Users are encouraged to review, adapt, and refine outputs before deployment in mission-critical applications.</p>
            </div>
          ),
        };

      default:
        return { title: 'Information', icon: Info, content: null };
    }
  };

  const config = getModalConfig();
  const Icon = config.icon;

  return (
    <div
      id="info-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="info-modal-content"
        className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Icon className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">{config.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5">{config.content}</div>
      </div>
    </div>
  );
}
