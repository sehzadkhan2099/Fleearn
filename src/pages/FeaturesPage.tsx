import React from 'react';
import { useApp } from '../context/AppContext';
import { BrandLogos } from '../components/BrandLogos';
import {
  Zap,
  Video,
  MessageSquare,
  ShoppingBag,
  Truck,
  Briefcase,
  Film,
  TrendingUp,
  Headphones,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  const { setCurrentPage } = useApp();

  const coreFeatures = [
    {
      title: 'দ্রুত সাপোর্ট (24/7 Rapid Support)',
      desc: 'যেকোনো প্রযুক্তিগত বা পেমেন্ট সংক্রান্ত জটিলতায় মাত্র কয়েক মিনিটে ডেডিকেটেড ইঞ্জিনিয়ার টিমের সহায়তা।',
      icon: Headphones,
      badge: 'ইনস্ট্যান্ট রেসপন্স',
    },
    {
      title: 'দ্রুত উইথড্র (Fast Instant Withdrawal)',
      desc: 'স্বয়ংক্রিয় এআই পেমেন্ট গেটওয়ের মাধ্যমে আবেদন করার মাত্র ৫ মিনিটের মধ্যে ওয়ালেটে ক্যাশআউট।',
      icon: Zap,
      badge: '৫ মিনিটে পেমেন্ট',
    },
    {
      title: 'আনলিমিটেড ইনকাম (Unlimited Income Streams)',
      desc: 'কোনো নির্দিষ্ট সীমাবদ্ধতা ছাড়া আপনার মেধা, সময় এবং দক্ষতা অনুযায়ী প্রতিদিন আনলিমিটেড উপার্জনের সুযোগ।',
      icon: TrendingUp,
      badge: 'নো সিলিং',
    },
    {
      title: 'আকর্ষণীয় ভাবে ইনকাম (Gamified Engaging Tasks)',
      desc: 'দৈনিক চেক-ইন, লাকি হুইল, স্কিল কুইজ ও মাল্টিমিডিয়া রিওয়ার্ড সিস্টেমের মাধ্যমে আনন্দঘন উপায়ে আয়।',
      icon: Sparkles,
      badge: '৩ডি রিওয়ার্ডস',
    },
    {
      title: 'ভয়েস কল ও ভিডিও কল (Live Voice & Video Calling)',
      desc: 'অ্যাপের ভেতর হাই-ডেফিনিশন লো-ল্যাটেন্সি ভয়েস ও ভিডিও কলের মাধ্যমে সরাসরি ক্লায়েন্টদের সাথে মিটিং।',
      icon: Video,
      badge: 'ফুল এইচডি কল',
    },
    {
      title: 'এন্ড-টু-এন্ড এনক্রিপ্টেড চ্যাটিং (Encrypted Chatting)',
      desc: 'ক্লায়েন্ট, বায়ার ও রেফারেল পার্টনারদের সাথে নিরাপদ মেসেজিং, ফাইল ট্রান্সফার ও ভয়েস নোট শেয়ারিং।',
      icon: MessageSquare,
      badge: 'সিকিউর চ্যাট',
    },
    {
      title: 'পণ্য বিক্রি ও ডিজিটাল স্টোর (Product Selling Marketplace)',
      desc: 'আপনার নিজস্ব পণ্য বা ডিজিটাল সার্ভিস Fleearn-এর লাখো সক্রিয় ব্যবহারকারীর কাছে সরাসরি বিক্রি করুন।',
      icon: ShoppingBag,
      badge: 'মার্কেটপ্লেস',
    },
    {
      title: 'ড্রপ শিপিং হাব (Automated Dropshipping Engine)',
      desc: 'কোনো ইনভেন্টরি ছাড়াই আন্তর্জাতিক এবং দেশীয় সরবরাহকারীদের পণ্য প্রমোট করে আকর্ষণীয় প্রফিট মার্জিন।',
      icon: Truck,
      badge: 'অটো শিপিং',
    },
    {
      title: 'প্রফেশনাল ফ্রিল্যান্সিং (Global Freelancing Network)',
      desc: 'ডাটা এন্ট্রি, কন্টেন্ট রাইটিং, ভার্চুয়াল অ্যাসিস্ট্যান্স ও প্রোগ্রামিং প্রজেক্ট সম্পন্ন করে ডলার আয়।',
      icon: Briefcase,
      badge: 'গ্লোবাল গিগস',
    },
    {
      title: 'ভিডিও এডিটিং ও মিডিয়া প্রডাকশন (Video Editing & Reels)',
      desc: 'সোশ্যাল মিডিয়া রিলস, শর্টস ও ইউটিউব ভিডিও এডিটিং অ্যাসাইনমেন্ট জমা দিয়ে প্রিমিয়াম FSD রিওয়ার্ড।',
      icon: Film,
      badge: 'মিডিয়া হাব',
    },
    {
      title: 'ডিজিটাল মার্কেটিং ও অ্যাড প্রমোশন (Digital Marketing Hub)',
      desc: 'ফেসবুক অ্যাডস, গুগল ক্যাম্পেইন ও ইনফ্লুয়েন্সার মার্কেটিং প্রজেক্ট পরিচালনা করে আয় বাড়ান।',
      icon: TrendingUp,
      badge: 'মার্কেটিং সেল',
    },
  ];

  const paymentGateways = [
    { name: 'বিকাশ (bKash)', type: 'Mobile Wallet', instant: true, logo: <BrandLogos.bKash className="w-7 h-7" /> },
    { name: 'নগদ (Nagad)', type: 'Mobile Wallet', instant: true, logo: <BrandLogos.Nagad className="w-7 h-7" /> },
    { name: 'রকেট (Rocket)', type: 'DBBL Wallet', instant: true, logo: <BrandLogos.Rocket className="w-7 h-7" /> },
    { name: 'উপায় (Upay)', type: 'UCB Wallet', instant: true, logo: <BrandLogos.Upay className="w-7 h-7" /> },
    { name: 'সেলফিন (CellFin)', type: 'IBBL Digital Banking', instant: true, logo: <BrandLogos.CellFin className="w-7 h-7" /> },
    { name: 'স্কাই ব্যাংকিং (Sky Banking)', type: 'EBL Internet Banking', instant: true, logo: <BrandLogos.SkyBanking className="w-7 h-7" /> },
    { name: 'বাইন্যান্স (Binance USDT)', type: 'Crypto Gateway', instant: true, logo: <BrandLogos.Binance className="w-7 h-7" /> },
    { name: 'RedotPay', type: 'Virtual Crypto Card', instant: true, logo: <BrandLogos.RedotPay className="w-7 h-7" /> },
    { name: 'পেয়োনিয়ার (Payoneer)', type: 'Global Payout', instant: false, logo: <BrandLogos.Payoneer className="w-7 h-7" /> },
    { name: 'ফোনপে (PhonePe)', type: 'UPI Gateway', instant: true, logo: <BrandLogos.PhonePe className="w-7 h-7" /> },
    { name: 'গুগল প্লে (Google Play)', type: 'Redeem Gift Codes', instant: true, logo: <BrandLogos.GooglePlay className="w-7 h-7" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* 3D Entry Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#044541]/40 border border-[#044541] rounded-full text-xs font-semibold text-emerald-300">
          <Zap className="w-3.5 h-3.5 text-red-400" />
          <span>নেক্সট-জেন আর্নিং ইনফ্রাস্ট্রাকচার</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-['Outfit']">
          Fleearn অল-ইন-ওয়ান ফিচারস
        </h1>
        <p className="text-sm sm:text-base text-neutral-400">
          একটি আর্নিং অ্যাপে যা কিছু প্রয়োজন—সবকিছু এক প্ল্যাটফর্মে সম্পূর্ণ সুরক্ষিত ও স্বয়ংক্রিয়ভাবে সংহত
        </p>
      </div>

      {/* 3D Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coreFeatures.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div
              key={idx}
              className="relative p-6 sm:p-8 bg-neutral-900/60 rounded-3xl border border-white/10 hover:border-[#044541] transition-all duration-300 space-y-4 group hover:-translate-y-1 shadow-xl hover:shadow-2xl hover:shadow-emerald-950/40"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#044541] flex items-center justify-center text-emerald-300 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-950">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="px-2.5 py-1 bg-neutral-950 text-emerald-400 text-[10px] font-bold rounded-full font-mono border border-white/5">
                  {feat.badge}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white font-['Outfit'] group-hover:text-emerald-400 transition-colors">
                {feat.title}
              </h3>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {feat.desc}
              </p>

              <div className="pt-2 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                <span>অ্যাপে লাইভ রয়েছে</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Fast E-Wallet Withdrawal Section with Authentic Logos */}
      <div className="p-8 md:p-12 bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-3xl border border-[#044541] shadow-2xl space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            ইনস্ট্যান্ট উইথড্রয়াল হাব (Fast E-Wallet Withdrawals)
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white font-['Outfit']">
            ই-ওয়ালেটের মাধ্যমে দ্রুত উইথড্র করুন
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            বিকাশ, নগদ, রকেট, উপায়, সেলফিন, স্কাই ব্যাংকিং, পেয়োনিয়ার, RedotPay, বাইন্যান্স, PhonePe এবং Google Play মাধ্যমে মাত্র ৫ মিনিটে সরাসরি আপনার একাউন্টে ক্যাশআউট নিন।
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {paymentGateways.map((gw, i) => (
            <div
              key={i}
              className="p-4 bg-neutral-950/90 rounded-2xl border border-white/5 hover:border-emerald-500/40 transition-all hover:scale-105 duration-200 space-y-2 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="p-1 rounded-xl bg-neutral-900 border border-white/5">
                  {gw.logo}
                </div>
                {gw.instant && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold font-mono">
                    ৫ মিনিট
                  </span>
                )}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  {gw.name}
                </h4>
                <span className="text-[11px] text-neutral-500 block">
                  {gw.type}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to App */}
        <div className="pt-6 text-center">
          <button
            onClick={() => {
              setCurrentPage('app');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-8 py-3.5 bg-[#044541] hover:bg-[#065b56] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xl shadow-emerald-950/60 inline-flex items-center gap-2 cursor-pointer transition-transform hover:-translate-y-0.5"
          >
            <span>মোবাইল অ্যাপে ওয়ালেট কানেক্ট করুন</span>
            <ArrowRight className="w-4 h-4 text-red-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
