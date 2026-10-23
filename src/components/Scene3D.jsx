import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Studio Environment map loader for luxury chrome reflections
function useStudioEnvMap() {
  const [envMap, setEnvMap] = useState(null);

  useEffect(() => {
    const loader = new THREE.CubeTextureLoader();
    loader.load(
      [
        '/envmap/px.png',
        '/envmap/nx.png',
        '/envmap/py.png',
        '/envmap/ny.png',
        '/envmap/pz.png',
        '/envmap/nz.png',
      ],
      (texture) => {
        texture.mapping = THREE.CubeReflectionMapping;
        setEnvMap(texture);
      },
      undefined,
      (err) => {
        console.warn('Cube envmap fallback:', err);
      }
    );
  }, []);

  return envMap;
}

/**
 * 3D Flowing Animated Waves
 * Genuine 3D animated wave geometry with multi-harmonic displacement,
 * soft white/grey edge highlights, and subtle royal-gold (#D4AF37) crest accents.
 * Predominantly black, cinematic, fluid and non-distracting.
 */
function CinematicWaves({ envMap, mousePos, scrollProgress }) {
  const meshRef = useRef();
  const wireMeshRef = useRef();
  
  // Responsive geometry resolution for mobile performance
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const countX = isMobile ? 54 : 110;
  const countY = isMobile ? 40 : 80;

  // Cached initial plane coordinates
  const [basePositions, totalVertices] = useMemo(() => {
    const geom = new THREE.PlaneGeometry(42, 28, countX, countY);
    const pos = new Float32Array(geom.attributes.position.array);
    return [pos, geom.attributes.position.count];
  }, [countX, countY]);

  useFrame((state) => {
    if (prefersReducedMotion) return;
    const time = state.clock.getElapsedTime() * 0.32;
    const s = scrollProgress.current || 0;

    if (meshRef.current) {
      const posAttr = meshRef.current.geometry.attributes.position;
      const arr = posAttr.array;

      // Mouse influence with gentle damping
      const mx = mousePos.current.x * 2.5;
      const my = mousePos.current.y * 1.8;

      for (let i = 0; i < totalVertices; i++) {
        const x = basePositions[i * 3];
        const y = basePositions[i * 3 + 1];

        // Multi-layered organic wave equations for fluid continuous motion
        const wave1 = Math.sin(x * 0.22 + time * 0.75) * Math.cos(y * 0.26 + time * 0.55) * 1.25;
        const wave2 = Math.sin((x * 0.38 - y * 0.3) + time * 0.6) * 0.6;
        const wave3 = Math.cos((x * 0.15 + y * 0.35) - time * 0.35) * 0.45;
        
        // Subtle cursor ripple
        const dist = Math.hypot(x - mx, y - my);
        const mouseRipple = Math.sin(dist * 0.45 - time * 1.2) * Math.exp(-dist * 0.15) * 0.25;

        // Subtle scroll lift
        const scrollLift = Math.sin(x * 0.1 + s * Math.PI) * 0.2;

        arr[i * 3 + 2] = wave1 + wave2 + wave3 + mouseRipple + scrollLift;
      }

      posAttr.needsUpdate = true;
      meshRef.current.geometry.computeVertexNormals();

      // Mirror displacement to the contour wireframe
      if (wireMeshRef.current) {
        const wirePosAttr = wireMeshRef.current.geometry.attributes.position;
        wirePosAttr.array.set(arr);
        wirePosAttr.needsUpdate = true;
      }
    }
  });

  return (
    <group position={[0, -2.4, -2.8]} rotation={[-Math.PI / 2.35, 0, 0]}>
      {/* 1. Primary Solid Reflective Wave Surface */}
      <mesh ref={meshRef}>
        <planeGeometry args={[42, 28, countX, countY]} />
        <meshPhysicalMaterial
          color="#060709"
          metalness={0.92}
          roughness={0.24}
          clearcoat={1.0}
          clearcoatRoughness={0.12}
          reflectivity={0.95}
          envMap={envMap}
          envMapIntensity={1.8}
        />
      </mesh>

      {/* 2. Topographic Wave Contour Lines (White subtle accents) */}
      <mesh ref={wireMeshRef} position={[0, 0, 0.015]}>
        <planeGeometry args={[42, 28, countX, countY]} />
        <meshBasicMaterial
          color="#FFFFFF"
          wireframe
          transparent
          opacity={0.065}
        />
      </mesh>

      {/* 3. Subtle Gold Edge Silhouette Layer */}
      <mesh position={[0, 0, 0.025]}>
        <planeGeometry args={[42, 28, Math.floor(countX / 2), Math.floor(countY / 2)]} />
        <meshBasicMaterial
          color="#D4AF37"
          wireframe
          transparent
          opacity={0.045}
        />
      </mesh>
    </group>
  );
}

