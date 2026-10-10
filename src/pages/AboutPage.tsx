import React from 'react';
import { useApp } from '../context/AppContext';
import { FleearnLogo } from '../components/FleearnLogo';
import { Info, ShieldCheck, Globe, Users, Award } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { companyInfo, language } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#044541]/40 border border-[#044541] rounded-full text-xs font-semibold text-emerald-300">
          <Info className="w-3.5 h-3.5 text-red-400" />
          <span>আমাদের লক্ষ্য ও দৃষ্টিভঙ্গি</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-['Outfit']">
          আমাদের সম্পর্কে (About Us)
        </h1>
        <p className="text-sm sm:text-base text-neutral-400">
          {companyInfo.tagline}
        </p>
      </div>

      {/* Main Admin Editable Paragraph Box */}
      <div className="p-6 sm:p-10 md:p-12 bg-neutral-900/60 rounded-3xl border border-[#044541] shadow-2xl space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <FleearnLogo size="md" />
          <div>
            <h2 className="text-lg font-bold text-white font-['Outfit']">
              {companyInfo.name}
            </h2>
            <span className="text-xs text-emerald-400 font-mono">
              গ্লোবাল ডিজিটাল আর্নিং ইনোভেশন
            </span>
          </div>
        </div>

        {/* The paragraph strictly written and editable from Admin Panel */}
        <div className="text-sm sm:text-base text-neutral-200 leading-relaxed sm:leading-loose whitespace-pre-line text-justify">
          {language === 'bn' ? companyInfo.aboutParagraphBn : companyInfo.aboutParagraphEn}
        </div>

        {/* Key Values */}
        <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-400 block font-['Outfit']">
              ১০০% সততা ও নিরাপত্তা
            </span>
            <p className="text-xs text-neutral-400">
              প্রত্যেকটি টাস্ক এবং পেমেন্ট স্বচ্ছ ও অটোমেটেড অ্যালগরিদমে পরিচালিত।
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-400 block font-['Outfit']">
              গ্লোবাল অ্যাক্সেসিবিলিটি
            </span>
            <p className="text-xs text-neutral-400">
              আন্তর্জাতিক ফ্রিল্যান্সিং সুযোগ এখন প্রত্যেকের হাতের মুঠোয়।
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-400 block font-['Outfit']">
              ২৪/৭ সার্বক্ষণিক সমর্থন
            </span>
            <p className="text-xs text-neutral-400">
              প্রকৌশল ও কমপ্লায়েন্স টিমের সরাসরি সহায়তা নেটওয়ার্ক।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
