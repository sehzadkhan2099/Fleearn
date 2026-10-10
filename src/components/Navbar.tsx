import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Language, PageId } from '../types/fleearn';
import {
  Globe,
  Menu,
  X,
  Download,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    language,
    setLanguage,
    t,
    isAdminLoggedIn,
    companyInfo,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: t.nav.home },
    { id: 'notice', label: t.nav.notice },
    { id: 'app', label: t.nav.app },
    { id: 'features', label: t.nav.features },
    { id: 'pricing', label: t.nav.pricing },
    { id: 'gallery', label: t.nav.gallery },
    { id: 'documents', label: t.nav.documents },
    { id: 'faq', label: t.nav.faq },
    { id: 'about', label: t.nav.about },
    { id: 'discover', label: t.nav.discover },
    { id: 'opportunity', label: t.nav.opportunity },
  ];

  const languages: { code: Language; name: string }[] = [
    { code: 'bn', name: 'বাংলা (BN)' },
    { code: 'en', name: 'English (EN)' },
    { code: 'ru', name: 'Русский (RU)' },
    { code: 'ar', name: 'العربية (AR)' },
  ];

  const handleNavClick = (pageId: PageId) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#070d0c]/90 backdrop-blur-md border-b border-white/10 transition-colors">
      {/* Top Announcement Bar */}
      <div className="bg-[#044541] text-white text-[11px] font-medium py-1 px-4 text-center flex items-center justify-center gap-2 overflow-hidden">
        <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse shrink-0" />
        <span className="truncate">
          {companyInfo.name} — অফিসিয়াল মোবাইল অ্যাপ এখন লাইভ | বিকাশ, নগদ ও বাইন্যান্সে ইনস্ট্যান্ট ক্যাশআউট!
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo & Wordmark (Fully Editable from Admin) */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer shrink-0 group select-none"
          >
            {companyInfo.logoUrl ? (
              <img
                src={companyInfo.logoUrl}
                alt={companyInfo.name}
                className="w-10 h-10 rounded-xl object-cover border border-emerald-500/40 shadow-lg group-hover:scale-105 transition-transform"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#044541] to-emerald-950 flex items-center justify-center border border-emerald-500/40 shadow-lg shadow-emerald-950/40 group-hover:scale-105 transition-transform">
                <span className="text-white font-black text-xl font-['Outfit'] tracking-wider">
                  F
                </span>
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-black tracking-tight text-white font-['Outfit'] flex items-center gap-1">
                <span>{companyInfo.name.split(' ')[0] || 'Fleearn'}</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-red-600/90 text-white rounded font-mono font-normal">
                  PRO
                </span>
              </span>
              <span className="text-[10px] text-neutral-400 -mt-1 font-medium tracking-wide">
                Earn your way
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 text-xs font-medium text-neutral-300 overflow-x-auto py-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  currentPage === item.id
                    ? 'bg-[#044541] text-white font-semibold shadow-sm shadow-emerald-950'
                    : 'hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Controls: Language & Primary Action (Light mode removed) */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-xs text-neutral-200 hover:bg-neutral-800 transition-colors cursor-pointer"
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span className="uppercase font-mono text-[11px]">{language}</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-neutral-950 border border-white/10 rounded-xl shadow-2xl py-1 z-50">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-1.5 text-left text-xs transition-colors cursor-pointer flex items-center justify-between ${
                        language === l.code
                          ? 'bg-[#044541] text-white font-semibold'
                          : 'text-neutral-300 hover:bg-neutral-900'
                      }`}
                    >
                      <span>{l.name}</span>
                      {language === l.code && <span className="text-[10px]">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Primary Action Button: #044541 with white and red accents */}
            <button
              onClick={() => handleNavClick('app')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#044541] hover:bg-[#065b56] border border-emerald-500/30 text-white font-medium text-xs shadow-md transition-all cursor-pointer group"
            >
              <Download className="w-3.5 h-3.5 text-red-400 group-hover:scale-110 transition-transform" />
              <span>{t.common.downloadApp}</span>
            </button>

            {/* Admin Badge if logged in */}
            {isAdminLoggedIn && (
              <button
                onClick={() => handleNavClick('admin')}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-red-950 border border-red-500/50 text-red-300 rounded-lg text-xs font-semibold hover:bg-red-900 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
                <span>মাস্টার প্যানেল</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-neutral-900 text-neutral-300 border border-white/10"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-neutral-950 border-b border-white/10 px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-1.5 pb-3 border-b border-white/10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-lg text-left text-xs transition-colors ${
                  currentPage === item.id
                    ? 'bg-[#044541] text-white font-semibold'
                    : 'text-neutral-300 hover:bg-neutral-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-1">
            <button
              onClick={() => handleNavClick('app')}
              className="w-full py-2.5 bg-[#044541] hover:bg-[#065b56] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-red-400" />
              <span>{t.common.downloadApp}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
