import { Language } from '../types/fleearn';

export interface Translations {
  nav: {
    home: string;
    notice: string;
    app: string;
    features: string;
    pricing: string;
    gallery: string;
    documents: string;
    faq: string;
    about: string;
    discover: string;
    opportunity: string;
  };
  common: {
    brandName: string;
    tagline: string;
    downloadApp: string;
    installNow: string;
    buyNow: string;
    readMore: string;
    viewAll: string;
    latest: string;
    active: string;
    expired: string;
    versions: string;
    whatsNew: string;
    downloads: string;
    searchPlaceholder: string;
    submit: string;
    sending: string;
    success: string;
    darkMode: string;
    lightMode: string;
    serviceClosed: string;
    noOpportunity: string;
    secretAdminPrompt: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    getStarted: string;
    exploreFeatures: string;
    latestNoticeTitle: string;
    latestAppTitle: string;
    latestCourseTitle: string;
    statsTitle: string;
    totalUsers: string;
    activeUsers: string;
    bannedAccounts: string;
    totalTransactions: string;
    supportTitle: string;
    reportTitle: string;
    contactTitle: string;
    supportSubtitle: string;
    reportSubtitle: string;
    contactSubtitle: string;
    fullName: string;
    emailAddress: string;
    noteMessage: string;
    subject: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  bn: {
    nav: {
      home: 'মূল পেজ',
      notice: 'নোটিশ',
      app: 'মোবাইল অ্যাপ',
      features: 'ফিচারস',
      pricing: 'প্রাইজিং',
      gallery: 'গ্যালারি',
      documents: 'গুরুত্বপূর্ণ ডকুমেন্টস',
      faq: 'FAQ',
      about: 'আমাদের সম্পর্কে',
      discover: 'ডিসকভার',
      opportunity: 'অপরচুনিটি',
    },
    common: {
      brandName: 'Fleearn',
      tagline: 'Earn your way — আপনার উপায়ে আয় করুন',
      downloadApp: 'অ্যাপ ডাউনলোড করুন',
      installNow: 'ইন্সটল করুন',
      buyNow: 'Buy Now',
      readMore: 'বিস্তারিত দেখুন',
      viewAll: 'সবগুলো দেখুন',
      latest: 'লেটেস্ট ও সক্রিয়',
      active: 'সক্রিয়',
      expired: 'প্রিভিয়াস / এক্সপায়ার্ড',
      versions: 'ভার্সনস',
      whatsNew: 'হটস নিউ (What’s New)',
      downloads: 'মোট ডাউনলোড',
      searchPlaceholder: 'সার্চ করুন...',
      submit: 'সাবমিট করুন',
      sending: 'পাঠানো হচ্ছে...',
      success: 'আপনার তথ্য সফলভাবে জমা হয়েছে!',
      darkMode: 'ডার্ক মোড',
      lightMode: 'লাইট মোড',
      serviceClosed: 'এই সার্ভিস বর্তমানে বন্ধ রয়েছে।',
      noOpportunity: 'বর্তমানে কোন অপরচুনিটি উপলব্ধ নেই অপরচুনিটিতে অ্যাক্সেস পেতে সব সময় এই পেজটি চেক করুন।',
      secretAdminPrompt: 'এডমিন ভেরিফিকেশন এমসিকিউ',
    },
    home: {
      heroTitle: 'ডিজিটাল আয়ের নতুন দিগন্ত Fleearn এ',
      heroSubtitle: 'স্মার্টফোন বা কম্পিউটার দিয়ে আকর্ষণীয় উপায়ে আনলিমিটেড আয় করুন। দ্রুত উইথড্র, প্রিমিয়াম স্কিলস এবং স্বয়ংসম্পূর্ণ ৩ডি আর্নিং ইকোসিস্টেম।',
      getStarted: 'এখনই শুরু করুন',
      exploreFeatures: 'ফিচারসমূহ দেখুন',
      latestNoticeTitle: 'লেটেস্ট নোটিশ বোর্ড',
      latestAppTitle: 'অফিসিয়াল মোবাইল আর্নিং অ্যাপ',
      latestCourseTitle: 'প্রিমিয়াম স্কিল ও আর্নিং কোর্স',
      statsTitle: 'লাইভ প্ল্যাটফর্ম পরিসংখ্যান ও ট্রান্সপারেন্সি',
      totalUsers: 'মোট ব্যবহারকারী',
      activeUsers: 'সক্রিয় ব্যবহারকারী',
      bannedAccounts: 'ব্যানকৃত অ্যাকাউন্ট',
      totalTransactions: 'মোট ট্রানজেকশন (FSD)',
      supportTitle: '২৪/৭ গ্রাহক সাপোর্ট বক্স',
      reportTitle: 'ফ্রড ও সিকিউরিটি রিপোর্ট বক্স',
      contactTitle: 'সরাসরি যোগাযোগ করুন',
      supportSubtitle: 'যে কোনো সমস্যা বা প্রশ্নের জন্য আমাদের বিশেষজ্ঞ টিমের সহায়তা নিন।',
      reportSubtitle: 'প্ল্যাটফর্মের স্বচ্ছতা বজায় রাখতে কোনো প্রতারণা বা ত্রুটি রিপোর্ট করুন।',
      contactSubtitle: 'ব্যবসায়িক অংশীদারিত্ব বা সাধারণ তথ্যের জন্য বার্তা পাঠান।',
      fullName: 'আপনার পূর্ণ নাম',
      emailAddress: 'ইমেইল এড্রেস',
      noteMessage: 'আপনার নোট বা বিস্তারিত বার্তা',
      subject: 'বিষয়',
    },
  },
  en: {
    nav: {
      home: 'Home',
      notice: 'Notice',
      app: 'Mobile App',
      features: 'Features',
      pricing: 'Pricing',
      gallery: 'Gallery',
      documents: 'Documents',
      faq: 'FAQ',
      about: 'About Us',
      discover: 'Discover',
      opportunity: 'Opportunity',
    },
    common: {
      brandName: 'Fleearn',
      tagline: 'Earn your way — Digital Earning Platform',
      downloadApp: 'Download App',
      installNow: 'Install Now',
      buyNow: 'Buy Now',
      readMore: 'Read More',
      viewAll: 'View All',
      latest: 'Latest & Active',
      active: 'Active',
      expired: 'Previous / Expired',
      versions: 'All Versions',
      whatsNew: 'What’s New',
      downloads: 'Total Downloads',
      searchPlaceholder: 'Search anything...',
      submit: 'Submit Now',
      sending: 'Submitting...',
      success: 'Submitted successfully!',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      serviceClosed: 'This service is currently closed.',
      noOpportunity: 'There are currently no opportunities available. Check back frequently for updates.',
      secretAdminPrompt: 'Admin Verification MCQ',
    },
    home: {
      heroTitle: 'Redefine Digital Income With Fleearn',
      heroSubtitle: 'Earn your way through microtasks, skill freelancing, dropshipping, and high-speed multi-wallet payouts.',
      getStarted: 'Get Started',
      exploreFeatures: 'Explore Features',
      latestNoticeTitle: 'Official Notice Board',
      latestAppTitle: 'Official Mobile App',
      latestCourseTitle: 'Skill & Career Courses',
      statsTitle: 'Platform Transparency & Live Statistics',
      totalUsers: 'Total Users',
      activeUsers: 'Active Users',
      bannedAccounts: 'Banned Accounts',
      totalTransactions: 'Total Transactions (FSD)',
      supportTitle: '24/7 Support Desk',
      reportTitle: 'Security & Abuse Report',
      contactTitle: 'Corporate Inquiries',
      supportSubtitle: 'Reach our dedicated engineering and account resolution teams anytime.',
      reportSubtitle: 'Help preserve platform integrity by flagging suspicious activity.',
      contactSubtitle: 'Send corporate inquiries and institutional partnership notes.',
      fullName: 'Full Name',
      emailAddress: 'Email Address',
      noteMessage: 'Your Message / Inquiry Note',
      subject: 'Subject',
    },
  },
  ru: {
    nav: {
      home: 'Главная',
      notice: 'Уведомления',
      app: 'Мобильное приложение',
      features: 'Функции',
      pricing: 'Тарифы',
      gallery: 'Галерея',
      documents: 'Документы',
      faq: 'FAQ',
      about: 'О нас',
      discover: 'Обзор',
      opportunity: 'Возможности',
    },
    common: {
      brandName: 'Fleearn',
      tagline: 'Earn your way — Зарабатывайте по-своему',
      downloadApp: 'Скачать приложение',
      installNow: 'Установить',
      buyNow: 'Купить сейчас',
      readMore: 'Подробнее',
      viewAll: 'Смотреть все',
      latest: 'Актуальные',
      active: 'Активно',
      expired: 'Архивные',
      versions: 'Версии',
      whatsNew: 'Что нового',
      downloads: 'Загрузок',
      searchPlaceholder: 'Поиск...',
      submit: 'Отправить',
      sending: 'Отправка...',
      success: 'Успешно отправлено!',
      darkMode: 'Темная тема',
      lightMode: 'Светлая тема',
      serviceClosed: 'Этот сервис в настоящее время закрыт.',
      noOpportunity: 'В настоящее время возможностей нет. Регулярно проверяйте эту страницу.',
      secretAdminPrompt: 'Проверка администратора',
    },
    home: {
      heroTitle: 'Новая эпоха цифрового заработка с Fleearn',
      heroSubtitle: 'Зарабатывайте через микрозадачи, дропшиппинг и получайте мгновенные выплаты на электронные кошельки.',
      getStarted: 'Начать сейчас',
      exploreFeatures: 'Возможности',
      latestNoticeTitle: 'Официальные уведомления',
      latestAppTitle: 'Мобильное приложение',
      latestCourseTitle: 'Обучающие курсы',
      statsTitle: 'Статистика платформы в реальном времени',
      totalUsers: 'Всего пользователей',
      activeUsers: 'Активные пользователи',
      bannedAccounts: 'Заблокированные аккаунты',
      totalTransactions: 'Общий объем транзакций (FSD)',
      supportTitle: 'Служба поддержки 24/7',
      reportTitle: 'Отчет о безопасности',
      contactTitle: 'Контакты',
      supportSubtitle: 'Круглосуточная поддержка пользователей.',
      reportSubtitle: 'Сообщите о подозрительной активности.',
      contactSubtitle: 'Свяжитесь с нами по вопросам сотрудничества.',
      fullName: 'Ваше имя',
      emailAddress: 'Электронная почта',
      noteMessage: 'Сообщение',
      subject: 'Тема',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      notice: 'الإشعارات',
      app: 'تطبيق الهاتف',
      features: 'المميزات',
      pricing: 'الأسعار',
      gallery: 'المعرض',
      documents: 'المستندات',
      faq: 'الأسئلة الشائعة',
      about: 'من نحن',
      discover: 'استكشف',
      opportunity: 'الفرص',
    },
    common: {
      brandName: 'Fleearn',
      tagline: 'Earn your way — اربح بطريقتك الخاصة',
      downloadApp: 'تحميل التطبيق',
      installNow: 'تثبيت الآن',
      buyNow: 'اشتر الآن',
      readMore: 'قراءة المزيد',
      viewAll: 'عرض الكل',
      latest: 'الأحدث والنشط',
      active: 'نشط',
      expired: 'السابق / منتهي',
      versions: 'الإصدارات',
      whatsNew: 'ما الجديد',
      downloads: 'إجمالي التنزيلات',
      searchPlaceholder: 'بحث...',
      submit: 'إرسال الآن',
      sending: 'جارٍ الإرسال...',
      success: 'تم الإرسال بنجاح!',
      darkMode: 'الوضع الداكن',
      lightMode: 'الوضع الفاتح',
      serviceClosed: 'هذه الخدمة مغلقة حاليًا.',
      noOpportunity: 'لا توجد فرص متاحة حالياً. يرجى التحقق من هذه الصفحة باستمرار.',
      secretAdminPrompt: 'اختبار مصادقة المسؤول',
    },
    home: {
      heroTitle: 'آفاق جديدة للدخل الرقمي مع Fleearn',
      heroSubtitle: 'اربح بطريقتك الخاصة من خلال المهام المصغرة والعمل الحر والسحب الفوري للمحافظ الإلكترونية.',
      getStarted: 'ابدأ الآن',
      exploreFeatures: 'استكشف المميزات',
      latestNoticeTitle: 'لوحة الإشعارات الرسمية',
      latestAppTitle: 'تطبيق الهاتف المحمول',
      latestCourseTitle: 'الدورات التدريبية المتميزة',
      statsTitle: 'إحصائيات المنصة الحية والشفافية',
      totalUsers: 'إجمالي المستخدمين',
      activeUsers: 'المستخدمون النشطون',
      bannedAccounts: 'الحسابات المحظورة',
      totalTransactions: 'إجمالي المعاملات (FSD)',
      supportTitle: 'صندوق الدعم الفني 24/7',
      reportTitle: 'صندوق البلاغات والأمان',
      contactTitle: 'تواصل معنا مباشرة',
      supportSubtitle: 'احصل على مساعدة فريقنا المتخصص في أي وقت.',
      reportSubtitle: 'أبلغ عن أي انتهاك للحفاظ على نزاهة المنصة.',
      contactSubtitle: 'أرسل استفساراتك التجارية وشراكات العمل.',
      fullName: 'الاسم الكامل',
      emailAddress: 'البريد الإلكتروني',
      noteMessage: 'رسالتك أو ملاحظتك',
      subject: 'الموضوع',
    },
  },
};
