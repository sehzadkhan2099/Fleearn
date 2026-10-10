import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Notice } from '../types/fleearn';
import { Bell, Search, Calendar, Eye, AlertCircle, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const NoticePage: React.FC = () => {
  const { notices, language } = useApp();
  const [activeTab, setActiveTab] = useState<'latest' | 'expired'>('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const filteredNotices = notices
    .filter((n) => (activeTab === 'latest' ? n.status === 'active' : n.status === 'expired'))
    .filter((n) => {
      const q = searchQuery.toLowerCase();
      return (
        n.title.toLowerCase().includes(q) ||
        n.titleEn.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q) ||
        n.category.toLowerCase().includes(q)
      );
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#044541]/40 border border-[#044541] rounded-full text-xs font-semibold text-emerald-300">
          <Bell className="w-3.5 h-3.5 text-red-400" />
          <span>অফিসিয়াল সিস্টেম নোটিশ বোর্ড</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white light:text-neutral-900 font-['Outfit']">
          নোটিশ ও গুরুত্বপূর্ণ ঘোষণা
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 light:text-neutral-600">
          প্ল্যাটফর্মের সকল হালনাগাদ তথ্য, উইথড্রয়াল আপডেট, অ্যাপ রিলিজ ও সিকিউরিটি সতর্কবার্তা
        </p>
      </div>

      {/* Tabs & Search Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 bg-neutral-900/60 light:bg-neutral-100 rounded-2xl border border-white/10">
        {/* Tab Switcher: লেটেস্ট ও সক্রিয় নোটিশ vs প্রিভিয়াস বা এক্সপায়ার্ড নোটিশ */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('latest')}
            className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'latest'
                ? 'bg-[#044541] text-white shadow-lg shadow-emerald-950/40'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            লেটেস্ট ও সক্রিয় নোটিশ
          </button>
          <button
            onClick={() => setActiveTab('expired')}
            className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'expired'
                ? 'bg-[#044541] text-white shadow-lg shadow-emerald-950/40'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            প্রিভিয়াস বা এক্সপায়ার্ড নোটিশ
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="নোটিশ খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-neutral-950 light:bg-white border border-white/10 rounded-xl text-xs text-white light:text-neutral-900 placeholder-neutral-500 focus:outline-none focus:border-[#044541]"
          />
        </div>
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {filteredNotices.length === 0 ? (
          <div className="p-12 text-center bg-neutral-900/30 rounded-2xl border border-white/5 space-y-2">
            <AlertCircle className="w-8 h-8 text-neutral-500 mx-auto" />
            <h4 className="text-sm font-semibold text-neutral-300">কোনো নোটিশ পাওয়া যায়নি</h4>
            <p className="text-xs text-neutral-500">
              {activeTab === 'latest' ? 'বর্তমানে কোনো সক্রিয় নোটিশ নেই।' : 'কোনো আর্কাইভ নোটিশ নেই।'}
            </p>
          </div>
        ) : (
          filteredNotices.map((notice) => (
            <div
              key={notice.id}
              onClick={() => setSelectedNotice(notice)}
              className="p-6 rounded-2xl bg-neutral-900/50 light:bg-white border border-white/10 light:border-neutral-200 hover:border-[#044541] transition-all cursor-pointer group space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      notice.category === 'Payment'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                        : notice.category === 'Security'
                        ? 'bg-red-950 text-red-300 border border-red-500/30'
                        : 'bg-neutral-800 text-neutral-300'
                    }`}
                  >
                    {notice.category}
                  </span>
                  {notice.priority === 'high' && (
                    <span className="px-2 py-0.5 rounded bg-red-900 text-red-200 text-[10px] font-bold">
                      জরুরি
                    </span>
                  )}
                  <span className="text-xs text-neutral-400 font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{notice.date}</span>
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs text-neutral-400 font-mono">
                  <Eye className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{notice.views.toLocaleString()} রিড</span>
                </div>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-white light:text-neutral-900 group-hover:text-emerald-400 transition-colors">
                {language === 'bn' ? notice.title : notice.titleEn}
              </h2>

              <p className="text-xs sm:text-sm text-neutral-300 light:text-neutral-700 leading-relaxed line-clamp-2">
                {language === 'bn' ? notice.content : notice.contentEn}
              </p>

              <div className="pt-1 flex items-center justify-between text-xs text-emerald-400 font-semibold">
                <span>সম্পূর্ণ নোটিশ পড়তে ক্লিক করুন</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Notice Reader Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-neutral-950 light:bg-white border border-[#044541] rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl text-neutral-100 light:text-neutral-900">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="px-3 py-1 bg-[#044541] text-white rounded-lg text-xs font-bold uppercase">
                {selectedNotice.category}
              </span>
              <span className="text-xs font-mono text-neutral-400">
                প্রকাশ: {selectedNotice.date}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold leading-tight font-['Outfit']">
              {language === 'bn' ? selectedNotice.title : selectedNotice.titleEn}
            </h3>

            <div className="p-4 bg-neutral-900/60 light:bg-neutral-100 rounded-2xl text-xs sm:text-sm text-neutral-300 light:text-neutral-800 leading-relaxed max-h-96 overflow-y-auto whitespace-pre-line">
              {language === 'bn' ? selectedNotice.content : selectedNotice.contentEn}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedNotice(null)}
                className="px-6 py-2.5 bg-[#044541] hover:bg-[#065b56] text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
