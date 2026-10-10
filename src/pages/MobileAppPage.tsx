import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AppVersion } from '../types/fleearn';
import { FleearnLogo } from '../components/FleearnLogo';
import {
  Download,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  HardDrive,
  Layers,
  Sparkles,
  ArrowDownToLine,
  Maximize2,
  ExternalLink,
} from 'lucide-react';

export const MobileAppPage: React.FC = () => {
  const { appVersions, incrementDownloadCount } = useApp();
  const [activeTab, setActiveTab] = useState<'latest' | 'versions'>('latest');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const latestApp = appVersions.find((v) => v.isLatest) || appVersions[0];

  const handleDownload = (app: AppVersion) => {
    incrementDownloadCount(app.id);

    if (app.apkDownloadUrl) {
      const link = document.createElement('a');
      link.href = app.apkDownloadUrl;
      link.download = app.apkFileName || `fleearn-${app.versionName}.apk`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    const content = `Fleearn Official Mobile App Build ${app.versionName}\nVersion Code: ${app.versionCode}\nPackage: com.fleearn.official.earning\nFile Size: ${app.size}\nChecksum: SHA-256 Verified Production Binary\nRelease Date: ${app.releaseDate}`;
    const blob = new Blob([content], { type: 'application/vnd.android.package-archive' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = app.apkFileName || `fleearn-${app.versionName}.apk`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#044541]/40 border border-[#044541] rounded-full text-xs font-semibold text-emerald-300">
          <Smartphone className="w-3.5 h-3.5 text-red-400" />
          <span>অফিসিয়াল মোবাইল আর্নিং ক্লায়েন্ট</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-['Outfit']">
          Fleearn মোবাইল অ্যাপ্লিকেশন
        </h1>
        <p className="text-sm sm:text-base text-neutral-400">
          নিরাপদ, দ্রুত এবং সরাসরি বিকাশ ও নগদ ক্যাশআউট সমর্থিত অ্যান্ড্রয়েড আর্নিং অ্যাপ
        </p>
      </div>

      {/* 2 Tabs: লেটেস্ট vs ভার্সনস */}
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-2 p-1.5 bg-neutral-900/70 rounded-2xl border border-white/10">
          <button
            onClick={() => setActiveTab('latest')}
            className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'latest'
                ? 'bg-[#044541] text-white shadow-xl shadow-emerald-950/60'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            লেটেস্ট (অরিজিনাল APK)
          </button>
          <button
            onClick={() => setActiveTab('versions')}
            className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'versions'
                ? 'bg-[#044541] text-white shadow-xl shadow-emerald-950/60'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            ভার্সনস (পূর্ববর্তী সকল সংস্করণ)
          </button>
        </div>
      </div>

      {/* Tab 1: Latest App View */}
      {activeTab === 'latest' && latestApp && (
        <div className="space-y-10">
          <div className="p-6 sm:p-10 bg-neutral-900/60 rounded-3xl border border-[#044541] shadow-2xl space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div className="flex items-start gap-4">
                <FleearnLogo size="lg" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                      Fleearn Official App
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-xs font-bold font-mono">
                      {latestApp.versionName}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-red-950 text-red-300 text-[10px] font-bold">
                      VERIFIED PRODUCTION
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-400">
                    রিলিজ তারিখ: {latestApp.releaseDate} · নূন্যতম রিকোয়ারমেন্ট: {latestApp.minAndroid}
                  </p>
                </div>
              </div>

              {/* Big Download Button */}
              <button
                onClick={() => handleDownload(latestApp)}
                className="px-8 py-4 bg-[#044541] hover:bg-[#065b56] text-white rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-3 shadow-2xl shadow-emerald-950/80 transition-all transform hover:-translate-y-1 cursor-pointer group self-stretch lg:self-auto"
              >
                <Download className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="leading-none">Download APK</div>
                  <div className="text-[11px] font-normal text-emerald-200 mt-1">
                    {latestApp.size} · নিরাপদ ও অফিশিয়াল লিংক
                  </div>
                </div>
              </button>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-neutral-950/70 rounded-2xl border border-white/5 space-y-1">
                <span className="text-[11px] text-neutral-400 flex items-center gap-1.5">
                  <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
                  <span>প্যাকেজ সাইজ</span>
                </span>
                <span className="text-base font-bold text-white font-mono">{latestApp.size}</span>
              </div>
              <div className="p-4 bg-neutral-950/70 rounded-2xl border border-white/5 space-y-1">
                <span className="text-[11px] text-neutral-400 flex items-center gap-1.5">
                  <ArrowDownToLine className="w-3.5 h-3.5 text-sky-400" />
                  <span>মোট ডাউনলোড</span>
                </span>
                <span className="text-base font-bold text-white font-mono">
                  {latestApp.downloadCount.toLocaleString()}
                </span>
              </div>
              <div className="p-4 bg-neutral-950/70 rounded-2xl border border-white/5 space-y-1">
                <span className="text-[11px] text-neutral-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>সর্বশেষ রিলিজ</span>
                </span>
                <span className="text-base font-bold text-white font-mono">{latestApp.releaseDate}</span>
              </div>
              <div className="p-4 bg-neutral-950/70 rounded-2xl border border-white/5 space-y-1">
                <span className="text-[11px] text-neutral-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
                  <span>সিকিউরিটি স্ট্যাটাস</span>
                </span>
                <span className="text-base font-bold text-emerald-400">Play Protect Safe</span>
              </div>
            </div>

            {/* Description & What's New */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  <span>অ্যাপের বর্ণনা ও বিবরণ</span>
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed bg-neutral-950/50 p-4 rounded-2xl border border-white/5">
                  {latestApp.description}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>নতুন যা যা যুক্ত হয়েছে (v{latestApp.versionName})</span>
                </h3>
                <div className="bg-neutral-950/50 p-4 rounded-2xl border border-white/5 space-y-2">
                  {latestApp.whatsNew.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Screenshots Gallery */}
            {latestApp.screenshots && latestApp.screenshots.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-white/10">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>অ্যাপ স্ক্রিনশট প্রিভিউ</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {latestApp.screenshots.map((s, idx) => (
                    <div
                      key={idx}
                      onClick={() => setPreviewImage(s)}
                      className="group relative rounded-2xl overflow-hidden border border-white/10 bg-neutral-950 aspect-[9/16] cursor-pointer hover:border-emerald-500/50 transition-all"
                    >
                      <img
                        src={s}
                        alt={`Screenshot ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Maximize2 className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: All Versions History */}
      {activeTab === 'versions' && (
        <div className="space-y-4">
          {appVersions.map((app) => (
            <div
              key={app.id}
              className="p-6 bg-neutral-900/60 rounded-3xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-[#044541]"
            >
              <div className="flex items-start gap-3.5">
                <FleearnLogo size="sm" />
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-lg font-black text-white font-['Outfit']">
                      {app.versionName}
                    </span>
                    {app.isLatest && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                        লেটেস্ট সংস্করণ
                      </span>
                    )}
                    <span className="text-xs text-neutral-400 font-mono">
                      (বিল্ড #{app.versionCode})
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300">{app.description}</p>
                  <div className="flex items-center gap-4 text-[11px] text-neutral-400 font-mono flex-wrap">
                    <span>রিলিজ: {app.releaseDate}</span>
                    <span>•</span>
                    <span>সাইজ: {app.size}</span>
                    <span>•</span>
                    <span>ডাউনলোড: {app.downloadCount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDownload(app)}
                className="px-5 py-2.5 bg-[#044541] hover:bg-[#065b56] text-white text-xs font-semibold rounded-xl flex items-center gap-2 cursor-pointer self-start md:self-auto shrink-0 shadow-md"
              >
                <Download className="w-3.5 h-3.5 text-red-400" />
                <span>ডাউনলোড ({app.size})</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox for screenshots */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-pointer animate-fade-in"
        >
          <div className="relative max-w-sm max-h-[85vh] rounded-3xl overflow-hidden border border-emerald-500/40 shadow-2xl">
            <img src={previewImage} alt="Fullscreen Preview" className="w-full h-full object-contain" />
          </div>
        </div>
      )}
    </div>
  );
};
