import React from 'react';
import { useApp } from '../context/AppContext';

interface FleearnLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const FleearnLogo: React.FC<FleearnLogoProps> = ({
  className = '',
  size = 'md',
  showText = false,
}) => {
  const { companyInfo } = useApp();

  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const selectedSizeClass = sizeClasses[size];

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {companyInfo.logoUrl ? (
        <img
          src={companyInfo.logoUrl}
          alt={companyInfo.name || 'Fleearn'}
          className={`${selectedSizeClass} rounded-2xl object-cover border border-emerald-500/30 shadow-lg shadow-emerald-950/40`}
        />
      ) : (
        <div
          className={`${selectedSizeClass} relative rounded-2xl bg-gradient-to-br from-[#044541] via-[#063330] to-[#011a18] p-[1.5px] border border-emerald-500/40 shadow-xl shadow-emerald-950/50 flex items-center justify-center overflow-hidden group`}
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 bg-radial from-emerald-400/20 via-transparent to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />

          {/* Authentic High-Resolution Fleearn Vector Emblem */}
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[82%] h-[82%] relative z-10 drop-shadow-[0_2px_8px_rgba(4,69,65,0.8)]"
          >
            {/* Hexagonal Shield Geometry */}
            <path
              d="M50 6L88 28V72L50 94L12 72V28L50 6Z"
              fill="url(#fleearnGradBg)"
              stroke="#2DD4BF"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Dynamic Stylized 'F' with Ascent Rocket / Growth Arrow */}
            <path
              d="M32 26H68C72 26 74 29 72 33L67 42H44V50H62C65 50 66 53 64 56L60 63H44V76C44 79 41 81 37 81H33C30 81 29 79 29 76V32C29 28.5 30.5 26 32 26Z"
              fill="#FFFFFF"
            />
            {/* Red Accent Wing / High-Reward Indicator (#DC2626) */}
            <path
              d="M49 42L66 26L76 26L57 42H49Z"
              fill="#EF4444"
            />
            {/* Growth Arrow Apex (#10B981) */}
            <path
              d="M62 50L75 37L79 41L68 52L62 50Z"
              fill="#34D399"
            />

            <defs>
              <linearGradient id="fleearnGradBg" x1="12" y1="6" x2="88" y2="94" gradientUnits="userSpaceOnUse">
                <stop stopColor="#044541" />
                <stop offset="0.6" stopColor="#022725" />
                <stop offset="1" stopColor="#011413" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}

      {showText && (
        <div className="flex flex-col text-left select-none">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-['Outfit']">
              {companyInfo.name ? companyInfo.name.split(' ')[0] : 'Fleearn'}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 bg-red-600/90 text-white font-mono rounded font-semibold tracking-wider">
              PRO
            </span>
          </div>
          <span className="text-[11px] text-emerald-400 font-medium tracking-wide mt-1">
            {companyInfo.tagline ? companyInfo.tagline.split('—')[0].trim() : 'Earn your way'}
          </span>
        </div>
      )}
    </div>
  );
};
