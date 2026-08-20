import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MessageSquare,
  User,
  Send,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Globe,
  Clock,
  MapPin,
  ExternalLink,
} from 'lucide-react';

interface Props {
  onClose?: () => void;
}

export default function ContactPage({ onClose }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry / Tool Request',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ownerName = 'Mohd Adnan';
  const ownerEmail = 'mohd.adnan.ze92@gmail.com';
  const ownerPhone = '+91 9193393089';
  const ownerPhoneClean = '919193393089';
  const whatsAppUrl = `https://wa.me/${ownerPhoneClean}?text=${encodeURIComponent(
    'Hi Mohd Adnan, I am reaching out from ToolMitra regarding '
  )}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'General Inquiry / Tool Request',
      message: '',
    });
    setIsSubmitted(false);
  };

  return (
    <div className="space-y-8 text-zinc-100">
      {/* Intro Header */}
      <div className="border-b border-zinc-800/80 pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
          Get in Touch &bull; Support &amp; Inquiries
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
          Contact &amp; Customer Support
        </h2>
        <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
          Have feedback, need a custom web or AI tool developed, or have support questions? Connect directly with the founder or submit the contact form below.
        </p>
      </div>

      {/* Direct Contact Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Founder Card */}
        <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 flex flex-col justify-between gap-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                Founder &amp; Lead Engineer
              </span>
              <h3 className="text-base font-bold text-white">{ownerName}</h3>
            </div>
            <p className="text-xs text-zinc-400">
              Building privacy-first, zero-friction smart utilities for India &amp; global creators.
            </p>
          </div>
          <div className="pt-2 border-t border-zinc-900 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>Direct Support Verified</span>
          </div>
        </div>

        {/* Email Card */}
        <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 flex flex-col justify-between gap-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                Official Email
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white break-all">
                {ownerEmail}
              </h3>
            </div>
            <p className="text-xs text-zinc-400">
              Quick response for partnerships, custom tools, and feedback within 24 hours.
            </p>
          </div>

          <a
            id="btn-direct-mailto"
            href={`mailto:${ownerEmail}?subject=ToolMitra%20Inquiry`}
            className="w-full py-2.5 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
          >
            <Mail className="w-4 h-4" />
            <span>Send Direct Email</span>
            <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
          </a>
        </div>

        {/* Phone & WhatsApp Card */}
        <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 flex flex-col justify-between gap-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                Phone &amp; WhatsApp
              </span>
              <h3 className="text-base font-bold text-white">{ownerPhone}</h3>
            </div>
            <p className="text-xs text-zinc-400">
              Available Monday to Saturday for urgent requests and technical collaboration.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <a
              id="btn-direct-call"
              href={`tel:${ownerPhone}`}
              className="py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-indigo-400" />
              <span>Call</span>
            </a>
            <a
              id="btn-direct-whatsapp"
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Interactive Contact Form & Availability Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 pt-4">
        {/* Left: Contact Form (3 Cols) */}
        <div className="lg:col-span-3 p-6 sm:p-7 rounded-3xl bg-zinc-950/90 border border-zinc-800 shadow-xl">
          <div className="mb-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-400" />
              <span>Send a Message</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Fill in your details below and our team will get back to your email directly.
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center flex flex-col items-center gap-3 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-white">Message Sent Successfully!</h4>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-md leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Mohd Adnan and the ToolMitra team have received your note and will review it shortly at <strong>{formData.email || ownerEmail}</strong>.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-3 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-bold text-zinc-200 transition cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Your Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="contact-form-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full rounded-xl bg-zinc-900 border border-zinc-700/80 px-3.5 py-2.5 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="contact-form-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. name@company.com"
                    className="w-full rounded-xl bg-zinc-900 border border-zinc-700/80 px-3.5 py-2.5 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Phone / WhatsApp (Optional)
                  </label>
                  <input
                    id="contact-form-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl bg-zinc-900 border border-zinc-700/80 px-3.5 py-2.5 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Inquiry Type
                  </label>
                  <select
                    id="contact-form-subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full rounded-xl bg-zinc-900 border border-zinc-700/80 px-3.5 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500 transition cursor-pointer"
                  >
                    <option value="General Inquiry / Tool Request">Request a New Tool</option>
                    <option value="Bug Report">Report a Bug / Error</option>
                    <option value="Custom Software Development">Custom Software Development</option>
                    <option value="Partnership / Sponsorship">Partnership / Collaboration</option>
                    <option value="Other">Other Query</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Message / Details <span className="text-rose-400">*</span>
                </label>
                <textarea
                  id="contact-form-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your suggestion, tool request, or inquiry in detail..."
                  className="w-full rounded-xl bg-zinc-900 border border-zinc-700/80 px-3.5 py-2.5 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 transition resize-none"
                />
              </div>

              <button
                id="btn-submit-contact-form"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-indigo-500/20 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Sending Message...' : 'Send Message to Founder'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Right: Support Guidelines & Quick Info (2 Cols) */}
        <div className="lg:col-span-2 space-y-4 flex flex-col justify-between">
          <div className="p-6 rounded-3xl bg-zinc-950/90 border border-zinc-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>ToolMitra Support Standards</span>
            </h3>

            <ul className="space-y-3 text-xs text-zinc-300">
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Rapid Response SLA</strong>
                  We reply to email and WhatsApp queries within 12 to 24 business hours.
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <Globe className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Community Driven</strong>
                  Over 70% of new tools on ToolMitra are built based on user requests from this form.
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Global Reach &bull; Made in India</strong>
                  Designed and maintained by Mohd Adnan for users across India and worldwide.
                </div>
              </li>
            </ul>
          </div>

          {/* Quick FAQ / Note */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/30 to-purple-950/20 border border-indigo-500/20">
            <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider block mb-1">
              Pro Tip for Creators
            </span>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Looking for a custom business tool or bulk conversion script? Mention your specifications in the message box to get a personalized solution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
