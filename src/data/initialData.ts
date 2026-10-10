import {
  Notice,
  AppVersion,
  Course,
  PricingPlan,
  PlatformStats,
  CompanyInfo,
  ImportantDoc,
  SupportTicket,
} from '../types/fleearn';

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 'not-01',
    title: 'নতুন পেমেন্ট গেটওয়ে বিকাশ, নগদ ও বাইন্যান্স ইনস্ট্যান্ট অটো-উইথড্র চালু!',
    titleEn: 'Instant Auto-Withdrawal via bKash, Nagad & Binance now live!',
    content: 'সম্মানিত Fleearn ব্যবহারকারীগণ, আনন্দের সাথে জানানো যাচ্ছে যে এখন থেকে সকল ভেরিফাইড ব্যবহারকারী তাদের উপার্জিত অর্থ মাত্র ৫ মিনিটে বিকাশ, নগদ, রকেট এবং বাইন্যান্সের (USDT) মাধ্যমে সরাসরি অটো-উইথড্র করতে পারবেন। কোনো বিলম্ব ছাড়াই ২৪/৭ ক্যাশআউট সুবিধা উপভোগ করুন।',
    contentEn: 'Dear Fleearn users, we are delighted to announce that verified users can now withdraw their earnings within 5 minutes via bKash, Nagad, Rocket, and Binance (USDT). Enjoy seamless 24/7 automated cashouts.',
    category: 'Payment',
    date: '2026-10-09',
    status: 'active',
    priority: 'high',
    views: 45290,
  },
  {
    id: 'not-02',
    title: 'Fleearn অফিসিয়াল মোবাইল অ্যাপ v3.4.2 রিলিজ – নতুন আর্নিং ট্যাক্স ও থ্রিডি ইন্টারফেস',
    titleEn: 'Fleearn Mobile App v3.4.2 Released – Enhanced Earning Modules & 3D UI',
    content: 'আমাদের অ্যান্ড্রয়েড অ্যাপের নতুন সংস্করণ v3.4.2 এখন লাইভ। এতে যুক্ত করা হয়েছে মাইক্রোটাস্ক অটো-ভ্যালিডেশন, লো-ল্যাটেন্সি ভিডিও কল ও চ্যাটিং এবং সরাসরি ড্রপশিপিং সেলস ট্র্যাকিং ড্যাশবোর্ড। এখনই ডাউনলোড করে আপডেট করে নিন।',
    contentEn: 'Our latest Android app v3.4.2 is now available. Features include automated micro-task validation, low-latency video calling & chatting, and direct dropshipping sales tracking. Update today.',
    category: 'Update',
    date: '2026-10-07',
    status: 'active',
    priority: 'high',
    views: 38120,
  },
  {
    id: 'not-03',
    title: 'ভুয়া রেফারেল এবং আনঅথরাইজড মাল্টিপল অ্যাকাউন্ট সংক্রান্ত সতর্কবার্তা ও সিকিউরিটি আপডেট',
    titleEn: 'Important Warning: Anti-Fraud Sweep on Duplicate Accounts & Bot Exploits',
    content: 'সতর্কতা: কৃত্রিম বট ব্যবহার করে বা এক ডিভাইসে একাধিক অ্যাকাউন্ট তৈরি করে রেফারেল বোনাস নেওয়ার চেষ্টা করলে আমাদের এআই সিকিউরিটি সিস্টেম সরাসরি ডিভাইস ব্যান এবং ব্যালেন্স জব্দ করবে। সৎভাবে নিয়ম মেনে আয় করুন।',
    contentEn: 'Warning: Using artificial bots or running multiple accounts from a single device to exploit referral perks will trigger permanent hardware device bans. Earn honestly according to platform rules.',
    category: 'Security',
    date: '2026-10-04',
    status: 'active',
    priority: 'normal',
    views: 29400,
  },
  {
    id: 'not-04',
    title: 'উইকেন্ড ডাবল এফএসডি (FSD) বোনাস বুস্টার ক্যাম্পেইন সমাপ্ত ঘোষণা',
    titleEn: 'Weekend Double FSD Bonus Booster Campaign Concluded',
    content: 'গত ৫ ও ৬ অক্টোবরের ডাবল পয়েন্ট আর্নিং ক্যাম্পেইনে অংশ নেওয়া সকল সক্রিয় ব্যবহারকারীর অ্যাকাউন্টে অতিরিক্ত FSD বোনাস স্বয়ংক্রিয়ভাবে জমা করা হয়েছে। আগামী ক্যাম্পেইনের জন্য নোটিশ বোর্ডে নজর রাখুন।',
    contentEn: 'The weekend double FSD reward booster campaign has concluded. All qualified points have been credited to participant balances. Stay tuned for upcoming campaigns.',
    category: 'Earning',
    date: '2026-10-02',
    status: 'expired',
    priority: 'normal',
    views: 51200,
  },
  {
    id: 'not-05',
    title: 'সার্ভার ইনফ্রাস্ট্রাকচার আপগ্রেড ও রুটিন মেইনটেন্যান্স সফলভাবে সম্পন্ন',
    titleEn: 'Global Server Infrastructure Upgrade Completed Successfully',
    content: 'আমাদের মূল ক্লাউড সার্ভারের ব্যান্ডউইথ ও ডেটাবেজ অপ্টিমাইজেশন সম্পন্ন হয়েছে। এখন প্ল্যাটফর্মের স্পিড আগের তুলনায় ৩ গুণ দ্রুত কাজ করবে। সাময়িক অসুবিধার জন্য আমরা আন্তরিকভাবে দুঃখিত।',
    contentEn: 'Cloud database optimization and bandwidth expansion completed successfully. The web and mobile platforms now operate 3x faster with ultra-low latency.',
    category: 'System',
    date: '2026-09-28',
    status: 'expired',
    priority: 'normal',
    views: 22800,
  },
];

