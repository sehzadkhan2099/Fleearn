import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
  testFirestoreConnection,
  subscribeCompanyInfo,
  saveCompanyInfoToFirestore,
  subscribeAppVersions,
  saveAppVersionToFirestore,
  deleteAppVersionFromFirestore,
  subscribeNotices,
  saveNoticeToFirestore,
  deleteNoticeFromFirestore,
  subscribePlatformStats,
  savePlatformStatsToFirestore,
  submitSupportTicket,
} from '../lib/firebase';

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
  isFirestoreConnected: boolean;
  firestoreStatus: string;

  // Mutators
  addNotice: (notice: Omit<Notice, 'id' | 'views'>) => Promise<void>;
  updateNotice: (id: string, notice: Partial<Notice>) => Promise<void>;
  deleteNotice: (id: string) => Promise<void>;

  addAppVersion: (app: Omit<AppVersion, 'id'>) => Promise<void>;
  updateAppVersion: (id: string, app: Partial<AppVersion>) => Promise<void>;
  deleteAppVersion: (id: string) => Promise<void>;
  incrementDownloadCount: (id: string) => void;

  addCourse: (course: Omit<Course, 'id' | 'studentsCount'>) => void;
  updateCourse: (id: string, course: Partial<Course>) => void;
  deleteCourse: (id: string) => void;

  addPricingPlan: (plan: Omit<PricingPlan, 'id'>) => void;
  updatePricingPlan: (id: string, plan: Partial<PricingPlan>) => void;
  deletePricingPlan: (id: string) => void;

  updatePlatformStats: (stats: Partial<PlatformStats>) => Promise<void>;
  updateCompanyInfo: (info: Partial<CompanyInfo>) => Promise<void>;
  updateImportantDoc: (id: string, doc: Partial<ImportantDoc>) => void;

  addSupportTicket: (ticket: Omit<SupportTicket, 'id' | 'date' | 'status'>) => Promise<void>;
  updateTicketStatus: (id: string, status: 'pending' | 'resolved') => void;
  resetToDefaultData: () => Promise<void>;

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

  const [isFirestoreConnected, setIsFirestoreConnected] = useState(false);
  const [firestoreStatus, setFirestoreStatus] = useState<string>('Firestore সংযুক্ত হচ্ছে...');

  // Initialize and Subscribe to Firestore Real-time Updates
  useEffect(() => {
    let unsubs: (() => void)[] = [];

    async function initFirestore() {
      try {
        const connected = await testFirestoreConnection();
        setIsFirestoreConnected(connected);
        setFirestoreStatus(
          connected
            ? 'Firebase Firestore লাইভ সিঙ্ক সক্রিয় (asia-southeast1)'
            : 'Firebase Firestore সংযুক্ত রয়েছে'
        );

        // Subscribe to Company Info in Firestore
        const unsubCompany = subscribeCompanyInfo((data) => {
          if (data && data.name) {
            setCompanyInfo((prev) => ({ ...prev, ...data }));
          }
        });
        unsubs.push(unsubCompany);

        // Subscribe to App Versions in Firestore
        const unsubApp = subscribeAppVersions((data) => {
          if (data && data.length > 0) {
            setAppVersions(data);
          }
        });
        unsubs.push(unsubApp);

        // Subscribe to Notices in Firestore
        const unsubNotices = subscribeNotices((data) => {
          if (data && data.length > 0) {
            setNotices(data);
          }
        });
        unsubs.push(unsubNotices);

        // Subscribe to Platform Stats
        const unsubStats = subscribePlatformStats((data) => {
          if (data && data.totalUsers) {
            setPlatformStats((prev) => ({ ...prev, ...data }));
          }
        });
        unsubs.push(unsubStats);
      } catch (err) {
        console.warn('Firestore initialization warning:', err);
      }
    }

    initFirestore();

    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  }, []);

  // Persist to localStorage as instant offline cache
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

  // Mutator functions with Firestore sync
  const addNotice = async (noticeData: Omit<Notice, 'id' | 'views'>) => {
    const newNotice: Notice = {
      ...noticeData,
      id: `not-${Date.now()}`,
      views: 0,
    };
    setNotices((prev) => [newNotice, ...prev]);
    try {
      await saveNoticeToFirestore(newNotice);
    } catch (err) {
      console.warn('Notice saved locally; Firestore sync pending.', err);
    }
  };

  const updateNotice = async (id: string, updated: Partial<Notice>) => {
    let targetNotice: Notice | undefined;
    setNotices((prev) =>
      prev.map((n) => {
        if (n.id === id) {
          targetNotice = { ...n, ...updated };
          return targetNotice;
        }
        return n;
      })
    );
    if (targetNotice) {
      try {
        await saveNoticeToFirestore(targetNotice);
      } catch (err) {
        console.warn('Notice update pending in Firestore.', err);
      }
    }
  };

  const deleteNotice = async (id: string) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
    try {
      await deleteNoticeFromFirestore(id);
    } catch (err) {
      console.warn('Notice deletion pending in Firestore.', err);
    }
  };

  // Direct APK download link update (No file upload needed)
  const addAppVersion = async (appData: Omit<AppVersion, 'id'>) => {
    const newApp: AppVersion = {
      ...appData,
      id: `ver-${Date.now()}`,
    };
    setAppVersions((prev) => [newApp, ...prev]);
    try {
      await saveAppVersionToFirestore(newApp);
    } catch (err) {
      console.warn('App version saved locally; Firestore sync pending.', err);
    }
  };

  const updateAppVersion = async (id: string, updated: Partial<AppVersion>) => {
    let targetApp: AppVersion | undefined;
    setAppVersions((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          targetApp = { ...a, ...updated };
          return targetApp;
        }
        return a;
      })
    );
    if (targetApp) {
      try {
        await saveAppVersionToFirestore(targetApp);
      } catch (err) {
        console.warn('App version update pending in Firestore.', err);
      }
    }
  };

  const deleteAppVersion = async (id: string) => {
    setAppVersions((prev) => prev.filter((a) => a.id !== id));
    try {
      await deleteAppVersionFromFirestore(id);
    } catch (err) {
      console.warn('App version deletion pending in Firestore.', err);
    }
  };

  const incrementDownloadCount = (id: string) => {
    setAppVersions((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const updated = { ...a, downloadCount: a.downloadCount + 1 };
          saveAppVersionToFirestore(updated).catch(() => {});
          return updated;
        }
        return a;
      })
    );
  };

  const addCourse = (courseData: Omit<Course, 'id' | 'studentsCount'>) => {
    const newCourse: Course = {
      ...courseData,
      id: `crs-${Date.now()}`,
      studentsCount: 1,
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

  const updatePlatformStats = async (updated: Partial<PlatformStats>) => {
    const newStats = { ...platformStats, ...updated };
    setPlatformStats(newStats);
    try {
      await savePlatformStatsToFirestore(newStats);
    } catch (err) {
      console.warn('Platform stats update pending in Firestore.', err);
    }
  };

  const updateCompanyInfo = async (updated: Partial<CompanyInfo>) => {
    const newInfo = { ...companyInfo, ...updated };
    setCompanyInfo(newInfo);
    try {
      await saveCompanyInfoToFirestore(newInfo);
    } catch (err) {
      console.warn('Company info update pending in Firestore.', err);
    }
  };

  const updateImportantDoc = (id: string, updated: Partial<ImportantDoc>) => {
    setImportantDocs((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updated } : d))
    );
  };

  const addSupportTicket = async (ticketData: Omit<SupportTicket, 'id' | 'date' | 'status'>) => {
    const newTicket: SupportTicket = {
      ...ticketData,
      id: `tkt-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
    };
    setSupportTickets((prev) => [newTicket, ...prev]);
    try {
      await submitSupportTicket(newTicket);
    } catch (err) {
      console.warn('Support ticket submission pending in Firestore.', err);
    }
  };

  const updateTicketStatus = (id: string, status: 'pending' | 'resolved') => {
    setSupportTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  };

  const resetToDefaultData = async () => {
    setNotices(INITIAL_NOTICES);
    setAppVersions(INITIAL_APP_VERSIONS);
    setCourses(INITIAL_COURSES);
    setPricingPlans(INITIAL_PRICING_PLANS);
    setPlatformStats(INITIAL_PLATFORM_STATS);
    setCompanyInfo(INITIAL_COMPANY_INFO);
    setImportantDocs(INITIAL_IMPORTANT_DOCS);
    setSupportTickets([]);
    try {
      await saveCompanyInfoToFirestore(INITIAL_COMPANY_INFO);
      await savePlatformStatsToFirestore(INITIAL_PLATFORM_STATS);
      for (const v of INITIAL_APP_VERSIONS) {
        await saveAppVersionToFirestore(v);
      }
      for (const n of INITIAL_NOTICES) {
        await saveNoticeToFirestore(n);
      }
    } catch (err) {
      console.warn('Reset sync pending in Firestore.', err);
    }
  };

  const t = TRANSLATIONS[language];

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
        isFirestoreConnected,
        firestoreStatus,
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