// 3D Sculpture Component: Chrome Monolith floating seamlessly in the spatial wave field
function ChromeMonolith({ envMap, scrollProgress, mousePos }) {
  const groupRef = useRef();
  const coreMeshRef = useRef();
  const [gltfModel, setGltfModel] = useState(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      '/models/scene.glb',
      (gltf) => {
        setGltfModel(gltf);
      },
      undefined,
      (err) => {
        console.warn('GLTF fallback to TorusKnot:', err);
      }
    );
  }, []);

  const chromeMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#dedede'),
      metalness: 0.98,
      roughness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 1.0,
      envMap: envMap,
      envMapIntensity: 2.6,
    });
  }, [envMap]);

  const goldAccentMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color('#D4AF37'),
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
  }, []);

  const { logoGeo, outlineGeo } = useMemo(() => {
    if (!gltfModel) return {};
    let lGeo, oGeo;
    gltfModel.scene.traverse((child) => {
      if (child.isMesh) {
        if (child.name === 'Alche_A') lGeo = child.geometry;
        if (child.name === 'Alche_Outline') oGeo = child.geometry;
      }
    });
    return { logoGeo: lGeo, outlineGeo: oGeo };
  }, [gltfModel]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const s = Math.min(Math.max(scrollProgress.current || 0, 0), 1);

    if (groupRef.current) {
      // Dynamic lateral placement across scroll to balance content
      let targetX = 0;
      let targetY = 0.2;
      let targetScale = 1.1;

      if (s < 0.15) {
        // Hero: Centered
        targetX = THREE.MathUtils.lerp(0, 0.4, s / 0.15);
        targetY = 0.2;
        targetScale = 1.15;
      } else if (s < 0.45) {
        // Services / Works: Right side
        targetX = 2.6;
        targetY = 0.3;
        targetScale = 0.95;
      } else if (s < 0.70) {
        // Portfolio / Approach: Left side
        targetX = -2.4;
        targetY = 0.1;
        targetScale = 1.0;
      } else {
        // Finale: Center
        targetX = 0;
        targetY = 0.3;
        targetScale = 1.2;
      }

      targetX += mousePos.current.x * 0.45;
      targetY += mousePos.current.y * 0.35;

      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);

      const curScale = groupRef.current.scale.x;
      const lerpedScale = THREE.MathUtils.lerp(curScale, targetScale, 0.05);
      groupRef.current.scale.set(lerpedScale, lerpedScale, lerpedScale);

      // Smooth cinematic rotation
      groupRef.current.rotation.y = time * 0.2 + s * Math.PI * 1.8 + mousePos.current.x * 0.25;
      groupRef.current.rotation.x = Math.sin(time * 0.15) * 0.1 + mousePos.current.y * 0.18;
    }

    if (coreMeshRef.current) {
      coreMeshRef.current.rotation.y = time * 0.25;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      {logoGeo ? (
        <group scale={3.0}>
          <mesh
            ref={coreMeshRef}
            geometry={logoGeo}
            material={chromeMaterial}
          />
          {outlineGeo && (
            <mesh
              geometry={outlineGeo}
              material={goldAccentMaterial}
              scale={1.015}
            />
          )}
        </group>
      ) : (
        <group ref={coreMeshRef}>
          <mesh material={chromeMaterial}>
            <torusKnotGeometry args={[1.25, 0.38, 140, 24, 2, 3]} />
          </mesh>
          <mesh scale={2.3}>
            <icosahedronGeometry args={[1, 0]} />
            <meshBasicMaterial
              color="#D4AF37"
              wireframe
              transparent
              opacity={0.25}
            />
          </mesh>
        </group>
      )}

      {/* Single Elegant Precision Orbital Ring with Gold Highlight */}
      <mesh rotation={[Math.PI / 3.2, 0, 0]}>
        <torusGeometry args={[3.2, 0.02, 16, 120]} />
        <meshStandardMaterial
          color="#D4AF37"
          emissive="#D4AF37"
          emissiveIntensity={0.65}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
}

