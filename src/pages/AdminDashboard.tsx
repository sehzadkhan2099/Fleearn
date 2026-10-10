import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  LogOut,
  Smartphone,
  Bell,
  BookOpen,
  DollarSign,
  FileText,
  Building,
  Activity,
  Plus,
  Trash2,
  Check,
  RotateCcw,
  MessageSquare,
  Eye,
  Upload,
  Database,
  Cloud,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  FileUp,
  Image as ImageIcon,
} from 'lucide-react';
import { AppVersion, Notice, Course, PricingPlan } from '../types/fleearn';
import { testSupabaseConnection, uploadApkToSupabase } from '../lib/supabase';

type AdminTab =
  | 'stats'
  | 'apps'
  | 'notices'
  | 'pricing'
  | 'courses'
  | 'docs'
  | 'company'
  | 'supabase'
  | 'inquiries';

export const AdminDashboard: React.FC = () => {
  const {
    logoutAdmin,
    setCurrentPage,
    platformStats,
    updatePlatformStats,
    appVersions,
    addAppVersion,
    updateAppVersion,
    deleteAppVersion,
    notices,
    addNotice,
    updateNotice,
    deleteNotice,
    courses,
    deleteCourse,
    pricingPlans,
    addPricingPlan,
    deletePricingPlan,
    importantDocs,
    updateImportantDoc,
    companyInfo,
    updateCompanyInfo,
    supportTickets,
    updateTicketStatus,
    resetToDefaultData,
    supabaseConfig,
    updateSupabaseConfig,
  } = useApp();

  const [activeTab, setActiveTab] = useState<AdminTab>('stats');
  const [saveToast, setSaveToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3000);
  };

  // 1. Stats Form State
  const [statsForm, setStatsForm] = useState({
    totalUsers: platformStats.totalUsers,
    activeUsers: platformStats.activeUsers,
    bannedAccounts: platformStats.bannedAccounts,
    totalTransactionsUSD: platformStats.totalTransactionsUSD,
  });

  const handleStatsSave = (e: React.FormEvent) => {
    e.preventDefault();
    updatePlatformStats({
      totalUsers: Number(statsForm.totalUsers),
      activeUsers: Number(statsForm.activeUsers),
      bannedAccounts: Number(statsForm.bannedAccounts),
      totalTransactionsUSD: Number(statsForm.totalTransactionsUSD),
      totalTransactionsFSD: Number(statsForm.totalTransactionsUSD),
    });
    triggerToast('পরিসংখ্যান সফলভাবে আপডেট করা হয়েছে!');
  };

  // 2. Add APK Form State with REAL File Picker
  const [showAddAppModal, setShowAddAppModal] = useState(false);
  const apkFileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedApkFile, setSelectedApkFile] = useState<File | null>(null);
  const [isUploadingApk, setIsUploadingApk] = useState(false);
  const [uploadProgressText, setUploadProgressText] = useState<string | null>(null);

  const [newApp, setNewApp] = useState({
    versionName: 'v3.5.0',
    versionCode: 350,
    releaseDate: new Date().toISOString().split('T')[0],
    size: '29.2 MB',
    isLatest: true,
    downloadCount: 1500000,
    minAndroid: 'Android 8.0 and above',
    description: 'নতুন হাই-স্পিড ৩ডি আর্নিং ইঞ্জিন ও অটোমেটেড উইথড্রয়াল সংবলিত সংস্করণ।',
    whatsNewText: 'নতুন পেমেন্ট মেথড যোগ করা হয়েছে\n৩ডি পারফরম্যান্স অপ্টিমাইজেশন\nসিকিউরিটি প্যাচ হালনাগাদ',
    apkFileName: 'fleearn-v3.5.0-official.apk',
    apkDownloadUrl: '',
    localFileBlob: '',
    status: 'published' as const,
  });

  const handleApkFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedApkFile(file);
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
    const localUrl = URL.createObjectURL(file);

    setNewApp((prev) => ({
      ...prev,
      apkFileName: file.name,
      size: sizeInMB,
      localFileBlob: localUrl,
    }));
  };

  const handleAddApp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploadingApk(true);

    let finalDownloadUrl = newApp.apkDownloadUrl;

    // If a real file was selected and Supabase is enabled, upload it to Supabase Storage!
    if (selectedApkFile && supabaseConfig.isEnabled && supabaseConfig.url && supabaseConfig.anonKey) {
      setUploadProgressText('Supabase ক্লাউড স্টোরেজে APK আপলোড করা হচ্ছে...');
      const uploadRes = await uploadApkToSupabase(selectedApkFile, supabaseConfig);
      if (uploadRes.success) {
        finalDownloadUrl = uploadRes.url;
      } else {
        alert(`Supabase আপলোডে সমস্যা: ${uploadRes.error} (লোকাল মোডে সংরক্ষিত হচ্ছে)`);
      }
    }

    addAppVersion({
      versionName: newApp.versionName,
      versionCode: Number(newApp.versionCode),
      releaseDate: newApp.releaseDate,
      size: newApp.size,
      isLatest: newApp.isLatest,
      downloadCount: Number(newApp.downloadCount),
      minAndroid: newApp.minAndroid,
      description: newApp.description,
      whatsNew: newApp.whatsNewText.split('\n').filter(Boolean),
      screenshots: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
      ],
      apkFileName: newApp.apkFileName,
      apkDownloadUrl: finalDownloadUrl || newApp.localFileBlob,
      localFileBlob: newApp.localFileBlob,
      status: newApp.status,
    });

    setIsUploadingApk(false);
    setUploadProgressText(null);
    setSelectedApkFile(null);
    setShowAddAppModal(false);
    triggerToast('নতুন APK সফলভাবে যুক্ত করা হয়েছে!');
  };

  // 3. Add Notice Form State
  const [showAddNoticeModal, setShowAddNoticeModal] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: '',
    titleEn: '',
    content: '',
    contentEn: '',
    category: 'Payment' as Notice['category'],
    date: new Date().toISOString().split('T')[0],
    status: 'active' as Notice['status'],
    priority: 'normal' as Notice['priority'],
  });

  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotice.title || !newNotice.content) return;
    addNotice({
      ...newNotice,
      titleEn: newNotice.titleEn || newNotice.title,
      contentEn: newNotice.contentEn || newNotice.content,
    });
    setShowAddNoticeModal(false);
    setNewNotice({
      title: '',
      titleEn: '',
      content: '',
      contentEn: '',
      category: 'Payment',
      date: new Date().toISOString().split('T')[0],
      status: 'active',
      priority: 'normal',
    });
    triggerToast('নতুন নোটিশ সফলভাবে প্রকাশ করা হয়েছে!');
  };

  // 4. Company Info Form State with Logo Upload
  const [companyForm, setCompanyForm] = useState({ ...companyInfo });
  const logoInputRef = useRef<HTMLInputElement | null>(null);

  const handleLogoFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setCompanyForm((prev) => ({ ...prev, logoUrl: result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCompanySave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanyInfo(companyForm);
    triggerToast('কোম্পানির যাবতীয় তথ্য ও লোগো আপডেট করা হয়েছে!');
  };

  // 5. Pricing Plan State
  const [showAddPlanModal, setShowAddPlanModal] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: 'গোল্ড ভিআইপি প্ল্যান',
    nameEn: 'Gold VIP Plan',
    priceUSD: 45,
    fsdAmount: 45,
    validity: '১৮০ দিন ভ্যালিডিটি',
    validityEn: '180 Days Validity',
    badge: 'এক্সক্লুসিভ',
    featuresText: '৭০% অতিরিক্ত বোনাস পয়েন্ট\nইনস্ট্যান্ট ক্যাশআউট\nভিআইপি অ্যাকাউন্ট ম্যানেজার',
    popular: false,
  });

  const handleAddPlan = (e: React.FormEvent) => {
    e.preventDefault();
    addPricingPlan({
      name: newPlan.name,
      nameEn: newPlan.nameEn,
      priceUSD: Number(newPlan.priceUSD),
      fsdAmount: Number(newPlan.fsdAmount),
      validity: newPlan.validity,
      validityEn: newPlan.validityEn,
      badge: newPlan.badge,
      features: newPlan.featuresText.split('\n').filter(Boolean),
      popular: newPlan.popular,
    });
    setShowAddPlanModal(false);
    triggerToast('নতুন মেম্বারশিপ প্ল্যান যুক্ত হয়েছে!');
  };

  // 6. Supabase Connection State
  const [supabaseForm, setSupabaseForm] = useState({
    url: supabaseConfig.url,
    anonKey: supabaseConfig.anonKey,
    bucketName: supabaseConfig.bucketName || 'fleearn-storage',
    isEnabled: supabaseConfig.isEnabled,
  });
  const [isTestingSupabase, setIsTestingSupabase] = useState(false);
  const [supabaseTestResult, setSupabaseTestResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleSaveSupabaseConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateSupabaseConfig(supabaseForm);
    triggerToast('Supabase কনফিগারেশন সংরক্ষণ করা হয়েছে!');
  };

  const handleTestSupabase = async () => {
    setIsTestingSupabase(true);
    setSupabaseTestResult(null);
    const res = await testSupabaseConnection(supabaseForm);
    setIsTestingSupabase(false);
    setSupabaseTestResult(res);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="p-6 bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 border border-[#044541] rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-[#044541] text-emerald-300 rounded-2xl shadow-lg shadow-emerald-950 border border-emerald-500/20">
            <ShieldCheck className="w-7 h-7 text-red-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
                Fleearn মাস্টার কন্ট্রোল ও এডমিন প্যানেল
              </h1>
              <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold">
                ROOT ADMIN
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              ওয়েবসাইটের তথ্য, সরাসরি ফোন থেকে APK আপলোড, Supabase স্টোরেজ সিঙ্ক ও কন্টেন্ট ম্যানেজমেন্ট
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span>মূল ওয়েবসাইট দেখুন</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="px-4 py-2 bg-red-950 hover:bg-red-900 text-red-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 border border-red-500/30 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>লগআউট</span>
          </button>
        </div>
      </div>

      {saveToast && (
        <div className="p-4 bg-emerald-950/90 border border-emerald-400 rounded-2xl text-xs text-emerald-200 font-semibold flex items-center justify-between animate-fade-in shadow-xl">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{saveToast}</span>
          </div>
        </div>
      )}

      {/* Admin Tabs - Fully Responsive Horizontal Scroll */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'stats', label: 'পরিসংখ্যান', icon: Activity },
          { id: 'apps', label: 'মোবাইল APK আপলোড', icon: Smartphone },
          { id: 'company', label: 'কোম্পানি তথ্য ও লোগো', icon: Building },
          { id: 'supabase', label: 'Supabase স্টোরেজ', icon: Database },
          { id: 'notices', label: 'নোটিশ বোর্ড', icon: Bell },
          { id: 'pricing', label: 'প্রাইজিং প্ল্যানস (FSD)', icon: DollarSign },
          { id: 'courses', label: 'স্কিল কোর্সসমূহ', icon: BookOpen },
          { id: 'docs', label: 'নীতিমালা ডকুমেন্টস', icon: FileText },
          { id: 'inquiries', label: 'সাপোর্ট মেসেজ', icon: MessageSquare },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AdminTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#044541] text-white shadow-lg shadow-emerald-950 border border-emerald-500/30'
                  : 'bg-neutral-900/60 text-neutral-400 hover:text-white border border-transparent'
              }`}
            >
              <Icon className="w-4 h-4 text-red-400" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Platform Stats Editor */}
      {activeTab === 'stats' && (
        <div className="p-6 md:p-8 bg-neutral-900/50 rounded-3xl border border-white/10 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-lg font-bold text-white font-['Outfit']">
              প্ল্যাটফর্মের ৪টি মূল পরিসংখ্যান এডিট করুন
            </h2>
            <p className="text-xs text-neutral-400">
              এই সংখ্যাগুলো হোমপেজ ও ফুটারের লাইভ কাউন্টারে প্রদর্শিত হয়।
            </p>
          </div>

          <form onSubmit={handleStatsSave} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300">
                মোট ব্যবহারকারী (Total Users)
              </label>
              <input
                type="number"
                value={statsForm.totalUsers}
                onChange={(e) => setStatsForm({ ...statsForm, totalUsers: Number(e.target.value) })}
                className="w-full px-4 py-2.5 bg-neutral-950 border border-white/10 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-[#044541]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300">
                সক্রিয় ব্যবহারকারী (Active Users)
              </label>
              <input
                type="number"
                value={statsForm.activeUsers}
                onChange={(e) => setStatsForm({ ...statsForm, activeUsers: Number(e.target.value) })}
                className="w-full px-4 py-2.5 bg-neutral-950 border border-white/10 rounded-xl text-sm font-mono text-emerald-400 focus:outline-none focus:border-[#044541]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300">
                ব্যানকৃত অ্যাকাউন্ট (Banned Accounts)
              </label>
              <input
                type="number"
                value={statsForm.bannedAccounts}
                onChange={(e) => setStatsForm({ ...statsForm, bannedAccounts: Number(e.target.value) })}
                className="w-full px-4 py-2.5 bg-neutral-950 border border-white/10 rounded-xl text-sm font-mono text-red-400 focus:outline-none focus:border-[#044541]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300">
                মোট ট্রানজেকশন USD / FSD
              </label>
              <input
                type="number"
                value={statsForm.totalTransactionsUSD}
                onChange={(e) => setStatsForm({ ...statsForm, totalTransactionsUSD: Number(e.target.value) })}
                className="w-full px-4 py-2.5 bg-neutral-950 border border-white/10 rounded-xl text-sm font-mono text-amber-400 focus:outline-none focus:border-[#044541]"
              />
            </div>

            <div className="sm:col-span-2 pt-2">
              <button
                type="submit"
                className="px-6 py-3 bg-[#044541] hover:bg-[#065b56] text-white font-bold text-xs rounded-xl shadow-lg cursor-pointer"
              >
                পরিসংখ্যান সংরক্ষণ করুন
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: Mobile APK Versions & Real Upload Manager */}
      {activeTab === 'apps' && (
        <div className="p-6 md:p-8 bg-neutral-900/50 rounded-3xl border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white font-['Outfit']">
                মোবাইল অ্যাপ ও APK ফাইল আপলোড
              </h2>
              <p className="text-xs text-neutral-400">
                এডমিন তার ফোন বা কম্পিউটার থেকে সরাসরি .apk ফাইল আপলোড করতে পারবেন।
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedApkFile(null);
                setShowAddAppModal(true);
              }}
              className="px-4 py-2.5 bg-[#044541] hover:bg-[#065b56] text-white font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer self-start sm:self-auto shadow-lg"
            >
              <Upload className="w-4 h-4 text-red-400" />
              <span>ফোন থেকে APK ফাইল আপলোড করুন</span>
            </button>
          </div>

          {/* Cloud Storage indicator */}
          <div className="p-4 bg-neutral-950/70 border border-white/5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <Cloud className="w-4 h-4 text-emerald-400" />
              <span className="text-neutral-300">
                স্টোরেজ স্ট্যাটাস:{' '}
                {supabaseConfig.isEnabled && supabaseConfig.url ? (
                  <span className="text-emerald-400 font-bold">Supabase ক্লাউড স্টোরেজ সক্রিয়</span>
                ) : (
                  <span className="text-amber-400 font-medium">লোকাল ব্রাউজার স্টোরেজ (Supabase ট্যাব থেকে ক্লাউড সেটআপ করতে পারেন)</span>
                )}
              </span>
            </div>
            <button
              onClick={() => setActiveTab('supabase')}
              className="text-xs text-emerald-400 hover:text-white underline cursor-pointer self-start sm:self-auto"
            >
              Supabase কনফিগার করুন →
            </button>
          </div>

          <div className="space-y-4">
            {appVersions.map((app) => (
              <div
                key={app.id}
                className="p-5 bg-neutral-950/80 rounded-2xl border border-white/5 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#044541] flex items-center justify-center text-white font-black text-lg border border-emerald-500/30">
                      F
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{app.versionName}</span>
                        {app.isLatest && (
                          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                            লেটেস্ট সংস্করণ
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-neutral-400 font-mono">
                        রিলিজ: {app.releaseDate} · সাইজ: {app.size} · ফাইল: {app.apkFileName}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-1 bg-neutral-900 px-3 py-1.5 rounded-xl border border-white/5 text-xs font-mono">
                      <span className="text-neutral-500">ডাউনলোড:</span>
                      <input
                        type="number"
                        defaultValue={app.downloadCount}
                        onBlur={(e) => {
                          updateAppVersion(app.id, { downloadCount: Number(e.target.value) });
                          triggerToast('ডাউনলোড কাউন্ট আপডেট করা হয়েছে!');
                        }}
                        className="w-24 bg-transparent text-white font-bold focus:outline-none"
                      />
                    </div>

                    {!app.isLatest && (
                      <button
                        onClick={() => {
                          updateAppVersion(app.id, { isLatest: true });
                          triggerToast('লেটেস্ট ভার্সন সেট করা হয়েছে!');
                        }}
                        className="px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs rounded-lg cursor-pointer"
                      >
                        লেটেস্ট করুন
                      </button>
                    )}

                    <button
                      onClick={() => {
                        if (confirm('এই APK ভার্সনটি মুছে ফেলতে চান?')) {
                          deleteAppVersion(app.id);
                          triggerToast('APK ভার্সন মুছে ফেলা হয়েছে!');
                        }
                      }}
                      className="p-1.5 text-red-400 hover:bg-red-950 rounded-lg cursor-pointer"
                      aria-label="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-xs text-neutral-400 bg-neutral-900/60 p-3.5 rounded-xl space-y-1">
                  <span className="font-semibold text-neutral-300 block mb-1">হটস নিউ চেঞ্জলগ:</span>
                  <ul className="list-disc list-inside space-y-0.5">
                    {app.whatsNew.map((w, idx) => (
                      <li key={idx}>{w}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Add APK Modal with Device File Picker */}
          {showAddAppModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
              <div className="w-full max-w-xl bg-neutral-950 border border-[#044541] rounded-3xl p-6 space-y-4 text-neutral-100 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="text-lg font-bold font-['Outfit'] flex items-center gap-2">
                    <FileUp className="w-5 h-5 text-emerald-400" />
                    <span>ফোন থেকে APK ফাইল আপলোড ও প্রকাশ</span>
                  </h3>
                  <button
                    onClick={() => setShowAddAppModal(false)}
                    className="text-neutral-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleAddApp} className="space-y-4 text-xs">
                  {/* File Upload Drop Area */}
                  <div className="space-y-1.5">
                    <label className="text-neutral-300 font-semibold block">
                      ডিভাইস থেকে APK ফাইল সিলেক্ট করুন
                    </label>
                    <div
                      onClick={() => apkFileInputRef.current?.click()}
                      className="p-6 border-2 border-dashed border-[#044541] hover:border-emerald-400 rounded-2xl bg-neutral-900/50 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <Upload className="w-8 h-8 text-emerald-400 animate-bounce" />
                      <span className="font-bold text-white text-sm">
                        {selectedApkFile ? selectedApkFile.name : 'ফোন বা কম্পিউটার থেকে .apk ফাইল বেছে নিন'}
                      </span>
                      <span className="text-[11px] text-neutral-400">
                        {selectedApkFile
                          ? `সাইজ: ${(selectedApkFile.size / (1024 * 1024)).toFixed(1)} MB (সিলেক্টেড)`
                          : 'ট্যাপ করে ফোনের ফাইল ম্যানেজার বা স্টোরেজ থেকে সিলেক্ট করুন'}
                      </span>
                      <input
                        ref={apkFileInputRef}
                        type="file"
                        accept=".apk,application/vnd.android.package-archive"
                        onChange={handleApkFileSelect}
                        className="hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-neutral-400 block mb-1">ভার্সন নাম</label>
                      <input
                        type="text"
                        required
                        value={newApp.versionName}
                        onChange={(e) => setNewApp({ ...newApp, versionName: e.target.value })}
                        className="w-full p-2.5 bg-neutral-900 border border-white/10 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 block mb-1">ভার্সন কোড</label>
                      <input
                        type="number"
                        required
                        value={newApp.versionCode}
                        onChange={(e) => setNewApp({ ...newApp, versionCode: Number(e.target.value) })}
                        className="w-full p-2.5 bg-neutral-900 border border-white/10 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-neutral-400 block mb-1">ফাইল সাইজ</label>
                      <input
                        type="text"
                        required
                        value={newApp.size}
                        onChange={(e) => setNewApp({ ...newApp, size: e.target.value })}
                        className="w-full p-2.5 bg-neutral-900 border border-white/10 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 block mb-1">প্রাথমিক ডাউনলোড সংখ্যা</label>
                      <input
                        type="number"
                        value={newApp.downloadCount}
                        onChange={(e) => setNewApp({ ...newApp, downloadCount: Number(e.target.value) })}
                        className="w-full p-2.5 bg-neutral-900 border border-white/10 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-neutral-400 block mb-1">APK ফাইল নাম</label>
                    <input
                      type="text"
                      required
                      value={newApp.apkFileName}
                      onChange={(e) => setNewApp({ ...newApp, apkFileName: e.target.value })}
                      className="w-full p-2.5 bg-neutral-900 border border-white/10 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="text-neutral-400 block mb-1">বিবরণ</label>
                    <textarea
                      rows={2}
                      value={newApp.description}
                      onChange={(e) => setNewApp({ ...newApp, description: e.target.value })}
                      className="w-full p-2.5 bg-neutral-900 border border-white/10 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="text-neutral-400 block mb-1">হটস নিউ চেঞ্জলগ (প্রতি লাইনে ১টি)</label>
                    <textarea
                      rows={3}
                      value={newApp.whatsNewText}
                      onChange={(e) => setNewApp({ ...newApp, whatsNewText: e.target.value })}
                      className="w-full p-2.5 bg-neutral-900 border border-white/10 rounded-xl"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="isLatestCheck"
                      checked={newApp.isLatest}
                      onChange={(e) => setNewApp({ ...newApp, isLatest: e.target.checked })}
                    />
                    <label htmlFor="isLatestCheck" className="text-neutral-300">
                      এটি লেটেস্ট মূল অফিসিয়াল সংস্করণ হিসেবে সেট করুন
                    </label>
                  </div>

                  {uploadProgressText && (
                    <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-emerald-300 flex items-center gap-2 animate-pulse">
                      <div className="w-3.5 h-3.5 border-2 border-emerald-300 border-t-transparent rounded-full animate-spin" />
                      <span>{uploadProgressText}</span>
                    </div>
                  )}

                  <div className="flex justify-end gap-2 pt-3">
                    <button
                      type="button"
                      disabled={isUploadingApk}
                      onClick={() => setShowAddAppModal(false)}
                      className="px-4 py-2 bg-neutral-800 rounded-xl cursor-pointer"
                    >
                      বাতিল
                    </button>
                    <button
                      type="submit"
                      disabled={isUploadingApk}
                      className="px-5 py-2 bg-[#044541] hover:bg-[#065b56] text-white font-bold rounded-xl cursor-pointer flex items-center gap-1.5"
                    >
                      {isUploadingApk ? 'আপলোড হচ্ছে...' : 'আপলোড ও প্রকাশ করুন'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Company Info, Logo & Branding Manager (Comprehensive) */}
      {activeTab === 'company' && (
        <div className="p-6 md:p-8 bg-neutral-900/50 rounded-3xl border border-white/10 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-lg font-bold text-white font-['Outfit']">
              কোম্পানির নাম, লোগো, ঠিকানা ও যোগাযোগের তথ্য এডিটর
            </h2>
            <p className="text-xs text-neutral-400">
              এখানে পরিবর্তিত যেকোনো তথ্য ওয়েবসাইটের হেডার, ফুটার, যোগাযোগ ফর্ম এবং About Us পেজে সরাসরি পরিবর্তিত হবে।
            </p>
          </div>

          <form onSubmit={handleCompanySave} className="space-y-5 text-xs">
            {/* Logo Upload Section */}
            <div className="p-4 bg-neutral-950/80 rounded-2xl border border-white/5 space-y-3">
              <span className="text-neutral-300 font-bold block">কোম্পানি লোগো (Logo Image)</span>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-[#044541] flex items-center justify-center overflow-hidden shrink-0">
                  {companyForm.logoUrl ? (
                    <img
                      src={companyForm.logoUrl}
                      alt="Logo preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-black text-white font-['Outfit']">F</span>
                  )}
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => logoInputRef.current?.click()}
                      className="px-3.5 py-2 bg-[#044541] hover:bg-[#065b56] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>ডিভাইস থেকে লোগো আপলোড করুন</span>
                    </button>
                    {companyForm.logoUrl && (
                      <button
                        type="button"
                        onClick={() => setCompanyForm({ ...companyForm, logoUrl: '' })}
                        className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl cursor-pointer"
                      >
                        ডিফল্ট করুন
                      </button>
                    )}
                  </div>
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoFileSelect}
                    className="hidden"
                  />
                  <div className="pt-1">
                    <input
                      type="text"
                      placeholder="অথবা লোগোর সরাসরি ইমেজ URL দিন (https://...)"
                      value={companyForm.logoUrl || ''}
                      onChange={(e) => setCompanyForm({ ...companyForm, logoUrl: e.target.value })}
                      className="w-full p-2 bg-neutral-900 border border-white/10 rounded-xl text-white text-[11px]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-neutral-400 block mb-1">কোম্পানির নাম (Company Name)</label>
                <input
                  type="text"
                  required
                  value={companyForm.name}
                  onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                  className="w-full p-2.5 bg-neutral-950 border border-white/10 rounded-xl text-white font-bold"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">কোম্পানি স্লোগান (Tagline)</label>
                <input
                  type="text"
                  value={companyForm.tagline}
                  onChange={(e) => setCompanyForm({ ...companyForm, tagline: e.target.value })}
                  className="w-full p-2.5 bg-neutral-950 border border-white/10 rounded-xl text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-neutral-400 block mb-1">অফিসিয়াল ইমেইল / Gmail</label>
                <input
                  type="email"
                  required
                  value={companyForm.email}
                  onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                  className="w-full p-2.5 bg-neutral-950 border border-white/10 rounded-xl text-white font-mono"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">হেল্পলাইন ফোন নাম্বার</label>
                <input
                  type="text"
                  required
                  value={companyForm.phone}
                  onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
                  className="w-full p-2.5 bg-neutral-950 border border-white/10 rounded-xl text-white font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-neutral-400 block mb-1">হোয়াটসঅ্যাপ নাম্বার (WhatsApp)</label>
                <input
                  type="text"
                  placeholder="+880 1XXXXXXXXX"
                  value={companyForm.whatsapp || ''}
                  onChange={(e) => setCompanyForm({ ...companyForm, whatsapp: e.target.value })}
                  className="w-full p-2.5 bg-neutral-950 border border-white/10 rounded-xl text-white font-mono"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">ওয়েবসাইট লিংক (Website URL)</label>
                <input
                  type="text"
                  value={companyForm.webAddress}
                  onChange={(e) => setCompanyForm({ ...companyForm, webAddress: e.target.value })}
                  className="w-full p-2.5 bg-neutral-950 border border-white/10 rounded-xl text-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">অফিসের পূর্ণাঙ্গ ঠিকানা (Address)</label>
              <input
                type="text"
                value={companyForm.address}
                onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                className="w-full p-2.5 bg-neutral-950 border border-white/10 rounded-xl text-white"
              />
            </div>

            {/* Social Links */}
            <div className="p-4 bg-neutral-950/80 rounded-2xl border border-white/5 space-y-3">
              <span className="text-neutral-300 font-bold block">সোশ্যাল মিডিয়া প্রোফাইল লিংকসমূহ</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-400 block mb-1 text-[11px]">YouTube চ্যানেল</label>
                  <input
                    type="text"
                    value={companyForm.socials.youtube}
                    onChange={(e) =>
                      setCompanyForm({
                        ...companyForm,
                        socials: { ...companyForm.socials, youtube: e.target.value },
                      })
                    }
                    className="w-full p-2 bg-neutral-900 border border-white/10 rounded-xl text-white font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1 text-[11px]">Facebook পেজ / গ্রুপ</label>
                  <input
                    type="text"
                    value={companyForm.socials.facebook}
                    onChange={(e) =>
                      setCompanyForm({
                        ...companyForm,
                        socials: { ...companyForm.socials, facebook: e.target.value },
                      })
                    }
                    className="w-full p-2 bg-neutral-900 border border-white/10 rounded-xl text-white font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1 text-[11px]">Telegram চ্যানেল</label>
                  <input
                    type="text"
                    value={companyForm.socials.telegram}
                    onChange={(e) =>
                      setCompanyForm({
                        ...companyForm,
                        socials: { ...companyForm.socials, telegram: e.target.value },
                      })
                    }
                    className="w-full p-2 bg-neutral-900 border border-white/10 rounded-xl text-white font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1 text-[11px]">Twitter / X</label>
                  <input
                    type="text"
                    value={companyForm.socials.twitter}
                    onChange={(e) =>
                      setCompanyForm({
                        ...companyForm,
                        socials: { ...companyForm.socials, twitter: e.target.value },
                      })
                    }
                    className="w-full p-2 bg-neutral-900 border border-white/10 rounded-xl text-white font-mono text-[11px]"
                  />
                </div>
              </div>
            </div>

            {/* About Us Paragraph */}
            <div>
              <label className="text-neutral-300 font-bold block mb-1.5">
                About Us মূল প্যারাগ্রাফ (বাংলা)
              </label>
              <textarea
                rows={5}
                value={companyForm.aboutParagraphBn}
                onChange={(e) => setCompanyForm({ ...companyForm, aboutParagraphBn: e.target.value })}
                className="w-full p-3.5 bg-neutral-950 border border-white/10 rounded-xl text-white leading-relaxed focus:outline-none focus:border-[#044541]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-3 bg-[#044541] hover:bg-[#065b56] text-white font-bold rounded-xl shadow-lg cursor-pointer"
              >
                কোম্পানির তথ্য সংরক্ষণ করুন
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 4: Supabase Cloud Storage & Backend Integration */}
      {activeTab === 'supabase' && (
        <div className="p-6 md:p-8 bg-neutral-900/50 rounded-3xl border border-white/10 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-lg font-bold text-white font-['Outfit'] flex items-center gap-2">
              <Database className="w-5 h-5 text-emerald-400" />
              <span>Supabase ক্লাউড স্টোরেজ ও ব্যাকএন্ড কানেকশন</span>
            </h2>
            <p className="text-xs text-neutral-400">
              ওয়েবসাইটের APK ফাইল ও নোটিশ ক্লাউড স্টোরেজে রাখতে Supabase প্রজেক্ট কানেক্ট করুন।
            </p>
          </div>

          {/* Guide Card in Bengali explaining what is needed */}
          <div className="p-5 bg-gradient-to-br from-emerald-950/60 to-neutral-950 rounded-2xl border border-[#044541] space-y-3">
            <div className="flex items-center gap-2 text-emerald-300 text-sm font-bold">
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span>সুপারবেস (Supabase) কানেক্ট করার জন্য যা যা লাগবে:</span>
            </div>
            <div className="text-xs text-neutral-300 space-y-2 leading-relaxed">
              <p>
                ১. <strong>Project URL:</strong> আপনার Supabase ড্যাশবোর্ডের Settings → API তে গেলে প্রজেক্ট URL পাবেন (যেমন: <code className="text-emerald-400 bg-neutral-900 px-1 py-0.5 rounded">https://xyzcompany.supabase.co</code>)
              </p>
              <p>
                ২. <strong>Anon Public Key:</strong> Settings → API সেকশনে থাকা <code className="text-emerald-400 bg-neutral-900 px-1 py-0.5 rounded">anon public</code> API Key
              </p>
              <p>
                ৩. <strong>Storage Bucket Name:</strong> Supabase-এর Storage মেন্যুতে গিয়ে একটি নতুন বাকেট তৈরি করুন (যেমন: <code className="text-emerald-400 bg-neutral-900 px-1 py-0.5 rounded">fleearn-storage</code>) এবং সেটিকে <strong>Public Bucket</strong> অপশন চেক করুন।
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveSupabaseConfig} className="space-y-4 text-xs">
            <div className="flex items-center gap-3 p-3.5 bg-neutral-950 rounded-xl border border-white/5">
              <input
                type="checkbox"
                id="enableSupabaseCheck"
                checked={supabaseForm.isEnabled}
                onChange={(e) => setSupabaseForm({ ...supabaseForm, isEnabled: e.target.checked })}
                className="w-4 h-4 rounded text-[#044541]"
              />
              <label htmlFor="enableSupabaseCheck" className="text-white font-bold cursor-pointer">
                সরাসরি Supabase লাইভ স্টোরেজ মোড চালু করুন (Live Storage Sync)
              </label>
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-300 font-semibold">Supabase Project URL</label>
              <input
                type="text"
                placeholder="https://your-project-id.supabase.co"
                value={supabaseForm.url}
                onChange={(e) => setSupabaseForm({ ...supabaseForm, url: e.target.value })}
                className="w-full p-2.5 bg-neutral-950 border border-white/10 rounded-xl text-white font-mono focus:border-[#044541]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-300 font-semibold">Supabase Anon Public API Key</label>
              <input
                type="password"
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                value={supabaseForm.anonKey}
                onChange={(e) => setSupabaseForm({ ...supabaseForm, anonKey: e.target.value })}
                className="w-full p-2.5 bg-neutral-950 border border-white/10 rounded-xl text-white font-mono focus:border-[#044541]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-300 font-semibold">Storage Bucket Name</label>
              <input
                type="text"
                placeholder="fleearn-storage"
                value={supabaseForm.bucketName}
                onChange={(e) => setSupabaseForm({ ...supabaseForm, bucketName: e.target.value })}
                className="w-full p-2.5 bg-neutral-950 border border-white/10 rounded-xl text-white font-mono focus:border-[#044541]"
              />
            </div>

            {supabaseTestResult && (
              <div
                className={`p-3.5 rounded-xl border flex items-center gap-2 ${
                  supabaseTestResult.success
                    ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                    : 'bg-red-950/80 border-red-500/50 text-red-300'
                }`}
              >
                {supabaseTestResult.success ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                )}
                <span>{supabaseTestResult.message}</span>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#044541] hover:bg-[#065b56] text-white font-bold rounded-xl shadow-lg cursor-pointer"
              >
                কনফিগারেশন সংরক্ষণ করুন
              </button>

              <button
                type="button"
                disabled={isTestingSupabase}
                onClick={handleTestSupabase}
                className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold rounded-xl cursor-pointer flex items-center gap-1.5"
              >
                {isTestingSupabase ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>কানেকশন টেস্ট হচ্ছে...</span>
                  </>
                ) : (
                  <span>কানেকশন টেস্ট করুন</span>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 5: Notice Board Manager */}
      {activeTab === 'notices' && (
        <div className="p-6 md:p-8 bg-neutral-900/50 rounded-3xl border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white font-['Outfit']">
                নোটিশ বোর্ড ম্যানেজমেন্ট
              </h2>
              <p className="text-xs text-neutral-400">
                লেটেস্ট ও সক্রিয় নোটিশ অথবা আর্কাইভ/এক্সপায়ার্ড নোটিশ পরিচালনা করুন।
              </p>
            </div>

            <button
              onClick={() => setShowAddNoticeModal(true)}
              className="px-4 py-2 bg-[#044541] hover:bg-[#065b56] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4 text-red-400" />
              <span>নতুন নোটিশ যোগ করুন</span>
            </button>
          </div>

          <div className="space-y-3">
            {notices.map((n) => (
              <div
                key={n.id}
                className="p-4 bg-neutral-950/80 rounded-2xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        n.status === 'active'
                          ? 'bg-emerald-950 text-emerald-400'
                          : 'bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      {n.status === 'active' ? 'সক্রিয়' : 'এক্সপায়ার্ড'}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono">{n.date}</span>
                    <span className="text-xs text-white font-bold">{n.title}</span>
                  </div>
                  <p className="text-xs text-neutral-400 line-clamp-1">{n.content}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      updateNotice(n.id, {
                        status: n.status === 'active' ? 'expired' : 'active',
                      });
                      triggerToast('নোটিশের স্ট্যাটাস পরিবর্তিত হয়েছে!');
                    }}
                    className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs rounded-lg cursor-pointer"
                  >
                    {n.status === 'active' ? 'এক্সপায়ার্ড করুন' : 'সক্রিয় করুন'}
                  </button>

                  <button
                    onClick={() => {
                      if (confirm('নোটিশটি ডিলিট করতে চান?')) {
                        deleteNotice(n.id);
                        triggerToast('নোটিশ মুছে ফেলা হয়েছে!');
                      }
                    }}
                    className="p-1.5 text-red-400 hover:bg-red-950 rounded-lg cursor-pointer"
                    aria-label="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Notice Modal */}
          {showAddNoticeModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
              <div className="w-full max-w-lg bg-neutral-950 border border-[#044541] rounded-3xl p-6 space-y-4 text-neutral-100">
                <h3 className="text-lg font-bold font-['Outfit']">নতুন নোটিশ তৈরি করুন</h3>
                <form onSubmit={handleAddNotice} className="space-y-3 text-xs">
                  <div>
                    <label className="text-neutral-400 block mb-1">নোটিশ শিরোনাম (বাংলা)</label>
                    <input
                      type="text"
                      required
                      value={newNotice.title}
                      onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                      className="w-full p-2.5 bg-neutral-900 border border-white/10 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="text-neutral-400 block mb-1">নোটিশ শিরোনাম (English - Optional)</label>
                    <input
                      type="text"
                      value={newNotice.titleEn}
                      onChange={(e) => setNewNotice({ ...newNotice, titleEn: e.target.value })}
                      className="w-full p-2.5 bg-neutral-900 border border-white/10 rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-neutral-400 block mb-1">ক্যাটাগরি</label>
                      <select
                        value={newNotice.category}
                        onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value as any })}
                        className="w-full p-2.5 bg-neutral-900 border border-white/10 rounded-xl"
                      >
                        <option value="Payment">Payment</option>
                        <option value="Update">Update</option>
                        <option value="Security">Security</option>
                        <option value="System">System</option>
                        <option value="Earning">Earning</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-neutral-400 block mb-1">স্ট্যাটাস</label>
                      <select
                        value={newNotice.status}
                        onChange={(e) => setNewNotice({ ...newNotice, status: e.target.value as any })}
                        className="w-full p-2.5 bg-neutral-900 border border-white/10 rounded-xl"
                      >
                        <option value="active">সক্রিয় (Active)</option>
                        <option value="expired">এক্সপায়ার্ড (Expired)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-neutral-400 block mb-1">নোটিশ বিস্তারিত বার্তা</label>
                    <textarea
                      rows={4}
                      required
                      value={newNotice.content}
                      onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                      className="w-full p-2.5 bg-neutral-900 border border-white/10 rounded-xl"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddNoticeModal(false)}
                      className="px-4 py-2 bg-neutral-800 rounded-xl cursor-pointer"
                    >
                      বাতিল
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#044541] hover:bg-[#065b56] text-white font-bold rounded-xl cursor-pointer"
                    >
                      প্রকাশ করুন
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 6: Pricing Plans Manager */}
      {activeTab === 'pricing' && (
        <div className="p-6 md:p-8 bg-neutral-900/50 rounded-3xl border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white font-['Outfit']">
                প্রাইজিং প্ল্যানস ও FSD ভার্চুয়াল কারেন্সি
              </h2>
              <p className="text-xs text-neutral-400">
                নতুন প্ল্যান তৈরি করুন, ডলার মূল্য ও FSD কারেন্সি এডিট করুন।
              </p>
            </div>

            <button
              onClick={() => setShowAddPlanModal(true)}
              className="px-4 py-2 bg-[#044541] hover:bg-[#065b56] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4 text-red-400" />
              <span>নতুন প্ল্যান তৈরি করুন</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className="p-5 bg-neutral-950/80 rounded-2xl border border-white/5 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base">{plan.name}</h3>
                    <button
                      onClick={() => {
                        if (confirm('এই প্ল্যানটি ডিলিট করতে চান?')) {
                          deletePricingPlan(plan.id);
                          triggerToast('প্ল্যান মুছে ফেলা হয়েছে!');
                        }
                      }}
                      className="text-red-400 hover:text-red-300"
                      aria-label="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-baseline gap-2 font-mono">
                    <span className="text-2xl font-bold text-white">${plan.priceUSD}</span>
                    <span className="text-sm font-bold text-emerald-400">({plan.fsdAmount} FSD)</span>
                  </div>

                  <span className="text-xs text-neutral-400 font-mono block">
                    {plan.validity}
                  </span>

                  <ul className="text-xs text-neutral-400 space-y-1 pt-2">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-emerald-400">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Add Plan Modal */}
          {showAddPlanModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
              <div className="w-full max-w-md bg-neutral-950 border border-[#044541] rounded-3xl p-6 space-y-4 text-neutral-100">
                <h3 className="text-lg font-bold font-['Outfit']">নতুন প্রাইজিং প্ল্যান</h3>
                <form onSubmit={handleAddPlan} className="space-y-3 text-xs">
                  <div>
                    <label className="text-neutral-400 block mb-1">প্ল্যানের নাম</label>
                    <input
                      type="text"
                      required
                      value={newPlan.name}
                      onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                      className="w-full p-2.5 bg-neutral-900 border border-white/10 rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-neutral-400 block mb-1">মূল্য (USD $)</label>
                      <input
                        type="number"
                        required
                        value={newPlan.priceUSD}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setNewPlan({ ...newPlan, priceUSD: val, fsdAmount: val });
                        }}
                        className="w-full p-2.5 bg-neutral-900 border border-white/10 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 block mb-1">ভার্চুয়াল কারেন্সি (FSD)</label>
                      <input
                        type="number"
                        required
                        value={newPlan.fsdAmount}
                        onChange={(e) => setNewPlan({ ...newPlan, fsdAmount: Number(e.target.value) })}
                        className="w-full p-2.5 bg-neutral-900 border border-white/10 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-neutral-400 block mb-1">ভ্যালিডিটি</label>
                    <input
                      type="text"
                      required
                      value={newPlan.validity}
                      onChange={(e) => setNewPlan({ ...newPlan, validity: e.target.value })}
                      className="w-full p-2.5 bg-neutral-900 border border-white/10 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="text-neutral-400 block mb-1">সুবিধাসমূহ (প্রতি লাইনে ১টি)</label>
                    <textarea
                      rows={3}
                      value={newPlan.featuresText}
                      onChange={(e) => setNewPlan({ ...newPlan, featuresText: e.target.value })}
                      className="w-full p-2.5 bg-neutral-900 border border-white/10 rounded-xl"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddPlanModal(false)}
                      className="px-4 py-2 bg-neutral-800 rounded-xl cursor-pointer"
                    >
                      বাতিল
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#044541] hover:bg-[#065b56] text-white font-bold rounded-xl cursor-pointer"
                    >
                      প্ল্যান তৈরি করুন
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 7: Skill Courses Manager */}
      {activeTab === 'courses' && (
        <div className="p-6 md:p-8 bg-neutral-900/50 rounded-3xl border border-white/10 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-lg font-bold text-white font-['Outfit']">
              স্কিল ও আর্নিং কোর্সসমূহ
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((c) => (
              <div
                key={c.id}
                className="p-4 bg-neutral-950/80 rounded-2xl border border-white/5 flex items-center justify-between gap-4"
              >
                <div>
                  <h4 className="font-bold text-white text-sm">{c.title}</h4>
                  <span className="text-xs text-neutral-400 font-mono">
                    {c.instructor} · ${c.priceUSD} ({c.priceFSD} FSD)
                  </span>
                </div>
                <button
                  onClick={() => {
                    if (confirm('কোর্সটি মুছে ফেলতে চান?')) {
                      deleteCourse(c.id);
                      triggerToast('কোর্স মুছে ফেলা হয়েছে!');
                    }
                  }}
                  className="text-red-400 hover:text-red-300 cursor-pointer"
                  aria-label="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: Important Legal Documents Editor */}
      {activeTab === 'docs' && (
        <div className="p-6 md:p-8 bg-neutral-900/50 rounded-3xl border border-white/10 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-lg font-bold text-white font-['Outfit']">
              গুরুত্বপূর্ণ ডকুমেন্টস ও নীতিমালা সম্পাদনা
            </h2>
            <p className="text-xs text-neutral-400">
              টার্মস অ্যান্ড কন্ডিশনস, প্রাইভেসি পলিসি, ইউজ পলিসি সরাসরি এডিট করুন।
            </p>
          </div>

          <div className="space-y-6">
            {importantDocs.map((doc) => (
              <div key={doc.id} className="p-5 bg-neutral-950/80 rounded-2xl border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm">{doc.titleBn}</h3>
                  <span className="text-xs text-neutral-500 font-mono">{doc.id}</span>
                </div>

                <textarea
                  rows={6}
                  defaultValue={doc.contentBn}
                  onBlur={(e) => {
                    updateImportantDoc(doc.id, {
                      contentBn: e.target.value,
                      lastUpdated: new Date().toISOString().split('T')[0],
                    });
                    triggerToast(`${doc.titleBn} সফলভাবে আপডেট হয়েছে!`);
                  }}
                  className="w-full p-3 bg-neutral-900 border border-white/10 rounded-xl text-xs text-neutral-200 leading-relaxed focus:outline-none focus:border-[#044541]"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 9: Support Tickets Viewer */}
      {activeTab === 'inquiries' && (
        <div className="p-6 md:p-8 bg-neutral-900/50 rounded-3xl border border-white/10 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-lg font-bold text-white font-['Outfit']">
              ব্যবহারকারীদের জমা দেওয়া মেসেজ ও রিপোর্টস
            </h2>
            <p className="text-xs text-neutral-400">
              সাপোর্ট বক্স, রিপোর্ট বক্স ও যোগাযোগ ফর্মের মাধ্যমে আসা ইনকোয়ারিসমূহ
            </p>
          </div>

          {supportTickets.length === 0 ? (
            <div className="p-8 text-center bg-neutral-950/40 rounded-2xl border border-white/5 text-xs text-neutral-400">
              বর্তমানে কোনো নতুন জমা দেওয়া মেসেজ নেই।
            </div>
          ) : (
            <div className="space-y-3">
              {supportTickets.map((tkt) => (
                <div
                  key={tkt.id}
                  className="p-4 bg-neutral-950/80 rounded-2xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          tkt.type === 'report'
                            ? 'bg-red-950 text-red-300'
                            : 'bg-emerald-950 text-emerald-300'
                        }`}
                      >
                        {tkt.type}
                      </span>
                      <span className="font-bold text-white">{tkt.name}</span>
                      <span className="text-neutral-500 font-mono">({tkt.email})</span>
                      <span className="text-neutral-600">·</span>
                      <span className="text-neutral-500 font-mono">{tkt.date}</span>
                    </div>
                    <p className="text-neutral-300">{tkt.message}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        updateTicketStatus(tkt.id, tkt.status === 'pending' ? 'resolved' : 'pending');
                        triggerToast('টিকিটের অবস্থা আপডেট করা হয়েছে!');
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                        tkt.status === 'resolved'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                          : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                      }`}
                    >
                      {tkt.status === 'resolved' ? 'সমাধানকৃত (Resolved)' : 'Mark Resolved'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Reset Database Button */}
      <div className="p-4 bg-neutral-900/30 rounded-2xl border border-white/5 flex items-center justify-between text-xs text-neutral-400">
        <span>ডেমো ডেটা প্রাথমিক অবস্থায় ফিরিয়ে নিতে চান?</span>
        <button
          onClick={() => {
            if (confirm('সমস্ত কন্টেন্ট প্রাথমিক ফ্যাক্টরি ডেটায় ফিরিয়ে নেবেন?')) {
              resetToDefaultData();
              triggerToast('সমস্ত ডেটা ডিফল্ট রিস্টোর করা হয়েছে!');
            }
          }}
          className="px-3.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>রিসেট টু ডিফল্ট</span>
        </button>
      </div>
    </div>
  );
};
