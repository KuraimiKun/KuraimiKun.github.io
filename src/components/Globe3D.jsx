import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function latLngToVector3(lat, lng, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

export default function Globe3D({ locations, activeId, onSelectLocation }) {
  const mountRef = useRef(null);
  const targetRotationRef = useRef({ x: 0.25, y: -2.1 });
  const autoRotateRef = useRef(true);
  const markerMeshesRef = useRef({});

  // Update target rotation whenever activeId changes
  useEffect(() => {
    const loc = locations.find((l) => l.id === activeId);
    if (!loc) return;
    const { lat, lng } = loc.coordinates;
    // Rotate globe so that (lat, lng) faces camera (+Z)
    const targetY = -((lng + 90) * (Math.PI / 180));
    const targetX = lat * (Math.PI / 180) * 0.65;
    targetRotationRef.current = { x: targetX, y: targetY };
    autoRotateRef.current = false;
  }, [activeId, locations]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationId;
    let renderer;

    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }

    const width = container.clientWidth || 420;
    const height = container.clientHeight || 420;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x22d3ee, 2.2);
    dirLight.position.set(5, 4, 6);
    scene.add(dirLight);

    const rimLight = new THREE.PointLight(0xa855f7, 2.5, 15);
    rimLight.position.set(-5, -3, 4);
    scene.add(rimLight);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const RADIUS = 1.95;

    // 1. Inner Core Sphere (Translucent dark ocean)
    const sphereGeo = new THREE.SphereGeometry(RADIUS * 0.985, 48, 48);
    const sphereMat = new THREE.MeshPhongMaterial({
      color: 0x0b132b,
      emissive: 0x0f172a,
      specular: 0x38bdf8,
      shininess: 28,
      transparent: true,
      opacity: 0.92,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(sphereMesh);

    // 2. Wireframe Lat/Lng Grid
    const wireGeo = new THREE.SphereGeometry(RADIUS * 0.992, 24, 18);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.14,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    globeGroup.add(wireMesh);

    // 3. Fibonacci Hologram Surface Dots
    const dotCount = 1500;
    const dotPositions = new Float32Array(dotCount * 3);
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < dotCount; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / dotCount);
      const x = RADIUS * Math.sin(phi) * Math.cos(theta);
      const y = RADIUS * Math.cos(phi);
      const z = RADIUS * Math.sin(phi) * Math.sin(theta);
      dotPositions[i * 3] = x;
      dotPositions[i * 3 + 1] = y;
      dotPositions[i * 3 + 2] = z;
    }

    const dotsGeo = new THREE.BufferGeometry();
    dotsGeo.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3));
    const dotsMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.025,
      transparent: true,
      opacity: 0.45,
    });
    const dotsCloud = new THREE.Points(dotsGeo, dotsMat);
    globeGroup.add(dotsCloud);

    // 4. Outer Atmosphere Halo Ring
    const haloGeo = new THREE.RingGeometry(RADIUS * 1.03, RADIUS * 1.12, 64);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.18,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    scene.add(haloMesh);

    // 5. Location Markers & Pulsing Rings
    const markerMeshes = {};
    const pulseRings = [];

    locations.forEach((loc) => {
      const pos = latLngToVector3(loc.coordinates.lat, loc.coordinates.lng, RADIUS);
      const colorObj = new THREE.Color(loc.color || '#22d3ee');

      // Marker Pin Sphere
      const pinGeo = new THREE.SphereGeometry(0.065, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({ color: colorObj });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(pos);
      pinMesh.userData = { id: loc.id };
      globeGroup.add(pinMesh);

      // Glowing Spike / Beacon
      const normal = pos.clone().normalize();
      const beaconHeight = 0.28;
      const beaconGeo = new THREE.CylinderGeometry(0.008, 0.03, beaconHeight, 8);
      beaconGeo.translate(0, beaconHeight / 2, 0);
      beaconGeo.rotateX(Math.PI / 2);
      const beaconMat = new THREE.MeshBasicMaterial({
        color: colorObj,
        transparent: true,
        opacity: 0.85,
      });
      const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
      beaconMesh.position.copy(pos);
      beaconMesh.lookAt(pos.clone().add(normal));
      globeGroup.add(beaconMesh);

      // Surface Pulse Ring
      const pRingGeo = new THREE.RingGeometry(0.08, 0.13, 32);
      const pRingMat = new THREE.MeshBasicMaterial({
        color: colorObj,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75,
      });
      const pRingMesh = new THREE.Mesh(pRingGeo, pRingMat);
      pRingMesh.position.copy(pos.clone().multiplyScalar(1.005));
      pRingMesh.lookAt(pos.clone().multiplyScalar(2));
      globeGroup.add(pRingMesh);

      pulseRings.push({ mesh: pRingMesh, id: loc.id });
      markerMeshes[loc.id] = { pinMesh, beaconMesh, pRingMesh };
    });

    markerMeshesRef.current = markerMeshes;

    // 6. 3D Curved Flight Arcs connecting milestones sequentially + Traveling Packets
    const arcPackets = [];
    for (let i = 0; i < locations.length - 1; i++) {
      const startLoc = locations[i];
      const endLoc = locations[i + 1];
      const startVec = latLngToVector3(
        startLoc.coordinates.lat,
        startLoc.coordinates.lng,
        RADIUS
      );
      const endVec = latLngToVector3(
        endLoc.coordinates.lat,
        endLoc.coordinates.lng,
        RADIUS
      );

      const distance = startVec.distanceTo(endVec);
      const midVec = startVec
        .clone()
        .add(endVec)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(RADIUS + distance * 0.38);

      const curve = new THREE.QuadraticBezierCurve3(startVec, midVec, endVec);
      const points = curve.getPoints(48);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
      const arcMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(endLoc.color || '#22d3ee'),
        transparent: true,
        opacity: 0.65,
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      globeGroup.add(arcLine);

      // Animated energy orb traveling along the arc
      const packetGeo = new THREE.SphereGeometry(0.038, 12, 12);
      const packetMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
      });
      const packetMesh = new THREE.Mesh(packetGeo, packetMat);
      globeGroup.add(packetMesh);
      arcPackets.push({
        mesh: packetMesh,
        curve,
        offset: i * 0.25,
        speed: 0.32,
      });
    }

    // Pointer drag & click raycasting
    let isDragging = false;
    let prevPointer = { x: 0, y: 0 };
    let dragDistance = 0;
    const raycaster = new THREE.Raycaster();
    const pointerNDC = new THREE.Vector2();

    const onPointerDown = (e) => {
      isDragging = true;
      dragDistance = 0;
      prevPointer = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - prevPointer.x;
      const dy = e.clientY - prevPointer.y;
      dragDistance += Math.abs(dx) + Math.abs(dy);
      targetRotationRef.current.y += dx * 0.007;
      targetRotationRef.current.x = Math.max(
        -1.1,
        Math.min(1.1, targetRotationRef.current.x + dy * 0.007)
      );
      prevPointer = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = (e) => {
      if (isDragging && dragDistance < 6 && onSelectLocation) {
        const rect = renderer.domElement.getBoundingClientRect();
        pointerNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointerNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointerNDC, camera);
        const clickablePins = Object.values(markerMeshes).map((m) => m.pinMesh);
        const intersects = raycaster.intersectObjects(clickablePins, false);
        if (intersects.length > 0) {
          const hitId = intersects[0].object.userData?.id;
          if (hitId) onSelectLocation(hitId);
        }
      }
      isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 420;
      const h = container.clientHeight || 420;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (document.hidden) return;

      const elapsed = clock.getElapsedTime();

      // Smoothly interpolate globe rotation toward target
      globeGroup.rotation.y +=
        (targetRotationRef.current.y - globeGroup.rotation.y) * 0.06;
      globeGroup.rotation.x +=
        (targetRotationRef.current.x - globeGroup.rotation.x) * 0.06;

      // Pulse marker rings
      pulseRings.forEach((p, idx) => {
        const scale = 1 + ((elapsed * 1.4 + idx * 0.3) % 1) * 1.8;
        p.mesh.scale.setScalar(scale);
        p.mesh.material.opacity = Math.max(0, 0.85 - (scale - 1) * 0.45);
      });

      // Move light packets along flight arcs
      arcPackets.forEach((pkt) => {
        const t = (elapsed * pkt.speed + pkt.offset) % 1;
        const pos = pkt.curve.getPointAt(t);
        pkt.mesh.position.copy(pos);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      domEl.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, [locations, onSelectLocation]);

  // Highlight active marker scale
  useEffect(() => {
    Object.entries(markerMeshesRef.current).forEach(([id, meshes]) => {
      const isActive = id === activeId;
      meshes.pinMesh.scale.setScalar(isActive ? 1.65 : 1.0);
      meshes.beaconMesh.scale.setScalar(isActive ? 1.5 : 1.0);
    });
  }, [activeId]);

  return (
    <div className="relative w-full h-[360px] sm:h-[420px] select-none cursor-grab active:cursor-grabbing">
      <div ref={mountRef} className="w-full h-full" />
      <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-surface/80 border border-white/10 text-[11px] font-mono text-slate-400 whitespace-nowrap">
        Drag to rotate 3D Globe • Click any hub below to fly there
      </div>
    </div>
  );
}
