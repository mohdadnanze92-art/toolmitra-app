import React from 'react';
import { ToolItem } from '../types';
import { TOOLS_DATABASE } from '../data/toolsData';

import QrCodeGeneratorModal from '../components/tools/QrCodeGeneratorModal';
import AiPromptGeneratorModal from '../components/tools/AiPromptGeneratorModal';
import ImagePromptGeneratorModal from '../components/tools/ImagePromptGeneratorModal';
import YoutubeTitleGeneratorModal from '../components/tools/YoutubeTitleGeneratorModal';
import ImageCompressorModal from '../components/tools/ImageCompressorModal';
import ImageResizerModal from '../components/tools/ImageResizerModal';
import EmiCalculatorModal from '../components/tools/EmiCalculatorModal';
import AgeCalculatorModal from '../components/tools/AgeCalculatorModal';
import PercentageCalculatorModal from '../components/tools/PercentageCalculatorModal';
import DiscountCalculatorModal from '../components/tools/DiscountCalculatorModal';
import GstCalculatorModal from '../components/tools/GstCalculatorModal';
import WordCounterModal from '../components/tools/WordCounterModal';
import PasswordGeneratorModal from '../components/tools/PasswordGeneratorModal';
import HashtagGeneratorModal from '../components/tools/HashtagGeneratorModal';
import TextCaseConverterModal from '../components/tools/TextCaseConverterModal';

import ContactPage from '../components/legal/ContactPage';
import AboutPage from '../components/legal/AboutPage';
import PrivacyPolicyPage from '../components/legal/PrivacyPolicyPage';
import TermsPage from '../components/legal/TermsPage';
import DisclaimerPage from '../components/legal/DisclaimerPage';

export interface ToolRegistryEntry {
  id: string;
  title: string;
  category: string;
  emoji: string;
  description: string;
  tag: string;
  views?: string;
  render: (props: { onClose: () => void }) => React.ReactNode;
  htmlTemplate?: string;
  init?: () => void;
  isLegalPage?: boolean;
}

