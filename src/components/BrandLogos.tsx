import React from 'react';

export const BrandLogos = {
  // bKash (বিকাশ) - Authentic Official Brand Logo
  bKash: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="120" height="120" rx="24" fill="#E2136E" />
      {/* Official bKash Bird Origami Silhouette */}
      <path d="M63 26L86 48L50 64L63 26Z" fill="#FFFFFF" />
      <path d="M30 46L50 64L28 88L30 46Z" fill="#FFFFFF" />
      <path d="M50 64L94 69L71 93L50 64Z" fill="#FFFFFF" />
      <path d="M42 95L50 64L71 93L42 95Z" fill="#FFFFFF" opacity="0.9" />
    </svg>
  ),

  // Nagad (নগদ) - Authentic Official Brand Logo
  Nagad: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="120" height="120" rx="24" fill="#F7941D" />
      <circle cx="60" cy="60" r="38" fill="#ED1C24" />
      <circle cx="60" cy="60" r="26" fill="#FFFFFF" />
      <path d="M52 42C52 38.6863 54.6863 36 58 36H62C65.3137 36 68 38.6863 68 42V78C68 81.3137 65.3137 84 62 84H58C54.6863 84 52 81.3137 52 78V42Z" fill="#F7941D" />
      <circle cx="60" cy="60" r="10" fill="#ED1C24" />
    </svg>
  ),

  // Rocket (রকেট - DBBL Mobile Banking)
  Rocket: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="120" height="120" rx="24" fill="#8C3494" />
      <path d="M60 24L78 56L68 56L68 88L52 88L52 56L42 56L60 24Z" fill="#FFFFFF" />
      <path d="M42 66L28 80L42 80L42 66Z" fill="#F49022" />
      <path d="M78 66L92 80L78 80L78 66Z" fill="#F49022" />
      <circle cx="60" cy="46" r="5" fill="#8C3494" />
    </svg>
  ),

  // Upay (উপায় - UCB)
  Upay: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="120" height="120" rx="24" fill="#005B94" />
      <path d="M38 34V64C38 76.15 47.85 86 60 86C72.15 86 82 76.15 82 64V34H68V64C68 68.42 64.42 72 60 72C55.58 72 52 68.42 52 64V34H38Z" fill="#FFC80A" />
      <circle cx="60" cy="24" r="6" fill="#FFC80A" />
    </svg>
  ),

  // CellFin (সেলফিন - IBBL)
  CellFin: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="120" height="120" rx="24" fill="#00843D" />
      <path d="M42 38H78C82 38 85 41 85 45V75C85 79 82 82 78 82H42C38 82 35 79 35 75V45C35 41 38 38 42 38Z" stroke="#FFFFFF" strokeWidth="7" rx="6" />
      <path d="M50 60L57 67L70 52" stroke="#FFD100" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  // Sky Banking (স্কাই ব্যাংকিং - EBL)
  SkyBanking: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="120" height="120" rx="24" fill="#0066B2" />
      <path d="M30 68C30 51.43 43.43 38 60 38C76.57 38 90 51.43 90 68H30Z" fill="#FFFFFF" />
      <circle cx="60" cy="54" r="8" fill="#ED1C24" />
      <path d="M38 76H82V84H38V76Z" fill="#FDB913" rx="2" />
    </svg>
  ),

  // Binance (বাইন্যান্স) - Official Binance Diamond Logo
  Binance: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="120" height="120" rx="24" fill="#181A20" />
      <path d="M60 22L71.5 33.5L46.5 58.5L35 47L60 22Z" fill="#F3BA2F" />
      <path d="M85 47L96.5 58.5L85 70L73.5 58.5L85 47Z" fill="#F3BA2F" />
      <path d="M60 96L35 71L46.5 59.5L71.5 84.5L60 96Z" fill="#F3BA2F" />
      <path d="M60 43L71.5 54.5L60 66L48.5 54.5L60 43Z" fill="#F3BA2F" />
      <path d="M77 39L88.5 50.5L77 62L65.5 50.5L77 39Z" fill="#F3BA2F" />
      <path d="M43 78L54.5 66.5L43 55L31.5 66.5L43 78Z" fill="#F3BA2F" />
    </svg>
  ),

  // RedotPay
  RedotPay: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="120" height="120" rx="24" fill="#E50914" />
      <path d="M36 36H68C78 36 86 44 86 54C86 64 78 72 68 72H50V86H36V36ZM50 60H66C69.3 60 72 57.3 72 54C72 50.7 69.3 48 66 48H50V60Z" fill="#FFFFFF" />
      <circle cx="82" cy="38" r="6" fill="#FFFFFF" />
    </svg>
  ),

  // Payoneer (পেয়োনিয়ার)
  Payoneer: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="120" height="120" rx="24" fill="#111111" />
      <circle cx="60" cy="60" r="34" stroke="#FF4800" strokeWidth="10" />
      <circle cx="60" cy="60" r="18" fill="#FFFFFF" />
    </svg>
  ),

  // PhonePe (ফোনপে)
  PhonePe: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="120" height="120" rx="24" fill="#5F259F" />
      <circle cx="60" cy="60" r="42" fill="#FFFFFF" opacity="0.1" />
      <path d="M54 36V84M54 50H70C76 50 82 55 82 61C82 67 76 72 70 72H54" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  // Google Play
  GooglePlay: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="120" height="120" rx="24" fill="#202124" />
      <path d="M34 31L65 62L34 93V31Z" fill="#00E676" />
      <path d="M77 50L34 31L65 62L77 50Z" fill="#00B0FF" />
      <path d="M34 93L77 74L65 62L34 93Z" fill="#FF3D00" />
      <path d="M86 62L77 50L65 62L77 74L86 62Z" fill="#FFD600" />
    </svg>
  ),

  // YouTube - Official Red Logo
  YouTube: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="#FF0000" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),

  // Facebook - Official Blue Logo
  Facebook: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),

  // WhatsApp - Official Green Logo
  WhatsApp: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12.031 2C6.495 2 2 6.494 2 12.03c0 1.905.534 3.687 1.458 5.215L2.094 22l4.896-1.285A9.972 9.972 0 0 0 12.03 22c5.537 0 10.031-4.494 10.031-10.03 0-5.536-4.494-10.03-10.03-10.03zm5.838 14.17c-.244.686-1.226 1.313-1.706 1.378-.456.061-1.036.088-3.342-.865-2.756-1.139-4.52-3.95-4.658-4.133-.138-.184-1.11-1.478-1.11-2.817 0-1.34.701-1.998.948-2.256.248-.258.542-.323.722-.323.18 0 .362.002.52.01.17.009.397-.064.62.473.23.555.78 1.904.85 2.043.07.139.115.302.023.486-.093.184-.139.298-.277.458-.138.16-.29.358-.415.48-.138.136-.282.285-.121.562.161.277.717 1.182 1.54 1.916 1.058.944 1.95 1.236 2.227 1.374.277.138.438.115.6-.07.161-.184.69-804.874-1.08.184-.277.368-.23.621-.138.253.092 1.61 1.76 1.886 1.852.276.092.46.138.528.253.07.115.07.667-.174 1.353z"/>
    </svg>
  ),

  // Telegram - Official Blue Paper Plane Logo
  Telegram: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="#26A5E4" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  ),

  // Instagram - Official Gradient Camera Logo
  Instagram: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="24" height="24" rx="6" fill="url(#ig-grad)" />
      <path d="M12 7.027c-2.742 0-4.973 2.231-4.973 4.973 0 2.742 2.231 4.973 4.973 4.973 2.742 0 4.973-2.231 4.973-4.973 0-2.742-2.231-4.973-4.973-4.973zm0 8.219c-1.793 0-3.246-1.453-3.246-3.246 0-1.793 1.453-3.246 3.246-3.246 1.793 0 3.246 1.453 3.246 3.246 0 1.793-1.453 3.246-3.246 3.246zm6.33-8.397a1.162 1.162 0 1 1-2.324 0 1.162 1.162 0 0 1 2.324 0zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm6.98 13.98a3.02 3.02 0 0 1-3.02 3.02H8.04a3.02 3.02 0 0 1-3.02-3.02V8.04a3.02 3.02 0 0 1 3.02-3.02h7.92a3.02 3.02 0 0 1 3.02 3.02v7.94z" fill="#FFFFFF" />
      <defs>
        <linearGradient id="ig-grad" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FED576" />
          <stop offset="0.26" stopColor="#F47133" />
          <stop offset="0.61" stopColor="#BC3081" />
          <stop offset="1" stopColor="#4C63D2" />
        </linearGradient>
      </defs>
    </svg>
  ),

  // Twitter / X - Official Monochrome Logo
  Twitter: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),

  // Pinterest - Official Red Logo
  Pinterest: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="#E60023" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 0a12 12 0 0 0-4.37 23.18c-.06-.98-.12-2.48.02-3.55l1.05-4.46s-.27-.54-.27-1.34c0-1.25.73-2.19 1.63-2.19.77 0 1.14.58 1.14 1.27 0 .78-.49 1.94-.75 3.01-.22.9.45 1.63 1.34 1.63 1.61 0 2.85-1.7 2.85-4.15 0-2.17-1.56-3.69-3.79-3.69-2.58 0-4.1 1.94-4.1 3.94 0 .78.3 1.62.68 2.07.07.09.08.17.06.26l-.26 1.05c-.04.17-.14.23-.33.15-1.23-.57-2-2.37-2-3.81 0-3.1 2.25-5.95 6.5-5.95 3.41 0 6.06 2.43 6.06 5.68 0 3.39-2.14 6.12-5.11 6.12-1 0-1.94-.52-2.26-1.13l-.62 2.35c-.22.86-.83 1.94-1.24 2.6A11.99 11.99 0 0 0 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z"/>
    </svg>
  ),
};
