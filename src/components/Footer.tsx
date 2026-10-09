import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-neutral-950 px-6 lg:px-16 py-12 text-neutral-400 text-xs">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <span className="font-semibold text-white tracking-tight font-['Outfit']">
            KINETIX SPATIAL
          </span>
          <span className="hidden sm:inline text-neutral-700">|</span>
          <span>Parametric 3D WebGL Spatial Experience</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="#viewport"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-white transition-colors"
          >
            Back to Top
          </a>
          <span aria-hidden="true" className="text-neutral-700">·</span>
          <span>Three.js WebGL 2.0</span>
          <span aria-hidden="true" className="text-neutral-700">·</span>
          <span>© {new Date().getFullYear()} Kinetix</span>
        </div>
      </div>
    </footer>
  );
};
