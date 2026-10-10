import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lock, ShieldCheck, KeyRound, AlertCircle, X } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const { isAdminLoginModalOpen, closeAdminLoginModal, loginAdmin } = useApp();
  const [uid, setUid] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  if (!isAdminLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsAuthenticating(true);

    setTimeout(() => {
      const success = loginAdmin(uid, pin);
      setIsAuthenticating(false);
      if (!success) {
        setError('ভুল UID অথবা PIN! সঠিক এডমিন ক্রেডেনশিয়াল প্রদান করুন।');
      }
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-neutral-950 border border-[#044541] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-neutral-100">
        {/* Glow Header */}
        <div className="p-6 bg-gradient-to-b from-[#044541]/40 to-transparent border-b border-white/10 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#044541] rounded-2xl text-emerald-400 shadow-lg shadow-emerald-950 border border-emerald-500/20">
              <ShieldCheck className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-['Outfit']">
                এডমিন অথেনটিকেশন পোর্টাল
              </h3>
              <p className="text-xs text-neutral-400">
                Fleearn সিকিউর মাস্টার কন্ট্রোল প্যানেল লগইন
              </p>
            </div>
          </div>
          <button
            onClick={closeAdminLoginModal}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Login Form - STRICTLY NO EXAMPLE UID OR PIN SHOWN */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-950/70 border border-red-500/50 rounded-xl text-xs text-red-300 flex items-center gap-2 animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
              <span>ইউজার আইডি (UID)</span>
            </label>
            <input
              type="text"
              required
              autoComplete="off"
              placeholder="গোপন UID লিখুন"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              className="w-full px-4 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#044541] focus:ring-1 focus:ring-[#044541]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>নিরাপত্তা পিন (PIN)</span>
            </label>
            <input
              type="password"
              required
              autoComplete="off"
              placeholder="গোপন PIN লিখুন"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full px-4 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#044541] focus:ring-1 focus:ring-[#044541]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full py-3 px-4 bg-[#044541] hover:bg-[#065b56] text-white font-medium text-sm rounded-xl transition-all shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isAuthenticating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>যাচাই করা হচ্ছে...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-red-400" />
                  <span>মাস্টার প্যানেলে প্রবেশ করুন</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="px-6 py-3 bg-neutral-900/60 border-t border-white/5 text-[11px] text-neutral-500 text-center">
          অননুমোদিত প্রবেশ আইনি প্রক্রিয়ায় শনাক্তযোগ্য ও দণ্ডনীয়
        </div>
      </div>
    </div>
  );
};
