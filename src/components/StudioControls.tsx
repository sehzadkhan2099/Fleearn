import React, { useState } from 'react';
import {
  Layers,
  Sun,
  Sliders,
  RotateCw,
  Activity,
  Box,
  Palette,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import {
  SceneConfig,
  SceneMode,
  ShadingMode,
  MaterialPreset,
  LightingPreset,
} from '../types/three-app';

interface StudioControlsProps {
  config: SceneConfig;
  onChangeConfig: (updater: (prev: SceneConfig) => SceneConfig) => void;
}

export const StudioControls: React.FC<StudioControlsProps> = ({
  config,
  onChangeConfig,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sceneModes: { id: SceneMode; label: string; desc: string }[] = [
    { id: 'quantum', label: 'Quantum Core', desc: 'Nested kinetic gimbals & lattice crystal' },
    { id: 'sculpture', label: 'Sculptural Monolith', desc: 'Milled acoustic spatial transducer' },
    { id: 'terrain', label: 'Parametric Terrain', desc: 'Undulating topological wave grid' },
    { id: 'vortex', label: 'Stellar Vortex', desc: 'Logarithmic particle gravitational field' },
  ];

  const shadingModes: { id: ShadingMode; label: string }[] = [
    { id: 'pbr', label: 'PBR Shaded' },
    { id: 'wireframe', label: 'Wireframe' },
    { id: 'matcap', label: 'MatCap Normal' },
  ];

  const materialPresets: { id: MaterialPreset; label: string; color: string }[] = [
    { id: 'titanium', label: 'Titanium', color: '#cbd5e1' },
    { id: 'obsidian', label: 'Obsidian', color: '#18181b' },
    { id: 'gold', label: 'Cyber Gold', color: '#f59e0b' },
    { id: 'frosted', label: 'Frosted Glass', color: '#93c5fd' },
  ];

  const lightingPresets: { id: LightingPreset; label: string }[] = [
    { id: 'studio', label: 'Studio Neutral' },
    { id: 'cyber', label: 'Cyber Neon' },
    { id: 'sunset', label: 'Golden Sunset' },
    { id: 'void', label: 'Void Mono' },
  ];

  return (
    <div className="absolute top-20 right-6 z-20 pointer-events-auto flex items-start">
      {/* Collapse/Expand Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="mr-2 p-2 bg-neutral-950/80 backdrop-blur-md border border-white/10 text-neutral-300 hover:text-white rounded-xl shadow-xl transition-colors cursor-pointer"
        aria-label={isCollapsed ? 'Expand Studio Controls' : 'Collapse Studio Controls'}
      >
        {isCollapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>

      {!isCollapsed && (
        <div className="w-80 max-h-[calc(100vh-7rem)] overflow-y-auto p-4 bg-neutral-950/80 backdrop-blur-md border border-white/10 rounded-2xl text-neutral-200 shadow-2xl space-y-5">
          {/* Section: 3D Geometries */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              <Box className="w-3.5 h-3.5 text-sky-400" />
              <span>3D Environments</span>
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {sceneModes.map((m) => (
                <button
                  key={m.id}
                  onClick={() => onChangeConfig((prev) => ({ ...prev, mode: m.id }))}
                  className={`flex flex-col items-start px-3 py-2 rounded-xl text-left transition-colors cursor-pointer border ${
                    config.mode === m.id
                      ? 'bg-neutral-800 border-white/20 text-white shadow-sm'
                      : 'bg-neutral-900/60 border-white/5 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                  }`}
                >
                  <span className="text-xs font-medium text-white">{m.label}</span>
                  <span className="text-[11px] text-neutral-400 mt-0.5">{m.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section: Shading Pipeline */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              <span>Shading Mode</span>
            </div>
            <div className="grid grid-cols-3 gap-1 p-1 bg-neutral-900/80 border border-white/5 rounded-xl">
              {shadingModes.map((s) => (
                <button
                  key={s.id}
                  onClick={() => onChangeConfig((prev) => ({ ...prev, shading: s.id }))}
                  className={`px-2 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap text-center ${
                    config.shading === s.id
                      ? 'bg-neutral-700 text-white shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Section: Physical Material */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              <Palette className="w-3.5 h-3.5 text-sky-400" />
              <span>Physical Material</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {materialPresets.map((mat) => (
                <button
                  key={mat.id}
                  onClick={() => onChangeConfig((prev) => ({ ...prev, material: mat.id }))}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                    config.material === mat.id
                      ? 'bg-neutral-800 border-white/20 text-white'
                      : 'bg-neutral-900/50 border-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-white/20 shrink-0"
                    style={{ backgroundColor: mat.color }}
                  />
                  <span className="truncate">{mat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section: Lighting Atmosphere */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              <Sun className="w-3.5 h-3.5 text-sky-400" />
              <span>Studio Lighting</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {lightingPresets.map((l) => (
                <button
                  key={l.id}
                  onClick={() => onChangeConfig((prev) => ({ ...prev, lighting: l.id }))}
                  className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium text-left transition-colors cursor-pointer truncate ${
                    config.lighting === l.id
                      ? 'bg-neutral-800 border-white/20 text-white'
                      : 'bg-neutral-900/50 border-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contextual Slider: Exploded View (Only for sculpture) */}
          {config.mode === 'sculpture' && (
            <div className="space-y-1.5 p-3 bg-neutral-900/60 border border-white/5 rounded-xl">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-neutral-300">Exploded View</span>
                <span className="font-mono text-neutral-400 tabular-nums">
                  {Math.round(config.explodedOffset * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={config.explodedOffset}
                onChange={(e) =>
                  onChangeConfig((prev) => ({
                    ...prev,
                    explodedOffset: parseFloat(e.target.value),
                  }))
                }
                className="w-full accent-sky-400 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>
          )}

          {/* Animation & Dynamics Controls */}
          <div className="space-y-3 pt-2 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-medium text-neutral-300">
                <RotateCw className="w-3.5 h-3.5 text-neutral-400" />
                <span>Auto Turntable</span>
              </div>
              <button
                onClick={() =>
                  onChangeConfig((prev) => ({ ...prev, autoRotate: !prev.autoRotate }))
                }
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                  config.autoRotate ? 'bg-sky-500' : 'bg-neutral-800'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    config.autoRotate ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {config.autoRotate && (
              <div className="space-y-1 pl-5">
                <div className="flex items-center justify-between text-[11px] text-neutral-400">
                  <span>Rotation Speed</span>
                  <span className="font-mono tabular-nums">{config.rotationSpeed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="2.5"
                  step="0.1"
                  value={config.rotationSpeed}
                  onChange={(e) =>
                    onChangeConfig((prev) => ({
                      ...prev,
                      rotationSpeed: parseFloat(e.target.value),
                    }))
                  }
                  className="w-full accent-sky-400 h-1 bg-neutral-800 rounded-lg cursor-pointer"
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-medium text-neutral-300">
                <Activity className="w-3.5 h-3.5 text-neutral-400" />
                <span>Kinetic Audio Pulse</span>
              </div>
              <button
                onClick={() =>
                  onChangeConfig((prev) => ({ ...prev, pulseAudio: !prev.pulseAudio }))
                }
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                  config.pulseAudio ? 'bg-sky-500' : 'bg-neutral-800'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    config.pulseAudio ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
