import React from 'react';
import {
  Cpu,
  Layers,
  Sparkles,
  Maximize2,
  SlidersHorizontal,
  Compass,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import { SceneConfig, SceneMode, MaterialPreset } from '../types/three-app';

interface ShowcaseSectionProps {
  onSelectScene: (mode: SceneMode) => void;
  onSelectMaterial: (mat: MaterialPreset) => void;
}

export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({
  onSelectScene,
  onSelectMaterial,
}) => {
  return (
    <section className="relative z-10 bg-neutral-950 text-neutral-100 border-t border-white/10 px-6 lg:px-16 py-24 max-w-[1440px] mx-auto space-y-32">
      {/* 1. Curated Editorial Hero / Philosophy */}
      <div id="environments" className="space-y-12">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-medium text-neutral-400">
            <span>Spatial Computation</span>
            <span aria-hidden="true">·</span>
            <span>WebGL 2.0 Engine</span>
            <span aria-hidden="true">·</span>
            <span>Real-Time Matrix Math</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white font-['Outfit'] text-balance">
            Engineered for physical fidelity and generative precision.
          </h2>
          <p className="text-base lg:text-lg text-neutral-400 leading-relaxed">
            KINETIX 3D bridges parametric computational geometry with real-time physically based
            shading. Inspect intricate kinetic mechanical assemblies, simulate gravitational
            vortices, and configure aerospace-grade surfaces in true three-dimensional space.
          </p>
        </div>

        {/* 4-Column Environment Cards with direct 3D switch handlers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Quantum Core */}
          <div
            onClick={() => {
              onSelectScene('quantum');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group relative p-6 bg-neutral-900/40 hover:bg-neutral-900/80 border border-white/10 hover:border-sky-500/40 rounded-2xl transition-all duration-200 cursor-pointer flex flex-col justify-between h-80"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-4">
                <span>01. Kinetic Physics</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-sky-400 transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-white font-['Outfit']">
                Orbital Quantum Core
              </h3>
              <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                Triple-axis decoupled gimbal ring assembly housing an optical prism icosahedron and
                dual orbiting particle swarms.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono tabular-nums">
              <span>96 Segments</span>
              <span aria-hidden="true">·</span>
              <span>1,400 Particles</span>
            </div>
          </div>

          {/* Card 2: Sculptural Monolith */}
          <div
            onClick={() => {
              onSelectScene('sculpture');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group relative p-6 bg-neutral-900/40 hover:bg-neutral-900/80 border border-white/10 hover:border-sky-500/40 rounded-2xl transition-all duration-200 cursor-pointer flex flex-col justify-between h-80"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-4">
                <span>02. Industrial Design</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-sky-400 transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-white font-['Outfit']">
                Sculptural Monolith
              </h3>
              <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                Precision milled aerospace enclosure featuring multi-part exploded view
                inspection, internal acoustic transducer, and quartz lens dome.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono tabular-nums">
              <span>Exploded View</span>
              <span aria-hidden="true">·</span>
              <span>PBR Shading</span>
            </div>
          </div>

          {/* Card 3: Parametric Terrain */}
          <div
            onClick={() => {
              onSelectScene('terrain');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group relative p-6 bg-neutral-900/40 hover:bg-neutral-900/80 border border-white/10 hover:border-sky-500/40 rounded-2xl transition-all duration-200 cursor-pointer flex flex-col justify-between h-80"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-4">
                <span>03. Generative Topography</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-sky-400 transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-white font-['Outfit']">
                Parametric Terrain
              </h3>
              <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                Real-time dynamic topological wave mesh with harmonic vertex oscillation and
                architectural beacon towers.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono tabular-nums">
              <span>2,304 Grid Vertices</span>
              <span aria-hidden="true">·</span>
              <span>Wave Harmonics</span>
            </div>
          </div>

          {/* Card 4: Stellar Vortex */}
          <div
            onClick={() => {
              onSelectScene('vortex');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group relative p-6 bg-neutral-900/40 hover:bg-neutral-900/80 border border-white/10 hover:border-sky-500/40 rounded-2xl transition-all duration-200 cursor-pointer flex flex-col justify-between h-80"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-4">
                <span>04. Astrophysics</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-sky-400 transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-white font-['Outfit']">
                Stellar Vortex
              </h3>
              <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                Logarithmic gravitational particle vortex featuring 9,000 spectral stars calibrated
                across sky blue, deep violet, and solar amber wavelengths.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono tabular-nums">
              <span>9,000 Active Points</span>
              <span aria-hidden="true">·</span>
              <span>Radial Velocity</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Visual Bento Grid: High-Fidelity Studio Imagery */}
      <div id="materials" className="space-y-12">
        <div className="max-w-2xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-medium text-neutral-400">
            <span>Material Laboratory</span>
            <span aria-hidden="true">·</span>
            <span>Micro-Texture Analysis</span>
            <span aria-hidden="true">·</span>
            <span>PBR Calibration</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white font-['Outfit']">
            Architectural textures and physical surface properties.
          </h2>
          <p className="text-base text-neutral-400 leading-relaxed">
            Every material preset in the studio is physically calibrated with precise metallic
            reflectance, microfacet roughness, and light transmission index of refraction (IOR).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Visual Feature: Macro Sculptural Hardware (7 cols) */}
          <div className="lg:col-span-7 relative group rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 flex flex-col justify-end min-h-[460px]">
            <img
              src="/src/assets/images/sculpture_macro_texture_1791549823118.jpg"
              alt="Precision sculpted titanium acoustic transducer with smoked lens"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
            <div className="relative z-10 p-8 space-y-3">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <span>Titanium Grade 5</span>
                <span aria-hidden="true">·</span>
                <span>Bead-Blasted</span>
                <span aria-hidden="true">·</span>
                <span>IOR 2.65</span>
              </div>
              <h3 className="text-2xl font-bold text-white font-['Outfit']">
                Precision Transducer Architecture
              </h3>
              <p className="text-sm text-neutral-300 max-w-lg leading-relaxed">
                Milled chamfers and smoked acrylic lens dome calculated to withstand 120dB acoustic
                resonance while maintaining electromagnetic shielding.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => {
                    onSelectScene('sculpture');
                    onSelectMaterial('titanium');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-2 text-xs font-medium bg-white text-neutral-950 rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  Load in 3D Viewport
                </button>
              </div>
            </div>
          </div>

          {/* Secondary Stacked Visuals (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Showroom Space card */}
            <div className="relative group rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 flex flex-col justify-end min-h-[220px]">
              <img
                src="/src/assets/images/studio_concrete_backdrop_1791549794228.jpg"
                alt="Minimalist architectural spatial showroom with polished concrete"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
              <div className="relative z-10 p-6 space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <span>Showroom Environment</span>
                  <span aria-hidden="true">·</span>
                  <span>Linear Studio Key</span>
                </div>
                <h4 className="text-lg font-semibold text-white font-['Outfit']">
                  Architectural Lighting Pavilion
                </h4>
                <p className="text-xs text-neutral-300">
                  Calibrated key, fill, and rim lighting with PCF soft shadows.
                </p>
              </div>
            </div>

            {/* Cosmic Space card */}
            <div className="relative group rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 flex flex-col justify-end min-h-[220px]">
              <img
                src="/src/assets/images/space_nebula_sky_1791549773780.jpg"
                alt="Deep panoramic cosmic space with subtle indigo nebula"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
              <div className="relative z-10 p-6 space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <span>Celestial Coordinate Grid</span>
                  <span aria-hidden="true">·</span>
                  <span>Additive Blending</span>
                </div>
                <h4 className="text-lg font-semibold text-white font-['Outfit']">
                  Deep Space Particle Dynamics
                </h4>
                <p className="text-xs text-neutral-300">
                  Volumetric point cloud rendering with zero layout thrashing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Specifications & Benchmarks */}
      <div id="specifications" className="space-y-12">
        <div className="max-w-2xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-medium text-neutral-400">
            <span>Engineering Metrics</span>
            <span aria-hidden="true">·</span>
            <span>Performance Profiles</span>
            <span aria-hidden="true">·</span>
            <span>Latency Budgets</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white font-['Outfit']">
            Production-grade 3D runtime specifications.
          </h2>
          <p className="text-base text-neutral-400 leading-relaxed">
            Built without fragile external asset loaders or bloated dependencies. Every geometry is
            instantiated procedurally in local GPU memory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-neutral-900/30 border border-white/10 rounded-2xl space-y-2">
            <span className="text-xs text-neutral-500 font-mono uppercase tracking-wider">
              Framerate Budget
            </span>
            <div className="text-3xl font-bold text-white font-mono tabular-nums">
              60.0 FPS
            </div>
            <p className="text-xs text-neutral-400">
              Smooth 16.6ms frame intervals with zero main-thread blocking operations.
            </p>
          </div>

          <div className="p-6 bg-neutral-900/30 border border-white/10 rounded-2xl space-y-2">
            <span className="text-xs text-neutral-500 font-mono uppercase tracking-wider">
              Draw Call Efficiency
            </span>
            <div className="text-3xl font-bold text-white font-mono tabular-nums">
              &lt; 18 Calls
            </div>
            <p className="text-xs text-neutral-400">
              Batched buffer geometries to minimize CPU-to-GPU state overhead.
            </p>
          </div>

          <div className="p-6 bg-neutral-900/30 border border-white/10 rounded-2xl space-y-2">
            <span className="text-xs text-neutral-500 font-mono uppercase tracking-wider">
              Tone Mapping
            </span>
            <div className="text-3xl font-bold text-white font-mono tabular-nums">
              ACES Filmic
            </div>
            <p className="text-xs text-neutral-400">
              Hollywood color reproduction with wide dynamic range highlight compression.
            </p>
          </div>

          <div className="p-6 bg-neutral-900/30 border border-white/10 rounded-2xl space-y-2">
            <span className="text-xs text-neutral-500 font-mono uppercase tracking-wider">
              Input Latency
            </span>
            <div className="text-3xl font-bold text-white font-mono tabular-nums">
              &lt; 8.2 ms
            </div>
            <p className="text-xs text-neutral-400">
              Direct pointer and wheel damping curves without input queue backpressure.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Interactive Studio Features Table */}
      <div id="studio" className="p-8 bg-neutral-900/30 border border-white/10 rounded-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h3 className="text-xl font-bold text-white font-['Outfit']">
              WebGL Runtime Features Matrix
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Active capabilities across all supported desktop and mobile touch viewports.
            </p>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-4 py-2 text-xs font-medium text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer self-start md:self-auto"
          >
            Return to 3D Viewport
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-300">
            <thead>
              <tr className="border-b border-white/10 text-neutral-400 font-mono uppercase tracking-wider">
                <th className="py-3 px-4">Subsystem</th>
                <th className="py-3 px-4">Implementation Standard</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Performance Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono tabular-nums">
              <tr>
                <td className="py-3 px-4 font-sans font-medium text-white">Three-Point Lighting</td>
                <td className="py-3 px-4 text-neutral-400">Key, Fill, Rim with PCF Soft Shadows</td>
                <td className="py-3 px-4 text-emerald-400">Calibrated</td>
                <td className="py-3 px-4 text-neutral-400">1024x1024 shadow map</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans font-medium text-white">Physically Based Materials</td>
                <td className="py-3 px-4 text-neutral-400">MeshStandardMaterial & MeshPhysicalMaterial</td>
                <td className="py-3 px-4 text-emerald-400">Active</td>
                <td className="py-3 px-4 text-neutral-400">Transmission & Clearcoat</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans font-medium text-white">Interactive Orbit Controls</td>
                <td className="py-3 px-4 text-neutral-400">Smooth spherical inertia lerping</td>
                <td className="py-3 px-4 text-emerald-400">Hardware Accel</td>
                <td className="py-3 px-4 text-neutral-400">Touch & pointer unified</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans font-medium text-white">High-Res Capture Pipeline</td>
                <td className="py-3 px-4 text-neutral-400">Native WebGL PNG buffer serialization</td>
                <td className="py-3 px-4 text-emerald-400">Zero Loss</td>
                <td className="py-3 px-4 text-neutral-400">Instant download</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