export const INITIAL_APP_VERSIONS: AppVersion[] = [
  {
    id: 'ver-342',
    versionName: 'v3.4.2 (Latest)',
    versionCode: 342,
    releaseDate: '2026-10-08',
    size: '28.4 MB',
    isLatest: true,
    downloadCount: 1482900,
    minAndroid: 'Android 8.0 (Oreo) and above',
    description: 'Fleearn-এর সবচেয়ে দ্রুততম এবং সবচেয়ে নিরাপদ আর্নিং মোবাইল অ্যাপ। এতে রয়েছে রিয়েল-টাইম টাস্ক ট্র্যাকার, ৩ডি ফ্লুইড অ্যানিমেশন, ইনস্ট্যান্ট নোটিফিকেশন এবং মাল্টি-ওয়ালেট উইথড্রয়াল ইন্টিগ্রেশন।',
    whatsNew: [
      'নতুন হাই-স্পিড ইনস্ট্যান্ট অটো-ক্যাশআউট গেটওয়ে (বিকাশ, নগদ, বাইন্যান্স)',
      'ভয়েস কল, ভিডিও কল এবং অ্যান্ড-টু-অ্যান্ড এনক্রিপ্টেড চ্যাট মডিউল',
      'ড্রপশিপিং ও ডিজিটাল প্রোডাক্ট সেলিং ম্যানেজমেন্ট হাব',
      'নতুন ৩ডি ইন্টারেক্টিভ রিওয়ার্ডস হুইল এবং ডেইলি স্ট্রিক বোনাস',
      'মেমরি এবং ব্যাটারি অপটিমাইজেশন, অ্যাপ সাইজ ৩০% হ্রাস',
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    ],
    apkFileName: 'fleearn-v3.4.2-official-release.apk',
    apkDownloadUrl: 'https://github.com/fleearn-ecosystem/app/releases/download/v3.4.2/fleearn-v3.4.2-official-release.apk',
    status: 'published',
  },
  {
    id: 'ver-330',
    versionName: 'v3.3.0 (Stable)',
    versionCode: 330,
    releaseDate: '2026-09-15',
    size: '26.8 MB',
    isLatest: false,
    downloadCount: 924500,
    minAndroid: 'Android 8.0 and above',
    description: 'স্থিতিশীল পারফরম্যান্স ও উন্নত সিকিউরিটি সমৃদ্ধ সংস্করণ। রেফারেল ট্র্যাকিং ও ডেইলি চেক-ইন রিওয়ার্ড সিস্টেমের প্রথম মেজর ভার্সন।',
    whatsNew: [
      'রেফারেল লিংকের ডিপ-লিংকিং ফিক্স',
      'সার্ভে লোডিং স্পিড ২ গুণ বৃদ্ধি',
      'ডার্ক ও লাইট থিম সুইচিং সুবিধা',
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    ],
    apkFileName: 'fleearn-v3.3.0-stable.apk',
    apkDownloadUrl: 'https://github.com/fleearn-ecosystem/app/releases/download/v3.3.0/fleearn-v3.3.0-stable.apk',
    status: 'published',
  },
  {
    id: 'ver-321',
    versionName: 'v3.2.1 (Legacy)',
    versionCode: 321,
    releaseDate: '2026-08-01',
    size: '25.2 MB',
    isLatest: false,
    downloadCount: 681200,
    minAndroid: 'Android 7.0 and above',
    description: 'পূর্ববর্তী সংস্করণ যা কম কনফিগারেশনের পুরোনো স্মার্টফোনেও ভালো চলে।',
    whatsNew: [
      'পুরোনো অ্যান্ড্রয়েড ফোনে মেমরি লিক সমাধান',
      'এসএসএল পিন সুরক্ষা সংহতকরণ',
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    ],
    apkFileName: 'fleearn-v3.2.1-legacy.apk',
    apkDownloadUrl: 'https://github.com/fleearn-ecosystem/app/releases/download/v3.2.1/fleearn-v3.2.1-legacy.apk',
    status: 'published',
  },
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'crs-01',
    title: 'প্রফেশনাল ভিডিও এডিটিং মাস্টারক্লাস (Premiere Pro & CapCut)',
    titleEn: 'Professional Video Editing Masterclass (Premiere Pro & CapCut)',
    category: 'Creative & Media',
    instructor: 'আহমেদ জুবায়ের (Senior Video Lead)',
    duration: '১৮ ঘণ্টা · ৩৬ লেকচার',
    lessonsCount: 36,
    priceUSD: 24,
    priceFSD: 24,
    rating: 4.9,
    studentsCount: 14200,
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80',
    level: 'Beginner',
  },
  {
    id: 'crs-02',
    title: 'ফুল-স্ট্যাক ফ্রিল্যান্সিং ক্যারিয়ার ব্লুপ্রিন্ট (Fiverr & Upwork)',
    titleEn: 'Full-Stack Freelancing Career Blueprint (Fiverr & Upwork)',
    category: 'Freelancing',
    instructor: 'নাসরিন সুলতানা (Top Rated Freelancer)',
    duration: '২২ ঘণ্টা · ৪৫ লেকচার',
    lessonsCount: 45,
    priceUSD: 30,
    priceFSD: 30,
    rating: 4.95,
    studentsCount: 21800,
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
    level: 'Intermediate',
  },
  {
    id: 'crs-03',
    title: 'আন্তর্জাতিক ড্রপশিপিং ও ইকমার্স অটোমেশন (Shopify to Global)',
    titleEn: 'Global Dropshipping & E-Commerce Automation',
    category: 'E-Commerce',
    instructor: 'রাকিবুল হাসান (Ecom Strategist)',
    duration: '১৫ ঘণ্টা · ৩০ লেকচার',
    lessonsCount: 30,
    priceUSD: 35,
    priceFSD: 35,
    rating: 4.88,
    studentsCount: 9400,
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=600&q=80',
    level: 'Advanced',
  },
  {
    id: 'crs-04',
    title: 'ডিজিটাল মার্কেটিং, সোশ্যাল অ্যাডস ও এআই কনটেন্ট প্রমোশন',
    titleEn: 'Digital Marketing, Meta Ads & AI-Driven Content Generation',
    category: 'Marketing',
    instructor: 'মাহমুদ তানভীর (Growth Marketer)',
    duration: '২০ ঘণ্টা · ৪০ লেকচার',
    lessonsCount: 40,
    priceUSD: 20,
    priceFSD: 20,
    rating: 4.92,
    studentsCount: 18500,
    thumbnail: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?auto=format&fit=crop&w=600&q=80',
    level: 'Beginner',
  },
];

