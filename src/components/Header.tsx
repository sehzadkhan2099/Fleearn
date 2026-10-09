import React from 'react';

interface HeaderProps {
  onScrollToSection: (sectionId: string) => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onScrollToSection,
  onToggleFullscreen,
  isFullscreen,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between gap-8 px-6 lg:px-12 py-4 bg-neutral-950/80 backdrop-blur-md border-b border-white/10 transition-all">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="text-lg font-bold tracking-tight text-white font-['Outfit'] whitespace-nowrap shrink-0 hover:text-neutral-300 transition-colors"
      >
        KINETIX SPATIAL
      </a>

      {/* Zone 2: 4-5 clean single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
        <button
          onClick={() => onScrollToSection('viewport')}
          className="hover:text-white hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Viewport
        </button>
        <button
          onClick={() => onScrollToSection('environments')}
          className="hover:text-white hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Environments
        </button>
        <button
          onClick={() => onScrollToSection('materials')}
          className="hover:text-white hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Material Lab
        </button>
        <button
          onClick={() => onScrollToSection('specifications')}
          className="hover:text-white hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Specifications
        </button>
        <button
          onClick={() => onScrollToSection('studio')}
          className="hover:text-white hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Studio
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onToggleFullscreen}
          className="px-4 py-2 text-xs font-medium text-neutral-900 bg-white rounded-lg hover:bg-neutral-200 transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
        >
          {isFullscreen ? 'Exit Fullscreen' : 'Immersive View'}
        </button>
      </div>
    </header>
  );
};
