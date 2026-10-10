import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { BrandLogos } from './BrandLogos';
import {
  Mail,
  Globe,
  MapPin,
  Phone,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { companyInfo, openSecretModal, t, setCurrentPage } = useApp();

  // 5-second long-press secret trigger state
  const [pressProgress, setPressProgress] = useState(0); // 0 to 100
  const [isPressing, setIsPressing] = useState(false);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const startHold = () => {
    setIsPressing(true);
    setPressProgress(0);
    startTimeRef.current = Date.now();

    const interval = window.setInterval(() => {
      if (!startTimeRef.current) return;
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(100, (elapsed / 5000) * 100);
      setPressProgress(progress);

      if (elapsed >= 5000) {
        clearInterval(interval);
        setIsPressing(false);
        setPressProgress(100);
        startTimeRef.current = null;
        // Trigger secret modal!
        openSecretModal();
      }
    }, 50);

    timerRef.current = interval;
  };

  const cancelHold = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPressing(false);
    setPressProgress(0);
    startTimeRef.current = null;
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <footer className="relative bg-[#070d0c] text-neutral-300 border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Subtle brand glow backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#044541]/25 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Main Footer Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Logo & Tagline (Fully Editable from Admin) */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {companyInfo.logoUrl ? (
                <img
                  src={companyInfo.logoUrl}
                  alt={companyInfo.name}
                  className="w-10 h-10 rounded-xl object-cover border border-emerald-500/40 shadow-lg"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#044541] to-emerald-950 flex items-center justify-center border border-emerald-500/40 shadow-lg">
                  <span className="text-white font-black text-xl font-['Outfit']">F</span>
                </div>
              )}
              <span className="text-xl font-black text-white font-['Outfit']">
                {companyInfo.name.split(' ')[0] || 'Fleearn'}
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {companyInfo.tagline}
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-neutral-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>সার্ভার স্ট্যাটাস: ৯৯.৯৯% আপটাইম</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              প্ল্যাটফর্ম নেভিগেশন
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('notice');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.notice}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('app');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.app}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('features');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.features}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('pricing');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.pricing}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('faq');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.faq}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              আইনগত ও ডকুমেন্টস
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('documents');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.documents}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('gallery');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.gallery}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('opportunity');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.opportunity}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate Contacts (Fully Editable from Admin) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              কর্পোরেট যোগাযোগ
            </h4>
            <div className="space-y-2 text-xs text-neutral-300">
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                <a href={`mailto:${companyInfo.email}`} className="hover:text-white transition-colors">
                  {companyInfo.email}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Globe className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                <a href={companyInfo.webAddress} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  {companyInfo.webAddress}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                <span>{companyInfo.phone}</span>
              </div>
              {companyInfo.whatsapp && (
                <div className="flex items-start gap-2">
                  <BrandLogos.WhatsApp className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>হোয়াটসঅ্যাপ: {companyInfo.whatsapp}</span>
                </div>
              )}
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed text-[11px] text-neutral-400">
                  {companyInfo.address}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links with Authentic Brand Logos */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-400 font-medium">অফিসিয়াল সোশ্যাল লিংক:</span>
            <div className="flex items-center gap-2">
              <a
                href={companyInfo.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-transform hover:scale-110"
                title="YouTube"
              >
                <BrandLogos.YouTube className="w-4 h-4" />
              </a>
              <a
                href={companyInfo.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-transform hover:scale-110"
                title="Facebook"
              >
                <BrandLogos.Facebook className="w-4 h-4" />
              </a>
              <a
                href={companyInfo.socials.telegram}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-transform hover:scale-110"
                title="Telegram"
              >
                <BrandLogos.Telegram className="w-4 h-4" />
              </a>
              <a
                href={companyInfo.whatsapp ? `https://wa.me/${companyInfo.whatsapp.replace(/[^0-9]/g, '')}` : '#'}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-transform hover:scale-110"
                title="WhatsApp"
              >
                <BrandLogos.WhatsApp className="w-4 h-4" />
              </a>
              <a
                href={companyInfo.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-transform hover:scale-110"
                title="Instagram"
              >
                <BrandLogos.Instagram className="w-4 h-4" />
              </a>
              <a
                href={companyInfo.socials.pinterest}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-transform hover:scale-110"
                title="Pinterest"
              >
                <BrandLogos.Pinterest className="w-4 h-4" />
              </a>
              <a
                href={companyInfo.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-transform hover:scale-110"
                title="Twitter / X"
              >
                <BrandLogos.Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Payment Gateways row with Original Logos */}
          <div className="flex items-center gap-2 flex-wrap text-xs text-neutral-400">
            <span className="text-[11px] text-neutral-500 font-medium">ক্যাশআউট গেটওয়ে:</span>
            <div className="flex items-center gap-1.5">
              <span title="বিকাশ"><BrandLogos.bKash className="w-5 h-5" /></span>
              <span title="নগদ"><BrandLogos.Nagad className="w-5 h-5" /></span>
              <span title="রকেট"><BrandLogos.Rocket className="w-5 h-5" /></span>
              <span title="উপায়"><BrandLogos.Upay className="w-5 h-5" /></span>
              <span title="সেলফিন"><BrandLogos.CellFin className="w-5 h-5" /></span>
              <span title="স্কাই ব্যাংকিং"><BrandLogos.SkyBanking className="w-5 h-5" /></span>
              <span title="বাইন্যান্স"><BrandLogos.Binance className="w-5 h-5" /></span>
              <span title="RedotPay"><BrandLogos.RedotPay className="w-5 h-5" /></span>
              <span title="পেয়োনিয়ার"><BrandLogos.Payoneer className="w-5 h-5" /></span>
            </div>
          </div>
        </div>

        {/* BOTTOM COMPANY NAME WITH 5-SECOND LONG PRESS SECRET EASTER EGG */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-3">
            {/* The secret company name button with 5s hold detector */}
            <div className="relative inline-block">
              <button
                onMouseDown={startHold}
                onMouseUp={cancelHold}
                onMouseLeave={cancelHold}
                onTouchStart={startHold}
                onTouchEnd={cancelHold}
                onTouchCancel={cancelHold}
                className="font-bold text-white tracking-wide font-['Outfit'] hover:text-emerald-400 transition-colors select-none cursor-pointer py-1 px-2.5 rounded-lg bg-neutral-900/60 border border-white/5"
                title={companyInfo.name}
              >
                {companyInfo.name}
              </button>

              {/* Progress bar overlay when pressing */}
              {isPressing && (
                <div className="absolute -top-7 left-0 right-0 flex flex-col items-center gap-1 animate-fade-in pointer-events-none">
                  <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-400 h-full transition-all duration-75 shadow-sm shadow-emerald-400"
                      style={{ width: `${pressProgress}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-amber-400 font-mono font-bold whitespace-nowrap">
                    হোল্ড করুন: {Math.round(pressProgress / 20)}s / 5s
                  </span>
                </div>
              )}
            </div>
            <span>· All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-neutral-500">
            <span>SSL 256-Bit Encrypted</span>
            <span>·</span>
            <span>Version 3.5.0 Production Build</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
