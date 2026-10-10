import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Group for rotating geometries
    const group = new THREE.Group();
    scene.add(group);

    // 1. Floating Octahedrons and Icosahedrons with emerald wireframe / glass
    const geo1 = new THREE.IcosahedronGeometry(2.8, 1);
    const mat1 = new THREE.MeshStandardMaterial({
      color: 0x044541,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: true,
    });
    const mesh1 = new THREE.Mesh(geo1, mat1);
    mesh1.position.set(6, 3, -4);
    group.add(mesh1);

    const geo2 = new THREE.TorusGeometry(3.5, 0.08, 16, 100);
    const mat2 = new THREE.MeshBasicMaterial({
      color: 0x0d827b,
      transparent: true,
      opacity: 0.45,
    });
    const mesh2 = new THREE.Mesh(geo2, mat2);
    mesh2.position.set(-6, -2, -3);
    mesh2.rotation.x = Math.PI / 3;
    group.add(mesh2);

    const geo3 = new THREE.OctahedronGeometry(2.0, 0);
    const mat3 = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const mesh3 = new THREE.Mesh(geo3, mat3);
    mesh3.position.set(-7, 4, -5);
    group.add(mesh3);

    // 2. Star particle swarm
    const particleCount = 650;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 35;
      posArray[i + 1] = (Math.random() - 0.5) * 25;
      posArray[i + 2] = (Math.random() - 0.5) * 20;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.07,
      color: 0x2dd4bf,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x044541, 4, 30);
    pointLight.position.set(2, 5, 8);
    scene.add(pointLight);

    const redLight = new THREE.PointLight(0xef4444, 1.5, 20);
    redLight.position.set(-5, -4, 5);
    scene.add(redLight);

    // Mouse movement interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.4;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      mesh1.rotation.x += 0.003;
      mesh1.rotation.y += 0.005;

      mesh2.rotation.x += 0.002;
      mesh2.rotation.y += 0.004;

      mesh3.rotation.y += 0.004;
      mesh3.rotation.z += 0.003;

      particles.rotation.y += 0.0006;

      // Subtle parallax response to mouse
      group.rotation.x += (mouseY * 0.3 - group.rotation.x) * 0.05;
      group.rotation.y += (mouseX * 0.3 - group.rotation.y) * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-70 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
};
