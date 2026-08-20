import React, { useState } from 'react';
import { Calendar, Cake, Clock, Heart, Sparkles, Copy, Check, RotateCcw } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function AgeCalculatorModal({ onClose }: Props) {
  const todayStr = new Date().toISOString().split('T')[0];
  const [birthDate, setBirthDate] = useState('2000-01-15');
  const [targetDate, setTargetDate] = useState(todayStr);
  const [copied, setCopied] = useState(false);

  const calculateAgeDetails = () => {
    if (!birthDate) return null;
    const start = new Date(birthDate);
    const end = new Date(targetDate || todayStr);

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
      return null;
    }

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    // Total calculations
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const totalSeconds = totalMinutes * 60;

    // Next birthday calculation
    let nextBday = new Date(end.getFullYear(), start.getMonth(), start.getDate());
    if (nextBday < end) {
      nextBday = new Date(end.getFullYear() + 1, start.getMonth(), start.getDate());
    }
    const daysUntilBirthday = Math.ceil((nextBday.getTime() - end.getTime()) / (1000 * 60 * 60 * 24));

    // Day of birth
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const bornDay = dayNames[start.getDay()];
    const nextBdayDayName = dayNames[nextBday.getDay()];

    // Zodiac sign
    const getZodiac = (d: Date) => {
      const month = d.getMonth() + 1;
      const day = d.getDate();
      if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return '♒ Aquarius (Kumbh)';
      if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return '♓ Pisces (Meen)';
      if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return '♈ Aries (Mesh)';
      if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return '♉ Taurus (Vrishabh)';
      if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return '♊ Gemini (Mithun)';
      if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return '♋ Cancer (Kark)';
      if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return '♌ Leo (Singh)';
      if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return '♍ Virgo (Kanya)';
      if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return '♎ Libra (Tula)';
      if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return '♏ Scorpio (Vrishchik)';
      if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return '♐ Sagittarius (Dhanu)';
      return '♑ Capricorn (Makar)';
    };

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalHours,
      totalMinutes,
      totalSeconds,
      daysUntilBirthday,
      nextBdayDayName,
      bornDay,
      zodiac: getZodiac(start),
    };
  };

  const details = calculateAgeDetails();

  const handleCopy = () => {
    if (!details) return;
    const summary = `--- ToolMitra Age Calculation ---
Exact Age: ${details.years} Years, ${details.months} Months, ${details.days} Days
Day of Birth: ${details.bornDay}
Zodiac Sign: ${details.zodiac}
Total Days Lived: ${details.totalDays.toLocaleString()} days
Total Hours: ${details.totalHours.toLocaleString()} hours
Next Birthday: In ${details.daysUntilBirthday} days (${details.nextBdayDayName})`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Date Pickers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
            Date of Birth
          </label>
          <input
            id="birthdate-input"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full rounded-xl bg-zinc-900 border border-zinc-700/80 px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500 font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
            Age as of Date (Today)
          </label>
          <input
            id="targetdate-input"
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full rounded-xl bg-zinc-900 border border-zinc-700/80 px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500 font-mono"
          />
        </div>
      </div>

      {details ? (
        <div className="space-y-4">
          {/* Main Hero Age Display */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/40 via-zinc-900 to-zinc-900 border border-amber-500/30 text-center flex flex-col items-center gap-2">
            <span className="text-xs text-amber-300 font-semibold flex items-center gap-1.5">
              <Cake className="w-4 h-4 text-amber-400" />
              Your Exact Age
            </span>
            <div className="flex items-baseline justify-center gap-3 flex-wrap mt-1">
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl font-black text-white font-mono">{details.years}</span>
                <span className="text-xs text-zinc-400 font-medium">Years</span>
              </div>
              <span className="text-2xl text-zinc-600 font-light">•</span>
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">{details.months}</span>
                <span className="text-xs text-zinc-400 font-medium">Months</span>
              </div>
              <span className="text-2xl text-zinc-600 font-light">•</span>
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl font-black text-white font-mono">{details.days}</span>
                <span className="text-xs text-zinc-400 font-medium">Days</span>
              </div>
            </div>
            <p className="text-xs text-zinc-400 mt-2">
              Born on a <span className="text-zinc-200 font-semibold">{details.bornDay}</span> &bull; Zodiac: <span className="text-zinc-200 font-semibold">{details.zodiac}</span>
            </p>
          </div>

          {/* Next Birthday Banner */}
          <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                <Cake className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs font-semibold text-zinc-200">Next Birthday Countdown</h5>
                <p className="text-[11px] text-zinc-400">
                  {details.daysUntilBirthday === 0 ? '🎉 Happy Birthday Today!' : `${details.daysUntilBirthday} days left (${details.nextBdayDayName})`}
                </p>
              </div>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-pink-500/10 text-pink-400 border border-pink-500/20 font-mono">
              {details.daysUntilBirthday} Days
            </span>
          </div>

          {/* Lifetime Units Breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-center">
              <span className="text-[10px] text-zinc-400">Total Days</span>
              <p className="text-sm font-bold text-zinc-100 font-mono mt-0.5">
                {details.totalDays.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-center">
              <span className="text-[10px] text-zinc-400">Total Weeks</span>
              <p className="text-sm font-bold text-zinc-100 font-mono mt-0.5">
                {details.totalWeeks.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-center">
              <span className="text-[10px] text-zinc-400">Total Hours</span>
              <p className="text-sm font-bold text-zinc-100 font-mono mt-0.5">
                {details.totalHours.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-center">
              <span className="text-[10px] text-zinc-400">Total Minutes</span>
              <p className="text-sm font-bold text-zinc-100 font-mono mt-0.5">
                {details.totalMinutes.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
            <button
              type="button"
              onClick={() => {
                setBirthDate('2000-01-01');
                setTargetDate(todayStr);
              }}
              className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Dates
            </button>

            <button
              id="btn-copy-age-report"
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-amber-600 text-xs font-medium text-zinc-200 hover:text-white transition cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Copied Age Report
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Age Report
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-xl bg-zinc-900 text-center text-zinc-400 text-xs">
          Please select a valid date of birth earlier than the target date.
        </div>
      )}
    </div>
  );
}
