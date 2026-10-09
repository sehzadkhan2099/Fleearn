import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { SceneConfig, EngineStats, CameraPreset } from '../types/three-app';

interface ThreeCanvasProps {
  config: SceneConfig;
  onStatsUpdate: (stats: EngineStats) => void;
  cameraPresetTrigger?: CameraPreset | null;
  onScreenshotRequested?: (trigger: () => void) => void;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  config,
  onStatsUpdate,
  cameraPresetTrigger,
  onScreenshotRequested,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // References for mutable Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // Scene group containers
  const groupsRef = useRef<{
    quantumGroup: THREE.Group;
    sculptureGroup: THREE.Group;
    terrainGroup: THREE.Group;
    vortexGroup: THREE.Group;
  } | null>(null);

  // Dynamic animation objects
  const animObjectsRef = useRef<{
    quantumRings: THREE.Mesh[];
    quantumCrystal: THREE.Mesh | null;
    quantumParticles: THREE.Points | null;
    sculptureParts: { mesh: THREE.Object3D; basePos: THREE.Vector3; explodeDir: THREE.Vector3 }[];
    terrainPlane: THREE.Mesh | null;
    terrainOriginalPositions: Float32Array | null;
    vortexPoints: THREE.Points | null;
    vortexPositions: Float32Array | null;
    vortexOriginalAngles: Float32Array | null;
    vortexRadii: Float32Array | null;
  }>({
    quantumRings: [],
    quantumCrystal: null,
    quantumParticles: null,
    sculptureParts: [],
    terrainPlane: null,
    terrainOriginalPositions: null,
    vortexPoints: null,
    vortexPositions: null,
    vortexOriginalAngles: null,
    vortexRadii: null,
  });

  // Lighting refs
  const lightsRef = useRef<{
    ambient: THREE.AmbientLight;
    key: THREE.DirectionalLight;
    fill: THREE.DirectionalLight;
    rim: THREE.DirectionalLight;
    coreLight: THREE.PointLight;
  } | null>(null);

  // Interaction & Orbit state
  const orbitRef = useRef({
    isDragging: false,
    prevPointerX: 0,
    prevPointerY: 0,
    targetTheta: 0.6,
    targetPhi: 1.1,
    targetRadius: 7.0,
    currentTheta: 0.6,
    currentPhi: 1.1,
    currentRadius: 7.0,
    lookAtTarget: new THREE.Vector3(0, 0, 0),
    autoRotationAngle: 0,
    mouseNormalized: new THREE.Vector2(0, 0),
  });

