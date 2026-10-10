import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Download,
} from 'lucide-react';

export const PricingPage: React.FC = () => {
  const { pricingPlans, setCurrentPage } = useApp();

  const handleBuyNow = () => {
    // Navigates directly to Mobile App installation page as requested
    setCurrentPage('app');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#044541]/40 border border-[#044541] rounded-full text-xs font-semibold text-emerald-300">
          <Sparkles className="w-3.5 h-3.5 text-red-400" />
          <span>FSD ভার্চুয়াল কারেন্সি মেম্বারশিপ হাব</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-['Outfit']">
          Fleearn প্রিমিয়াম মেম্বারশিপ প্ল্যানসমূহ
        </h1>
        <p className="text-sm sm:text-base text-neutral-400">
          আপনার প্রয়োজন অনুযায়ী সেরা প্ল্যানটি বেছে নিন এবং আনলক করুন অতিরিক্ত বোনাস ও প্রায়োরিটি উইথড্রয়াল
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {pricingPlans.map((plan) => (
          <div
            key={plan.id}
            className={`relative p-6 sm:p-8 rounded-3xl border flex flex-col justify-between transition-all duration-300 ${
              plan.popular
                ? 'bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-950 border-[#044541] shadow-2xl shadow-emerald-950/60 lg:scale-105 z-10'
                : 'bg-neutral-900/50 border-white/10 hover:border-[#044541]/60'
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 bg-[#044541] border border-emerald-400 text-white text-[11px] font-bold rounded-full shadow-lg font-mono tracking-wide">
                {plan.badge}
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white font-['Outfit']">
                  {plan.name}
                </h3>
                <span className="text-xs text-neutral-400 font-mono block mt-1">
                  ভ্যালিডিটি: {plan.validity}
                </span>
              </div>

              {/* Price in Dollars + FSD Virtual Currency notation */}
              <div className="space-y-1 pb-6 border-b border-white/10">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-white font-mono">
                    ${plan.priceUSD}
                  </span>
                  <span className="text-lg font-bold text-emerald-400 font-mono">
                    ({plan.fsdAmount} FSD)
                  </span>
                </div>
                <span className="text-xs text-neutral-400">
                  FSD হলো আমাদের অফিসিয়াল ভার্চুয়াল কারেন্সি
                </span>
              </div>

              {/* Features List */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
                  সুবিধাসমূহ:
                </span>
                <ul className="space-y-2.5 text-xs text-neutral-300">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className="p-0.5 rounded-full bg-[#044541] text-emerald-300 mt-0.5 shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Buy Now Button -> Takes to Android Mobile App page */}
            <div className="pt-8">
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 bg-[#044541] hover:bg-[#065b56] text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-950 flex items-center justify-center gap-2 cursor-pointer transition-all transform hover:-translate-y-0.5 group"
              >
                <span>Buy Now</span>
                <ArrowRight className="w-4 h-4 text-red-400 group-hover:translate-x-1 transition-transform" />
              </button>
              <span className="text-[10px] text-neutral-500 text-center block mt-2">
                অ্যান্ড্রয়েড অ্যাপ ইনস্টলের জন্য মোবাইল অ্যাপ পেজে নিয়ে যাবে
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Info Callout */}
      <div className="p-6 bg-neutral-900/40 rounded-2xl border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>সকল প্ল্যানের মূল্য ও সুবিধা অ্যাডমিন প্যানেল থেকে যেকোনো সময় পরিবর্তন করা যায়।</span>
        </div>
        <button
          onClick={handleBuyNow}
          className="text-emerald-400 hover:text-white font-semibold flex items-center gap-1 cursor-pointer shrink-0"
        >
          <span>সরাসরি অ্যাপে ইনস্টল করুন</span>
          <Download className="w-3.5 h-3.5 text-red-400" />
        </button>
      </div>
    </div>
  );
};