// Interactive Cursor Specular Point Light (Glancing highlights across wave crests)
function MouseWaveSpecularLight({ mousePos }) {
  const lightRef = useRef();

  useFrame(() => {
    if (lightRef.current) {
      const targetX = mousePos.current.x * 7.5;
      const targetY = mousePos.current.y * 5.5;
      lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, targetX, 0.08);
      lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, targetY, 0.08);
    }
  });

  return (
    <pointLight
      ref={lightRef}
      position={[0, 0, 4.0]}
      intensity={3.2}
      color="#FFFFFF"
      distance={16}
    />
  );
}

// 3D Camera Rig with Damped Parallax
function CameraRig({ scrollProgress, mousePos }) {
  const { camera } = useThree();

  useFrame(() => {
    const s = Math.min(Math.max(scrollProgress.current || 0, 0), 1);

    const targetX = mousePos.current.x * 0.35 + Math.sin(s * Math.PI) * 0.5;
    const targetY = mousePos.current.y * 0.28 - Math.sin(s * Math.PI * 1.5) * 0.3;
    const targetZ = 7.4 - Math.sin(s * Math.PI) * 0.8;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.04);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.04);

    camera.lookAt(0, -0.4, 0);
  });

  return null;
}

// Check WebGL availability
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
}

export default function Scene3D({ scrollProgress }) {
  const mousePos = useRef({ x: 0, y: 0 });
  const envMap = useStudioEnvMap();
  const [hasWebGL] = useState(() => isWebGLAvailable());

  useEffect(() => {
    const onMove = (e) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  if (!hasWebGL) {
    return (
      <div id="gl-canvas-container" aria-hidden="true" style={{ background: '#000000', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 90% 60% at 50% 40%, rgba(20,22,28,0.7) 0%, rgba(5,6,8,0.95) 60%, #000000 100%)',
          filter: 'contrast(120%)'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-15%',
          left: '-20%',
          right: '-20%',
          height: '70%',
          background: 'radial-gradient(ellipse 60% 30% at 50% 100%, rgba(212,175,55,0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
      </div>
    );
  }

  return (
    <div id="gl-canvas-container" aria-hidden="true">
      <Canvas
        camera={{ position: [0, -0.4, 7.4], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
        dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2)]}
      >
        <color attach="background" args={['#000000']} />

        {/* Cinematic Directional Studio Lighting for Wave Ridges */}
        <ambientLight intensity={0.45} />
        
        {/* Soft white grazing light for wave crests */}
        <directionalLight position={[10, 16, 8]} intensity={2.4} color="#FFFFFF" />
        
        {/* Subtle royal-gold rim light for selected wave silhouettes */}
        <directionalLight position={[-12, -4, -4]} intensity={1.5} color="#D4AF37" />
        
        {/* Soft warm champagne fill light */}
        <pointLight position={[8, -8, 4]} intensity={1.4} color="#F3E5AB" distance={24} />

        {/* Real-time Cursor Highlight Light */}
        <MouseWaveSpecularLight mousePos={mousePos} />

        {/* Camera Rig */}
        <CameraRig scrollProgress={scrollProgress} mousePos={mousePos} />

        {/* 1. Genuine 3D Organic Animated Waves (Predominantly black, fluid displacement) */}
        <CinematicWaves
          envMap={envMap}
          mousePos={mousePos}
          scrollProgress={scrollProgress}
        />

        {/* 2. Chrome Monolith Sculpture */}
        <ChromeMonolith
          envMap={envMap}
          scrollProgress={scrollProgress}
          mousePos={mousePos}
        />
      </Canvas>
    </div>
  );
}
