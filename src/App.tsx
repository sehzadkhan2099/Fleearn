/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { ThreeCanvas } from './components/ThreeCanvas';
import { SpatialHUD } from './components/SpatialHUD';
import { StudioControls } from './components/StudioControls';
import { ShowcaseSection } from './components/ShowcaseSection';
import { Footer } from './components/Footer';
import {
  SceneConfig,
  SceneMode,
  EngineStats,
  CameraPreset,
  MaterialPreset,
} from './types/three-app';
import { Orbit, Compass, Box, Sparkles, Layers } from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState<SceneConfig>({
    mode: 'quantum',
    shading: 'pbr',
    material: 'titanium',
    lighting: 'studio',
    explodedOffset: 0,
    autoRotate: true,
    rotationSpeed: 1.0,
    pulseAudio: false,
    wireframeColor: '#38bdf8',
  });

  const [stats, setStats] = useState<EngineStats>({
    fps: 60,
    frameTimeMs: 16.6,
    triangles: 14200,
    vertices: 9800,
    drawCalls: 6,
    cameraPos: { x: 0, y: 3, z: 7 },
  });

  const [cameraPresetTrigger, setCameraPresetTrigger] = useState<CameraPreset | null>(null);
  const screenshotFnRef = useRef<(() => void) | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleStatsUpdate = useCallback((newStats: EngineStats) => {
    setStats(newStats);
  }, []);

  const handleSelectCameraPreset = (preset: CameraPreset) => {
    setCameraPresetTrigger(preset);
    // Reset trigger after tick so it can be re-triggered
    setTimeout(() => setCameraPresetTrigger(null), 100);
  };

  const handleScreenshotRequested = useCallback((fn: () => void) => {
    screenshotFnRef.current = fn;
  }, []);

  const handleTakeScreenshot = () => {
    if (screenshotFnRef.current) {
      screenshotFnRef.current();
    }
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSceneSelectFromSection = (mode: SceneMode) => {
    setConfig((prev) => ({ ...prev, mode }));
  };

  const handleMaterialSelectFromSection = (material: MaterialPreset) => {
    setConfig((prev) => ({ ...prev, material }));
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-['DM_Sans'] selection:bg-neutral-800 selection:text-white">
      {/* 1. Header with strict Top Bar Contract */}
      <Header
        onScrollToSection={handleScrollToSection}
        onToggleFullscreen={handleToggleFullscreen}
        isFullscreen={isFullscreen}
      />

      {/* 2. Primary 3D Viewport Hero Section */}
      <section
        id="viewport"
        className="relative w-full h-screen min-h-[640px] overflow-hidden bg-neutral-950 flex flex-col justify-between"
      >
        {/* Core WebGL Canvas */}
        <ThreeCanvas
          config={config}
          onStatsUpdate={handleStatsUpdate}
          cameraPresetTrigger={cameraPresetTrigger}
          onScreenshotRequested={handleScreenshotRequested}
        />

        {/* Ambient Gradient Overlays for depth */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-neutral-950 via-neutral-950/60 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent pointer-events-none z-10" />

        {/* Real-time Diagnostics HUD & Camera Bookmarks */}
        <SpatialHUD
          stats={stats}
          onSelectCameraPreset={handleSelectCameraPreset}
          onTakeScreenshot={handleTakeScreenshot}
        />

        {/* Interactive Studio Director Controls */}
        <StudioControls
          config={config}
          onChangeConfig={setConfig}
        />

        {/* Top-Center Clean Scene Selector */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 pointer-events-auto hidden md:flex items-center gap-1 p-1 bg-neutral-950/75 backdrop-blur-md border border-white/10 rounded-xl shadow-xl">
          <button
            onClick={() => setConfig((prev) => ({ ...prev, mode: 'quantum' }))}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              config.mode === 'quantum'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Quantum Core
          </button>
          <button
            onClick={() => setConfig((prev) => ({ ...prev, mode: 'sculpture' }))}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              config.mode === 'sculpture'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Sculptural Monolith
          </button>
          <button
            onClick={() => setConfig((prev) => ({ ...prev, mode: 'terrain' }))}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              config.mode === 'terrain'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Parametric Terrain
          </button>
          <button
            onClick={() => setConfig((prev) => ({ ...prev, mode: 'vortex' }))}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              config.mode === 'vortex'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Stellar Vortex
          </button>
        </div>

        {/* Hero Title & Scroll Invitation (discreet, accessible) */}
        <div className="absolute bottom-6 right-6 z-20 pointer-events-auto">
          <button
            onClick={() => handleScrollToSection('environments')}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-neutral-950/70 hover:bg-neutral-900/90 backdrop-blur-md border border-white/10 text-xs font-medium text-neutral-300 hover:text-white rounded-xl shadow-xl transition-colors cursor-pointer"
          >
            <span>Explore Engineering Specifications</span>
            <span aria-hidden="true" className="text-neutral-500">↓</span>
          </button>
        </div>
      </section>

      {/* 3. Editorial & Engineering Showcase Section */}
      <ShowcaseSection
        onSelectScene={handleSceneSelectFromSection}
        onSelectMaterial={handleMaterialSelectFromSection}
      />

      {/* 4. Clean Quiet Footer */}
      <Footer />
    </div>
  );
}