// Canonical tool definitions
const REGISTRY_ENTRIES: Record<string, ToolRegistryEntry> = {
  // ==================== LEGAL & COMPANY PAGES ====================
  'contact': {
    id: 'contact',
    title: 'Contact & Support',
    category: 'legal',
    emoji: '📬',
    description: 'Get in touch with founder Mohd Adnan for tool suggestions, custom development, support inquiries & feedback.',
    tag: 'Support & Help',
    views: '24h Response',
    isLegalPage: true,
    render: (props) => <ContactPage onClose={props.onClose} />,
    htmlTemplate: `<div id="page-contact" class="page-content"><h3>Contact & Support - ToolMitra</h3><p>Founder: Mohd Adnan (mohd.adnan.ze92@gmail.com | +91 9193393089)</p></div>`,
    init: () => {
      console.log('[ToolRegistry] Initialized Contact & Support Page');
    },
  },

  'about': {
    id: 'about',
    title: 'About ToolMitra AI',
    category: 'legal',
    emoji: '✨',
    description: 'An all-in-one smart online tool platform built by Mohd Adnan offering free, client-side, privacy-first AI and web utilities.',
    tag: 'Our Story',
    views: 'Har Kaam Ka Tool',
    isLegalPage: true,
    render: (props) => <AboutPage />,
    htmlTemplate: `<div id="page-about" class="page-content"><h3>About ToolMitra AI</h3><p>Built by Mohd Adnan with a mission for 100% private, free online tools.</p></div>`,
    init: () => {
      console.log('[ToolRegistry] Initialized About Page');
    },
  },

  'privacy': {
    id: 'privacy',
    title: 'Privacy Policy',
    category: 'legal',
    emoji: '🔒',
    description: 'Our commitment to 100% in-browser client-side data privacy, zero unauthorized tracking, and zero remote image logging.',
    tag: 'Data Protection',
    views: '100% In-Browser',
    isLegalPage: true,
    render: () => <PrivacyPolicyPage />,
    htmlTemplate: `<div id="page-privacy" class="page-content"><h3>Privacy Policy</h3><p>Client-side only processing.</p></div>`,
    init: () => {
      console.log('[ToolRegistry] Initialized Privacy Policy Page');
    },
  },

  'terms': {
    id: 'terms',
    title: 'Terms & Conditions',
    category: 'legal',
    emoji: '📜',
    description: 'User agreement, free personal & commercial licensing guidelines, and acceptable fair usage policies for ToolMitra.',
    tag: 'Legal Agreement',
    views: 'Free License',
    isLegalPage: true,
    render: () => <TermsPage />,
    htmlTemplate: `<div id="page-terms" class="page-content"><h3>Terms & Conditions</h3><p>Free personal and commercial usage terms.</p></div>`,
    init: () => {
      console.log('[ToolRegistry] Initialized Terms Page');
    },
  },

  'disclaimer': {
    id: 'disclaimer',
    title: 'Disclaimer & Advisory',
    category: 'legal',
    emoji: '⚖️',
    description: 'Important legal notices regarding financial calculation estimates and generative AI suggestions.',
    tag: 'Notice',
    views: 'Important Info',
    isLegalPage: true,
    render: () => <DisclaimerPage />,
    htmlTemplate: `<div id="page-disclaimer" class="page-content"><h3>Disclaimer</h3><p>Financial and AI suggestions disclaimer.</p></div>`,
    init: () => {
      console.log('[ToolRegistry] Initialized Disclaimer Page');
    },
  },

  // ==================== 15+ SMART UTILITIES ====================
  'qr-code-generator': {
    id: 'qr-code-generator',
    title: 'QR Code Generator',
    category: 'social',
    emoji: '📱',
    description: 'Create high-resolution custom QR codes for Website Links, UPI Payments, WiFi, WhatsApp & Direct Phone Calls.',
    tag: 'Trending',
    views: 'Free Online',
    render: (props) => <QrCodeGeneratorModal onClose={props.onClose} />,
    htmlTemplate: `<div id="tool-qr-code-generator" class="tool-content"><h3>QR Code Generator</h3><p>Generate high-resolution QR codes with customizable colors and error correction.</p></div>`,
    init: () => {
      console.log('[ToolRegistry] Initialized QR Code Generator');
    },
  },

  'ai-prompt-generator': {
    id: 'ai-prompt-generator',
    title: 'AI Prompt Generator',
    category: 'ai',
    emoji: '🤖',
    description: 'Transform simple ideas into master-crafted prompts for Midjourney v6, DALL-E 3, Flux, ChatGPT & Claude with styles and aspect ratios.',
    tag: 'AI Powered',
    views: 'Free Online',
    render: (props) => <AiPromptGeneratorModal onClose={props.onClose} />,
    htmlTemplate: `<div id="tool-ai-prompt-generator" class="tool-content"><h3>AI Prompt Generator</h3><p>Create visual art and LLM prompts with custom styles and aspect ratios.</p></div>`,
    init: () => {
      console.log('[ToolRegistry] Initialized AI Prompt Generator');
    },
  },

  'image-prompt-generator': {
    id: 'image-prompt-generator',
    title: 'Image Prompt Generator',
    category: 'ai',
    emoji: '🎨',
    description: 'Create detailed, photorealistic & artistic prompts for Midjourney v6, DALL·E 3, and Stable Diffusion.',
    tag: 'AI Powered',
    views: 'Free Online',
    render: (props) => <ImagePromptGeneratorModal onClose={props.onClose} />,
    htmlTemplate: `<div id="tool-image-prompt-generator" class="tool-content"><h3>Image Prompt Generator</h3></div>`,
    init: () => {
      console.log('[ToolRegistry] Initialized Image Prompt Generator');
    },
  },

  
  'youtube-title-generator': {
    id: 'youtube-title-generator',
    title: 'YouTube Viral Metadata & Hook Generator',
    category: 'social',
    emoji: '🎬',
    description: 'Generate high-CTR titles, viral hooks, and SEO tags instantly.',
    tag: 'AI Powered',
    views: 'Free Online',
    render: (props: any) => null,
    htmlTemplate: `
      <div style="max-width: 600px; margin: 0 auto; color: #fff; padding: 15px; font-family: sans-serif;">
        <label style="font-size: 13px; color: #94a3b8; font-weight: bold; display: block; margin-bottom: 6px;">VIDEO TOPIC / NICHE</label>
        <input type="text" id="yt-topic-val" placeholder="e.g., How to start trading in 2026, Gym workout plan" style="width: 100%; box-sizing: border-box; padding: 12px; border-radius: 8px; border: 1px solid #334155; background: #0f172a; color: #fff; margin-bottom: 15px;" />

        <button id="yt-submit-btn" style="width: 100%; padding: 12px; background: #ef4444; color: #fff; border: none; border-radius: 8px; font-weight: bold; font-size: 15px; cursor: pointer; margin-bottom: 20px;">
          ⚡ Generate Viral Metadata
        </button>

        <div id="yt-result-box" style="display: none;">
          <div style="background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 14px; margin-bottom: 12px;">
            <div style="color: #38bdf8; font-weight: bold; font-size: 13px; margin-bottom: 6px;">🎯 HIGH-CTR TITLES</div>
            <div id="yt-out-titles" style="font-size: 13px; line-height: 1.7; color: #f8fafc; white-space: pre-line;"></div>
          </div>

          <div style="background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 14px; margin-bottom: 12px;">
            <div style="color: #f59e0b; font-weight: bold; font-size: 13px; margin-bottom: 6px;">⚡ 3-SEC HOOKS</div>
            <div id="yt-out-hooks" style="font-size: 13px; line-height: 1.7; color: #f8fafc; white-space: pre-line;"></div>
          </div>

          <div style="background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 14px;">
            <div style="color: #10b981; font-weight: bold; font-size: 13px; margin-bottom: 6px;">🏷️ SEO TAGS</div>
            <div id="yt-out-tags" style="font-size: 12px; line-height: 1.6; color: #cbd5e1; background: #0f172a; padding: 10px; border-radius: 6px; word-break: break-all;"></div>
          </div>
        </div>
      </div>
    `,
    init: () => {
      const btn = document.getElementById('yt-submit-btn');
      if (!btn) return;

      btn.onclick = () => {
        const input = document.getElementById('yt-topic-val') as HTMLInputElement;
        const topic = input?.value.trim() || 'Online Strategy';

        const titles = [
          `1. I Tried ${topic} for 30 Days (Real Results)`,
          `2. Why 99% Fail at ${topic} (And How to Fix It)`,
          `3. The Complete 2026 Guide to ${topic}`,
          `4. Stop Doing ${topic} Like This!`,
          `5. How to Master ${topic} Fast`
        ];

        const hooks = [
          `• "If you want to grow in ${topic}, stop making this one rookie mistake..."`,
          `• "Nobody tells you this brutal reality about ${topic}..."`,
          `• "Here is the exact step-by-step blueprint for ${topic}..."`
        ];

        const raw = topic.toLowerCase();
        const tags = `${raw}, ${raw} tips, ${raw} guide 2026, how to do ${raw}, viral video growth, viral hooks`;

        const outT = document.getElementById('yt-out-titles');
        const outH = document.getElementById('yt-out-hooks');
        const outTags = document.getElementById('yt-out-tags');
        const box = document.getElementById('yt-result-box');

        if (outT) outT.innerText = titles.join('\n');
        if (outH) outH.innerText = hooks.join('\n');
        if (outTags) outTags.innerText = tags;
        if (box) box.style.display = 'block';
      };
    },
  },
    

        
    

  'image-compressor': {
    id: 'image-compressor',
    title: 'Image Compressor',
    category: 'photo',
    emoji: '🖼️',
    description: 'Compress JPG, PNG & WebP images up to 90% without visible quality loss. 100% private in-browser tool.',
    tag: 'Popular',
    views: 'Free Online',
    render: (props) => <ImageCompressorModal onClose={props.onClose} />,

        <div id="yt-results-box" style="display: none; margin-top: 24px;">
          <div style="background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 16px; margin-bottom: 14px;">
            <div style="    htmlTemplate: `<div id="tool-image-compressor" class="tool-content"><h3>Image Compressor</h3></div>`,
    init: () => {
      console.log('[ToolRegistry] Initialized Image Compressor');
    },
  },

  'image-resizer': {
    id: 'image-resizer',
    title: 'Image Resizer & Crop Ratio',
    category: 'photo',
    emoji: '📐',
    description: 'Resize image dimensions by pixels or percentage for Instagram, YouTube thumbnails, and web banners.',
    tag: 'Free Utility',
    views: 'Free Online',
    render: (props) => <ImageResizerModal onClose={props.onClose} />,
    htmlTemplate: `<div id="tool-image-resizer" class="tool-content"><h3>Image Resizer</h3></div>`,
    init: () => {
      console.log('[ToolRegistry] Initialized Image Resizer');
    },
  },

  'emi-calculator': {
    id: 'emi-calculator',
    title: 'EMI Calculator',
    category: 'calc',
    emoji: '🧮',
    description: 'Calculate monthly home, car, or personal loan EMIs with interactive tenure sliders and interest breakdown.',
    tag: 'Popular',
    views: 'Free Online',
    render: (props) => <EmiCalculatorModal onClose={props.onClose} />,
    htmlTemplate: `<div id="tool-emi-calculator" class="tool-content"><h3>EMI Calculator</h3></div>`,
    init: () => {
      console.log('[ToolRegistry] Initialized EMI Calculator');
    },
  },

  'age-calculator': {
    id: 'age-calculator',
    title: 'Age Calculator',
    category: 'calc',
    emoji: '🎂',
    description: 'Calculate your exact age in years, months, days, and hours, plus countdown to your next birthday.',
    tag: 'Popular',
    views: 'Free Online',
    render: (props) => <AgeCalculatorModal onClose={props.onClose} />,
    htmlTemplate: `<div id="tool-age-calculator" class="tool-content"><h3>Age Calculator</h3></div>`,
    init: () => {
      console.log('[ToolRegistry] Initialized Age Calculator');
    },
  },

  'percentage-calculator': {
    id: 'percentage-calculator',
    title: 'Percentage Calculator',
    category: 'calc',
    emoji: '📊',
    description: 'Quickly find what percentage X is of Y, percentage increase/decrease, and discount values.',
    tag: 'Free Utility',
    views: 'Free Online',
    render: (props) => <PercentageCalculatorModal onClose={props.onClose} />,
    htmlTemplate: `<div id="tool-percentage-calculator" class="tool-content"><h3>Percentage Calculator</h3></div>`,
    init: () => {
      console.log('[ToolRegistry] Initialized Percentage Calculator');
    },
  },

  'discount-calculator': {
    id: 'discount-calculator',
    title: 'Discount & Sales Calculator',
    category: 'calc',
    emoji: '🏷️',
    description: 'Calculate final price after discount percentage, savings amount, and double discounts.',
    tag: 'Free Utility',
    views: 'Free Online',
    render: (props) => <DiscountCalculatorModal onClose={props.onClose} />,
    htmlTemplate: `<div id="tool-discount-calculator" class="tool-content"><h3>Discount Calculator</h3></div>`,
    init: () => {
      console.log('[ToolRegistry] Initialized Discount Calculator');
    },
  },

  'gst-calculator': {
    id: 'gst-calculator',
    title: 'GST Calculator',
    category: 'calc',
    emoji: '💰',
    description: 'Calculate Inclusive and Exclusive GST with standard 5%, 12%, 18%, and 28% tax slabs with CGST/SGST split.',
    tag: 'Trending',
    views: 'Free Online',
    render: (props) => <GstCalculatorModal onClose={props.onClose} />,
    htmlTemplate: `<div id="tool-gst-calculator" class="tool-content"><h3>GST Calculator</h3></div>`,
    init: () => {
      console.log('[ToolRegistry] Initialized GST Calculator');
    },
  },

  'word-counter': {
    id: 'word-counter',
    title: 'Word & Character Counter',
    category: 'lang',
    emoji: '📝',
    description: 'Count words, characters, sentences, paragraphs, reading time, and speaking time with live text stats.',
    tag: 'Trending',
    views: 'Free Online',
    render: (props) => <WordCounterModal onClose={props.onClose} />,
    htmlTemplate: `<div id="tool-word-counter" class="tool-content"><h3>Word Counter</h3></div>`,
    init: () => {
      console.log('[ToolRegistry] Initialized Word Counter');
    },
  },

  'password-generator': {
    id: 'password-generator',
    title: 'Strong Password Generator',
    category: 'lang',
    emoji: '🔐',
    description: 'Generate unbreakable passwords with custom length, symbols, numbers, and strength score indicator.',
    tag: 'Trending',
    views: 'Free Online',
    render: (props) => <PasswordGeneratorModal onClose={props.onClose} />,
    htmlTemplate: `<div id="tool-password-generator" class="tool-content"><h3>Password Generator</h3></div>`,
    init: () => {
      console.log('[ToolRegistry] Initialized Password Generator');
    },
  },

  'hashtag-generator': {
    id: 'hashtag-generator',
    title: 'Hashtag Generator',
    category: 'social',
    emoji: '🏷️',
    description: 'Find viral Instagram reels, TikTok, and YouTube hashtags sorted by niche, reach, and competition.',
    tag: 'Trending',
    views: 'Free Online',
    render: (props) => <HashtagGeneratorModal onClose={props.onClose} />,
    htmlTemplate: `<div id="tool-hashtag-generator" class="tool-content"><h3>Hashtag Generator</h3></div>`,
    init: () => {
      console.log('[ToolRegistry] Initialized Hashtag Generator');
    },
  },

  'text-case-converter': {
    id: 'text-case-converter',
    title: 'Text Case Converter',
    category: 'lang',
    emoji: '🔤',
    description: 'Transform text to UPPERCASE, lowercase, Title Case, camelCase, snake_case, and Sentence case with 1-click.',
    tag: 'Trending',
    views: 'Free Online',
    render: (props) => <TextCaseConverterModal onClose={props.onClose} />,
    htmlTemplate: `<div id="tool-text-case-converter" class="tool-content"><h3>Text Case Converter</h3></div>`,
    init: () => {
      console.log('[ToolRegistry] Initialized Text Case Converter');
    },
  },
};

