import React from 'react';
import { ShieldCheck, Lock, EyeOff, Server, HardDrive, CheckCircle2 } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-8 text-zinc-100">
      {/* Header Banner */}
      <div className="border-b border-zinc-800/80 pb-6">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Security &amp; Data Protection</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Privacy Policy
        </h2>
        <p className="text-sm text-zinc-400 mt-2 max-w-3xl leading-relaxed">
          At ToolMitra AI, we operate on a strict <strong>Privacy-First &amp; Client-Side architecture</strong>. Your data belongs to you alone.
        </p>
      </div>

      {/* Highlights Banner */}
      <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-start gap-3">
          <Lock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">100% In-Browser</h4>
            <p className="text-xs text-zinc-300 mt-0.5">Files and images never leave your local device memory.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <EyeOff className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Zero Data Logging</h4>
            <p className="text-xs text-zinc-300 mt-0.5">No personal tracking, cookies, or hidden tracking pixels.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Server className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">No User Accounts</h4>
            <p className="text-xs text-zinc-300 mt-0.5">No login, email collection, or passwords required.</p>
          </div>
        </div>
      </div>

      {/* Detailed Policy Sections */}
      <div className="space-y-6 text-xs sm:text-sm text-zinc-300 leading-relaxed">
        <section className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-black">1</span>
            <span>Client-Side Data Processing</span>
          </h3>
          <p>
            The majority of our utilities—including the <strong>Image Compressor</strong>, <strong>Image Resizer</strong>, <strong>QR Code Generator</strong>, <strong>EMI Loan Calculator</strong>, <strong>Age Calculator</strong>, <strong>GST Calculator</strong>, <strong>Word Counter</strong>, <strong>Password Generator</strong>, and <strong>Text Case Converter</strong>—execute 100% on your device using HTML5 Canvas and native JavaScript.
          </p>
          <p className="text-zinc-400">
            When you select a photo to compress or resize, your browser directly decodes and processes the pixel buffer in your RAM. None of your photos, documents, passwords, or personal calculations are sent to external databases or servers.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-black">2</span>
            <span>Information We Do Not Collect</span>
          </h3>
          <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
            <li>We do not collect names, phone numbers, or physical addresses without your explicit contact form submission.</li>
            <li>We do not log user IP addresses or browser fingerprints.</li>
            <li>We do not sell, rent, or trade any user information to third-party data brokers or advertisers.</li>
          </ul>
        </section>

        <section className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-black">3</span>
            <span>Local Storage &amp; User Preferences</span>
          </h3>
          <p>
            To enhance your experience, ToolMitra saves your marked <em>Favorite Tools</em> directly in your browser's <code className="text-indigo-300 bg-zinc-900 px-1.5 py-0.5 rounded">localStorage</code>. This data stays exclusively on your machine and can be cleared at any time by wiping your browser site data.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-black">4</span>
            <span>Contact Information</span>
          </h3>
          <p>
            If you have questions about this Privacy Policy or wish to verify our client-side architecture, contact founder <strong>Mohd Adnan</strong> at <a href="mailto:mohd.adnan.ze92@gmail.com" className="text-indigo-400 underline">mohd.adnan.ze92@gmail.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
