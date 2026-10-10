import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FleearnLogo } from '../components/FleearnLogo';
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
  Link as LinkIcon,
  ExternalLink,
  Flame,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RefreshCw,
  Edit3,
} from 'lucide-react';
import { AppVersion, Notice, Course, PricingPlan } from '../types/fleearn';

type AdminTab =
  | 'stats'
  | 'apps'
  | 'company'
  | 'notices'
  | 'pricing'
  | 'courses'
  | 'docs'
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
    firestoreStatus,
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

  const handleStatsSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePlatformStats({
      totalUsers: Number(statsForm.totalUsers),
      activeUsers: Number(statsForm.activeUsers),
      bannedAccounts: Number(statsForm.bannedAccounts),
      totalTransactionsUSD: Number(statsForm.totalTransactionsUSD),
      totalTransactionsFSD: Number(statsForm.totalTransactionsUSD),
    });
    triggerToast('পরিসংখ্যান Firestore-এ সফলভাবে আপডেট করা হয়েছে!');
  };

  // 2. Direct APK Download Link Management (NO upload needed, purely download link)
  const [showAddAppModal, setShowAddAppModal] = useState(false);
  const [editingAppId, setEditingAppId] = useState<string | null>(null);

  const [appForm, setAppForm] = useState({
    versionName: 'v3.5.0 (Latest)',
    versionCode: 350,
    releaseDate: new Date().toISOString().split('T')[0],
    size: '29.2 MB',
    isLatest: true,
    downloadCount: 1500000,
    minAndroid: 'Android 8.0 and above',
    description: 'নতুন হাই-স্পিড আর্নিং ইঞ্জিন, অটোমেটেড বিকাশ/নগদ ক্যাশআউট এবং উন্নত সিকিউরিটি সংবলিত সংস্করণ।',
    whatsNewText: 'নতুন দ্রুততম উইথড্রয়াল গেটওয়ে যুক্ত হয়েছে\n৩ডি পারফরম্যান্স অপ্টিমাইজেশন ও বাগ ফিক্স\nসিকিউরিটি প্যাচ হালনাগাদ',
    apkFileName: 'fleearn-v3.5.0-official.apk',
    apkDownloadUrl: 'https://github.com/fleearn-ecosystem/app/releases/download/v3.5.0/fleearn-v3.5.0-official.apk',
    status: 'published' as const,
  });

  const handleSaveAppVersion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appForm.apkDownloadUrl.trim()) {
      alert('অনুগ্রহ করে সরাসরি APK ডাউনলোড লিংক প্রদান করুন!');
      return;
    }

    if (editingAppId) {
      await updateAppVersion(editingAppId, {
        versionName: appForm.versionName,
        versionCode: Number(appForm.versionCode),
        releaseDate: appForm.releaseDate,
        size: appForm.size,
        isLatest: appForm.isLatest,
        minAndroid: appForm.minAndroid,
        description: appForm.description,
        whatsNew: appForm.whatsNewText.split('\n').filter(Boolean),
        apkFileName: appForm.apkFileName,
        apkDownloadUrl: appForm.apkDownloadUrl.trim(),
        status: appForm.status,
      });
      triggerToast('APK ডাউনলোড লিংক ও ভার্সন সফলভাবে আপডেট হয়েছে!');
      setEditingAppId(null);
    } else {
      await addAppVersion({
        versionName: appForm.versionName,
        versionCode: Number(appForm.versionCode),
        releaseDate: appForm.releaseDate,
        size: appForm.size,
        isLatest: appForm.isLatest,
        downloadCount: Number(appForm.downloadCount),
        minAndroid: appForm.minAndroid,
        description: appForm.description,
        whatsNew: appForm.whatsNewText.split('\n').filter(Boolean),
        screenshots: [
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
        ],
        apkFileName: appForm.apkFileName,
        apkDownloadUrl: appForm.apkDownloadUrl.trim(),
        status: appForm.status,
      });
      triggerToast('নতুন APK সংস্করণ ও ডাউনলোড লিংক যুক্ত হয়েছে!');
    }

    setShowAddAppModal(false);
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

  const handleAddNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotice.title || !newNotice.content) return;
    await addNotice({
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
    triggerToast('নতুন নোটিশ Firestore-এ প্রকাশ করা হয়েছে!');
  };

  // 4. Company Info Form State with Logo Editor
  const [companyForm, setCompanyForm] = useState({ ...companyInfo });

  const handleCompanySave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateCompanyInfo(companyForm);
    triggerToast('কোম্পানির যাবতীয় তথ্য ও লোগো Firestore-এ সফলভাবে আপডেট করা হয়েছে!');
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="p-6 bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 border border-[#044541] rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center gap-3.5">
          <FleearnLogo size="md" />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
                Fleearn মাস্টার কন্ট্রোল ও এডমিন প্যানেল
              </h1>
              <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold">
                ROOT ADMIN
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              ওয়েবসাইটের তথ্য, সরাসরি APK ডাউনলোড লিংক আপডেট ও Firebase Firestore লাইভ ডাটাবেজ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Live Firestore indicator */}
          <div className="px-3 py-1.5 bg-[#044541]/40 border border-emerald-500/30 rounded-xl text-[11px] font-mono text-emerald-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{firestoreStatus}</span>
          </div>

          <button
            onClick={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span>মূল ওয়েবসাইট</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="px-3.5 py-2 bg-red-950 hover:bg-red-900 text-red-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 border border-red-500/30 transition-colors cursor-pointer"
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
          { id: 'apps', label: 'মোবাইল APK ডাউনলোড লিংক', icon: Smartphone },
          { id: 'company', label: 'কোম্পানি তথ্য ও লোগো', icon: Building },
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
              প্ল্যাটফর্মের মূল পরিসংখ্যান এডিট করুন (Firestore Sync)
            </h2>
            <p className="text-xs text-neutral-400">
              এই সংখ্যাগুলো হোমপেজ ও ফুটারের লাইভ কাউন্টারে প্রদর্শিত হয় এবং ফায়ারবেসে রিয়েল-টাইম সেভ থাকে।
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
                পরিসংখ্যান Firestore-এ সংরক্ষণ করুন
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: Mobile APK Versions & Direct Download Link Manager */}
      {activeTab === 'apps' && (
        <div className="p-6 md:p-8 bg-neutral-900/50 rounded-3xl border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white font-['Outfit']">
                মোবাইল অ্যাপ APK সরাসরি ডাউনলোড লিংক কন্ট্রোল
              </h2>
              <p className="text-xs text-neutral-400">
                অ্যাপের apk ফাইল আপলোড করার প্রয়োজন নেই — এখানে সরাসরি ডাউনলোড লিংক আপডেট করলেই ব্যবহারকারীরা ডাউনলোড করতে পারবে।
              </p>
            </div>

            <button
              onClick={() => {
                setEditingAppId(null);
                setAppForm({
                  versionName: 'v3.5.0 (Latest)',
                  versionCode: 350,
                  releaseDate: new Date().toISOString().split('T')[0],
                  size: '29.2 MB',
                  isLatest: true,
                  downloadCount: 1500000,
                  minAndroid: 'Android 8.0 and above',
                  description: 'নতুন হাই-স্পিড আর্নিং ইঞ্জিন ও অটোমেটেড উইথড্রয়াল সংবলিত সংস্করণ।',
                  whatsNewText: 'নতুন দ্রুততম উইথড্রয়াল গেটওয়ে যুক্ত হয়েছে\n৩ডি পারফরম্যান্স অপ্টিমাইজেশন\nসিকিউরিটি প্যাচ হালনাগাদ',
                  apkFileName: 'fleearn-v3.5.0-official.apk',
                  apkDownloadUrl: 'https://github.com/fleearn-ecosystem/app/releases/download/v3.5.0/fleearn-v3.5.0-official.apk',
                  status: 'published',
                });
                setShowAddAppModal(true);
              }}
              className="px-4 py-2.5 bg-[#044541] hover:bg-[#065b56] text-white font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer self-start sm:self-auto shadow-lg"
            >
              <Plus className="w-4 h-4 text-red-400" />
              <span>নতুন APK ভার্সন ও লিংক যোগ করুন</span>
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
                    <FleearnLogo size="sm" />
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
                        রিলিজ: {app.releaseDate} · সাইজ: {app.size} · বিল্ড #{app.versionCode}
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
                        setEditingAppId(app.id);
                        setAppForm({
                          versionName: app.versionName,
                          versionCode: app.versionCode,
                          releaseDate: app.releaseDate,
                          size: app.size,
                          isLatest: app.isLatest,
                          downloadCount: app.downloadCount,
                          minAndroid: app.minAndroid,
                          description: app.description,
                          whatsNewText: app.whatsNew.join('\n'),
                          apkFileName: app.apkFileName || `fleearn-${app.versionName}.apk`,
                          apkDownloadUrl: app.apkDownloadUrl,
                          status: app.status as any,
                        });
                        setShowAddAppModal(true);
                      }}
                      className="p-1.5 text-emerald-400 hover:bg-emerald-950 rounded-lg cursor-pointer"
                      title="ডাউনলোড লিংক এডিট করুন"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

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

                {/* Direct Download Link Box */}
                <div className="p-3 bg-neutral-900/90 rounded-xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <LinkIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-neutral-400 shrink-0 font-medium">সরাসরি ডাউনলোড লিংক:</span>
                    <a
                      href={app.apkDownloadUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white hover:text-emerald-300 font-mono underline truncate"
                    >
                      {app.apkDownloadUrl}
                    </a>
                  </div>

                  <a
                    href={app.apkDownloadUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-[#044541] hover:bg-[#065b56] text-white text-[11px] font-semibold rounded-lg shrink-0 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>লিংক টেস্ট করুন</span>
                  </a>
                </div>

                <div className="text-xs text-neutral-400 bg-neutral-900/40 p-3 rounded-xl space-y-1">
                  <span className="font-semibold text-neutral-300 block mb-0.5">চেঞ্জলগ / নতুন কী আছে:</span>
                  <ul className="list-disc list-inside space-y-0.5">
                    {app.whatsNew.map((w, idx) => (
                      <li key={idx}>{w}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Add / Edit APK Modal */}
          {showAddAppModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
              <div className="w-full max-w-xl bg-neutral-950 border border-[#044541] rounded-3xl p-6 space-y-4 text-neutral-100 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="text-lg font-bold font-['Outfit'] flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-emerald-400" />
                    <span>{editingAppId ? 'APK ডাউনলোড লিংক এডিট করুন' : 'নতুন APK ডাউনলোড লিংক যোগ করুন'}</span>
                  </h3>
                  <button
                    onClick={() => setShowAddAppModal(false)}
                    className="text-neutral-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSaveAppVersion} className="space-y-4 text-xs">
                  {/* Direct APK Link Field */}
                  <div className="space-y-1.5 p-4 bg-[#044541]/20 rounded-2xl border border-emerald-500/30">
                    <label className="text-emerald-300 font-bold block flex items-center gap-1.5">
                      <LinkIcon className="w-4 h-4 text-red-400" />
                      <span>সরাসরি APK ডাউনলোড URL / লিংক (Direct Download Link)*</span>
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://yourserver.com/app.apk অথবা Google Drive / GitHub release direct link"
                      value={appForm.apkDownloadUrl}
                      onChange={(e) => setAppForm({ ...appForm, apkDownloadUrl: e.target.value })}
                      className="w-full px-4 py-2.5 bg-neutral-900 border border-emerald-500/40 rounded-xl text-white font-mono focus:outline-none focus:border-emerald-400"
                    />
                    <span className="text-[11px] text-neutral-400 block mt-1">
                      ইউজাররা যখন সাইটে "Download APK" বাটনে চাপ দিবে তখন সরাসরি এই লিংক থেকে ডাউনলোড হবে।
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-neutral-300 font-semibold">ভার্সন নাম (যেমন: v3.5.0)</label>
                      <input
                        type="text"
                        required
                        value={appForm.versionName}
                        onChange={(e) => setAppForm({ ...appForm, versionName: e.target.value })}
                        className="w-full px-3.5 py-2 bg-neutral-900 border border-white/10 rounded-xl text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-neutral-300 font-semibold">ভার্সন কোড (যেমন: 350)</label>
                      <input
                        type="number"
                        required
                        value={appForm.versionCode}
                        onChange={(e) => setAppForm({ ...appForm, versionCode: Number(e.target.value) })}
                        className="w-full px-3.5 py-2 bg-neutral-900 border border-white/10 rounded-xl text-white font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-neutral-300 font-semibold">ফাইল সাইজ (যেমন: 28.5 MB)</label>
                      <input
                        type="text"
                        required
                        value={appForm.size}
                        onChange={(e) => setAppForm({ ...appForm, size: e.target.value })}
                        className="w-full px-3.5 py-2 bg-neutral-900 border border-white/10 rounded-xl text-white font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-neutral-300 font-semibold">রিলিজের তারিখ</label>
                      <input
                        type="date"
                        required
                        value={appForm.releaseDate}
                        onChange={(e) => setAppForm({ ...appForm, releaseDate: e.target.value })}
                        className="w-full px-3.5 py-2 bg-neutral-900 border border-white/10 rounded-xl text-white"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-neutral-300 font-semibold">ফাইল নাম (যেমন: fleearn-latest.apk)</label>
                      <input
                        type="text"
                        value={appForm.apkFileName}
                        onChange={(e) => setAppForm({ ...appForm, apkFileName: e.target.value })}
                        className="w-full px-3.5 py-2 bg-neutral-900 border border-white/10 rounded-xl text-white font-mono"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-neutral-300 font-semibold">মিনিমাম অ্যান্ড্রয়েড রিকোয়ারমেন্ট</label>
                      <input
                        type="text"
                        value={appForm.minAndroid}
                        onChange={(e) => setAppForm({ ...appForm, minAndroid: e.target.value })}
                        className="w-full px-3.5 py-2 bg-neutral-900 border border-white/10 rounded-xl text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-neutral-300 font-semibold">অ্যাপের সংক্ষিপ্ত বিবরণ</label>
                    <textarea
                      rows={2}
                      value={appForm.description}
                      onChange={(e) => setAppForm({ ...appForm, description: e.target.value })}
                      className="w-full px-3.5 py-2 bg-neutral-900 border border-white/10 rounded-xl text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-neutral-300 font-semibold">হটস নিউ (প্রতি লাইনে একটি পয়েন্ট লিখুন)</label>
                    <textarea
                      rows={3}
                      value={appForm.whatsNewText}
                      onChange={(e) => setAppForm({ ...appForm, whatsNewText: e.target.value })}
                      className="w-full px-3.5 py-2 bg-neutral-900 border border-white/10 rounded-xl text-white font-mono"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="isLatestToggle"
                      checked={appForm.isLatest}
                      onChange={(e) => setAppForm({ ...appForm, isLatest: e.target.checked })}
                      className="w-4 h-4 rounded text-[#044541]"
                    />
                    <label htmlFor="isLatestToggle" className="text-neutral-300 font-semibold">
                      এটিকে মূল লেটেস্ট রিলিজ হিসেবে সেট করুন
                    </label>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowAddAppModal(false)}
                      className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-xl cursor-pointer"
                    >
                      বাতিল
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#044541] hover:bg-[#065b56] text-white font-bold rounded-xl cursor-pointer shadow-lg"
                    >
                      {editingAppId ? 'লিংক আপডেট করুন' : 'সংরক্ষণ ও প্রকাশ করুন'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Company Profile, Logo, Contacts & Address Editor */}
      {activeTab === 'company' && (
        <div className="p-6 md:p-8 bg-neutral-900/50 rounded-3xl border border-white/10 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-lg font-bold text-white font-['Outfit']">
              কোম্পানির লোগো, নাম, ঠিকানা ও যোগাযোগের তথ্য এডিটর
            </h2>
            <p className="text-xs text-neutral-400">
              এখানে পরিবর্তিত যেকোনো তথ্য ওয়েবসাইটের হেডার, ফুটার, এবাউট পেজ এবং ডকুমেন্টে তাৎক্ষণিক লাইভ আপডেট হবে।
            </p>
          </div>

          <form onSubmit={handleCompanySave} className="space-y-6 text-xs">
            {/* Logo Preview & Custom Logo URL */}
            <div className="p-6 bg-neutral-950/80 rounded-2xl border border-white/10 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-neutral-900 rounded-2xl border border-emerald-500/30">
                    <FleearnLogo size="lg" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white block font-['Outfit']">
                      ওয়েবসাইটের মূল লোগো প্রিভিউ
                    </span>
                    <span className="text-xs text-neutral-400">
                      {companyForm.logoUrl
                        ? 'কাস্টম লোগো URL সক্রিয় রয়েছে'
                        : 'অফিসিয়াল Fleearn ভেক্টর এমব্লেম লোগো সক্রিয়'}
                    </span>
                  </div>
                </div>

                {companyForm.logoUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      setCompanyForm((prev) => ({ ...prev, logoUrl: '' }));
                      triggerToast('ডিফল্ট অফিশিয়াল ভেক্টর লোগো রিস্টোর করা হয়েছে!');
                    }}
                    className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs rounded-xl flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                    <span>ডিফল্ট ভেক্টর লোগো রিস্টোর করুন</span>
                  </button>
                )}
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-neutral-300 font-semibold block">
                  কাস্টম লোগো লিংক / URL (ইমেজ লিংক বা পিএনজি লিংক)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/logo.png (খালি রাখলে অফিশিয়াল ভেক্টর লোগো প্রদর্শিত হবে)"
                    value={companyForm.logoUrl || ''}
                    onChange={(e) => setCompanyForm({ ...companyForm, logoUrl: e.target.value })}
                    className="flex-1 px-4 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white font-mono"
                  />
                  {companyForm.logoUrl && (
                    <a
                      href={companyForm.logoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl flex items-center gap-1 shrink-0"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>প্রিভিউ</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* General Company Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="font-semibold text-neutral-300">কোম্পানির নাম (Company Name)</label>
                <input
                  type="text"
                  required
                  value={companyForm.name}
                  onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-white/10 rounded-xl text-white font-['Outfit'] font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-neutral-300">ট্যাগলাইন (Tagline)</label>
                <input
                  type="text"
                  required
                  value={companyForm.tagline}
                  onChange={(e) => setCompanyForm({ ...companyForm, tagline: e.target.value })}
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-white/10 rounded-xl text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-neutral-300">অফিসিয়াল ইমেইল (Email)</label>
                <input
                  type="email"
                  required
                  value={companyForm.email}
                  onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-white/10 rounded-xl text-white font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-neutral-300">হেল্পলাইন ফোন নম্বর (Phone)</label>
                <input
                  type="text"
                  required
                  value={companyForm.phone}
                  onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-white/10 rounded-xl text-white font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-neutral-300">হোয়াটসঅ্যাপ সাপোর্ট নম্বর (WhatsApp)</label>
                <input
                  type="text"
                  placeholder="+880 1800-353276"
                  value={companyForm.whatsapp || ''}
                  onChange={(e) => setCompanyForm({ ...companyForm, whatsapp: e.target.value })}
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-white/10 rounded-xl text-white font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-neutral-300">অফিসিয়াল ওয়েবসাইট URL</label>
                <input
                  type="url"
                  required
                  value={companyForm.webAddress}
                  onChange={(e) => setCompanyForm({ ...companyForm, webAddress: e.target.value })}
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-white/10 rounded-xl text-white font-mono"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="font-semibold text-neutral-300">হেডকোয়ার্টার ঠিকানা (Official Address)</label>
                <textarea
                  rows={2}
                  required
                  value={companyForm.address}
                  onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-white/10 rounded-xl text-white leading-relaxed"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="font-semibold text-neutral-300">
                  আমাদের সম্পর্কে বিস্তারিত অনুচ্ছেদ (বাংলা - About Us Paragraph)
                </label>
                <textarea
                  rows={4}
                  required
                  value={companyForm.aboutParagraphBn}
                  onChange={(e) => setCompanyForm({ ...companyForm, aboutParagraphBn: e.target.value })}
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-white/10 rounded-xl text-white leading-relaxed"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="font-semibold text-neutral-300">
                  About Us Paragraph (English Translation)
                </label>
                <textarea
                  rows={4}
                  required
                  value={companyForm.aboutParagraphEn}
                  onChange={(e) => setCompanyForm({ ...companyForm, aboutParagraphEn: e.target.value })}
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-white/10 rounded-xl text-white leading-relaxed"
                />
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-4 border-t border-white/10 space-y-4">
              <h3 className="font-bold text-sm text-emerald-400">অফিসিয়াল সোশ্যাল লিংকসমূহ (Social Channels)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-neutral-400 font-semibold">YouTube চ্যানেল লিংক</label>
                  <input
                    type="url"
                    value={companyForm.socials.youtube}
                    onChange={(e) =>
                      setCompanyForm({
                        ...companyForm,
                        socials: { ...companyForm.socials, youtube: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 bg-neutral-950 border border-white/10 rounded-xl text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-400 font-semibold">Facebook পেজ / গ্রুপ লিংক</label>
                  <input
                    type="url"
                    value={companyForm.socials.facebook}
                    onChange={(e) =>
                      setCompanyForm({
                        ...companyForm,
                        socials: { ...companyForm.socials, facebook: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 bg-neutral-950 border border-white/10 rounded-xl text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-400 font-semibold">Telegram অফিসিয়াল চ্যানেল লিংক</label>
                  <input
                    type="url"
                    value={companyForm.socials.telegram}
                    onChange={(e) =>
                      setCompanyForm({
                        ...companyForm,
                        socials: { ...companyForm.socials, telegram: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 bg-neutral-950 border border-white/10 rounded-xl text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-400 font-semibold">Instagram প্রোফাইল লিংক</label>
                  <input
                    type="url"
                    value={companyForm.socials.instagram}
                    onChange={(e) =>
                      setCompanyForm({
                        ...companyForm,
                        socials: { ...companyForm.socials, instagram: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 bg-neutral-950 border border-white/10 rounded-xl text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-400 font-semibold">Twitter / X প্রোফাইল লিংক</label>
                  <input
                    type="url"
                    value={companyForm.socials.twitter}
                    onChange={(e) =>
                      setCompanyForm({
                        ...companyForm,
                        socials: { ...companyForm.socials, twitter: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 bg-neutral-950 border border-white/10 rounded-xl text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-400 font-semibold">Pinterest প্রোফাইল লিংক</label>
                  <input
                    type="url"
                    value={companyForm.socials.pinterest}
                    onChange={(e) =>
                      setCompanyForm({
                        ...companyForm,
                        socials: { ...companyForm.socials, pinterest: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 bg-neutral-950 border border-white/10 rounded-xl text-white font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <button
                type="submit"
                className="px-6 py-3 bg-[#044541] hover:bg-[#065b56] text-white font-bold rounded-xl shadow-lg cursor-pointer"
              >
                কোম্পানির যাবতীয় তথ্য ও লোগো Firestore-এ সংরক্ষণ করুন
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 4: Notice Board Editor */}
      {activeTab === 'notices' && (
        <div className="p-6 md:p-8 bg-neutral-900/50 rounded-3xl border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white font-['Outfit']">
                নোটিশ বোর্ড ম্যানেজমেন্ট (Firestore Live)
              </h2>
              <p className="text-xs text-neutral-400">
                নতুন জরুরি বিজ্ঞপ্তি প্রকাশ ও পুরাতন নোটিশ এডিট বা রিমুভ করুন।
              </p>
            </div>

            <button
              onClick={() => setShowAddNoticeModal(true)}
              className="px-4 py-2.5 bg-[#044541] hover:bg-[#065b56] text-white font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer self-start sm:self-auto shadow-lg"
            >
              <Plus className="w-4 h-4 text-red-400" />
              <span>নতুন নোটিশ লিখুন</span>
            </button>
          </div>

          <div className="space-y-3">
            {notices.map((n) => (
              <div
                key={n.id}
                className="p-5 bg-neutral-950/80 rounded-2xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                      {n.category}
                    </span>
                    <span className="text-sm font-bold text-white">{n.title}</span>
                  </div>
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {n.content}
                  </p>
                  <div className="flex items-center gap-4 text-[11px] text-neutral-500 font-mono">
                    <span>তারিখ: {n.date}</span>
                    <span>ভিউ: {n.views.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start md:self-auto">
                  <button
                    onClick={() => {
                      updateNotice(n.id, {
                        status: n.status === 'active' ? 'expired' : 'active',
                      });
                      triggerToast('নোটিশের স্ট্যাটাস পরিবর্তন করা হয়েছে!');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                      n.status === 'active'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                        : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {n.status === 'active' ? 'সক্রিয়' : 'মেয়াদোত্তীর্ণ'}
                  </button>

                  <button
                    onClick={() => {
                      if (confirm('এই নোটিশটি মুছে ফেলতে চান?')) {
                        deleteNotice(n.id);
                        triggerToast('নোটিশ মুছে ফেলা হয়েছে!');
                      }
                    }}
                    className="p-2 text-red-400 hover:bg-red-950 rounded-lg cursor-pointer"
                    aria-label="Delete Notice"
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
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="text-lg font-bold font-['Outfit'] flex items-center gap-2">
                    <Bell className="w-5 h-5 text-emerald-400" />
                    <span>নতুন প্ল্যাটফর্ম নোটিশ প্রকাশ</span>
                  </h3>
                  <button
                    onClick={() => setShowAddNoticeModal(false)}
                    className="text-neutral-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleAddNotice} className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="text-neutral-300 font-semibold">শিরোনাম (বাংলায়)</label>
                    <input
                      type="text"
                      required
                      value={newNotice.title}
                      onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                      className="w-full px-3.5 py-2 bg-neutral-900 border border-white/10 rounded-xl text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-neutral-300 font-semibold">ক্যাটেগরি</label>
                    <select
                      value={newNotice.category}
                      onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value as any })}
                      className="w-full px-3.5 py-2 bg-neutral-900 border border-white/10 rounded-xl text-white"
                    >
                      <option value="Payment">Payment (পেমেন্ট)</option>
                      <option value="Update">Update (আপডেট)</option>
                      <option value="Security">Security (নিরাপত্তা)</option>
                      <option value="Earning">Earning (আর্নিং)</option>
                      <option value="System">System (সিস্টেম)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-neutral-300 font-semibold">বিস্তারিত বিষয়বস্তু</label>
                    <textarea
                      rows={4}
                      required
                      value={newNotice.content}
                      onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                      className="w-full px-3.5 py-2 bg-neutral-900 border border-white/10 rounded-xl text-white leading-relaxed"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowAddNoticeModal(false)}
                      className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-xl cursor-pointer"
                    >
                      বাতিল
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#044541] hover:bg-[#065b56] text-white font-bold rounded-xl cursor-pointer shadow-lg"
                    >
                      Firestore-এ নোটিশ প্রকাশ করুন
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: Pricing Plans Editor */}
      {activeTab === 'pricing' && (
        <div className="p-6 md:p-8 bg-neutral-900/50 rounded-3xl border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white font-['Outfit']">
                প্রাইজিং ও মেম্বারশিপ বুস্টার প্যাকেজ
              </h2>
              <p className="text-xs text-neutral-400">
                ইউজারদের জন্য FSD ও USD মূল্যের সাবস্ক্রিপশন প্ল্যানসমূহ।
              </p>
            </div>

            <button
              onClick={() => setShowAddPlanModal(true)}
              className="px-4 py-2.5 bg-[#044541] hover:bg-[#065b56] text-white font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer self-start sm:self-auto shadow-lg"
            >
              <Plus className="w-4 h-4 text-red-400" />
              <span>নতুন প্যাকেজ তৈরি করুন</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className="p-6 bg-neutral-950/80 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-base font-['Outfit']">{plan.name}</span>
                    {plan.popular && (
                      <span className="px-2 py-0.5 rounded-full bg-red-950 text-red-300 text-[10px] font-bold">
                        জনপ্রিয়
                      </span>
                    )}
                  </div>
                  <div className="text-2xl font-black text-white font-mono">
                    ${plan.priceUSD}{' '}
                    <span className="text-xs text-neutral-400 font-normal">({plan.fsdAmount} FSD)</span>
                  </div>
                  <span className="text-xs text-emerald-400 block font-mono">{plan.validity}</span>
                  <ul className="space-y-1.5 text-xs text-neutral-300 pt-2 border-t border-white/5">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    if (confirm('এই প্ল্যানটি মুছে ফেলতে চান?')) {
                      deletePricingPlan(plan.id);
                      triggerToast('প্ল্যান মুছে ফেলা হয়েছে!');
                    }
                  }}
                  className="w-full py-2 bg-red-950/70 hover:bg-red-900 text-red-200 text-xs rounded-xl cursor-pointer"
                >
                  প্ল্যান মুছে ফেলুন
                </button>
              </div>
            ))}
          </div>

          {/* Add Plan Modal */}
          {showAddPlanModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
              <div className="w-full max-w-md bg-neutral-950 border border-[#044541] rounded-3xl p-6 space-y-4 text-neutral-100">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="text-lg font-bold font-['Outfit'] flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-emerald-400" />
                    <span>নতুন মেম্বারশিপ প্ল্যান</span>
                  </h3>
                  <button
                    onClick={() => setShowAddPlanModal(false)}
                    className="text-neutral-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleAddPlan} className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="text-neutral-300 font-semibold">প্ল্যানের নাম</label>
                    <input
                      type="text"
                      required
                      value={newPlan.name}
                      onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                      className="w-full px-3.5 py-2 bg-neutral-900 border border-white/10 rounded-xl text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-neutral-300 font-semibold">মূল্য (USD)</label>
                      <input
                        type="number"
                        required
                        value={newPlan.priceUSD}
                        onChange={(e) => setNewPlan({ ...newPlan, priceUSD: Number(e.target.value), fsdAmount: Number(e.target.value) })}
                        className="w-full px-3.5 py-2 bg-neutral-900 border border-white/10 rounded-xl text-white font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-neutral-300 font-semibold">মেয়াদ</label>
                      <input
                        type="text"
                        required
                        value={newPlan.validity}
                        onChange={(e) => setNewPlan({ ...newPlan, validity: e.target.value })}
                        className="w-full px-3.5 py-2 bg-neutral-900 border border-white/10 rounded-xl text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-neutral-300 font-semibold">সুবিধাসমূহ (প্রতি লাইনে একটি)</label>
                    <textarea
                      rows={3}
                      required
                      value={newPlan.featuresText}
                      onChange={(e) => setNewPlan({ ...newPlan, featuresText: e.target.value })}
                      className="w-full px-3.5 py-2 bg-neutral-900 border border-white/10 rounded-xl text-white font-mono"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowAddPlanModal(false)}
                      className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-xl cursor-pointer"
                    >
                      বাতিল
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#044541] hover:bg-[#065b56] text-white font-bold rounded-xl cursor-pointer shadow-lg"
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

      {/* TAB 6: Courses Editor */}
      {activeTab === 'courses' && (
        <div className="p-6 md:p-8 bg-neutral-900/50 rounded-3xl border border-white/10 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-lg font-bold text-white font-['Outfit']">
              স্কিল ও আর্নিং কোর্স ক্যাটালগ
            </h2>
            <p className="text-xs text-neutral-400">
              প্ল্যাটফর্মে তালিকাভুক্ত ৪টি প্রিমিয়াম ফ্রিল্যান্সিং কোর্স পরিচালনা করুন।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {courses.map((c) => (
              <div
                key={c.id}
                className="p-5 bg-neutral-950/80 rounded-2xl border border-white/10 flex gap-4"
              >
                <img
                  src={c.thumbnail}
                  alt={c.title}
                  className="w-24 h-24 rounded-xl object-cover shrink-0 border border-white/10"
                />
                <div className="space-y-1.5 flex-1">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-500/30">
                    {c.category}
                  </span>
                  <h3 className="text-xs font-bold text-white line-clamp-2">{c.title}</h3>
                  <div className="text-[11px] text-neutral-400">
                    ইন্সট্রাক্টর: <span className="text-neutral-200">{c.instructor}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-mono text-emerald-400 font-bold text-xs">${c.priceUSD} ({c.priceFSD} FSD)</span>
                    <button
                      onClick={() => {
                        if (confirm('এই কোর্সটি মুছে ফেলতে চান?')) {
                          deleteCourse(c.id);
                          triggerToast('কোর্স মুছে ফেলা হয়েছে!');
                        }
                      }}
                      className="p-1 text-red-400 hover:bg-red-950 rounded cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: Documents & Policies Editor */}
      {activeTab === 'docs' && (
        <div className="p-6 md:p-8 bg-neutral-900/50 rounded-3xl border border-white/10 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-lg font-bold text-white font-['Outfit']">
              আইনগত ডকুমেন্টস ও ব্যবহারবিধি পরিমার্জন
            </h2>
            <p className="text-xs text-neutral-400">
              টার্মস, প্রাইভেসি পলিসি, ইউজ পলিসি ও উইথড্রয়াল নীতিমালার সরাসরি টেক্সট এডিট করুন।
            </p>
          </div>

          <div className="space-y-6">
            {importantDocs.map((doc) => (
              <div
                key={doc.id}
                className="p-6 bg-neutral-950/80 rounded-2xl border border-white/10 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <h3 className="text-sm font-bold text-white font-['Outfit']">
                    {doc.titleBn} ({doc.id})
                  </h3>
                  <span className="text-xs text-neutral-400 font-mono">
                    আপডেট: {doc.lastUpdated}
                  </span>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-neutral-400 block font-semibold">
                    ডকুমেন্ট কন্টেন্ট (বাংলা):
                  </label>
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
                    className="w-full p-4 bg-neutral-900 border border-white/10 rounded-xl text-xs text-neutral-200 leading-relaxed font-mono focus:outline-none focus:border-[#044541]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: Support Tickets & User Queries */}
      {activeTab === 'inquiries' && (
        <div className="p-6 md:p-8 bg-neutral-900/50 rounded-3xl border border-white/10 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-lg font-bold text-white font-['Outfit']">
              ব্যবহারকারীদের সাপোর্ট টিকিট ও মেসেজ (Firestore)
            </h2>
            <p className="text-xs text-neutral-400">
              হোমপেজের সাপোর্ট ও কমপ্লেইন ফর্ম থেকে জমাকৃত সকল বার্তা।
            </p>
          </div>

          {supportTickets.length === 0 ? (
            <div className="p-12 text-center text-xs text-neutral-500 bg-neutral-950/50 rounded-2xl border border-dashed border-white/10">
              বর্তমানে কোনো পেন্ডিং সাপোর্ট মেসেজ নেই।
            </div>
          ) : (
            <div className="space-y-3">
              {supportTickets.map((t) => (
                <div
                  key={t.id}
                  className="p-5 bg-neutral-950/80 rounded-2xl border border-white/5 space-y-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{t.name}</span>
                      <span className="text-xs text-neutral-400 font-mono">({t.email})</span>
                      <span className="px-2 py-0.5 rounded bg-neutral-800 text-[10px] text-neutral-300 uppercase font-mono">
                        {t.type}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        updateTicketStatus(
                          t.id,
                          t.status === 'pending' ? 'resolved' : 'pending'
                        );
                        triggerToast('টিকেটের স্ট্যাটাস আপডেট করা হয়েছে!');
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                        t.status === 'resolved'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-950 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {t.status === 'resolved' ? 'সমাধানকৃত' : 'পেন্ডিং'}
                    </button>
                  </div>

                  <p className="text-xs text-neutral-300 bg-neutral-900/60 p-3 rounded-xl leading-relaxed">
                    {t.message}
                  </p>

                  <div className="text-[11px] text-neutral-500 font-mono flex items-center justify-between">
                    <span>তারিখ: {t.date}</span>
                    <span>আইডি: {t.id}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Emergency Reset to Defaults */}
      <div className="pt-6 border-t border-white/10 flex items-center justify-between flex-wrap gap-4 text-xs text-neutral-500">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-neutral-400" />
          <span>প্রয়োজনে মূল ফ্যাক্টরি ডাটাতে রিস্টোর করতে নিচের বাটনটি ব্যবহার করুন:</span>
        </div>
        <button
          onClick={() => {
            if (confirm('সতর্কতা: এটি সকল ডেটা ডিফল্ট অবস্থায় রিস্টোর করবে এবং Firestore-এ সিঙ্ক করবে। আপনি কি নিশ্চিত?')) {
              resetToDefaultData();
              triggerToast('সকল ডাটা সফলভাবে ডিফল্ট অবস্থায় রিস্টোর করা হয়েছে!');
            }
          }}
          className="px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-xl transition-colors cursor-pointer border border-white/5"
        >
          ফ্যাক্টরি রিসেট (রিস্টোর)
        </button>
      </div>
    </div>
  );
};
