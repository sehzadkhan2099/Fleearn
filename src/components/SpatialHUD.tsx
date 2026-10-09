import React from 'react';
import { Camera, Compass, Eye, Maximize2, Sparkles, Video } from 'lucide-react';
import { EngineStats, CameraPreset } from '../types/three-app';

interface SpatialHUDProps {
  stats: EngineStats;
  onSelectCameraPreset: (preset: CameraPreset) => void;
  onTakeScreenshot: () => void;
}

export const SpatialHUD: React.FC<SpatialHUDProps> = ({
  stats,
  onSelectCameraPreset,
  onTakeScreenshot,
}) => {
  return (
    <>
      {/* Top-Left Telemetry HUD */}
      <div className="absolute top-20 left-6 z-20 pointer-events-auto flex flex-col gap-2 max-w-xs">
        <div className="p-3.5 bg-neutral-950/75 backdrop-blur-md border border-white/10 rounded-xl text-xs text-neutral-300 shadow-xl space-y-2">
          <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400">
              WebGL Diagnostics
            </span>
            <span className="font-mono tabular-nums text-emerald-400 font-medium">
              {stats.fps} FPS
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-[11px] tabular-nums text-neutral-400">
            <div>
              <span className="text-neutral-500">Frame Time: </span>
              <span className="text-neutral-200">{stats.frameTimeMs} ms</span>
            </div>
            <div>
              <span className="text-neutral-500">Triangles: </span>
              <span className="text-neutral-200">
                {stats.triangles.toLocaleString()} Δ
              </span>
            </div>
            <div>
              <span className="text-neutral-500">Draw Calls: </span>
              <span className="text-neutral-200">{stats.drawCalls}</span>
            </div>
            <div>
              <span className="text-neutral-500">Vertices: </span>
              <span className="text-neutral-200">
                {stats.vertices.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="pt-1.5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-400 tabular-nums">
            <span className="text-neutral-500">Camera XYZ:</span>
            <span className="text-neutral-300">
              {stats.cameraPos.x} · {stats.cameraPos.y} · {stats.cameraPos.z}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom-Left Camera Presets & Capture Action */}
      <div className="absolute bottom-6 left-6 z-20 pointer-events-auto flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1 p-1 bg-neutral-950/75 backdrop-blur-md border border-white/10 rounded-xl shadow-xl">
          <button
            onClick={() => onSelectCameraPreset('default')}
            className="px-2.5 py-1 text-xs font-medium rounded-lg text-neutral-300 hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer"
            title="Perspective Orbit View"
          >
            Perspective
          </button>
          <button
            onClick={() => onSelectCameraPreset('closeup')}
            className="px-2.5 py-1 text-xs font-medium rounded-lg text-neutral-300 hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer"
            title="Macro Close-Up"
          >
            Macro
          </button>
          <button
            onClick={() => onSelectCameraPreset('top')}
            className="px-2.5 py-1 text-xs font-medium rounded-lg text-neutral-300 hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer"
            title="Orthographic Top-Down Blueprint"
          >
            Top Blueprint
          </button>
          <button
            onClick={() => onSelectCameraPreset('cinematic')}
            className="px-2.5 py-1 text-xs font-medium rounded-lg text-neutral-300 hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer"
            title="Cinematic Low Angle"
          >
            Cinematic
          </button>
          <button
            onClick={() => onSelectCameraPreset('isometric')}
            className="px-2.5 py-1 text-xs font-medium rounded-lg text-neutral-300 hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer"
            title="Axonometric Isometric View"
          >
            Isometric
          </button>
        </div>

        <button
          onClick={onTakeScreenshot}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-950/75 hover:bg-neutral-900 backdrop-blur-md border border-white/10 text-xs font-medium text-white rounded-xl shadow-xl transition-colors cursor-pointer whitespace-nowrap"
          title="Export high-resolution canvas snapshot"
        >
          <Camera className="w-3.5 h-3.5 text-sky-400" />
          <span>Capture 4K</span>
        </button>
      </div>

      {/* Orbit Gesture Helper Hint (discreet bottom center) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none hidden sm:flex items-center gap-3 px-3 py-1 bg-neutral-950/60 backdrop-blur-sm border border-white/5 rounded-full text-[11px] text-neutral-400">
        <span>Click + Drag to Orbit</span>
        <span aria-hidden="true" className="text-neutral-600">·</span>
        <span>Scroll to Zoom</span>
        <span aria-hidden="true" className="text-neutral-600">·</span>
        <span>Touch Supported</span>
      </div>
    </>
  );
};
