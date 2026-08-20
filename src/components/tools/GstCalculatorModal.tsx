import React, { useState } from 'react';
import { IndianRupee, Percent, Calculator, ArrowRight } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function GstCalculatorModal({ onClose }: Props) {
  const [amount, setAmount] = useState<number>(10000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [gstType, setGstType] = useState<'exclusive' | 'inclusive'>('exclusive');

  // Calculation
  let netAmount = 0;
  let gstAmount = 0;
  let totalAmount = 0;

  if (gstType === 'exclusive') {
    // GST is added on top of base amount
    netAmount = amount;
    gstAmount = (amount * gstRate) / 100;
    totalAmount = netAmount + gstAmount;
  } else {
    // GST is included in the entered amount
    totalAmount = amount;
    netAmount = (amount * 100) / (100 + gstRate);
    gstAmount = totalAmount - netAmount;
  }

  const cgst = gstAmount / 2;
  const sgst = gstAmount / 2;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(val);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Inputs */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
            Initial Amount (₹)
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">₹</span>
            <input
              type="number"
              value={amount || ''}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Enter amount..."
              className="w-full rounded-xl bg-zinc-900 border border-zinc-700/80 pl-8 pr-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-teal-500 font-mono"
            />
          </div>
        </div>

        {/* GST Type Switcher */}
        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1.5">GST Calculation Mode</label>
          <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-zinc-900 border border-zinc-800">
            <button
              type="button"
              onClick={() => setGstType('exclusive')}
              className={`py-2 px-3 rounded-lg text-xs font-semibold transition ${
                gstType === 'exclusive'
                  ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              GST Exclusive (+ Add GST)
            </button>
            <button
              type="button"
              onClick={() => setGstType('inclusive')}
              className={`py-2 px-3 rounded-lg text-xs font-semibold transition ${
                gstType === 'inclusive'
                  ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              GST Inclusive (- Remove GST)
            </button>
          </div>
        </div>

        {/* GST Rate Slabs */}
        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1.5">GST Rate Slab</label>
          <div className="grid grid-cols-4 gap-2">
            {[5, 12, 18, 28].map((rate) => (
              <button
                key={rate}
                type="button"
                onClick={() => setGstRate(rate)}
                className={`py-2.5 rounded-xl text-xs font-bold transition border ${
                  gstRate === rate
                    ? 'bg-teal-500 text-white border-teal-400 shadow-md shadow-teal-900/30'
                    : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {rate}%
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Breakdown */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-teal-950/40 via-zinc-900 to-zinc-900 border border-teal-500/30 space-y-4">
        <div className="flex flex-col items-center justify-center text-center p-3 rounded-xl bg-teal-500/10 border border-teal-500/20">
          <span className="text-xs text-teal-300 font-medium">
            {gstType === 'exclusive' ? 'Total Amount (With GST)' : 'Net Amount (Base Price)'}
          </span>
          <span className="text-3xl font-black text-white mt-1 font-mono tracking-tight">
            {formatCurrency(gstType === 'exclusive' ? totalAmount : netAmount)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <span className="text-[11px] text-zinc-400">Total GST ({gstRate}%)</span>
            <p className="text-sm sm:text-base font-bold text-teal-400 mt-0.5 font-mono">
              {formatCurrency(gstAmount)}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <span className="text-[11px] text-zinc-400">Base Net Price</span>
            <p className="text-sm sm:text-base font-bold text-zinc-200 mt-0.5 font-mono">
              {formatCurrency(netAmount)}
            </p>
          </div>
        </div>

        {/* CGST / SGST Split */}
        <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 flex items-center justify-between text-xs">
          <span className="text-zinc-400">CGST (Central: {gstRate / 2}%)</span>
          <span className="font-semibold text-zinc-200 font-mono">{formatCurrency(cgst)}</span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400">SGST (State: {gstRate / 2}%)</span>
          <span className="font-semibold text-zinc-200 font-mono">{formatCurrency(sgst)}</span>
        </div>
      </div>
    </div>
  );
}