export const INITIAL_PRICING_PLANS: PricingPlan[] = [
  {
    id: 'plan-starter',
    name: 'স্টার্টার বুস্টার প্ল্যান',
    nameEn: 'Starter Booster Plan',
    priceUSD: 10,
    fsdAmount: 10,
    validity: '৩০ দিন ভ্যালিডিটি',
    validityEn: '30 Days Validity',
    badge: 'জনপ্রিয় শুরু',
    popular: false,
    features: [
      'দৈনিক মাইক্রোটাস্কে ২০% অতিরিক্ত FSD পয়েন্ট বোনাস',
      'বিকাশ ও নগদে আনলিমিটেড উইথড্রয়াল প্রসেসিং',
      'প্রাইমারি চ্যাট ও ইমেইল সাপোর্ট এক্সেস',
      'বেসিক ফ্রিল্যান্সিং গাইড বুক ও টিউটোরিয়াল লাইব্রেরি',
      'এক ক্লিকে মোবাইল অ্যাপে অটো-সিঙ্ক',
    ],
  },
  {
    id: 'plan-pro',
    name: 'প্রো আর্নার মেম্বারশিপ',
    nameEn: 'Pro Earner Membership',
    priceUSD: 25,
    fsdAmount: 25,
    validity: '৯০ দিন ভ্যালিডিটি',
    validityEn: '90 Days Validity',
    badge: 'সবচেয়ে জনপ্রিয়',
    popular: true,
    features: [
      'দৈনিক মাইক্রোটাস্কে ৫০% বিশাল বোনাস ইনক্রিমেন্ট',
      'ইনস্ট্যান্ট ৫-মিনিট সুপারফাস্ট ক্যাশআউট (জিরো ট্রানজেকশন ফি)',
      'ড্রপশিপিং ও ডিজিটাল প্রোডাক্ট সেলিং গেটওয়ে এক্সেস',
      'ভিডিও কল ও লাইভ ওয়ান-টু-ওয়ান মেন্টরশিপ সাপোর্ট',
      'রেফারেল আর্নিংয়ে এক্সক্লুসিভ ১৫% লাইফটাইম শেয়ারিং',
      'ফুল মোবাইল অ্যাপ প্রিমিয়াম আনলক',
    ],
  },
  {
    id: 'plan-elite',
    name: 'এলিট বিজ এন্টারপ্রাইজ',
    nameEn: 'Elite Biz Enterprise',
    priceUSD: 60,
    fsdAmount: 60,
    validity: 'আজীবন লাইফটাইম',
    validityEn: 'Lifetime Access',
    badge: 'আজীবন মেয়াদ',
    popular: false,
    features: [
      '১০০% ডাবল রিওয়ার্ডস ও ভিআইপি প্রিমিয়াম টাস্ক লিস্ট',
      'আন্তর্জাতিক মাল্টি-ওয়ালেট (Binance, RedotPay, Payoneer) আনলিমিটেড ফ্রি',
      'Fleearn সব প্রিমিয়াম কোর্সে ফ্রি আজীবন এক্সেস',
      'ডেডিকেটেড ২৪/৭ ভিআইপি অ্যাকাউন্ট ম্যানেজার',
      'মার্কেটপ্লেসে ভেরিফাইড মার্চেন্ট ব্লু ব্যাজ স্ট্যাটাস',
      'সর্বোচ্চ ক্যাশআউট লিমিট ও প্রায়োরিটি রিকোয়েস্ট',
    ],
  },
];

