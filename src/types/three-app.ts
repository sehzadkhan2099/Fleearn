export type SceneMode = 'quantum' | 'sculpture' | 'terrain' | 'vortex';

export type ShadingMode = 'pbr' | 'wireframe' | 'particles' | 'matcap';

export type MaterialPreset = 'titanium' | 'obsidian' | 'gold' | 'frosted';

export type LightingPreset = 'studio' | 'cyber' | 'sunset' | 'void';

export type CameraPreset = 'default' | 'closeup' | 'top' | 'cinematic' | 'isometric';

export interface SceneConfig {
  mode: SceneMode;
  shading: ShadingMode;
  material: MaterialPreset;
  lighting: LightingPreset;
  explodedOffset: number; // 0 to 1
  autoRotate: boolean;
  rotationSpeed: number; // 0.1 to 2.5
  pulseAudio: boolean; // procedural oscillation
  wireframeColor: string;
}

export interface EngineStats {
  fps: number;
  frameTimeMs: number;
  triangles: number;
  vertices: number;
  drawCalls: number;
  cameraPos: { x: number; y: number; z: number };
}
