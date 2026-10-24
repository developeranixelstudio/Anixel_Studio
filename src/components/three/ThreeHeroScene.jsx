import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function CentralCore() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useFrame((state) => {
    if (!outerRef.current || !innerRef.current) return;
    const t = state.clock.getElapsedTime();
    outerRef.current.rotation.x = t * 0.09;
    outerRef.current.rotation.y = t * 0.14;
    innerRef.current.rotation.x = -t * 0.11;
    innerRef.current.rotation.y = -t * 0.17;
  });

  return (
    <group position={[2.6, 0.2, -1.5]}>
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.7, 1]} />
        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.9}
          roughness={0.1}
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[1.1, 2]} />
        <MeshDistortMaterial
          color="#D4AF37"
          metalness={1}
          roughness={0.05}
          distort={0.35}
          speed={2.5}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

function FloatingTorusKnot() {
  const knotRef = useRef(null);

  useFrame((state) => {
    if (!knotRef.current) return;
    const t = state.clock.getElapsedTime();
    knotRef.current.rotation.x = t * 0.07;
    knotRef.current.rotation.y = t * 0.12;
    knotRef.current.rotation.z = t * 0.05;
  });

  return (
    <mesh ref={knotRef} position={[-3.2, -0.8, -2.5]}>
      <torusKnotGeometry args={[0.85, 0.22, 120, 16]} />
      <meshStandardMaterial
        color="#B8942A"
        metalness={0.95}
        roughness={0.08}
        transparent
        opacity={0.55}
      />
    </mesh>
  );
}

function OrbitalRings() {
  const r1Ref = useRef(null);
  const r2Ref = useRef(null);

  useFrame((state) => {
    if (!r1Ref.current || !r2Ref.current) return;
    const t = state.clock.getElapsedTime();
    r1Ref.current.rotation.x = Math.sin(t * 0.06) * 0.5 + 0.4;
    r1Ref.current.rotation.y = t * 0.05;
    r2Ref.current.rotation.x = Math.cos(t * 0.07) * 0.4 - 0.3;
    r2Ref.current.rotation.y = -t * 0.04;
    r2Ref.current.rotation.z = 0.03;
  });

  return (
    <>
      <mesh ref={r1Ref} position={[0, 0, -5]}>
        <torusGeometry args={[3.5, 0.012, 2, 100]} />
        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.22}
        />
      </mesh>
      <mesh ref={r2Ref} position={[0.5, 0, -4.5]}>
        <torusGeometry args={[2.8, 0.008, 2, 100]} />
        <meshStandardMaterial
          color="#F3E5AB"
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.15}
        />
      </mesh>
    </>
  );
}

function FloatingGeometryCluster() {
  const groupRef = useRef(null);
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, () => ({
        pos: [
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 7,
          (Math.random() - 0.5) * 5 - 2,
        ],
        speed: 0.25 + Math.random() * 0.55,
        phase: Math.random() * Math.PI * 2,
        size: 0.03 + Math.random() * 0.06,
        shape: Math.random() > 0.5 ? 'sphere' : 'box',
      })),
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.children.forEach((mesh, i) => {
      const p = particles[i];
      if (!p) return;
      mesh.position.y = p.pos[1] + Math.sin(t * p.speed + p.phase) * 0.5;
      mesh.position.x = p.pos[0] + Math.cos(t * p.speed * 0.6 + p.phase) * 0.35;
      mesh.rotation.x = t * p.speed * 0.4;
      mesh.rotation.y = t * p.speed * 0.6;
    });
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, idx) => (
        <mesh key={idx} position={p.pos}>
          {p.shape === 'sphere' ? (
            <sphereGeometry args={[p.size, 6, 6]} />
          ) : (
            <octahedronGeometry args={[p.size * 1.2, 0]} />
          )}
          <meshStandardMaterial
            color="#D4AF37"
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.55}
          />
        </mesh>
      ))}
    </group>
  );
}

function PerspectiveGrid() {
  const gridRef = useRef(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z =
        ((state.clock.getElapsedTime() * 0.4) % 2.5) - 9;
    }
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[30, 30, '#D4AF37', '#3A2F00']}
      position={[0, -2.8, -7]}
    />
  );
}

export function ThreeHeroScene() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 58 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.15} />
        <pointLight position={[5, 4, 3]} intensity={4} color="#D4AF37" />
        <pointLight position={[-4, -3, 2]} intensity={2} color="#F3E5AB" />
        <pointLight position={[0, 6, -2]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[3, 5, 2]} intensity={1} color="#D4AF37" />

        <Float speed={1} rotationIntensity={0.3} floatIntensity={0.7}>
          <CentralCore />
        </Float>

        <Float speed={0.7} rotationIntensity={0.25} floatIntensity={0.5}>
          <FloatingTorusKnot />
        </Float>

        <OrbitalRings />
        <FloatingGeometryCluster />
        <PerspectiveGrid />

        <Sparkles
          count={80}
          scale={[14, 9, 5]}
          size={1.4}
          speed={0.3}
          color="#D4AF37"
          opacity={0.6}
        />
      </Canvas>
    </div>
  );
}

export default ThreeHeroScene;
