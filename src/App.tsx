/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ThreeBackground } from './components/ThreeBackground';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SecretAdminModal } from './components/SecretAdminModal';
import { AdminLoginModal } from './components/AdminLoginModal';

import { HomePage } from './pages/HomePage';
import { NoticePage } from './pages/NoticePage';
import { MobileAppPage } from './pages/MobileAppPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { PricingPage } from './pages/PricingPage';
import { GalleryPage } from './pages/GalleryPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { FaqPage } from './pages/FaqPage';
import { AboutPage } from './pages/AboutPage';
import { DiscoverPage } from './pages/DiscoverPage';
import { OpportunityPage } from './pages/OpportunityPage';
import { AdminDashboard } from './pages/AdminDashboard';

const AppContent: React.FC = () => {
  const { currentPage } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'notice':
        return <NoticePage />;
      case 'app':
        return <MobileAppPage />;
      case 'features':
        return <FeaturesPage />;
      case 'pricing':
        return <PricingPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'documents':
        return <DocumentsPage />;
      case 'faq':
        return <FaqPage />;
      case 'about':
        return <AboutPage />;
      case 'discover':
        return <DiscoverPage />;
      case 'opportunity':
        return <OpportunityPage />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070d0c] text-neutral-100 relative selection:bg-[#044541] selection:text-white">
      {/* 3D Visual Atmosphere */}
      <ThreeBackground />

      {/* Navigation Header */}
      <Navbar />

      {/* Active Page View */}
      <main className="flex-1 relative z-10">{renderPage()}</main>

      {/* Footer with Secret Admin Entrance */}
      <Footer />

      {/* Secret MCQ Modal (50 options, Option 40 is Mars/মঙ্গল গ্রহ, max 2 clicks) */}
      <SecretAdminModal />

      {/* Admin Login Modal (Secret UID & PIN, no examples shown) */}
      <AdminLoginModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
