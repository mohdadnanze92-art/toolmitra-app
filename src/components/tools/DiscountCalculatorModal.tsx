import React, { useState } from 'react';
import { Tag, IndianRupee, Percent, Calculator, Copy, Check, RotateCcw, ArrowRight } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function DiscountCalculatorModal({ onClose }: Props) {
  const [originalPrice, setOriginalPrice] = useState<string>('2499');
  const [discountPercent, setDiscountPercent] = useState<string>('25');
  const [additionalDiscount, setAdditionalDiscount] = useState<string>('0');
  const [taxPercent, setTaxPercent] = useState<string>('0');
  const [copied, setCopied] = useState<boolean>(false);

  const price = parseFloat(originalPrice) || 0;
  const disc1 = parseFloat(discountPercent) || 0;
  const disc2 = parseFloat(additionalDiscount) || 0;
  const tax = parseFloat(taxPercent) || 0;

  // Primary discount
  const primaryDiscountAmount = (price * disc1) / 100;
  const afterFirstDiscount = price - primaryDiscountAmount;

  // Additional secondary discount (stacked)
  const secondaryDiscountAmount = (afterFirstDiscount * disc2) / 100;
  const afterSecondDiscount = afterFirstDiscount - secondaryDiscountAmount;

  // Total savings
  const totalSavings = primaryDiscountAmount + secondaryDiscountAmount;

  // Tax on discounted amount
  const taxAmount = (afterSecondDiscount * tax) / 100;
  const finalPayablePrice = afterSecondDiscount + taxAmount;

  const totalDiscountPercentage = price > 0 ? ((totalSavings / price) * 100).toFixed(1) : '0';

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(val);
  };

  const handleCopy = () => {
    const summary = `Original Price: ${formatCurrency(price)}\nDiscount: ${disc1}%${disc2 > 0 ? ` + ${disc2}%` : ''}\nTotal Savings: ${formatCurrency(totalSavings)} (${totalDiscountPercentage}% off)\nFinal Payable: ${formatCurrency(finalPayablePrice)}`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
            Original Price (₹)
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">₹</span>
            <input
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="e.g. 2499"
              className="w-full rounded-xl bg-zinc-900 border border-zinc-700/80 pl-8 pr-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
            Discount (%)
          </label>
          <div className="relative">
            <input
              type="number"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(e.target.value)}
              placeholder="e.g. 25"
              className="w-full rounded-xl bg-zinc-900 border border-zinc-700/80 px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500 font-mono"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 font-bold text-xs">%</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1">
            Extra / Coupon Discount (%) (Optional)
          </label>
          <div className="relative">
            <input
              type="number"
              value={additionalDiscount}
              onChange={(e) => setAdditionalDiscount(e.target.value)}
              placeholder="e.g. 10"
              className="w-full rounded-xl bg-zinc-900 border border-zinc-700/80 px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500 font-mono"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 font-bold text-xs">%</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1">
            Sales Tax / GST (%) (Optional)
          </label>
          <div className="relative">
            <input
              type="number"
              value={taxPercent}
              onChange={(e) => setTaxPercent(e.target.value)}
              placeholder="e.g. 18"
              className="w-full rounded-xl bg-zinc-900 border border-zinc-700/80 px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500 font-mono"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 font-bold text-xs">%</span>
          </div>
        </div>
      </div>

      {/* Preset Chips */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-[11px] text-zinc-500 font-medium">Quick Discounts:</span>
        {['10', '15', '20', '30', '40', '50', '70'].map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setDiscountPercent(d)}
            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition"
          >
            {d}% OFF
          </button>
        ))}
      </div>

      {/* Results Breakdown */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/40 via-zinc-900 to-zinc-900 border border-amber-500/30 space-y-4">
        <div className="flex flex-col items-center justify-center text-center p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <span className="text-xs text-amber-300 font-medium">Final Discounted Price to Pay</span>
          <span className="text-3xl sm:text-4xl font-black text-white mt-1 font-mono tracking-tight">
            {formatCurrency(finalPayablePrice)}
          </span>
          <span className="text-xs text-emerald-400 font-semibold mt-1">
            You Save {formatCurrency(totalSavings)} ({totalDiscountPercentage}% Total OFF)
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <span className="text-[11px] text-zinc-400">Original Price</span>
            <p className="text-sm font-bold text-zinc-400 line-through mt-0.5 font-mono">
              {formatCurrency(price)}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <span className="text-[11px] text-zinc-400">Total Savings</span>
            <p className="text-sm font-bold text-emerald-400 mt-0.5 font-mono">
              {formatCurrency(totalSavings)}
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-zinc-800/80">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-amber-600 text-xs font-medium text-zinc-200 hover:text-white transition cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Copied Summary!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy Breakdown
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
