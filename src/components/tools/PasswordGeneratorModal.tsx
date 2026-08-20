import React, { useState, useEffect } from 'react';
import { Lock, RefreshCw, Copy, Check, ShieldCheck, ShieldAlert, KeyRound } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function PasswordGeneratorModal({ onClose }: Props) {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let chars = '';
    if (includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) chars += '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';

    let result = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
    setPassword(result);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = () => {
    if (length < 8) return { label: 'Weak', color: 'text-red-400', bar: 'w-1/4 bg-red-500' };
    if (length < 12) return { label: 'Medium', color: 'text-amber-400', bar: 'w-2/4 bg-amber-500' };
    if (length < 16) return { label: 'Strong', color: 'text-blue-400', bar: 'w-3/4 bg-blue-500' };
    return { label: 'Very Strong', color: 'text-emerald-400', bar: 'w-full bg-emerald-500' };
  };

  const strength = getStrength();

  return (
    <div className="flex flex-col gap-6">
      {/* Generated Display */}
      <div className="p-4 rounded-2xl bg-zinc-900 border border-green-500/30 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-400">Generated Password</span>
          <span className={`text-xs font-bold ${strength.color} flex items-center gap-1`}>
            <ShieldCheck className="w-3.5 h-3.5" />
            {strength.label}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 bg-zinc-950 p-3.5 rounded-xl border border-zinc-800">
          <span className="font-mono text-sm sm:text-base font-semibold text-zinc-100 tracking-wider break-all select-all">
            {password}
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={generatePassword}
              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition"
              title="Regenerate"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
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
        </div>

        {/* Strength meter bar */}
        <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
          <div className={`h-full transition-all duration-300 ${strength.bar}`} />
        </div>
      </div>

      {/* Options */}
      <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-zinc-300">Password Length: {length}</label>
            <span className="text-xs font-mono text-emerald-400">{length} characters</span>
          </div>
          <input
            type="range"
            min="6"
            max="40"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="rounded bg-zinc-800 border-zinc-700 text-emerald-500 focus:ring-0"
            />
            Uppercase (A-Z)
          </label>

          <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              className="rounded bg-zinc-800 border-zinc-700 text-emerald-500 focus:ring-0"
            />
            Lowercase (a-z)
          </label>

          <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="rounded bg-zinc-800 border-zinc-700 text-emerald-500 focus:ring-0"
            />
            Numbers (0-9)
          </label>

          <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="rounded bg-zinc-800 border-zinc-700 text-emerald-500 focus:ring-0"
            />
            Symbols (!@#$%)
          </label>
        </div>
      </div>
    </div>
  );
}
