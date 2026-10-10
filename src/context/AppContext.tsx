import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
  Language,
  PageId,
  Notice,
  AppVersion,
  Course,
  PricingPlan,
  PlatformStats,
  CompanyInfo,
  ImportantDoc,
  SupportTicket,
  SupabaseConfigState,
} from '../types/fleearn';
import {
  INITIAL_NOTICES,
  INITIAL_APP_VERSIONS,
  INITIAL_COURSES,
  INITIAL_PRICING_PLANS,
  INITIAL_PLATFORM_STATS,
  INITIAL_COMPANY_INFO,
  INITIAL_IMPORTANT_DOCS,
} from '../data/initialData';
import { TRANSLATIONS, Translations } from '../data/translations';
import {
  DEFAULT_SUPABASE_CONFIG,
  syncDataToSupabase,
  loadDataFromSupabase,
} from '../lib/supabase';

interface AppContextType {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  isDarkMode: boolean; // Locked to true for pure premium dark mode
  t: Translations;

  // Data states
  notices: Notice[];
  appVersions: AppVersion[];
  courses: Course[];
  pricingPlans: PricingPlan[];
  platformStats: PlatformStats;
  companyInfo: CompanyInfo;
  importantDocs: ImportantDoc[];
  supportTickets: SupportTicket[];
  supabaseConfig: SupabaseConfigState;
  isCloudSyncing: boolean;
  cloudSyncStatus: string | null;
  syncAllToSupabase: () => Promise<{ success: boolean; message: string }>;

  // Mutators
  addNotice: (notice: Omit<Notice, 'id' | 'views'>) => void;
  updateNotice: (id: string, notice: Partial<Notice>) => void;
  deleteNotice: (id: string) => void;

  addAppVersion: (app: Omit<AppVersion, 'id'>) => void;
  updateAppVersion: (id: string, app: Partial<AppVersion>) => void;
  deleteAppVersion: (id: string) => void;
  incrementDownloadCount: (id: string) => void;

  addCourse: (course: Omit<Course, 'id' | 'studentsCount'>) => void;
  updateCourse: (id: string, course: Partial<Course>) => void;
  deleteCourse: (id: string) => void;

  addPricingPlan: (plan: Omit<PricingPlan, 'id'>) => void;
  updatePricingPlan: (id: string, plan: Partial<PricingPlan>) => void;
  deletePricingPlan: (id: string) => void;

  updatePlatformStats: (stats: Partial<PlatformStats>) => void;
  updateCompanyInfo: (info: Partial<CompanyInfo>) => void;
  updateImportantDoc: (id: string, doc: Partial<ImportantDoc>) => void;
  updateSupabaseConfig: (config: Partial<SupabaseConfigState>) => void;

  addSupportTicket: (ticket: Omit<SupportTicket, 'id' | 'date' | 'status'>) => void;
  updateTicketStatus: (id: string, status: 'pending' | 'resolved') => void;
  resetToDefaultData: () => void;

  // Secret Admin Authentication & Easter Egg
  isSecretModalOpen: boolean;
  openSecretModal: () => void;
  closeSecretModal: () => void;
  isAdminLoginModalOpen: boolean;
  openAdminLoginModal: () => void;
  closeAdminLoginModal: () => void;
  isAdminLoggedIn: boolean;
  loginAdmin: (uid: string, pin: string) => boolean;
  logoutAdmin: () => void;
  mcqClickAttempts: number;
  registerMcqClick: (optionNumber: number) => { success: boolean; lockedOut: boolean };
  isMcqLockedOut: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [language, setLanguage] = useState<Language>('bn');
  // Pure dark mode locked
  const isDarkMode = true;

