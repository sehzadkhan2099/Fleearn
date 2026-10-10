import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldAlert, CheckCircle2, X, Lock } from 'lucide-react';

const MCQ_OPTIONS = [
  '১. বুধ (Mercury)',
  '২. শুক্র (Venus)',
  '৩. শনি গ্রহ (Saturn)',
  '৪. বৃহস্পতি (Jupiter)',
  '৫. নেপচুন (Neptune)',
  '৬. ইউরেনাস (Uranus)',
  '৭. প্লুটো (Pluto)',
  '৮. টাইটান (Titan)',
  '৯. ইউরোপা (Europa)',
  '১০. গ্যানিমিড (Ganymede)',
  '১১. ক্যালিস্টো (Callisto)',
  '১২. লো (Io)',
  '১৩. ট্রাইটন (Triton)',
  '১৪. সিরিস (Ceres)',
  '১৫. হাউমেয়া (Haumea)',
  '১৬. মাকেমাকে (Makemake)',
  '১৭. এরিস (Eris)',
  '১৮. কাইপার বেল্ট (Kuiper Belt)',
  '১৯. উর্ট ক্লাউড (Oort Cloud)',
  '২০. প্রক্সিমা সেন্টোরাই (Proxima Centauri)',
  '২১. আলফা সেন্টোরাই এ (Alpha Centauri A)',
  '২২. আলফা সেন্টোরাই বি (Alpha Centauri B)',
  '২৩. বার্নার্ডস স্টার (Barnard Star)',
  '২৪. লুমেন ১৬ (Luhman 16)',
  '২৫. সিরিয়াস (Sirius)',
  '২৬. ভেগা (Vega)',
  '২৭. বেটেলজিউস (Betelgeuse)',
  '২৮. রিগেল (Rigel)',
  '২৯. অ্যান্ড্রোমিডা গ্যালাক্সি (Andromeda)',
  '৩০. ট্রায়াঙ্গুলাম গ্যালাক্সি (Triangulum)',
  '৩১. মিল্কি ওয়ে কোর (Milky Way Core)',
  '৩২. ম্যাগেলানিক ক্লাউড (Magellanic Cloud)',
  '৩৩. সেন্টোরাস এ (Centaurus A)',
  '৩৪. সিগনাস এক্স-১ (Cygnus X-1)',
  '৩৫. স্যাজিটেরিয়াস এ (Sagittarius A*)',
  '৩৬. ওরিয়ন নেবুলা (Orion Nebula)',
  '৩৭. ক্র্যাব নেবুলা (Crab Nebula)',
  '৩৮. ঈগল নেবুলা (Eagle Nebula)',
  '৩৯. ট্রাপিস্ট-১ ই (TRAPPIST-1e)',
  '৪০. মঙ্গল গ্রহ (Mars)', // <--- THE SECRET REQUIRED CORRECT OPTION FOR "লাল গ্রহ কোনটি?"
  '৪১. কেপলার-৪৫২বি (Kepler-452b)',
  '৪২. কেপলার-১৬বি (Kepler-16b)',
  '৪৩. গ্লিজ ৬৬৭ সিসি (Gliese 667Cc)',
  '৪৪. এইচডি ২০৯৪৫৮ বি (HD 209458 b)',
  '৪৫. ডাইমোস (Deimos)',
  '৪৬. ফোবোস (Phobos)',
  '৪৭. চারন (Charon)',
  '৪৮. এনসেলাডাস (Enceladus)',
  '৪৯. মিমাস (Mimas)',
  '৫০. ওবেরন (Oberon)',
];

