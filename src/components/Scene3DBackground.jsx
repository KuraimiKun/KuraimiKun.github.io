import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Scene3DBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId;
    let renderer;

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      // Fallback if WebGL is unavailable
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090d16, 0.032);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.set(0, 0, 14);

    // Ambient + Point Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x6366f1, 4, 35);
    pointLight1.position.set(8, 6, 8);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x22d3ee, 3.5, 35);
    pointLight2.position.set(-8, -6, 6);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xa855f7, 2.5, 30);
    pointLight3.position.set(0, 8, -6);
    scene.add(pointLight3);

    // Master Group that moves/rotates with scroll and cursor
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // 1. Cybernetic Core Group (Positioned slightly right on desktop hero, shifts on scroll)
    const coreGroup = new THREE.Group();
    coreGroup.position.set(width > 1024 ? 3.8 : 0, 0.4, 0);
    worldGroup.add(coreGroup);

    // Outer Wireframe Icosahedron
    const outerGeo = new THREE.IcosahedronGeometry(2.35, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(outerMesh);

    // Inner Faceted Crystal Octahedron
    const innerGeo = new THREE.OctahedronGeometry(1.25, 0);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0x22d3ee,
      emissive: 0x1e1b4b,
      emissiveIntensity: 0.6,
      metalness: 0.3,
      roughness: 0.15,
      wireframe: false,
      transparent: true,
      opacity: 0.32,
      flatShading: true,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // Inner Glowing Edges
    const innerEdgesGeo = new THREE.EdgesGeometry(innerGeo);
    const innerEdgesMat = new THREE.LineBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.65,
    });
    const innerEdges = new THREE.LineSegments(innerEdgesGeo, innerEdgesMat);
    innerMesh.add(innerEdges);

    // 2. Three Gyroscopic Orbital Rings
    const rings = [];
    const ringConfigs = [
      { radius: 3.1, tube: 0.014, color: 0x6366f1, opacity: 0.35, rx: 1.1, ry: 0.4, speed: 0.4 },
      { radius: 3.65, tube: 0.012, color: 0x22d3ee, opacity: 0.28, rx: -0.7, ry: 0.9, speed: -0.3 },
      { radius: 4.25, tube: 0.01, color: 0xa855f7, opacity: 0.2, rx: 0.4, ry: -1.2, speed: 0.22 },
    ];

    ringConfigs.forEach((cfg) => {
      const geo = new THREE.TorusGeometry(cfg.radius, cfg.tube, 16, 100);
      const mat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: cfg.opacity,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = cfg.rx;
      mesh.rotation.y = cfg.ry;
      coreGroup.add(mesh);
      rings.push({ mesh, speed: cfg.speed });
    });

    // 3. Floating 3D Geometric Satellites distributed in 3D space
    const satellites = [];
    const satGeometries = [
      new THREE.OctahedronGeometry(0.28, 0),
      new THREE.TetrahedronGeometry(0.32, 0),
      new THREE.IcosahedronGeometry(0.26, 0),
      new THREE.BoxGeometry(0.34, 0.34, 0.34),
    ];
    const satColors = [0x6366f1, 0x22d3ee, 0xa855f7, 0x34d399];

    for (let i = 0; i < 14; i++) {
      const geo = satGeometries[i % satGeometries.length];
      const mat = new THREE.MeshBasicMaterial({
        color: satColors[i % satColors.length],
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });
      const mesh = new THREE.Mesh(geo, mat);
      const angle = (i / 14) * Math.PI * 2;
      const dist = 5.5 + (i % 4) * 2.4;
      const ySpread = (Math.random() - 0.5) * 14;
      const zSpread = (Math.random() - 0.5) * 8 - 2;
      mesh.position.set(Math.cos(angle) * dist, ySpread, zSpread);
      worldGroup.add(mesh);
      satellites.push({
        mesh,
        baseY: ySpread,
        angle,
        dist,
        floatSpeed: 0.6 + (i % 5) * 0.25,
        rotSpeedX: (Math.random() - 0.5) * 0.02,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
      });
    }

    // 4. 3D Starfield / Neural Particle Field
    const particleCount = 900;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const palette = [
      new THREE.Color(0x6366f1),
      new THREE.Color(0x22d3ee),
      new THREE.Color(0xa855f7),
      new THREE.Color(0x94a3b8),
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 42;
      positions[i3 + 1] = (Math.random() - 0.5) * 42;
      positions[i3 + 2] = (Math.random() - 0.5) * 26 - 4;

      const c = palette[i % palette.length];
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.065,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);

    // Interaction state
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollProgress = 0;
    let targetScrollProgress = 0;
    let pulseEnergy = 0;

    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      targetScrollProgress = window.scrollY / maxScroll;
    };

    const handleClick = () => {
      pulseEnergy = 1.0;
    };

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (document.hidden) return;

      const elapsed = clock.getElapsedTime();

      // Smooth interpolation for mouse & scroll
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
      scrollProgress += (targetScrollProgress - scrollProgress) * 0.06;
      pulseEnergy *= 0.93;

      // Rotate Core & Rings
      const speedBoost = 1 + pulseEnergy * 3.5;
      outerMesh.rotation.x = elapsed * 0.16 * speedBoost + scrollProgress * 2.5;
      outerMesh.rotation.y = elapsed * 0.22 * speedBoost + mouse.x * 0.6;

      innerMesh.rotation.x = -elapsed * 0.3 * speedBoost + mouse.y * 0.5;
      innerMesh.rotation.y = -elapsed * 0.38 * speedBoost - scrollProgress * 3.0;

      const scaleWave = 1 + Math.sin(elapsed * 1.8) * 0.05 + pulseEnergy * 0.22;
      coreGroup.scale.setScalar(scaleWave);

      // Shift core smoothly across the viewport as user scrolls down sections
      const isDesktop = window.innerWidth > 1024;
      const baseCoreX = isDesktop ? Math.cos(scrollProgress * Math.PI * 2) * 3.6 : 0;
      const baseCoreY = Math.sin(scrollProgress * Math.PI * 3) * 1.4;
      const baseCoreZ = -Math.sin(scrollProgress * Math.PI) * 3.5;

      coreGroup.position.x += (baseCoreX + mouse.x * 0.9 - coreGroup.position.x) * 0.05;
      coreGroup.position.y += (baseCoreY + mouse.y * 0.7 - coreGroup.position.y) * 0.05;
      coreGroup.position.z += (baseCoreZ - coreGroup.position.z) * 0.05;

      rings.forEach((r, idx) => {
        r.mesh.rotation.z += 0.004 * r.speed * speedBoost;
        r.mesh.rotation.x += 0.002 * r.speed;
        const ringPulse = 1 + pulseEnergy * (0.12 + idx * 0.06);
        r.mesh.scale.setScalar(ringPulse);
      });

      // Animate Satellites
      satellites.forEach((s, idx) => {
        s.mesh.rotation.x += s.rotSpeedX * speedBoost;
        s.mesh.rotation.y += s.rotSpeedY * speedBoost;
        s.mesh.position.y =
          s.baseY +
          Math.sin(elapsed * s.floatSpeed + idx) * 0.8 +
          scrollProgress * 6 * (idx % 2 === 0 ? 1 : -1);
      });

      // Gently rotate starfield & camera with scroll + cursor
      particleSystem.rotation.y = elapsed * 0.02 + scrollProgress * 1.2 + mouse.x * 0.12;
      particleSystem.rotation.x = scrollProgress * 0.6 + mouse.y * 0.08;

      camera.position.x = mouse.x * 0.8;
      camera.position.y = mouse.y * 0.5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
}