export const INITIAL_PLATFORM_STATS: PlatformStats = {
  totalUsers: 1482930,
  activeUsers: 842150,
  bannedAccounts: 14290,
  totalTransactionsUSD: 48920400,
  totalTransactionsFSD: 48920400,
};

export const INITIAL_COMPANY_INFO: CompanyInfo = {
  name: 'Fleearn Technologies Ltd.',
  tagline: 'Earn your way — The Premier Digital Earning Ecosystem',
  email: 'contact@fleearn.com',
  webAddress: 'https://fleearn.com',
  address: 'Level 14, Navana Tower, 48 Gulshan Avenue, Gulshan-1, Dhaka-1212, Bangladesh & Dubai Silicon Oasis, UAE',
  phone: '+880 1800-FLEARN (+880 1800-353276)',
  aboutParagraphBn: 'Fleearn একটি আধুনিক ও নির্ভরযোগ্য গ্লোবাল আর্নিং প্ল্যাটফর্ম। আমাদের মূল লক্ষ্য হলো প্রযুক্তির সর্বোচ্চ ব্যবহারের মাধ্যমে যে কোনো সাধারণ মানুষের জন্য ঘরে বসে সৎ ও মর্যাদাপূর্ণ উপায়ে আয় করার অবারিত সুযোগ তৈরি করা। মোবাইল মাইক্রোটাস্ক, ড্রপশিপিং, ফ্রিল্যান্সিং দক্ষতা উন্নয়ন থেকে শুরু করে নিরাপদ ইনস্ট্যান্ট পেমেন্ট গেটওয়ের সমন্বয়ে Fleearn তৈরি করেছে একটি সম্পূর্ণ স্বয়ংসম্পূর্ণ ডিজিটাল ইকোসিস্টেম। বিশ্বের লাখো তরুণ এখন তাদের মেধা ও সময়কে সম্পদে রূপান্তর করতে বেছে নিয়েছে Fleearn — Earn your way।',
  aboutParagraphEn: 'Fleearn is an advanced, ultra-secure global earning ecosystem engineered to empower everyday individuals with legitimate, dignified digital income opportunities. From AI-assisted microtasks, skill freelancing, and dropshipping pipelines to instant multi-wallet payment infrastructure, Fleearn is built to turn human potential into financial freedom. Join over a million verified members discovering their unique earning pathway with Fleearn — Earn your way.',
  socials: {
    youtube: 'https://youtube.com/@fleearn',
    facebook: 'https://facebook.com/fleearnofficial',
    instagram: 'https://instagram.com/fleearn_app',
    pinterest: 'https://pinterest.com/fleearn',
    telegram: 'https://t.me/fleearn_global',
    twitter: 'https://twitter.com/fleearn',
  },
};

