import React from 'react';
import { AlertTriangle, ShieldAlert, Cpu, Calculator, Info } from 'lucide-react';

export default function DisclaimerPage() {
  return (
    <div className="space-y-8 text-zinc-100">
      {/* Header Banner */}
      <div className="border-b border-zinc-800/80 pb-6">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
          <AlertTriangle className="w-4 h-4" />
          <span>Important Advisory</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          General &amp; Legal Disclaimer
        </h2>
        <p className="text-sm text-zinc-400 mt-2 max-w-3xl leading-relaxed">
          Please read this disclaimer carefully regarding calculation estimates, AI-generated suggestions, and third-party references on ToolMitra AI.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-6 text-xs sm:text-sm text-zinc-300 leading-relaxed">
        {/* Financial Disclaimer */}
        <section className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2 text-amber-400">
            <Calculator className="w-5 h-5" />
            <span>1. Financial &amp; Tax Calculators Disclaimer</span>
          </h3>
          <p>
            Calculators available on ToolMitra AI (including the <strong>EMI Loan Calculator</strong>, <strong>GST Calculator</strong>, <strong>Percentage Calculator</strong>, and <strong>Discount Calculator</strong>) are mathematical tools designed for general estimation and planning purposes only.
          </p>
          <p className="text-zinc-400">
            Actual loan repayment schedules, interest accruals, bank processing fees, and GST tax filings depend on specific terms set by banks, financial institutions, and the Government of India or your local jurisdiction. Users should consult a qualified chartered accountant (CA) or financial advisor before making significant financial commitments.
          </p>
        </section>

        {/* AI Disclaimer */}
        <section className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2 text-indigo-400">
            <Cpu className="w-5 h-5" />
            <span>2. AI Generated Content Disclaimer</span>
          </h3>
          <p>
            The <strong>AI Prompt Generator</strong> and <strong>YouTube Title Generator</strong> produce creative suggestions using artificial intelligence models. While designed to be engaging, high-converting, and stylistically rich, outputs are provided "as-is".
          </p>
          <p className="text-zinc-400">
            ToolMitra does not guarantee specific ranking improvements, virality, or views. Users are advised to review and modify AI outputs to match their brand guidelines and audience.
          </p>
        </section>

        {/* "As Is" Warranty */}
        <section className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2 text-rose-400">
            <ShieldAlert className="w-5 h-5" />
            <span>3. Limitation of Liability</span>
          </h3>
          <p>
            ToolMitra AI and its creator Mohd Adnan shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use of or inability to use the platform, including data inaccuracies or downtime.
          </p>
        </section>
      </div>
    </div>
  );
}
