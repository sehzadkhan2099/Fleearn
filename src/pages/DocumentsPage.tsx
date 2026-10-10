import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FileText, Scale } from 'lucide-react';

export const DocumentsPage: React.FC = () => {
  const { importantDocs, language } = useApp();
  const [activeDocId, setActiveDocId] = useState<string>(importantDocs[0]?.id || 'doc-terms');

  const selectedDoc = importantDocs.find((d) => d.id === activeDocId) || importantDocs[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#044541]/40 border border-[#044541] rounded-full text-xs font-semibold text-emerald-300">
          <Scale className="w-3.5 h-3.5 text-red-400" />
          <span>লিগ্যাল ও কমপ্লায়েন্স ফ্রেমওয়ার্ক</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-['Outfit']">
          গুরুত্বপূর্ণ ডকুমেন্টস ও নীতিমালা
        </h1>
        <p className="text-sm sm:text-base text-neutral-400">
          Fleearn প্ল্যাটফর্মের আইনগত ব্যবহারের শর্তাবলী, গোপনীয়তা সুরক্ষা ও আর্থিক নীতিমালা
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Document Tabs Sidebar */}
        <div className="lg:col-span-4 p-4 bg-neutral-900/60 rounded-3xl border border-white/10 space-y-2">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block px-3 py-2">
            ডকুমেন্টস তালিকা:
          </span>
          {importantDocs.map((doc) => (
            <button
              key={doc.id}
              onClick={() => setActiveDocId(doc.id)}
              className={`w-full p-3.5 rounded-2xl text-left text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                activeDocId === doc.id
                  ? 'bg-[#044541] text-white shadow-lg shadow-emerald-950/60 border border-emerald-500/30'
                  : 'text-neutral-300 hover:bg-neutral-800'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <FileText className="w-4 h-4 text-emerald-300 shrink-0" />
                <span className="truncate">
                  {language === 'bn' ? doc.titleBn : doc.titleEn}
                </span>
              </div>
              <span className="text-[10px] opacity-75 font-mono shrink-0 ml-2">
                {doc.lastUpdated}
              </span>
            </button>
          ))}
        </div>

        {/* Document Content Viewer */}
        <div className="lg:col-span-8 p-6 sm:p-10 bg-neutral-900/50 rounded-3xl border border-white/10 space-y-6 shadow-xl">
          {selectedDoc && (
            <>
              <div className="border-b border-white/10 pb-4 space-y-1">
                <div className="flex items-center justify-between flex-wrap gap-2 text-xs text-neutral-400">
                  <span className="text-emerald-400 font-mono">
                    অফিসিয়াল ডকুমেন্ট আইডি: {selectedDoc.id}
                  </span>
                  <span className="font-mono">
                    সর্বশেষ পরিমার্জন: {selectedDoc.lastUpdated}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-['Outfit']">
                  {language === 'bn' ? selectedDoc.titleBn : selectedDoc.titleEn}
                </h2>
              </div>

              <div className="prose prose-invert max-w-none text-xs sm:text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
                {language === 'bn' ? selectedDoc.contentBn : selectedDoc.contentEn}
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-500">
                <span>Fleearn Technologies Legal Compliance Division</span>
                <span>অ্যাডমিন প্যানেল থেকে যেকোনো সময় সম্পাদনযোগ্য</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