export const INITIAL_IMPORTANT_DOCS: ImportantDoc[] = [
  {
    id: 'doc-terms',
    titleBn: 'টার্মস অ্যান্ড কন্ডিশনস (ব্যবহারের শর্তাবলী)',
    titleEn: 'Terms and Conditions of Service',
    lastUpdated: '2026-10-01',
    contentBn: `১. চুক্তি ও স্বীকৃতি: Fleearn প্ল্যাটফর্ম (ওয়েবসাইট, মোবাইল অ্যাপ্লিকেশন এবং সংশ্লিষ্ট পরিষেবাসমূহ) ব্যবহারের মাধ্যমে আপনি নিশ্চিত করছেন যে আপনার বয়স কমপক্ষে ১৮ বছর অথবা আপনার অভিভাবকের বৈধ সম্মতি রয়েছে এবং আপনি এই ব্যবহারের শর্তাবলীর প্রতি পূর্ণাঙ্গ সম্মতি জ্ঞাপন করছেন।

২. অ্যাকাউন্ট নিরাপত্তা ও একক ব্যবহার: প্রতিটি ব্যবহারকারী কেবল একটি বৈধ ব্যক্তিগত অ্যাকাউন্ট তৈরি করতে পারবেন। বট, স্ক্রিপ্ট, প্রক্সি, ভিপিএন বা একই ডিভাইসে একাধিক অ্যাকাউন্ট তৈরি করে কৃত্রিম বোনাস দাবি করা কঠোরভাবে নিষিদ্ধ। এমন কোনো প্রতারণামূলক কার্যকলাপ চিহ্নিত হলে সংশ্লিষ্ট সমস্ত অ্যাকাউন্ট অবিলম্বে স্থায়ীভাবে বন্ধ এবং ব্যালেন্স বাজেয়াপ্ত করা হবে।

৩. আয়ের শর্ত ও অনুমোদন: সম্পন্নকৃত প্রতিটি টাস্ক এবং সার্ভে যাচাইকরণ সাপেক্ষ। বিজ্ঞাপনদাতা বা প্ল্যাটফর্ম অ্যালগরিদম দ্বারা টাস্ক রিজেক্ট হলে কোনো অর্থ প্রদান করা হবে না। Fleearn কোনো নির্দিষ্ট আয়ের গ্যারান্টি দেয় না; আয় সম্পূর্ণরূপে ব্যবহারকারীর নিষ্ঠা, দক্ষতা এবং টাস্কের প্রাপ্যতার ওপর নির্ভরশীল।

৪. পেমেন্ট ও উত্তোলন নীতি: শুধুমাত্র অনুমোদিত ও যাচাইকৃত ওয়ালেটে অর্থ উত্তোলন করা যাবে। தவறಾದ অ্যাকাউন্ট নম্বর প্রদানের দায়ভার সম্পূর্ণরূপে ব্যবহারকারীর। প্রসেসিং সময় সাধারণ ক্ষেত্রে ৫ মিনিট থেকে সর্বোচ্চ ২৪ ঘণ্টার মধ্যে সম্পন্ন হবে।

৫. মেধা সম্পদ অধিকার: Fleearn-এর ট্রেডমার্ক, লোগো, কোডবেস এবং কন্টেন্ট আন্তর্জাতিক কপিরাইট আইনের অধীনে সংরক্ষিত। কোনো অননুমোদিত অনুলিপি বা রিভার্স ইঞ্জিনিয়ারিং আইনি পদক্ষেপের আওতাভুক্ত হবে।`,
    contentEn: `1. Acceptance of Terms: By accessing Fleearn, you affirm that you are at least 18 years old or possess legal parental consent and agree to be bounded by these operating terms.

2. Account Integrity & Single User Rule: One verified account per individual. The use of bots, emulators, rotating proxies, or creating multiple accounts to farm bonuses is strictly prohibited and results in immediate permanent device bans.

3. Task Validation & Earnings: Tasks and survey rewards are subject to advertiser verification. Fleearn does not guarantee static returns; earnings depend strictly on activity, quality, and market demand.

4. Withdrawals: Payouts are dispatched to user-verified payment coordinates. Processing windows range between 5 minutes and 24 hours depending on network security checks.

5. Intellectual Property: All software, designs, algorithms, and branding belong exclusively to Fleearn Technologies Ltd.`,
  },
  {
    id: 'doc-privacy',
    titleBn: 'প্রাইভেসি পলিসি (গোপনীয়তা নীতিমালা)',
    titleEn: 'Global Privacy Policy',
    lastUpdated: '2026-10-01',
    contentBn: `১. সংগৃহীত তথ্যাবলী: অ্যাকাউন্ট তৈরির সময় আপনার নাম, মোবাইল নম্বর, ইমেইল ঠিকানা, আইপি অ্যাড্রেস এবং ডিভাইসের প্রযুক্তিগত শনাক্তকারী তথ্য সংগৃহীত হতে পারে। উত্তোলনের ক্ষেত্রে ভেরিফিকেশন পরিচয়পত্রের কপি প্রয়োজন হতে পারে।

২. তথ্যের নিরাপত্তা ও এনক্রিপশন: আপনার সমস্ত সংবেদনশীল ডেটা ব্যাংকিং-গ্রেড SSL 256-bit এনক্রিপশন এবং ফায়ারওয়াল প্রটেকশনের মাধ্যমে সংরক্ষিত থাকে। পাসওয়ার্ড কোনো অবস্থাতেই সাধারণ টেক্সট আকারে থাকে না, বরং অপরিবর্তনীয় ক্রিপ্টোগ্রাফিক হ্যাশ (Bcrypt) আকারে সুরক্ষিত থাকে।

৩. তৃতীয় পক্ষের সাথে তথ্য আদান-প্রদান: আমরা কোনো অবস্থাতেই বিজ্ঞাপন সংস্থা বা বহিরাগত মার্কেটিং কোম্পানির কাছে ব্যবহারকারীর ব্যক্তিগত তথ্য বিক্রি করি না। শুধুমাত্র আইনগত বাধ্যবাধকতা এবং পেমেন্ট গেটওয়ের লেনদেন সম্পন্নের জন্য প্রয়োজনীয় তথ্য আদান-প্রদান করা হয়।

৪. কুকিজ ও সেশন ট্র্যাকিং: নিরাপদ লগইন সেশন পরিচালনা এবং ব্রাউজিং অভিজ্ঞতা উন্নত করতে কুকিজ ব্যবহার করা হয়। আপনি চাইলে ব্রাউজার সেটিংসে কুকিজ নিয়ন্ত্রণ করতে পারেন।

৫. ডেটা ডিলিট করার অধিকার: যে কোনো ব্যবহারকারী উপযুক্ত প্রমাণসহ আমাদের ডেটা প্রাইভেসি অফিসারের কাছে অ্যাকাউন্ট ও ব্যক্তিগত তথ্য স্থায়ীভাবে মুছে ফেলার আবেদন করতে পারেন।`,
    contentEn: `1. Information We Collect: Name, email, mobile number, IP address, and telemetry data required for account security and payout validation.

2. Encryption & Storage: We enforce enterprise SSL 256-bit data transit encryption and cryptographic password hashing (Bcrypt).

3. Zero Commercial Reselling: We strictly never sell your personal contact information to third-party ad brokers.

4. User Rights: Users retain the right to inspect their stored profile data and submit full data deletion requests under standard privacy frameworks.`,
  },
  {
    id: 'doc-usage',
    titleBn: 'ইউজ পলিসি ও আচরণবিধি (ব্যবহার নীতিমালা)',
    titleEn: 'Platform Fair Use & Community Guidelines',
    lastUpdated: '2026-10-01',
    contentBn: `১. পারস্পরিক শ্রদ্ধা ও সম্মান: চ্যাটিং, ভয়েস কল বা কমিউনিটি ফোরামে কোনো প্রকার অশালীন, হিংসাত্মক, ধর্মীয় বিদ্বেষমূলক বা অপমানজনক ভাষা ব্যবহার করা যাবে না।

২. স্প্যামিং ও মিথ্যা প্রচার নিষিদ্ধ: প্ল্যাটফর্মের বাইরে সামাজিক যোগাযোগমাধ্যমে Fleearn-এর নাম ব্যবহার করে মিথ্যা প্রতিশ্রুতি দিয়ে মানুষকে প্রলুব্ধ করা বা রেফারেল লিংকের স্প্যামিং করা যাবে না।

৩. ড্রপশিপিং ও পণ্য বিক্রয়ের নিয়ম: কোনো প্রকার নিষিদ্ধ, ক্ষতিকারক, জাল বা কপিরাইট লঙ্ঘিত পণ্য Fleearn মার্চেন্ট হাব বা ড্রপশিপিং সিস্টেমে লিস্টিং করা যাবে না।

৪. সিস্টেমের দুর্বলতা রিপোর্ট করা: প্ল্যাটফর্মে কোনো টেকনিক্যাল বাগ বা ত্রুটি নজরে আসলে তা অবিলম্বে অ্যাডমিনকে জানাতে হবে। কোনো ত্রুটির সুযোগ নিয়ে অবৈধ অর্থ আয় করার চেষ্টা ফৌজদারি অপরাধ হিসেবে গণ্য হবে।`,
    contentEn: `1. Community Decorum: Zero tolerance for hate speech, harassment, fraud, or inappropriate conduct in chat and voice rooms.

2. Anti-Spam: Misleading claims or invasive spam distribution of referral links is strictly prohibited.

3. Merchant Standards: Counterfeit, hazardous, or unlicensed items are barred from the dropshipping marketplace.

4. Responsible Bug Disclosure: Any system vulnerabilities must be reported through official bounty channels; exploitation is strictly punished.`,
  },
  {
    id: 'doc-withdrawal',
    titleBn: 'উইথড্রয়াল ও আর্থিক নীতিমালা (টাকা উত্তোলনের নিয়মাবলী)',
    titleEn: 'Withdrawal & Financial Compliance Policy',
    lastUpdated: '2026-10-01',
    contentBn: `১. সর্বনিম্ন উত্তোলন সীমা: বিকাশ ও নগদে সর্বনিম্ন ১০০ টাকা (১ FSD), ক্রিপ্টোকারেন্সিতে (Binance USDT) সর্বনিম্ন ৫ FSD এবং ব্যাংক ট্রান্সফারে সর্বনিম্ন ২০ FSD উত্তোলন করা যাবে।

২. উত্তোলন সময়সূচী: স্বয়ংক্রিয় গেটওয়েতে সার্বক্ষণিক (২৪/৭) উত্তোলন অনুরোধ গ্রহণ করা হয়। কোনো টেকনিক্যাল জটিলতা না থাকলে ৫-১৫ মিনিটে টাকা পৌঁছাবে।

৩. ট্রানজেকশন ফি: স্টার্টার বা সাধারণ ক্ষেত্রে সংশ্লিষ্ট পেমেন্ট অপারেটরের স্ট্যান্ডার্ড ক্যাশআউট চার্জ প্রযোজ্য হতে পারে। প্রো ও এলিট প্ল্যানের ব্যবহারকারীদের জন্য প্ল্যাটফর্ম ফি সম্পূর্ণ ফ্রি।

৪. রিভার্সাল নীতি: ভুল অ্যাকাউন্ট নম্বর দিলে ট্রানজেকশন কমপ্লিট হয়ে গেলে তা ফেরত আনা সম্ভব নয়। অতএব সাবমিটের পূর্বে নম্বর পুনরায় যাচাই করুন।`,
    contentEn: `1. Minimum Limits: Mobile banking thresholds start at $1 FSD; crypto thresholds start at $5 FSD; bank wire minimums start at $20 FSD.

2. Processing Windows: Automated channels operate 24/7 with 5-15 minute average settlement times.

3. Fee Schedule: Standard gateway charges apply to basic tiers, waived for Pro and Elite subscribers.`,
  },
];
