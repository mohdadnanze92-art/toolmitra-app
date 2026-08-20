import React, { useState, useEffect, useRef } from 'react';
import {
  QrCode,
  Download,
  Copy,
  Check,
  Sparkles,
  Globe,
  Wifi,
  IndianRupee,
  MessageSquare,
  Mail,
  Phone,
  Palette,
  RefreshCw,
  Type,
  ExternalLink
} from 'lucide-react';

interface Props {
  onClose: () => void;
}

type QrCategory = 'url' | 'text' | 'upi' | 'wifi' | 'whatsapp' | 'email' | 'phone';

export default function QrCodeGeneratorModal({ onClose }: Props) {
  const [qrType, setQrType] = useState<QrCategory>('url');

  // Input states
  const [urlInput, setUrlInput] = useState('https://toolmitra.ai');
  const [textInput, setTextInput] = useState('Hello from ToolMitra AI!');
  
  // UPI State
  const [upiId, setUpiId] = useState('merchant@upi');
  const [upiName, setUpiName] = useState('My Store');
  const [upiAmount, setUpiAmount] = useState('');
  const [upiNote, setUpiNote] = useState('Payment');

  // WiFi State
  const [wifiSsid, setWifiSsid] = useState('My_Home_WiFi');
  const [wifiPass, setWifiPass] = useState('securePass123');
  const [wifiAuth, setWifiAuth] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');

  // WhatsApp State
  const [waNumber, setWaNumber] = useState('919876543210');
  const [waMessage, setWaMessage] = useState('Hi, I would like to get in touch!');

  // Email State
  const [emailTo, setEmailTo] = useState('hello@toolmitra.ai');
  const [emailSubject, setEmailSubject] = useState('Inquiry');
  const [emailBody, setEmailBody] = useState('Hello ToolMitra team,');

  // Phone State
  const [phoneNumber, setPhoneNumber] = useState('+919876543210');

  // Customization: Colors & Size
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [qrSize, setQrSize] = useState<number>(300);
  const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');

  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const qrContainerRef = useRef<HTMLDivElement>(null);

  // Compute final payload string based on active category
  const getPayload = (): string => {
    switch (qrType) {
      case 'url': {
        const trimmed = urlInput.trim();
        if (!trimmed) return 'https://toolmitra.ai';
        if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
          return `https://${trimmed}`;
        }
        return trimmed;
      }
      case 'text':
        return textInput.trim() || 'ToolMitra QR Code';
      case 'upi': {
        const id = upiId.trim() || 'user@upi';
        const name = upiName.trim() || 'Payee';
        let upiStr = `upi://pay?pa=${encodeURIComponent(id)}&pn=${encodeURIComponent(name)}`;
        if (upiAmount && parseFloat(upiAmount) > 0) {
          upiStr += `&am=${encodeURIComponent(parseFloat(upiAmount).toFixed(2))}&cu=INR`;
        }
        if (upiNote.trim()) {
          upiStr += `&tn=${encodeURIComponent(upiNote.trim())}`;
        }
        return upiStr;
      }
      case 'wifi': {
        const ssid = wifiSsid.trim() || 'WiFi';
        const pass = wifiPass.trim();
        return `WIFI:T:${wifiAuth};S:${ssid};P:${pass};;`;
      }
      case 'whatsapp': {
        const cleanNum = waNumber.replace(/[^0-9]/g, '');
        const msg = encodeURIComponent(waMessage.trim());
        return `https://wa.me/${cleanNum}${msg ? `?text=${msg}` : ''}`;
      }
      case 'email': {
        const mail = emailTo.trim();
        const sub = encodeURIComponent(emailSubject.trim());
        const body = encodeURIComponent(emailBody.trim());
        return `mailto:${mail}?subject=${sub}&body=${body}`;
      }
      case 'phone': {
        const cleanPhone = phoneNumber.replace(/\s+/g, '');
        return `tel:${cleanPhone}`;
      }
      default:
        return urlInput || 'https://toolmitra.ai';
    }
  };

  // Format hex without hash for qrserver API
  const cleanHex = (hex: string) => hex.replace('#', '').trim() || '000000';

  // Build the QRServer API URL
  const currentPayload = getPayload();
  const fgHex = cleanHex(fgColor);
  const bgHex = cleanHex(bgColor);

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(
    currentPayload
  )}&color=${fgHex}&bgcolor=${bgHex}&ecc=${errorLevel}&margin=1`;

  // Track image load
  useEffect(() => {
    setImgLoaded(false);
  }, [qrImageUrl]);

  // Robust download handler via direct blob fetch or canvas fallback
  const handleDownload = async () => {
    setIsDownloading(true);
    setStatusMessage('Preparing download...');

    try {
      // High-res download size
      const exportSize = Math.max(qrSize, 600);
      const downloadApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${exportSize}x${exportSize}&data=${encodeURIComponent(
        currentPayload
      )}&color=${fgHex}&bgcolor=${bgHex}&ecc=${errorLevel}&margin=2`;

      const response = await fetch(downloadApiUrl);
      if (!response.ok) throw new Error('Network error');

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `toolmitra-qrcode-${qrType}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);

      setStatusMessage('QR Code downloaded successfully!');
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (err) {
      console.warn('Direct blob download failed, trying canvas fallback:', err);
      // Fallback via Image + Canvas
      try {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = qrImageUrl;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = qrSize;
          canvas.height = qrSize;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `toolmitra-qrcode-${qrType}-${Date.now()}.png`;
            link.click();
            setStatusMessage('QR Code downloaded successfully!');
            setTimeout(() => setStatusMessage(''), 3000);
          }
        };
      } catch (fallbackErr) {
        // Last resort: open in new tab
        window.open(qrImageUrl, '_blank');
      }
    } finally {
      setIsDownloading(false);
    }
  };

  // Copy raw payload
  const handleCopyPayload = () => {
    navigator.clipboard.writeText(currentPayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Preset color combinations
  const presetPalettes = [
    { label: 'Classic Black', fg: '#000000', bg: '#ffffff' },
    { label: 'Brand Indigo', fg: '#4338ca', bg: '#ffffff' },
    { label: 'Emerald Green', fg: '#047857', bg: '#ffffff' },
    { label: 'Ruby Crimson', fg: '#be123c', bg: '#ffffff' },
    { label: 'Ocean Blue', fg: '#0284c7', bg: '#ffffff' },
    { label: 'Amber Gold', fg: '#d97706', bg: '#ffffff' },
    { label: 'Inverted Dark', fg: '#ffffff', bg: '#09090b' },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Category Type Switcher Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'url', label: 'Website Link', icon: Globe },
          { id: 'text', label: 'Plain Text', icon: Type },
          { id: 'upi', label: 'UPI Payment', icon: IndianRupee },
          { id: 'wifi', label: 'WiFi Access', icon: Wifi },
          { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
          { id: 'email', label: 'Email', icon: Mail },
          { id: 'phone', label: 'Phone Call', icon: Phone },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = qrType === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setQrType(tab.id as QrCategory)}
              className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 shrink-0 transition border cursor-pointer ${
                isActive
                  ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40 shadow-sm'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:bg-zinc-850'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Left Inputs, Right QR Live Preview */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        {/* Left Column: Real-time Content & Styling Inputs (7 cols) */}
        <div className="md:col-span-7 space-y-4">
          {/* Dynamic Content Form */}
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
              <span className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
                <QrCode className="w-3.5 h-3.5 text-indigo-400" />
                Input Data (Real-time Live Sync)
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Sync
              </span>
            </div>

            {/* URL Input */}
            {qrType === 'url' && (
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">
                  Destination Website URL
                </label>
                <div className="relative">
                  <input
                    id="qr-url-input"
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com or your-link"
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-700/80 px-3.5 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
                <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                  <span className="text-[10px] text-zinc-500">Quick URL samples:</span>
                  {['https://youtube.com', 'https://google.com', 'https://toolmitra.ai', 'https://github.com'].map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setUrlInput(u)}
                      className="px-2 py-0.5 rounded text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition"
                    >
                      {u.replace('https://', '')}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Plain Text Input */}
            {qrType === 'text' && (
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">
                  Plain Text / Notes / Message
                </label>
                <textarea
                  id="qr-text-input"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  rows={3}
                  placeholder="Enter any text, instructions, or secret message..."
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-700/80 px-3.5 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500 resize-none leading-relaxed font-mono"
                />
              </div>
            )}

            {/* UPI Payment Input */}
            {qrType === 'upi' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">UPI ID (VPA) *</label>
                    <input
                      id="qr-upi-vpa"
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. name@okaxis or 9876543210@paytm"
                      className="w-full rounded-xl bg-zinc-950 border border-zinc-700/80 px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Payee Name</label>
                    <input
                      type="text"
                      value={upiName}
                      onChange={(e) => setUpiName(e.target.value)}
                      placeholder="e.g. Rahul Sharma / Store Name"
                      className="w-full rounded-xl bg-zinc-950 border border-zinc-700/80 px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Amount in ₹ (Optional)</label>
                    <input
                      type="number"
                      value={upiAmount}
                      onChange={(e) => setUpiAmount(e.target.value)}
                      placeholder="Fixed amount (e.g. 500)"
                      className="w-full rounded-xl bg-zinc-950 border border-zinc-700/80 px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Payment Note (Optional)</label>
                    <input
                      type="text"
                      value={upiNote}
                      onChange={(e) => setUpiNote(e.target.value)}
                      placeholder="e.g. Chai Bill / Invoice #102"
                      className="w-full rounded-xl bg-zinc-950 border border-zinc-700/80 px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* WiFi Access Input */}
            {qrType === 'wifi' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">WiFi Network Name (SSID) *</label>
                  <input
                    type="text"
                    value={wifiSsid}
                    onChange={(e) => setWifiSsid(e.target.value)}
                    placeholder="e.g. Home_5G_Network"
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-700/80 px-3.5 py-2 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Password</label>
                    <input
                      type="text"
                      value={wifiPass}
                      onChange={(e) => setWifiPass(e.target.value)}
                      placeholder="Network Password..."
                      className="w-full rounded-xl bg-zinc-950 border border-zinc-700/80 px-3.5 py-2 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Security Encryption</label>
                    <select
                      value={wifiAuth}
                      onChange={(e) => setWifiAuth(e.target.value as any)}
                      className="w-full rounded-xl bg-zinc-950 border border-zinc-700/80 px-3.5 py-2 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="WPA">WPA/WPA2/WPA3 (Standard)</option>
                      <option value="WEP">WEP (Older)</option>
                      <option value="nopass">No Password (Open)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* WhatsApp Direct Input */}
            {qrType === 'whatsapp' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">
                    Phone Number with Country Code (e.g. 91 for India, 1 for US) *
                  </label>
                  <input
                    type="text"
                    value={waNumber}
                    onChange={(e) => setWaNumber(e.target.value)}
                    placeholder="e.g. 919876543210"
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-700/80 px-3.5 py-2 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">Pre-filled Chat Message</label>
                  <textarea
                    value={waMessage}
                    onChange={(e) => setWaMessage(e.target.value)}
                    rows={2}
                    placeholder="e.g. Hello! I would like to enquire about your services."
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-700/80 px-3.5 py-2 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>
              </div>
            )}

            {/* Email Input */}
            {qrType === 'email' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">Recipient Email *</label>
                  <input
                    type="email"
                    value={emailTo}
                    onChange={(e) => setEmailTo(e.target.value)}
                    placeholder="contact@company.com"
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-700/80 px-3.5 py-2 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">Subject Line</label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Inquiry / Feedback"
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-700/80 px-3.5 py-2 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">Email Body (Optional)</label>
                  <textarea
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    rows={2}
                    placeholder="Pre-composed email draft..."
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-700/80 px-3.5 py-2 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>
              </div>
            )}

            {/* Phone Call Input */}
            {qrType === 'phone' && (
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-700/80 px-3.5 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-indigo-500 font-mono"
                />
                <p className="text-[11px] text-zinc-500 mt-1.5">
                  Scanning this QR code immediately triggers the phone dialer on mobile devices.
                </p>
              </div>
            )}
          </div>

          {/* Color & Styling Customizer */}
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-indigo-400" />
                Color & Appearance
              </span>
              <span className="text-[11px] text-zinc-400">Custom Hex or Presets</span>
            </div>

            {/* Color Pickers (Foreground & Background) */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">QR Pattern</span>
                  <span className="text-xs font-mono text-zinc-200">{fgColor}</span>
                </div>
                <input
                  id="qr-fg-color-picker"
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  title="Choose QR Code Foreground Color"
                />
              </div>

              <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Background</span>
                  <span className="text-xs font-mono text-zinc-200">{bgColor}</span>
                </div>
                <input
                  id="qr-bg-color-picker"
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  title="Choose QR Code Background Color"
                />
              </div>
            </div>

            {/* Quick Color Presets */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-semibold text-zinc-400">Popular Color Palettes:</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {presetPalettes.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => {
                      setFgColor(p.fg);
                      setBgColor(p.bg);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border flex items-center gap-1.5 transition cursor-pointer ${
                      fgColor === p.fg && bgColor === p.bg
                        ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                        : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-zinc-700 inline-block"
                      style={{ backgroundColor: p.fg }}
                    />
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Error Correction & Resolution Options */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-zinc-800/80">
              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                  Error Correction Level
                </label>
                <div className="grid grid-cols-4 gap-1">
                  {(['L', 'M', 'Q', 'H'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setErrorLevel(lvl)}
                      className={`py-1 rounded text-xs font-bold font-mono transition border cursor-pointer ${
                        errorLevel === lvl
                          ? 'bg-indigo-500 text-white border-indigo-400'
                          : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                  Export Resolution
                </label>
                <select
                  value={qrSize}
                  onChange={(e) => setQrSize(Number(e.target.value))}
                  className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-2.5 py-1 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500 font-mono"
                >
                  <option value={200}>200 × 200 px (Standard)</option>
                  <option value={300}>300 × 300 px (Medium)</option>
                  <option value={500}>500 × 500 px (HD Print)</option>
                  <option value={1000}>1000 × 1000 px (Ultra HD)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live QR Code Display & Download Controls (5 cols) */}
        <div className="md:col-span-5 flex flex-col items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-zinc-900 to-zinc-900 border border-indigo-500/30 text-center sticky top-0">
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Live QR Preview
            </span>
            <span className="text-[10px] text-zinc-400 font-mono">
              qrserver API
            </span>
          </div>

          {/* Render Target & Live Preview Container */}
          <div
            id="qrcode"
            className="live-qr-preview-container p-4 rounded-2xl shadow-2xl border border-zinc-200/20 flex items-center justify-center transition-all duration-200 max-w-full relative min-h-[220px] min-w-[220px]"
            style={{ backgroundColor: bgColor }}
            ref={qrContainerRef}
          >
            {!imgLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[1px] rounded-2xl">
                <RefreshCw className="w-6 h-6 animate-spin text-indigo-400" />
              </div>
            )}
            <img
              src={qrImageUrl}
              alt="Live QR Code"
              crossOrigin="anonymous"
              onLoad={() => setImgLoaded(true)}
              style={{
                maxWidth: '100%',
                height: 'auto',
                width: `${Math.min(qrSize, 220)}px`,
                aspectRatio: '1/1',
                display: 'block',
                margin: '0 auto',
                borderRadius: '8px'
              }}
              className="rounded-lg shadow-sm"
            />
          </div>

          {/* Encoded String preview */}
          <div className="w-full p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/80 text-left">
            <span className="block text-[10px] uppercase font-bold text-zinc-500 tracking-wider mb-0.5">
              Scanned Output:
            </span>
            <p className="text-xs text-zinc-300 font-mono truncate" title={currentPayload}>
              {currentPayload}
            </p>
          </div>

          {statusMessage && (
            <div className="w-full py-1.5 px-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium animate-in fade-in">
              ✓ {statusMessage}
            </div>
          )}

          {/* Download & Copy Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full">
            <button
              id="btn-download-qrcode"
              type="button"
              disabled={isDownloading}
              onClick={handleDownload}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/30 transition cursor-pointer disabled:opacity-50"
            >
              {isDownloading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              {isDownloading ? 'Downloading...' : 'Download QR Code (PNG)'}
            </button>

            <button
              id="btn-copy-qr-payload"
              type="button"
              onClick={handleCopyPayload}
              className="w-full sm:w-auto py-2.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium flex items-center justify-center gap-1.5 transition cursor-pointer shrink-0 border border-zinc-700"
              title="Copy encoded payload"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Text</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between w-full px-1 text-[10px] text-zinc-400">
            <span>Direct API instant generation</span>
            <a
              href={qrImageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 hover:underline"
            >
              Open Direct <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