// Aliases mapping for flexible navigation IDs
const ALIASES: Record<string, string> = {
  // Legal aliases
  'contact-us': 'contact',
  'contact-page': 'contact',
  'support': 'contact',
  'help': 'contact',

  'about-us': 'about',
  'about-toolmitra': 'about',

  'privacy-policy': 'privacy',
  'privacy-page': 'privacy',

  'terms-of-service': 'terms',
  'terms-and-conditions': 'terms',
  'tos': 'terms',

  'disclaimer-page': 'disclaimer',
  'legal-disclaimer': 'disclaimer',

  // Tool aliases
  'qr-generator': 'qr-code-generator',
  'qr': 'qr-code-generator',
  'qr-tool-view': 'qr-code-generator',
  'qr-tool': 'qr-code-generator',
  'qr-code': 'qr-code-generator',

  'prompt-gen': 'ai-prompt-generator',
  'prompt': 'ai-prompt-generator',
  'ai-prompt': 'ai-prompt-generator',
  'prompt-tool-view': 'ai-prompt-generator',
  'prompt-tool': 'ai-prompt-generator',

  'image-prompt': 'image-prompt-generator',
  'youtube-title': 'youtube-title-generator',
  'yt-title': 'youtube-title-generator',

  'compressor': 'image-compressor',
  'image-compress': 'image-compressor',
  'resizer': 'image-resizer',
  'image-resize': 'image-resizer',

  'emi': 'emi-calculator',
  'loan-calculator': 'emi-calculator',
  'age': 'age-calculator',
  'percentage': 'percentage-calculator',
  'discount': 'discount-calculator',
  'gst': 'gst-calculator',

  'word-count': 'word-counter',
  'char-counter': 'word-counter',
  'password': 'password-generator',
  'password-gen': 'password-generator',
  'hashtag': 'hashtag-generator',
  'hashtags': 'hashtag-generator',
  'text-converter': 'text-case-converter',
  'case-converter': 'text-case-converter',
};