export const SecretAdminModal: React.FC = () => {
  const {
    isSecretModalOpen,
    closeSecretModal,
    mcqClickAttempts,
    registerMcqClick,
    isMcqLockedOut,
  } = useApp();

  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!isSecretModalOpen) return null;

  const handleOptionClick = (index: number) => {
    if (isMcqLockedOut) return;
    setClickedIndex(index);
    const optionNumber = index + 1; // 1-indexed (Option 40 is index 39)

    const result = registerMcqClick(optionNumber);
    if (result.success) {
      setFeedback('সঠিক উত্তর! অ্যাডমিন অথেনটিকেশন পেজে প্রবেশ করানো হচ্ছে...');
    } else {
      if (result.lockedOut) {
        setFeedback('সর্বোচ্চ ২ বার প্রচেষ্টা শেষ! সিকিউরিটি লক সক্রিয় হয়েছে...');
      } else {
        setFeedback(`ভুল উত্তর! কোনো কাজ হবে না। (অবশিষ্ট সুযোগ: ${2 - (mcqClickAttempts + 1)} বার)`);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-neutral-950 border border-[#044541] rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-neutral-100">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-[#044541]/30 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-2.5 bg-[#044541] rounded-xl text-emerald-400">
              <Lock className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white font-['Outfit']">
                গোপন সিকিউরিটি গেটওয়ে (Security Access Gateway)
              </h3>
              <p className="text-[11px] sm:text-xs text-neutral-400">
                সঠিক বিকল্পটি নির্বাচন করুন। একজন ব্যক্তি সর্বোচ্চ ২ বার ক্লিক করতে পারবেন।
              </p>
            </div>
          </div>
          <button
            onClick={closeSecretModal}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Question & Attempt Status */}
        <div className="p-4 sm:p-6 bg-neutral-900/60 border-b border-white/5 space-y-2.5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 bg-[#044541] text-emerald-200 rounded-md">
              যাচাইকরণ প্রশ্ন (Secret MCQ)
            </span>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-neutral-400">ব্যবহৃত সুযোগ:</span>
              <span
                className={`px-2.5 py-0.5 rounded font-bold ${
                  mcqClickAttempts >= 2 ? 'bg-red-950 text-red-400' : 'bg-neutral-800 text-amber-300'
                }`}
              >
                {mcqClickAttempts} / ২ বার
              </span>
            </div>
          </div>

          <h4 className="text-base sm:text-lg font-bold text-white leading-relaxed">
            প্রশ্ন: লাল গ্রহ কোনটি?
          </h4>

          {feedback && (
            <div
              className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 animate-fade-in ${
                feedback.includes('সঠিক')
                  ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-300'
                  : 'bg-red-950/80 border border-red-500/50 text-red-300'
              }`}
            >
              {feedback.includes('সঠিক') ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              ) : (
                <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
              )}
              <span>{feedback}</span>
            </div>
          )}
        </div>

        {/* 50 Options Grid with Responsive Scroll */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
            {MCQ_OPTIONS.map((opt, idx) => {
              const optionNumber = idx + 1;
              const isSelected = clickedIndex === idx;
              const isMarsSecret = optionNumber === 40;

              return (
                <button
                  key={idx}
                  disabled={isMcqLockedOut}
                  onClick={() => handleOptionClick(idx)}
                  className={`p-3 text-left rounded-xl border text-xs transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                    isSelected && isMarsSecret
                      ? 'bg-emerald-900/60 border-emerald-400 text-emerald-200 font-bold shadow-lg shadow-emerald-900/40'
                      : isSelected && !isMarsSecret
                      ? 'bg-red-950/70 border-red-500 text-red-200'
                      : 'bg-neutral-900/40 border-white/5 text-neutral-300 hover:bg-[#044541]/40 hover:border-[#044541] hover:text-white'
                  } ${isMcqLockedOut ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  <span className="truncate pr-2 font-medium">{opt}</span>
                  <span className="text-[10px] font-mono text-neutral-500 group-hover:text-emerald-400 shrink-0">
                    #{optionNumber}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="px-5 sm:px-6 py-3 bg-neutral-900 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-1 text-[11px] text-neutral-500">
          <span>Fleearn Security Layer 2.0</span>
          <span>সর্বোচ্চ ২ বার ভুল ক্লিকে সিকিউরিটি বক্স স্বয়ংক্রিয়ভাবে বন্ধ হয়ে যাবে</span>
        </div>
      </div>
    </div>
  );
};
