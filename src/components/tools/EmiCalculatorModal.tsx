import React, { useState } from 'react';
import { Calculator, IndianRupee, PieChart, Percent, Calendar, Copy, Check, RotateCcw, Home, Car, User, GraduationCap } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function EmiCalculatorModal({ onClose }: Props) {
  const [loanAmount, setLoanAmount] = useState<number>(1500000); // 15 Lakhs
  const [interestRate, setInterestRate] = useState<number>(8.75); // 8.75%
  const [tenureUnit, setTenureUnit] = useState<'years' | 'months'>('years');
  const [tenureVal, setTenureVal] = useState<number>(10); // 10 years
  const [copied, setCopied] = useState<boolean>(false);

  const totalMonths = tenureUnit === 'years' ? tenureVal * 12 : tenureVal;

  // Formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const monthlyRate = interestRate / 12 / 100;

  const emi =
    totalMonths > 0 && monthlyRate > 0
      ? Math.round(
          (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
            (Math.pow(1 + monthlyRate, totalMonths) - 1)
        )
      : totalMonths > 0
      ? Math.round(loanAmount / totalMonths)
      : 0;

  const totalPayment = emi * totalMonths;
  const totalInterest = Math.max(0, totalPayment - loanAmount);
  const principalPercent = totalPayment > 0 ? Math.round((loanAmount / totalPayment) * 100) : 100;
  const interestPercent = Math.max(0, 100 - principalPercent);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const applyLoanPreset = (type: 'home' | 'car' | 'personal' | 'edu') => {
    if (type === 'home') {
      setLoanAmount(3500000);
      setInterestRate(8.5);
      setTenureUnit('years');
      setTenureVal(20);
    } else if (type === 'car') {
      setLoanAmount(800000);
      setInterestRate(9.0);
      setTenureUnit('years');
      setTenureVal(5);
    } else if (type === 'personal') {
      setLoanAmount(300000);
      setInterestRate(12.5);
      setTenureUnit('years');
      setTenureVal(3);
    } else if (type === 'edu') {
      setLoanAmount(1200000);
      setInterestRate(9.8);
      setTenureUnit('years');
      setTenureVal(7);
    }
  };

  const handleCopy = () => {
    const summary = `--- ToolMitra EMI Calculation ---
Loan Amount: ${formatCurrency(loanAmount)}
Interest Rate: ${interestRate}% p.a.
Tenure: ${tenureVal} ${tenureUnit} (${totalMonths} months)
Monthly EMI: ${formatCurrency(emi)}
Total Interest: ${formatCurrency(totalInterest)}
Total Payment: ${formatCurrency(totalPayment)}`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setLoanAmount(1000000);
    setInterestRate(8.5);
    setTenureUnit('years');
    setTenureVal(5);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Quick Loan Presets */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[11px] text-zinc-400 font-medium shrink-0">Presets:</span>
        <button
          type="button"
          onClick={() => applyLoanPreset('home')}
          className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold text-zinc-300 border border-zinc-800 flex items-center gap-1.5 shrink-0 transition"
        >
          <Home className="w-3.5 h-3.5 text-emerald-400" />
          Home Loan (8.5%)
        </button>
        <button
          type="button"
          onClick={() => applyLoanPreset('car')}
          className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold text-zinc-300 border border-zinc-800 flex items-center gap-1.5 shrink-0 transition"
        >
          <Car className="w-3.5 h-3.5 text-blue-400" />
          Car Loan (9.0%)
        </button>
        <button
          type="button"
          onClick={() => applyLoanPreset('personal')}
          className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold text-zinc-300 border border-zinc-800 flex items-center gap-1.5 shrink-0 transition"
        >
          <User className="w-3.5 h-3.5 text-amber-400" />
          Personal Loan (12.5%)
        </button>
        <button
          type="button"
          onClick={() => applyLoanPreset('edu')}
          className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold text-zinc-300 border border-zinc-800 flex items-center gap-1.5 shrink-0 transition"
        >
          <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
          Education (9.8%)
        </button>
      </div>

      {/* Input Sliders & Number Fields */}
      <div className="space-y-4">
        {/* Loan Amount */}
        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-zinc-300">Principal Loan Amount</label>
            <div className="flex items-center gap-1 bg-zinc-950 px-2.5 py-1 rounded-lg border border-zinc-700/80">
              <span className="text-xs font-bold text-zinc-500">₹</span>
              <input
                type="number"
                value={loanAmount || ''}
                onChange={(e) => setLoanAmount(Math.max(0, Number(e.target.value)))}
                className="w-28 bg-transparent text-sm font-bold text-emerald-400 text-right focus:outline-none font-mono"
              />
            </div>
          </div>
          <input
            type="range"
            min="25000"
            max="15000000"
            step="25000"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
            <span>₹25,000</span>
            <span>₹50 Lakh</span>
            <span>₹1.5 Cr</span>
          </div>
        </div>

        {/* Interest Rate */}
        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-zinc-300">Interest Rate (Annual %)</label>
            <div className="flex items-center gap-1 bg-zinc-950 px-2.5 py-1 rounded-lg border border-zinc-700/80">
              <input
                type="number"
                step="0.05"
                min="1"
                max="36"
                value={interestRate || ''}
                onChange={(e) => setInterestRate(Math.max(0.1, Number(e.target.value)))}
                className="w-16 bg-transparent text-sm font-bold text-emerald-400 text-right focus:outline-none font-mono"
              />
              <span className="text-xs font-bold text-zinc-500">%</span>
            </div>
          </div>
          <input
            type="range"
            min="4"
            max="26"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="flex justify-between text-[10px] text-zinc-500">
            <span>4% (Low)</span>
            <span>8.5% (Prime)</span>
            <span>26% (Max)</span>
          </div>
        </div>

        {/* Loan Tenure */}
        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-zinc-300">Loan Tenure</label>
              <div className="flex rounded-lg bg-zinc-950 p-0.5 border border-zinc-800 text-[10px]">
                <button
                  type="button"
                  onClick={() => {
                    if (tenureUnit === 'months') {
                      setTenureVal(Math.max(1, Math.round(tenureVal / 12)));
                      setTenureUnit('years');
                    }
                  }}
                  className={`px-2 py-0.5 rounded font-semibold ${
                    tenureUnit === 'years' ? 'bg-emerald-500 text-white' : 'text-zinc-400'
                  }`}
                >
                  Yr
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (tenureUnit === 'years') {
                      setTenureVal(tenureVal * 12);
                      setTenureUnit('months');
                    }
                  }}
                  className={`px-2 py-0.5 rounded font-semibold ${
                    tenureUnit === 'months' ? 'bg-emerald-500 text-white' : 'text-zinc-400'
                  }`}
                >
                  Mo
                </button>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-zinc-950 px-2.5 py-1 rounded-lg border border-zinc-700/80">
              <input
                type="number"
                min="1"
                max={tenureUnit === 'years' ? 30 : 360}
                value={tenureVal || ''}
                onChange={(e) => setTenureVal(Math.max(1, Number(e.target.value)))}
                className="w-14 bg-transparent text-sm font-bold text-emerald-400 text-right focus:outline-none font-mono"
              />
              <span className="text-xs font-semibold text-zinc-400">{tenureUnit}</span>
            </div>
          </div>
          <input
            type="range"
            min="1"
            max={tenureUnit === 'years' ? 30 : 360}
            step="1"
            value={tenureVal}
            onChange={(e) => setTenureVal(Number(e.target.value))}
            className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
            <span>{tenureUnit === 'years' ? '1 Year' : '1 Month'}</span>
            <span>{tenureUnit === 'years' ? '15 Years' : '180 Months'}</span>
            <span>{tenureUnit === 'years' ? '30 Years' : '360 Months'}</span>
          </div>
        </div>
      </div>

      {/* EMI Result Summary Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-zinc-900 to-zinc-900 border border-emerald-500/30 flex flex-col gap-4">
        <div className="flex flex-col items-center justify-center text-center p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <span className="text-xs text-emerald-300 font-medium">Monthly Loan EMI</span>
          <span className="text-3xl sm:text-4xl font-black text-white mt-1 font-mono tracking-tight">
            {formatCurrency(emi)}
          </span>
          <span className="text-[11px] text-zinc-400 mt-0.5">Payable monthly for {totalMonths} months</span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <span className="text-[11px] text-zinc-400">Total Interest Payable</span>
            <p className="text-sm sm:text-base font-bold text-amber-400 mt-0.5 font-mono">
              {formatCurrency(totalInterest)}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <span className="text-[11px] text-zinc-400">Total Payment (P + I)</span>
            <p className="text-sm sm:text-base font-bold text-zinc-100 mt-0.5 font-mono">
              {formatCurrency(totalPayment)}
            </p>
          </div>
        </div>

        {/* Visual Split Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
              Principal ({principalPercent}%)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
              Interest ({interestPercent}%)
            </span>
          </div>
          <div className="w-full h-3 rounded-full bg-zinc-800 overflow-hidden flex">
            <div style={{ width: `${principalPercent}%` }} className="bg-emerald-500 h-full transition-all duration-300" />
            <div style={{ width: `${interestPercent}%` }} className="bg-amber-500 h-full transition-all duration-300" />
          </div>
        </div>

        {/* Action button row */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>

          <button
            id="btn-copy-emi-summary"
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-emerald-600 text-xs font-medium text-zinc-200 hover:text-white transition cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Copied Summary!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy EMI Summary
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