// Complete JavaScript ToolRegistry object
export const ToolRegistry: Record<string, ToolRegistryEntry> = new Proxy(REGISTRY_ENTRIES, {
  get(target, prop: string) {
    if (prop in target) {
      return target[prop];
    }
    const clean = prop.replace(/-tool-view$/, '').replace(/^#/, '');
    const canonicalKey = ALIASES[clean] || clean;
    if (canonicalKey in target) {
      return target[canonicalKey];
    }
    return undefined;
  },
});

// Helper to resolve any incoming tool id / alias to canonical tool info
export function resolveTool(toolIdOrAlias: string): ToolRegistryEntry | undefined {
  if (!toolIdOrAlias) return undefined;
  const clean = toolIdOrAlias.replace(/-tool-view$/, '').replace(/^#/, '').trim();
  const canonicalId = ALIASES[clean] || clean;
  return REGISTRY_ENTRIES[canonicalId];
}

// Helper to convert ToolRegistryEntry to ToolItem
export function getToolItem(entry: ToolRegistryEntry): ToolItem {
  const fromDb = TOOLS_DATABASE.find((t) => t.id === entry.id);
  if (fromDb) return fromDb;
  return {
    id: entry.id,
    title: entry.title,
    category: entry.category as any,
    emoji: entry.emoji,
    description: entry.description,
    tag: entry.tag as any,
    isPopular: false,
    isTrending: false,
    views: entry.views,
    actionText: 'Use Tool',
  };
}
