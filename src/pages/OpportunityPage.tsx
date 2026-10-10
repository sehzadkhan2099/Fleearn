import React from 'react';
import { useApp } from '../context/AppContext';
import { Briefcase, ArrowLeft, RefreshCw } from 'lucide-react';

export const OpportunityPage: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <div className="p-8 sm:p-14 rounded-3xl bg-neutral-900/60 border border-white/10 shadow-2xl space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-neutral-950 flex items-center justify-center text-neutral-400 border border-white/5">
          <Briefcase className="w-10 h-10 text-emerald-400" />
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl sm:text-4xl font-black text-white font-['Outfit']">
            অপরচুনিটি (Opportunity)
          </h1>
          <p className="text-base sm:text-lg text-emerald-300 font-semibold max-w-xl mx-auto leading-relaxed">
            বর্তমানে কোন অপরচুনিটি উপলব্ধ নেই অপরচুনিটিতে অ্যাক্সেস পেতে সব সময় এই পেজটি চেক করুন।
          </p>
          <p className="text-xs text-neutral-400 max-w-md mx-auto">
            নতুন ফ্রিল্যান্সিং অফার, কান্ট্রি ডিরেক্টর নিয়োগ এবং স্পেশাল মার্চেন্ট পার্টনারশিপ উন্মুক্ত হলে এই পেজেই সরাসরি বিজ্ঞপ্তি প্রকাশ করা হবে।
          </p>
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-semibold rounded-xl inline-flex items-center gap-2 border border-white/10 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
            <span>পেজ রিফ্রেশ করুন</span>
          </button>

          <button
            onClick={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-2.5 bg-[#044541] hover:bg-[#065b56] text-white text-xs font-semibold rounded-xl inline-flex items-center gap-2 cursor-pointer transition-colors shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 text-red-400" />
            <span>মূল পেজে ফিরে যান</span>
          </button>
        </div>
      </div>
    </div>
  );
};