  // Always ensure dark class on documentElement
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  }, []);

  // LocalStorage initialization helper
  const loadStored = <T,>(key: string, defaultVal: T): T => {
    try {
      const item = localStorage.getItem(`fleearn_${key}`);
      return item ? JSON.parse(item) : defaultVal;
    } catch {
      return defaultVal;
    }
  };

  const [notices, setNotices] = useState<Notice[]>(() =>
    loadStored('notices', INITIAL_NOTICES)
  );
  const [appVersions, setAppVersions] = useState<AppVersion[]>(() =>
    loadStored('appVersions', INITIAL_APP_VERSIONS)
  );
  const [courses, setCourses] = useState<Course[]>(() =>
    loadStored('courses', INITIAL_COURSES)
  );
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>(() =>
    loadStored('pricingPlans', INITIAL_PRICING_PLANS)
  );
  const [platformStats, setPlatformStats] = useState<PlatformStats>(() =>
    loadStored('platformStats', INITIAL_PLATFORM_STATS)
  );
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(() =>
    loadStored('companyInfo', INITIAL_COMPANY_INFO)
  );
  const [importantDocs, setImportantDocs] = useState<ImportantDoc[]>(() =>
    loadStored('importantDocs', INITIAL_IMPORTANT_DOCS)
  );
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(() =>
    loadStored('supportTickets', [])
  );

  // Default to user's provided Supabase config
  const [supabaseConfig, setSupabaseConfig] = useState<SupabaseConfigState>(() => {
    const stored = loadStored<SupabaseConfigState>('supabaseConfig', DEFAULT_SUPABASE_CONFIG);
    if (!stored.url || stored.url === '') {
      return DEFAULT_SUPABASE_CONFIG;
    }
    return stored;
  });

  const [isCloudSyncing, setIsCloudSyncing] = useState(false);
  const [cloudSyncStatus, setCloudSyncStatus] = useState<string | null>(null);

  // Sync state to Supabase Cloud Storage
  const syncAllToSupabase = useCallback(async (): Promise<{ success: boolean; message: string }> => {
    if (!supabaseConfig.isEnabled || !supabaseConfig.url || !supabaseConfig.anonKey) {
      return { success: false, message: 'Supabase নিষ্ক্রিয়।' };
    }

    setIsCloudSyncing(true);
    const payload = {
      timestamp: new Date().toISOString(),
      notices,
      appVersions,
      courses,
      pricingPlans,
      platformStats,
      companyInfo,
      importantDocs,
    };

    const res = await syncDataToSupabase(payload, supabaseConfig);
    setIsCloudSyncing(false);

    if (res.success) {
      setCloudSyncStatus(`Supabase ক্লাউডে সফলভাবে সিঙ্ক হয়েছে (${new Date().toLocaleTimeString()})`);
      return { success: true, message: 'Supabase ক্লাউডে সফলভাবে সিঙ্ক হয়েছে!' };
    } else {
      setCloudSyncStatus(`ক্লাউড সিঙ্ক বার্তা: ${res.error || 'বাকেট সেটআপ চেক করুন'}`);
      return { success: false, message: res.error || 'সিঙ্ক ব্যর্থ হয়েছে।' };
    }
  }, [
    supabaseConfig,
    notices,
    appVersions,
    courses,
    pricingPlans,
    platformStats,
    companyInfo,
    importantDocs,
  ]);

  // Initial cloud fetch on app launch
  const initialFetchAttempted = useRef(false);
  useEffect(() => {
    if (initialFetchAttempted.current) return;
    initialFetchAttempted.current = true;

    async function hydrateFromCloud() {
      if (supabaseConfig.isEnabled && supabaseConfig.url) {
        try {
          const cloudData = await loadDataFromSupabase(supabaseConfig);
          if (cloudData) {
            if (cloudData.notices?.length) setNotices(cloudData.notices);
            if (cloudData.appVersions?.length) setAppVersions(cloudData.appVersions);
            if (cloudData.courses?.length) setCourses(cloudData.courses);
            if (cloudData.pricingPlans?.length) setPricingPlans(cloudData.pricingPlans);
            if (cloudData.platformStats) setPlatformStats(cloudData.platformStats);
            if (cloudData.companyInfo) setCompanyInfo(cloudData.companyInfo);
            if (cloudData.importantDocs?.length) setImportantDocs(cloudData.importantDocs);
            setCloudSyncStatus('Supabase ক্লাউড থেকে সর্বশেষ ডেটা লোড হয়েছে।');
          }
        } catch {
          // Fallback to local storage gracefully
        }
      }
    }
    hydrateFromCloud();
  }, [supabaseConfig]);

  // Persist to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('fleearn_notices', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('fleearn_appVersions', JSON.stringify(appVersions));
  }, [appVersions]);

  useEffect(() => {
    localStorage.setItem('fleearn_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('fleearn_pricingPlans', JSON.stringify(pricingPlans));
  }, [pricingPlans]);

  useEffect(() => {
    localStorage.setItem('fleearn_platformStats', JSON.stringify(platformStats));
  }, [platformStats]);

  useEffect(() => {
    localStorage.setItem('fleearn_companyInfo', JSON.stringify(companyInfo));
  }, [companyInfo]);

  useEffect(() => {
    localStorage.setItem('fleearn_importantDocs', JSON.stringify(importantDocs));
  }, [importantDocs]);

  useEffect(() => {
    localStorage.setItem('fleearn_supportTickets', JSON.stringify(supportTickets));
  }, [supportTickets]);

  useEffect(() => {
    localStorage.setItem('fleearn_supabaseConfig', JSON.stringify(supabaseConfig));
  }, [supabaseConfig]);

  // Secret Admin System State
  const [isSecretModalOpen, setIsSecretModalOpen] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [mcqClickAttempts, setMcqClickAttempts] = useState(0);
  const [isMcqLockedOut, setIsMcqLockedOut] = useState(false);

  const openSecretModal = () => {
    setMcqClickAttempts(0);
    setIsMcqLockedOut(false);
    setIsSecretModalOpen(true);
  };

  const closeSecretModal = () => {
    setIsSecretModalOpen(false);
  };

  const openAdminLoginModal = () => {
    setIsSecretModalOpen(false);
    setIsAdminLoginModalOpen(true);
  };

  const closeAdminLoginModal = () => {
    setIsAdminLoginModalOpen(false);
  };

  // Register MCQ click: Maximum 2 attempts allowed!
  // Question: "লাল গ্রহ কোনটি?" -> Option 40 is "৪০. মঙ্গল গ্রহ (Mars)"
  const registerMcqClick = (optionNumber: number) => {
    if (isMcqLockedOut) {
      return { success: false, lockedOut: true };
    }

    if (optionNumber === 40) {
      openAdminLoginModal();
      return { success: true, lockedOut: false };
    } else {
      const nextAttempts = mcqClickAttempts + 1;
      setMcqClickAttempts(nextAttempts);
      if (nextAttempts >= 2) {
        setIsMcqLockedOut(true);
        setTimeout(() => {
          setIsSecretModalOpen(false);
          setMcqClickAttempts(0);
          setIsMcqLockedOut(false);
        }, 2400);
        return { success: false, lockedOut: true };
      }
      return { success: false, lockedOut: false };
    }
  };

  // Admin login check: UID : 250660 PIN: 131
  const loginAdmin = (uid: string, pin: string): boolean => {
    const cleanUid = uid.trim();
    const cleanPin = pin.trim();
    if (cleanUid === '250660' && cleanPin === '131') {
      setIsAdminLoggedIn(true);
      setIsAdminLoginModalOpen(false);
      setCurrentPage('admin');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setCurrentPage('home');
  };

  // Mutator functions
  const addNotice = (noticeData: Omit<Notice, 'id' | 'views'>) => {
    const newNotice: Notice = {
      ...noticeData,
      id: `not-${Date.now()}`,
      views: 0,
    };
    setNotices((prev) => [newNotice, ...prev]);
  };

  const updateNotice = (id: string, updated: Partial<Notice>) => {
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updated } : n))
    );
  };

  const deleteNotice = (id: string) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
  };

  const addAppVersion = (appData: Omit<AppVersion, 'id'>) => {
    const newVer: AppVersion = {
      ...appData,
      id: `ver-${Date.now()}`,
    };
    if (newVer.isLatest) {
      setAppVersions((prev) => [
        newVer,
        ...prev.map((v) => ({ ...v, isLatest: false })),
      ]);
    } else {
      setAppVersions((prev) => [newVer, ...prev]);
    }
  };

  const updateAppVersion = (id: string, updated: Partial<AppVersion>) => {
    setAppVersions((prev) =>
      prev.map((v) => {
        if (v.id === id) {
          return { ...v, ...updated };
        }
        if (updated.isLatest && v.id !== id) {
          return { ...v, isLatest: false };
        }
        return v;
      })
    );
  };

  const deleteAppVersion = (id: string) => {
    setAppVersions((prev) => prev.filter((v) => v.id !== id));
  };

  const incrementDownloadCount = (id: string) => {
    setAppVersions((prev) =>
      prev.map((v) => (v.id === id ? { ...v, downloadCount: v.downloadCount + 1 } : v))
    );
  };

  const addCourse = (courseData: Omit<Course, 'id' | 'studentsCount'>) => {
    const newCourse: Course = {
      ...courseData,
      id: `crs-${Date.now()}`,
      studentsCount: 0,
    };
    setCourses((prev) => [newCourse, ...prev]);
  };

  const updateCourse = (id: string, updated: Partial<Course>) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updated } : c))
    );
  };

  const deleteCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const addPricingPlan = (planData: Omit<PricingPlan, 'id'>) => {
    const newPlan: PricingPlan = {
      ...planData,
      id: `plan-${Date.now()}`,
    };
    setPricingPlans((prev) => [...prev, newPlan]);
  };

  const updatePricingPlan = (id: string, updated: Partial<PricingPlan>) => {
    setPricingPlans((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const deletePricingPlan = (id: string) => {
    setPricingPlans((prev) => prev.filter((p) => p.id !== id));
  };

  const updatePlatformStats = (newStats: Partial<PlatformStats>) => {
    setPlatformStats((prev) => ({ ...prev, ...newStats }));
  };

  const updateCompanyInfo = (info: Partial<CompanyInfo>) => {
    setCompanyInfo((prev) => ({
      ...prev,
      ...info,
      socials: {
        ...prev.socials,
        ...(info.socials || {}),
      },
    }));
  };

  const updateImportantDoc = (id: string, docData: Partial<ImportantDoc>) => {
    setImportantDocs((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...docData } : d))
    );
  };

  const updateSupabaseConfig = (config: Partial<SupabaseConfigState>) => {
    setSupabaseConfig((prev) => ({ ...prev, ...config }));
  };

  const addSupportTicket = (ticketData: Omit<SupportTicket, 'id' | 'date' | 'status'>) => {
    const newTicket: SupportTicket = {
      ...ticketData,
      id: `tkt-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
    };
    setSupportTickets((prev) => [newTicket, ...prev]);
  };

  const updateTicketStatus = (id: string, status: 'pending' | 'resolved') => {
    setSupportTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  };

  const resetToDefaultData = () => {
    setNotices(INITIAL_NOTICES);
    setAppVersions(INITIAL_APP_VERSIONS);
    setCourses(INITIAL_COURSES);
    setPricingPlans(INITIAL_PRICING_PLANS);
    setPlatformStats(INITIAL_PLATFORM_STATS);
    setCompanyInfo(INITIAL_COMPANY_INFO);
    setImportantDocs(INITIAL_IMPORTANT_DOCS);
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS.bn;

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        language,
        setLanguage,
        isDarkMode,
        t,
        notices,
        appVersions,
        courses,
        pricingPlans,
        platformStats,
        companyInfo,
        importantDocs,
        supportTickets,
        supabaseConfig,
        isCloudSyncing,
        cloudSyncStatus,
        syncAllToSupabase,
        addNotice,
        updateNotice,
        deleteNotice,
        addAppVersion,
        updateAppVersion,
        deleteAppVersion,
        incrementDownloadCount,
        addCourse,
        updateCourse,
        deleteCourse,
        addPricingPlan,
        updatePricingPlan,
        deletePricingPlan,
        updatePlatformStats,
        updateCompanyInfo,
        updateImportantDoc,
        updateSupabaseConfig,
        addSupportTicket,
        updateTicketStatus,
        resetToDefaultData,
        isSecretModalOpen,
        openSecretModal,
        closeSecretModal,
        isAdminLoginModalOpen,
        openAdminLoginModal,
        closeAdminLoginModal,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        mcqClickAttempts,
        registerMcqClick,
        isMcqLockedOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
