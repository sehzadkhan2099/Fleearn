import React from 'react';
import { useApp } from '../context/AppContext';
import { ImageOff, ArrowLeft } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-center">
      <div className="p-12 md:p-16 rounded-3xl bg-neutral-900/60 light:bg-white border border-white/10 light:border-neutral-200 shadow-2xl space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-neutral-950 light:bg-neutral-100 flex items-center justify-center text-neutral-400 border border-white/5">
          <ImageOff className="w-10 h-10 text-neutral-500" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-white light:text-neutral-900 font-['Outfit']">
            গ্যালারি (Gallery)
          </h1>
          <p className="text-base sm:text-lg text-red-400 font-semibold">
            এই সার্ভিস বর্তমানে বন্ধ রয়েছে।
          </p>
          <p className="text-xs text-neutral-400 max-w-md mx-auto">
            গ্যালারি মডিউলে রক্ষণাবেক্ষণ ও নতুন আর্টওয়ার্ক আপগ্রেড চলছে। সাময়িক অসুবিধার জন্য আমরা আন্তরিকভাবে দুঃখিত।
          </p>
        </div>

        <div className="pt-4">
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