  // Screenshot capture helper
  const captureScreenshot = useCallback(() => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    const dataURL = rendererRef.current.domElement.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `kinetix-3d-${config.mode}-${Date.now()}.png`;
    link.href = dataURL;
    link.click();
  }, [config.mode]);

  useEffect(() => {
    if (onScreenshotRequested) {
      onScreenshotRequested(captureScreenshot);
    }
  }, [onScreenshotRequested, captureScreenshot]);

  // Handle camera presets
  useEffect(() => {
    if (!cameraPresetTrigger) return;
    const orb = orbitRef.current;
    switch (cameraPresetTrigger) {
      case 'default':
        orb.targetTheta = 0.6;
        orb.targetPhi = 1.1;
        orb.targetRadius = 7.0;
        break;
      case 'closeup':
        orb.targetTheta = 0.4;
        orb.targetPhi = 1.3;
        orb.targetRadius = 3.8;
        break;
      case 'top':
        orb.targetTheta = 0.0;
        orb.targetPhi = 0.05;
        orb.targetRadius = 8.5;
        break;
      case 'cinematic':
        orb.targetTheta = 1.8;
        orb.targetPhi = 1.45;
        orb.targetRadius = 6.2;
        break;
      case 'isometric':
        orb.targetTheta = Math.PI / 4;
        orb.targetPhi = Math.PI / 3.2;
        orb.targetRadius = 7.5;
        break;
    }
  }, [cameraPresetTrigger]);

  // Initialize Three.js scene once
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0c, 0.035);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3, 7);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true,
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setClearColor(0x0a0a0c, 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    canvasRef.current = renderer.domElement;
    rendererRef.current = renderer;

    // 4. Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xfff6ea, 1.8);
    key.position.set(5, 8, 5);
    key.castShadow = true;
    key.shadow.mapSize.width = 1024;
    key.shadow.mapSize.height = 1024;
    key.shadow.bias = -0.0005;
    scene.add(key);

    const fill = new THREE.DirectionalLight(0x8bc34a, 0.4);
    fill.position.set(-5, 2, -3);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0x38bdf8, 2.2);
    rim.position.set(-3, 6, -6);
    scene.add(rim);

    const coreLight = new THREE.PointLight(0x60a5fa, 3, 8);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    lightsRef.current = { ambient, key, fill, rim, coreLight };

    // 5. Scene Containers
    const quantumGroup = new THREE.Group();
    const sculptureGroup = new THREE.Group();
    const terrainGroup = new THREE.Group();
    const vortexGroup = new THREE.Group();

    scene.add(quantumGroup);
    scene.add(sculptureGroup);
    scene.add(terrainGroup);
    scene.add(vortexGroup);

    groupsRef.current = {
      quantumGroup,
      sculptureGroup,
      terrainGroup,
      vortexGroup,
    };

    // Build World 1: QUANTUM CORE
    buildQuantumCore(quantumGroup);

    // Build World 2: SCULPTURAL MONOLITH
    buildSculpturalMonolith(sculptureGroup);

    // Build World 3: PARAMETRIC TERRAIN
    buildParametricTerrain(terrainGroup);

    // Build World 4: STELLAR VORTEX
    buildStellarVortex(vortexGroup);

    // Subtle Ground Shadow Grid
    const gridHelper = new THREE.GridHelper(16, 24, 0x27272a, 0x18181b);
    gridHelper.position.y = -2.2;
    scene.add(gridHelper);

    // 6. Pointer & Orbit Handlers
    const handlePointerDown = (e: PointerEvent) => {
      orbitRef.current.isDragging = true;
      orbitRef.current.prevPointerX = e.clientX;
      orbitRef.current.prevPointerY = e.clientY;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      orbitRef.current.mouseNormalized.set(x, y);

      if (orbitRef.current.isDragging) {
        const dx = e.clientX - orbitRef.current.prevPointerX;
        const dy = e.clientY - orbitRef.current.prevPointerY;
        orbitRef.current.prevPointerX = e.clientX;
        orbitRef.current.prevPointerY = e.clientY;

        orbitRef.current.targetTheta -= dx * 0.007;
        orbitRef.current.targetPhi = Math.max(
          0.08,
          Math.min(Math.PI - 0.08, orbitRef.current.targetPhi - dy * 0.007)
        );
      }
    };

    const handlePointerUp = () => {
      orbitRef.current.isDragging = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * 0.004;
      orbitRef.current.targetRadius = Math.max(
        2.2,
        Math.min(16.0, orbitRef.current.targetRadius + zoomDelta)
      );
    };

    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('wheel', handleWheel, { passive: false });

    // 7. Resize Observer
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 8. Animation & Telemetry Loop
    let animationFrameId: number;
    let lastTime = performance.now();
    let frameCounter = 0;
    let fpsTimeAccum = 0;
    let currentFps = 60;
    let currentFrameTime = 16.6;

    const clock = new THREE.Clock();

    const renderLoop = (time: number) => {
      animationFrameId = requestAnimationFrame(renderLoop);

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // FPS tracking
      const frameDelta = time - lastTime;
      lastTime = time;
      frameCounter++;
      fpsTimeAccum += frameDelta;

      if (fpsTimeAccum >= 500) {
        currentFps = Math.round((frameCounter * 1000) / fpsTimeAccum);
        currentFrameTime = +(fpsTimeAccum / frameCounter).toFixed(1);
        frameCounter = 0;
        fpsTimeAccum = 0;

        if (renderer && camera) {
          onStatsUpdate({
            fps: currentFps,
            frameTimeMs: currentFrameTime,
            triangles: renderer.info.render.triangles,
            vertices: renderer.info.render.points + renderer.info.render.triangles * 3,
            drawCalls: renderer.info.render.calls,
            cameraPos: {
              x: +camera.position.x.toFixed(2),
              y: +camera.position.y.toFixed(2),
              z: +camera.position.z.toFixed(2),
            },
          });
        }
      }

      // Smooth Orbit Camera interpolation
      const orb = orbitRef.current;
      if (config.autoRotate && !orb.isDragging) {
        orb.targetTheta += delta * 0.3 * config.rotationSpeed;
      }

      const lerpFactor = 0.09;
      orb.currentTheta += (orb.targetTheta - orb.currentTheta) * lerpFactor;
      orb.currentPhi += (orb.targetPhi - orb.currentPhi) * lerpFactor;
      orb.currentRadius += (orb.targetRadius - orb.currentRadius) * lerpFactor;

      const sinPhi = Math.sin(orb.currentPhi);
      const cosPhi = Math.cos(orb.currentPhi);
      const sinTheta = Math.sin(orb.currentTheta);
      const cosTheta = Math.cos(orb.currentTheta);

      camera.position.x = orb.currentRadius * sinPhi * sinTheta;
      camera.position.y = orb.currentRadius * cosPhi;
      camera.position.z = orb.currentRadius * sinPhi * cosTheta;
      camera.lookAt(orb.lookAtTarget);

      // Animate Active World
      updateActiveWorldAnimation(elapsed, delta, config);

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('wheel', handleWheel);
      resizeObserver.disconnect();
      renderer.dispose();
    };
  }, []);

  // Helper: Build Quantum Core
  const buildQuantumCore = (group: THREE.Group) => {
    const rings: THREE.Mesh[] = [];

    // Outer Ring
    const geoOuter = new THREE.TorusGeometry(2.3, 0.06, 16, 96);
    const matOuter = createPhysicalMaterial('titanium', 'pbr');
    const ringOuter = new THREE.Mesh(geoOuter, matOuter);
    ringOuter.rotation.x = Math.PI / 3;
    group.add(ringOuter);
    rings.push(ringOuter);

    // Mid Ring
    const geoMid = new THREE.TorusGeometry(1.7, 0.05, 16, 80);
    const ringMid = new THREE.Mesh(geoMid, matOuter);
    ringMid.rotation.y = Math.PI / 4;
    group.add(ringMid);
    rings.push(ringMid);

    // Inner Ring
    const geoInner = new THREE.TorusGeometry(1.2, 0.04, 16, 64);
    const ringInner = new THREE.Mesh(geoInner, matOuter);
    ringInner.rotation.z = Math.PI / 6;
    group.add(ringInner);
    rings.push(ringInner);

    // Central Floating Crystal (Faceted Icosahedron)
    const crystalGeo = new THREE.IcosahedronGeometry(0.8, 0);
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0x93c5fd,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.85,
      ior: 1.5,
      thickness: 1.2,
      specularIntensity: 1.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const crystal = new THREE.Mesh(crystalGeo, crystalMat);
    group.add(crystal);

    // Orbiting Particles Cloud
    const particleCount = 1400;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.0 + Math.random() * 0.9;

      particlePos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePos[i * 3 + 2] = r * Math.cos(phi);

      // Cyan to Violet tint
      particleColors[i * 3] = 0.4 + Math.random() * 0.5;
      particleColors[i * 3 + 1] = 0.7 + Math.random() * 0.3;
      particleColors[i * 3 + 2] = 1.0;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    animObjectsRef.current.quantumRings = rings;
    animObjectsRef.current.quantumCrystal = crystal;
    animObjectsRef.current.quantumParticles = particles;
  };

  // Helper: Build Sculptural Monolith
  const buildSculpturalMonolith = (group: THREE.Group) => {
    const parts: { mesh: THREE.Object3D; basePos: THREE.Vector3; explodeDir: THREE.Vector3 }[] = [];

    // Part 1: Heavy Milled Chassis Base
    const baseGeo = new THREE.CylinderGeometry(1.6, 1.8, 0.4, 8);
    const baseMat = createPhysicalMaterial('titanium', 'pbr');
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.set(0, -1.2, 0);
    group.add(baseMesh);
    parts.push({ mesh: baseMesh, basePos: new THREE.Vector3(0, -1.2, 0), explodeDir: new THREE.Vector3(0, -1.5, 0) });

    // Part 2: Acoustic Resonator Core (Inner Chamfered Hex Core)
    const coreGeo = new THREE.DodecahedronGeometry(1.0, 0);
    const coreMat = createPhysicalMaterial('gold', 'pbr');
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.set(0, 0, 0);
    group.add(coreMesh);
    parts.push({ mesh: coreMesh, basePos: new THREE.Vector3(0, 0, 0), explodeDir: new THREE.Vector3(0, 0, 0) });

    // Part 3: Surrounding Radial Acoustic Fins (4 directional fins)
    const finDirections = [
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(-1, 0, 0),
      new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(0, 0, -1),
    ];

    finDirections.forEach((dir, idx) => {
      const finGeo = new THREE.BoxGeometry(0.3, 1.4, 0.7);
      const finMesh = new THREE.Mesh(finGeo, baseMat);
      const baseFinPos = dir.clone().multiplyScalar(1.3);
      finMesh.position.copy(baseFinPos);
      if (idx < 2) finMesh.rotation.y = Math.PI / 2;
      group.add(finMesh);
      parts.push({ mesh: finMesh, basePos: baseFinPos, explodeDir: dir.clone().multiplyScalar(2.0) });
    });

    // Part 4: Precision Acoustic Dome / Lens
    const lensGeo = new THREE.SphereGeometry(0.85, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
    const lensMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.9,
      roughness: 0.05,
      ior: 1.52,
      thickness: 0.6,
      transparent: true,
      opacity: 0.95,
    });
    const lensMesh = new THREE.Mesh(lensGeo, lensMat);
    lensMesh.position.set(0, 0.8, 0);
    group.add(lensMesh);
    parts.push({ mesh: lensMesh, basePos: new THREE.Vector3(0, 0.8, 0), explodeDir: new THREE.Vector3(0, 1.8, 0) });

    // Part 5: Top Clamping Ring
    const ringGeo = new THREE.TorusGeometry(0.9, 0.06, 16, 48);
    const ringMesh = new THREE.Mesh(ringGeo, createPhysicalMaterial('obsidian', 'pbr'));
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.set(0, 0.85, 0);
    group.add(ringMesh);
    parts.push({ mesh: ringMesh, basePos: new THREE.Vector3(0, 0.85, 0), explodeDir: new THREE.Vector3(0, 2.5, 0) });

    animObjectsRef.current.sculptureParts = parts;
  };

  // Helper: Build Parametric Terrain
  const buildParametricTerrain = (group: THREE.Group) => {
    const width = 14;
    const height = 14;
    const segments = 48;
    const planeGeo = new THREE.PlaneGeometry(width, height, segments, segments);
    planeGeo.rotateX(-Math.PI / 2);

    const positions = planeGeo.attributes.position.array as Float32Array;
    const origPos = new Float32Array(positions);

    const terrainMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      wireframe: false,
      roughness: 0.35,
      metalness: 0.8,
    });

    const terrainMesh = new THREE.Mesh(planeGeo, terrainMat);
    terrainMesh.position.y = -1.2;
    group.add(terrainMesh);

    // Add Architectural Beacon Towers
    const towerGeo = new THREE.BoxGeometry(0.4, 2.8, 0.4);
    const towerMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.2,
      metalness: 0.9,
      emissive: 0x0284c7,
      emissiveIntensity: 0.3,
    });

    const towerCoords = [
      [-3, -3],
      [3, -2],
      [-2, 3],
      [2.5, 3],
      [0, -4],
      [4, 2],
    ];

    towerCoords.forEach(([x, z]) => {
      const tower = new THREE.Mesh(towerGeo, towerMat);
      tower.position.set(x, 0.2, z);
      group.add(tower);
    });

    animObjectsRef.current.terrainPlane = terrainMesh;
    animObjectsRef.current.terrainOriginalPositions = origPos;
  };

  // Helper: Build Stellar Vortex
  const buildStellarVortex = (group: THREE.Group) => {
    const count = 9000;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const originalAngles = new Float32Array(count);
    const radii = new Float32Array(count);

    const colorInner = new THREE.Color(0x38bdf8); // Sky blue
    const colorMid = new THREE.Color(0xa855f7);   // Purple
    const colorOuter = new THREE.Color(0xf59e0b); // Amber

    for (let i = 0; i < count; i++) {
      // Logarithmic spiral distribution
      const r = Math.pow(Math.random(), 1.6) * 6.0 + 0.3;
      const angle = Math.random() * Math.PI * 2;
      const spiralOffset = r * 1.8;
      const finalAngle = angle + spiralOffset;

      const spreadY = (Math.random() - 0.5) * (0.8 / (r * 0.5 + 0.6));

      positions[i * 3] = r * Math.cos(finalAngle);
      positions[i * 3 + 1] = spreadY;
      positions[i * 3 + 2] = r * Math.sin(finalAngle);

      originalAngles[i] = finalAngle;
      radii[i] = r;

      // Color gradient by radius
      const t = Math.min(1, r / 6.0);
      const c = new THREE.Color();
      if (t < 0.5) {
        c.lerpColors(colorInner, colorMid, t * 2);
      } else {
        c.lerpColors(colorMid, colorOuter, (t - 0.5) * 2);
      }

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });

    const vortex = new THREE.Points(geo, mat);
    group.add(vortex);

    animObjectsRef.current.vortexPoints = vortex;
    animObjectsRef.current.vortexPositions = positions;
    animObjectsRef.current.vortexOriginalAngles = originalAngles;
    animObjectsRef.current.vortexRadii = radii;
  };

  // Helper: Create Physical Material based on presets
  const createPhysicalMaterial = (preset: SceneConfig['material'], shading: SceneConfig['shading']) => {
    const isWireframe = shading === 'wireframe';

    if (shading === 'matcap') {
      return new THREE.MeshNormalMaterial({
        wireframe: false,
      });
    }

    switch (preset) {
      case 'titanium':
        return new THREE.MeshStandardMaterial({
          color: 0xc8d1dc,
          metalness: 0.92,
          roughness: 0.22,
          wireframe: isWireframe,
        });
      case 'obsidian':
        return new THREE.MeshStandardMaterial({
          color: 0x121418,
          metalness: 0.4,
          roughness: 0.08,
          wireframe: isWireframe,
        });
      case 'gold':
        return new THREE.MeshStandardMaterial({
          color: 0xf59e0b,
          metalness: 0.95,
          roughness: 0.18,
          wireframe: isWireframe,
        });
      case 'frosted':
        return new THREE.MeshPhysicalMaterial({
          color: 0x93c5fd,
          metalness: 0.1,
          roughness: 0.35,
          transmission: 0.8,
          ior: 1.45,
          wireframe: isWireframe,
        });
    }
  };

  // Sync scene visibility & updates when config changes
  useEffect(() => {
    if (!groupsRef.current || !lightsRef.current) return;
    const { quantumGroup, sculptureGroup, terrainGroup, vortexGroup } = groupsRef.current;
    const { ambient, key, fill, rim, coreLight } = lightsRef.current;

    // 1. Visibility toggle
    quantumGroup.visible = config.mode === 'quantum';
    sculptureGroup.visible = config.mode === 'sculpture';
    terrainGroup.visible = config.mode === 'terrain';
    vortexGroup.visible = config.mode === 'vortex';

    // 2. Lighting Presets
    switch (config.lighting) {
      case 'studio':
        ambient.color.setHex(0xffffff);
        ambient.intensity = 0.45;
        key.color.setHex(0xfff6ea);
        key.intensity = 1.9;
        rim.color.setHex(0x38bdf8);
        rim.intensity = 2.0;
        coreLight.color.setHex(0x60a5fa);
        coreLight.intensity = 3.2;
        break;
      case 'cyber':
        ambient.color.setHex(0x1e1b4b);
        ambient.intensity = 0.3;
        key.color.setHex(0x06b6d4);
        key.intensity = 2.2;
        rim.color.setHex(0xec4899);
        rim.intensity = 3.0;
        coreLight.color.setHex(0x3b82f6);
        coreLight.intensity = 4.0;
        break;
      case 'sunset':
        ambient.color.setHex(0x451a03);
        ambient.intensity = 0.4;
        key.color.setHex(0xf97316);
        key.intensity = 2.4;
        rim.color.setHex(0xfde047);
        rim.intensity = 1.8;
        coreLight.color.setHex(0xf59e0b);
        coreLight.intensity = 2.8;
        break;
      case 'void':
        ambient.color.setHex(0xffffff);
        ambient.intensity = 0.2;
        key.color.setHex(0xffffff);
        key.intensity = 2.8;
        rim.color.setHex(0xa1a1aa);
        rim.intensity = 1.5;
        coreLight.color.setHex(0xffffff);
        coreLight.intensity = 2.0;
        break;
    }

    // 3. Update Materials in Sculpture & Quantum groups
    const updateMeshMaterial = (obj: THREE.Object3D) => {
      if (obj instanceof THREE.Mesh && !(obj.material instanceof THREE.MeshPhysicalMaterial && obj.material.transmission > 0.5)) {
        obj.material = createPhysicalMaterial(config.material, config.shading);
      }
      obj.children.forEach(updateMeshMaterial);
    };

    quantumGroup.children.forEach(child => {
      if (child !== animObjectsRef.current.quantumCrystal && child !== animObjectsRef.current.quantumParticles) {
        updateMeshMaterial(child);
      }
    });

    sculptureGroup.children.forEach(child => {
      // Keep glass lens transparent
      if (child.name !== 'lens') {
        updateMeshMaterial(child);
      }
    });

    // 4. Exploded View for Sculpture
    const parts = animObjectsRef.current.sculptureParts;
    parts.forEach(part => {
      part.mesh.position.lerpVectors(
        part.basePos,
        part.basePos.clone().add(part.explodeDir),
        config.explodedOffset
      );
    });
  }, [config.mode, config.lighting, config.material, config.shading, config.explodedOffset]);

  // Animation Update Helper
  const updateActiveWorldAnimation = (elapsed: number, delta: number, cfg: SceneConfig) => {
    const pulseFactor = cfg.pulseAudio ? Math.sin(elapsed * 8) * 0.15 + 1.0 : 1.0;

    // 1. Quantum Core
    if (cfg.mode === 'quantum') {
      const { quantumRings, quantumCrystal, quantumParticles } = animObjectsRef.current;
      quantumRings.forEach((ring, idx) => {
        const speed = (idx + 1) * 0.45;
        ring.rotation.x += delta * speed;
        ring.rotation.y += delta * speed * 0.8;
        ring.scale.setScalar(pulseFactor);
      });

      if (quantumCrystal) {
        quantumCrystal.rotation.x = elapsed * 0.3;
        quantumCrystal.rotation.y = elapsed * 0.5;
        const crystalScale = 1.0 + Math.sin(elapsed * 3) * 0.05 * pulseFactor;
        quantumCrystal.scale.setScalar(crystalScale);
      }

      if (quantumParticles) {
        quantumParticles.rotation.y = elapsed * 0.15;
      }
    }

    // 2. Sculptural Monolith
    if (cfg.mode === 'sculpture') {
      const parts = animObjectsRef.current.sculptureParts;
      if (cfg.pulseAudio && parts[1]) {
        // Acoustic core breathing
        parts[1].mesh.scale.setScalar(pulseFactor);
      }
    }

    // 3. Parametric Terrain
    if (cfg.mode === 'terrain') {
      const { terrainPlane, terrainOriginalPositions } = animObjectsRef.current;
      if (terrainPlane && terrainOriginalPositions) {
        const geo = terrainPlane.geometry as THREE.BufferGeometry;
        const posAttr = geo.attributes.position;
        const posArray = posAttr.array as Float32Array;

        for (let i = 0; i < posAttr.count; i++) {
          const x = terrainOriginalPositions[i * 3];
          const z = terrainOriginalPositions[i * 3 + 2];
          const dist = Math.sqrt(x * x + z * z);
          const wave =
            Math.sin(dist * 0.8 - elapsed * 2.5) * 0.4 +
            Math.cos(x * 0.5 + elapsed * 1.5) * 0.25;
          posArray[i * 3 + 1] = wave * (cfg.pulseAudio ? 1.4 : 1.0);
        }
        posAttr.needsUpdate = true;
        geo.computeVertexNormals();
      }
    }

    // 4. Stellar Vortex
    if (cfg.mode === 'vortex') {
      const { vortexPoints, vortexPositions, vortexOriginalAngles, vortexRadii } = animObjectsRef.current;
      if (vortexPoints && vortexPositions && vortexOriginalAngles && vortexRadii) {
        const geo = vortexPoints.geometry as THREE.BufferGeometry;
        const posAttr = geo.attributes.position;
        const count = vortexRadii.length;

        for (let i = 0; i < count; i++) {
          const r = vortexRadii[i];
          const origAngle = vortexOriginalAngles[i];
          const angularSpeed = 1.2 / (r + 0.4);
          const currentAngle = origAngle + elapsed * angularSpeed;

          vortexPositions[i * 3] = r * Math.cos(currentAngle);
          vortexPositions[i * 3 + 2] = r * Math.sin(currentAngle);

          if (cfg.pulseAudio) {
            vortexPositions[i * 3 + 1] = Math.sin(elapsed * 4 + r * 2) * 0.15;
          }
        }
        posAttr.needsUpdate = true;
      }
    }
  };

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing select-none overflow-hidden"
      aria-label="Interactive 3D WebGL Spatial Canvas"
    />
  );
};
