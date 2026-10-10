import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FAQ_DATA, FaqCategory, FaqItem } from '../data/faqData';
import { HelpCircle, Search, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export const FaqPage: React.FC = () => {
  const { language } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  // Filter logic
  const filteredCategories = FAQ_DATA.map((cat) => {
    const matchingItems = cat.items.filter((item) => {
      const q = searchQuery.toLowerCase();
      return (
        item.question.toLowerCase().includes(q) ||
        item.questionEn.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.answerEn.toLowerCase().includes(q)
      );
    });
    return {
      ...cat,
      items: matchingItems,
    };
  }).filter((cat) => {
    if (selectedCategory !== 'all' && cat.id !== selectedCategory) return false;
    return cat.items.length > 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#044541]/40 border border-[#044541] rounded-full text-xs font-semibold text-emerald-300">
          <HelpCircle className="w-3.5 h-3.5 text-red-400" />
          <span>নলেজবেস ও সাপোর্ট আর্কাইভ</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white light:text-neutral-900 font-['Outfit']">
          Fleearn — Frequently Asked Questions (FAQ)
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 light:text-neutral-600">
          সাধারণ জিজ্ঞাসা, একাউন্ট, উইথড্রয়াল, রেফারেল ও আয়ের সমস্ত প্রশ্নের নির্ভরযোগ্য উত্তর
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto relative">
        <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="যেকোনো প্রশ্ন বা কীওয়ার্ড দিয়ে সার্চ করুন (যেমন: উইথড্র, বিকাশ, রেফারেল)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 bg-neutral-900/80 light:bg-white border border-white/10 light:border-neutral-200 rounded-2xl text-sm text-white light:text-neutral-900 placeholder-neutral-500 focus:outline-none focus:border-[#044541] shadow-xl"
        />
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-[#044541] text-white shadow-lg'
              : 'bg-neutral-900/60 light:bg-neutral-100 text-neutral-400 hover:text-white'
          }`}
        >
          সব ক্যাটাগরি (All 10 Categories)
        </button>

        {FAQ_DATA.map((cat, idx) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#044541] text-white shadow-lg'
                : 'bg-neutral-900/60 light:bg-neutral-100 text-neutral-400 hover:text-white'
            }`}
          >
            {`ক্যাটাগরি ${idx + 1}`}
          </button>
        ))}
      </div>

      {/* FAQ Categories Accordion */}
      <div className="space-y-12">
        {filteredCategories.length === 0 ? (
          <div className="p-12 text-center bg-neutral-900/40 rounded-3xl border border-white/5 space-y-2">
            <HelpCircle className="w-8 h-8 text-neutral-500 mx-auto" />
            <p className="text-sm font-semibold text-neutral-300">
              আপনার অনুসন্ধানের সাথে মিল রেখে কোনো প্রশ্ন পাওয়া যায়নি।
            </p>
          </div>
        ) : (
          filteredCategories.map((category) => (
            <div key={category.id} className="space-y-4">
              <div className="flex items-center gap-2 border-b border-[#044541]/50 pb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <h2 className="text-lg sm:text-xl font-bold text-white light:text-neutral-900 font-['Outfit']">
                  {category.categoryName}
                </h2>
              </div>

              <div className="space-y-2.5">
                {category.items.map((item) => {
                  const isOpen = expandedId === item.id;
                  return (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-white/10 light:border-neutral-200 bg-neutral-900/50 light:bg-white overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => toggleExpand(item.id)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-800/40 transition-colors"
                      >
                        <span className="text-xs sm:text-sm font-bold text-white light:text-neutral-900 leading-snug">
                          {language === 'bn' ? item.question : item.questionEn}
                        </span>
                        <div className="p-1 rounded-lg bg-neutral-800 text-neutral-400 shrink-0">
                          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 light:text-neutral-700 leading-relaxed border-t border-white/5 bg-neutral-950/40 light:bg-neutral-50">
                          <p className="whitespace-pre-line">
                            {language === 'bn' ? item.answer : item.answerEn}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Fleearn Motto Box */}
      <div className="p-6 bg-[#044541]/20 border border-[#044541] rounded-2xl text-center space-y-1">
        <span className="text-sm font-bold text-emerald-300 font-['Outfit']">
          Fleearn — Earn Smart, Build Your Future
        </span>
        <p className="text-xs text-neutral-400">
          গুরুত্বপূর্ণ: প্রকাশের আগে FAQ-এর প্রতিটি উত্তর বাস্তব ফিচার ও নীতিমালার সঙ্গে যাচাইকৃত।
        </p>
      </div>
    </div>
  );
};
