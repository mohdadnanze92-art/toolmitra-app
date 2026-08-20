import React, { useState } from 'react';
import { Percent, ArrowRight, Copy, Check, RotateCcw, Calculator, Sparkles, HelpCircle } from 'lucide-react';

interface Props {
  onClose: () => void;
}

type CalcMode = 'percent_of' | 'is_what_percent' | 'change' | 'add_subtract' | 'fraction';

export default function PercentageCalculatorModal({ onClose }: Props) {
  const [mode, setMode] = useState<CalcMode>('percent_of');
  const [valA, setValA] = useState<string>('15');
  const [valB, setValB] = useState<string>('250');
  const [addOrSub, setAddOrSub] = useState<'add' | 'sub'>('add');
  const [copied, setCopied] = useState<boolean>(false);

  const numA = parseFloat(valA) || 0;
  const numB = parseFloat(valB) || 0;

  // Calculation results & steps
  let resultText = '';
  let formulaText = '';
  let resultNum: number | null = null;
  let isIncrease = true;

  if (mode === 'percent_of') {
    // What is A% of B?
    resultNum = (numA * numB) / 100;
    resultText = `${numA}% of ${numB} = ${Number(resultNum.toFixed(4))}`;
    formulaText = `Formula: (${numA} × ${numB}) ÷ 100 = ${Number(resultNum.toFixed(4))}`;
  } else if (mode === 'is_what_percent') {
    // A is what % of B?
    if (numB !== 0) {
      resultNum = (numA / numB) * 100;
      resultText = `${numA} is ${Number(resultNum.toFixed(4))}% of ${numB}`;
      formulaText = `Formula: (${numA} ÷ ${numB}) × 100 = ${Number(resultNum.toFixed(4))}%`;
    } else {
      resultText = 'Cannot divide by zero';
      formulaText = 'Please enter a non-zero base number';
    }
  } else if (mode === 'change') {
    // Percentage change from A to B
    if (numA !== 0) {
      const diff = numB - numA;
      resultNum = (diff / numA) * 100;
      isIncrease = diff >= 0;
      resultText = `${isIncrease ? 'Increase' : 'Decrease'} of ${Math.abs(Number(resultNum.toFixed(4)))}% (from ${numA} to ${numB})`;
      formulaText = `Formula: ((${numB} - ${numA}) ÷ ${numA}) × 100 = ${Number(resultNum.toFixed(4))}%`;
    } else {
      resultText = 'Initial value cannot be zero';
      formulaText = 'Please enter a non-zero starting value';
    }
  } else if (mode === 'add_subtract') {
    // Add/Subtract A% to/from B
    const delta = (numB * numA) / 100;
    resultNum = addOrSub === 'add' ? numB + delta : numB - delta;
    resultText = `${numB} ${addOrSub === 'add' ? '+' : '-'} ${numA}% = ${Number(resultNum.toFixed(4))}`;
    formulaText = `Adjustment: ${delta.toFixed(2)} | Final: ${numB} ${addOrSub === 'add' ? '+' : '-'} ${delta.toFixed(2)} = ${Number(resultNum.toFixed(4))}`;
  } else if (mode === 'fraction') {
    // Fraction A/B to %
    if (numB !== 0) {
      resultNum = (numA / numB) * 100;
      resultText = `${numA}/${numB} = ${Number(resultNum.toFixed(4))}%`;
      formulaText = `Formula: (${numA} ÷ ${numB}) × 100 = ${Number(resultNum.toFixed(4))}% (Decimal: ${(numA / numB).toFixed(4)})`;
    } else {
      resultText = 'Denominator cannot be zero';
      formulaText = 'Please enter a valid non-zero denominator';
    }
  }

  const handleCopy = () => {
    if (!resultText) return;
    navigator.clipboard.writeText(`${resultText}\n${formulaText}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setValA('');
    setValB('');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Mode Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {[
          { id: 'percent_of', label: 'What is X% of Y?' },
          { id: 'is_what_percent', label: 'X is what % of Y?' },
          { id: 'change', label: '% Increase / Decrease' },
          { id: 'add_subtract', label: 'Add / Subtract %' },
          { id: 'fraction', label: 'Fraction (X/Y) to %' },
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setMode(item.id as CalcMode)}
            className={`py-2 px-3 rounded-xl text-xs font-semibold transition text-center border cursor-pointer ${
              mode === item.id
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Inputs Form */}
      <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
        {mode === 'percent_of' && (
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-full flex-1">
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Percentage (%)</label>
              <div className="relative">
                <input
                  id="calc-input-percent"
                  type="number"
                  step="any"
                  value={valA}
                  onChange={(e) => setValA(e.target.value)}
                  placeholder="e.g. 15"
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-700/80 px-3.5 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 font-mono"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 font-bold text-xs">%</span>
              </div>
            </div>
            <span className="text-zinc-500 text-xs font-semibold pt-4 sm:pt-6">of</span>
            <div className="w-full flex-1">
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Total Value</label>
              <input
                id="calc-input-total"
                type="number"
                step="any"
                value={valB}
                onChange={(e) => setValB(e.target.value)}
                placeholder="e.g. 250"
                className="w-full rounded-xl bg-zinc-950 border border-zinc-700/80 px-3.5 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>
        )}

        {mode === 'is_what_percent' && (
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-full flex-1">
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Part Value (X)</label>
              <input
                type="number"
                step="any"
                value={valA}
                onChange={(e) => setValA(e.target.value)}
                placeholder="e.g. 45"
                className="w-full rounded-xl bg-zinc-950 border border-zinc-700/80 px-3.5 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
            <span className="text-zinc-500 text-xs font-semibold pt-4 sm:pt-6">is what % of</span>
            <div className="w-full flex-1">
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Whole / Base (Y)</label>
              <input
                type="number"
                step="any"
                value={valB}
                onChange={(e) => setValB(e.target.value)}
                placeholder="e.g. 180"
                className="w-full rounded-xl bg-zinc-950 border border-zinc-700/80 px-3.5 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>
        )}

        {mode === 'change' && (
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-full flex-1">
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Original Starting Value</label>
              <input
                type="number"
                step="any"
                value={valA}
                onChange={(e) => setValA(e.target.value)}
                placeholder="e.g. 100"
                className="w-full rounded-xl bg-zinc-950 border border-zinc-700/80 px-3.5 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
            <span className="text-zinc-500 text-xs font-semibold pt-4 sm:pt-6">to</span>
            <div className="w-full flex-1">
              <label className="block text-xs font-semibold text-zinc-400 mb-1">New Final Value</label>
              <input
                type="number"
                step="any"
                value={valB}
                onChange={(e) => setValB(e.target.value)}
                placeholder="e.g. 135"
                className="w-full rounded-xl bg-zinc-950 border border-zinc-700/80 px-3.5 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>
        )}

        {mode === 'add_subtract' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAddOrSub('add')}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold border ${
                  addOrSub === 'add'
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800'
                }`}
              >
                + Add Percentage
              </button>
              <button
                type="button"
                onClick={() => setAddOrSub('sub')}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold border ${
                  addOrSub === 'sub'
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800'
                }`}
              >
                - Subtract Percentage
              </button>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="w-full flex-1">
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Base Amount</label>
                <input
                  type="number"
                  step="any"
                  value={valB}
                  onChange={(e) => setValB(e.target.value)}
                  placeholder="e.g. 500"
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-700/80 px-3.5 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
              <div className="w-full flex-1">
                <label className="block text-xs font-semibold text-zinc-400 mb-1">
                  Percentage to {addOrSub === 'add' ? 'Add' : 'Subtract'} (%)
                </label>
                <input
                  type="number"
                  step="any"
                  value={valA}
                  onChange={(e) => setValA(e.target.value)}
                  placeholder="e.g. 18"
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-700/80 px-3.5 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {mode === 'fraction' && (
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-full flex-1">
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Numerator (Top Number)</label>
              <input
                type="number"
                step="any"
                value={valA}
                onChange={(e) => setValA(e.target.value)}
                placeholder="e.g. 3"
                className="w-full rounded-xl bg-zinc-950 border border-zinc-700/80 px-3.5 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
            <span className="text-zinc-500 text-lg font-bold pt-4 sm:pt-6">/</span>
            <div className="w-full flex-1">
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Denominator (Bottom Number)</label>
              <input
                type="number"
                step="any"
                value={valB}
                onChange={(e) => setValB(e.target.value)}
                placeholder="e.g. 8"
                className="w-full rounded-xl bg-zinc-950 border border-zinc-700/80 px-3.5 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>
        )}

        {/* Action button row */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] text-zinc-500 font-medium">Quick % presets:</span>
            {['5', '10', '18', '20', '50'].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setValA(p)}
                className="px-2 py-0.5 rounded text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition"
              >
                {p}%
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-1 text-xs text-zinc-400 hover:text-red-400 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>
      </div>

      {/* Result Display Box */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-zinc-900 to-zinc-900 border border-emerald-500/30 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
            <Calculator className="w-4 h-4" />
            Calculated Result
          </span>
          <button
            id="btn-copy-percentage-result"
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-800 hover:bg-emerald-600 text-xs font-medium text-zinc-200 hover:text-white transition cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy
              </>
            )}
          </button>
        </div>

        <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 text-center">
          <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
            {resultText || '0'}
          </div>
          <p className="text-xs text-zinc-400 font-mono mt-2">{formulaText}</p>
        </div>
      </div>
    </div>
  );
}
