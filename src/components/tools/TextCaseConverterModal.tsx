import React, { useState } from 'react';
import { Type, Copy, Check, Trash2, ArrowRightLeft } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function TextCaseConverterModal({ onClose }: Props) {
  const [inputText, setInputText] = useState('toolmitra AI is the best online tools platform for creators!');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const toSentenceCase = (str: string) => {
    return str
      .toLowerCase()
      .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
  };

  const toTitleCase = (str: string) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const toCamelCase = (str: string) => {
    return str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
      .replace(/[^a-zA-Z0-9]/g, '');
  };

  const toSnakeCase = (str: string) => {
    return str
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_]/g, '');
  };

  const toKebabCase = (str: string) => {
    return str
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  };

  const toDotCase = (str: string) => {
    return str
      .toLowerCase()
      .replace(/\s+/g, '.')
      .replace(/[^a-z0-9.]/g, '');
  };

  const cases = [
    { key: 'upper', name: 'UPPERCASE', val: inputText.toUpperCase() },
    { key: 'lower', name: 'lowercase', val: inputText.toLowerCase() },
    { key: 'title', name: 'Title Case (Every Word Capital)', val: toTitleCase(inputText) },
    { key: 'sentence', name: 'Sentence case.', val: toSentenceCase(inputText) },
    { key: 'camel', name: 'camelCase (JS/Code)', val: toCamelCase(inputText) },
    { key: 'snake', name: 'snake_case (Python/DB)', val: toSnakeCase(inputText) },
    { key: 'kebab', name: 'kebab-case (URLs & CSS)', val: toKebabCase(inputText) },
    { key: 'dot', name: 'dot.case (Configs)', val: toDotCase(inputText) },
  ];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-zinc-300">Input Text</label>
          {inputText && (
            <button
              type="button"
              onClick={() => setInputText('')}
              className="text-xs text-zinc-400 hover:text-red-400 flex items-center gap-1 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear
            </button>
          )}
        </div>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={3}
          placeholder="Type or paste your text here..."
          className="w-full rounded-xl bg-zinc-900 border border-zinc-700/80 p-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition resize-none"
        />
      </div>

      {/* Case Options Grid */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Converted Case Formats
        </h4>

        <div className="grid grid-cols-1 gap-2.5 max-h-72 overflow-y-auto pr-1">
          {cases.map((c) => (
            <div
              key={c.key}
              className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-violet-500/40 transition flex items-center justify-between gap-3 group"
            >
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-[11px] font-semibold text-violet-400">{c.name}</span>
                <span className="text-xs text-zinc-200 font-mono truncate select-all">
                  {c.val || '<empty>'}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(c.val, c.key)}
                disabled={!c.val}
                className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-violet-600 text-xs font-medium text-zinc-300 hover:text-white transition disabled:opacity-40"
              >
                {copiedKey === c.key ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
