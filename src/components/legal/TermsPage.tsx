import React from 'react';
import { FileText, CheckCircle2, AlertCircle, Scale, ShieldCheck } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="space-y-8 text-zinc-100">
      {/* Header Banner */}
      <div className="border-b border-zinc-800/80 pb-6">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
          <FileText className="w-4 h-4" />
          <span>User Agreement &amp; Fair Usage</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Terms &amp; Conditions
        </h2>
        <p className="text-sm text-zinc-400 mt-2 max-w-3xl leading-relaxed">
          Welcome to ToolMitra AI. By utilizing our tools, you agree to the standard terms of service, fair usage guidelines, and free licensing outlined below.
        </p>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <h4 className="text-sm font-bold text-white">100% Free License</h4>
          <p className="text-xs text-zinc-400">Personal &amp; commercial use allowed without royalties.</p>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2">
          <Scale className="w-5 h-5 text-indigo-400" />
          <h4 className="text-sm font-bold text-white">Fair Usage</h4>
          <p className="text-xs text-zinc-400">Respectful access without automated scraping or attacks.</p>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2">
          <ShieldCheck className="w-5 h-5 text-violet-400" />
          <h4 className="text-sm font-bold text-white">No Hidden Fees</h4>
          <p className="text-xs text-zinc-400">No paywalls, subscriptions, or credit card requirements.</p>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-6 text-xs sm:text-sm text-zinc-300 leading-relaxed">
        <section className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-3">
          <h3 className="text-base font-bold text-white">1. Acceptance of Terms</h3>
          <p>
            By accessing or using <strong>ToolMitra AI</strong> (developed by Mohd Adnan), you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may discontinue use of the platform at any time.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-3">
          <h3 className="text-base font-bold text-white">2. Free Commercial &amp; Personal Use</h3>
          <p>
            All content generated using ToolMitra AI—including visual prompts, resized images, generated QR codes, calculated loan schedules, generated passwords, and hashtag collections—is granted to you with a perpetual, royalty-free license for both personal and commercial projects.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-3">
          <h3 className="text-base font-bold text-white">3. Acceptable Conduct</h3>
          <p>You agree not to:</p>
          <ul className="list-disc pl-5 space-y-1 text-zinc-400">
            <li>Use our utilities to generate unlawful, malicious, defamatory, or harmful content.</li>
            <li>Attempt to bypass security measures or execute automated denial-of-service attempts.</li>
            <li>Misrepresent AI-generated content as certified financial, legal, or medical advice.</li>
          </ul>
        </section>

        <section className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-3">
          <h3 className="text-base font-bold text-white">4. Modifications to the Service</h3>
          <p>
            ToolMitra reserves the right to introduce new tools, update algorithms, or refine interfaces periodically to improve user experience without prior individual notice.
          </p>
        </section>
      </div>
    </div>
  );
}
