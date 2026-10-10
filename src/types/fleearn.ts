export type Language = 'bn' | 'en' | 'ru' | 'ar';

export type PageId =
  | 'home'
  | 'notice'
  | 'app'
  | 'features'
  | 'pricing'
  | 'gallery'
  | 'documents'
  | 'faq'
  | 'about'
  | 'discover'
  | 'opportunity'
  | 'admin';

export interface Notice {
  id: string;
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
  category: 'System' | 'Payment' | 'Earning' | 'Update' | 'Security';
  date: string;
  status: 'active' | 'expired';
  priority: 'high' | 'normal';
  views: number;
}

export interface AppVersion {
  id: string;
  versionName: string;
  versionCode: number;
  releaseDate: string;
  size: string;
  isLatest: boolean;
  downloadCount: number;
  minAndroid: string;
  description: string;
  whatsNew: string[];
  screenshots?: string[];
  apkFileName?: string;
  apkDownloadUrl: string; // Direct APK download link updated by Admin
  status: 'published' | 'beta';
}

export interface Course {
  id: string;
  title: string;
  titleEn: string;
  category: string;
  instructor: string;
  duration: string;
  lessonsCount: number;
  priceUSD: number;
  priceFSD: number;
  rating: number;
  studentsCount: number;
  thumbnail: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface PricingPlan {
  id: string;
  name: string;
  nameEn: string;
  priceUSD: number;
  fsdAmount: number;
  validity: string;
  validityEn: string;
  badge?: string;
  features: string[];
  popular: boolean;
}

export interface PlatformStats {
  totalUsers: number;
  activeUsers: number;
  bannedAccounts: number;
  totalTransactionsUSD: number;
  totalTransactionsFSD: number;
}

export interface CompanyInfo {
  name: string;
  logoUrl?: string;
  tagline: string;
  email: string;
  webAddress: string;
  address: string;
  phone: string;
  whatsapp?: string;
  aboutParagraphBn: string;
  aboutParagraphEn: string;
  socials: {
    youtube: string;
    facebook: string;
    instagram: string;
    pinterest: string;
    telegram: string;
    twitter: string;
  };
}

export interface ImportantDoc {
  id: string;
  titleBn: string;
  titleEn: string;
  lastUpdated: string;
  contentBn: string;
  contentEn: string;
}

export interface SupportTicket {
  id: string;
  type: 'support' | 'report' | 'contact';
  name: string;
  email: string;
  subject?: string;
  message: string;
  date: string;
  status: 'pending' | 'resolved';
}
