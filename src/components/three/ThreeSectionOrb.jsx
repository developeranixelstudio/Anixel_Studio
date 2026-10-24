import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

function OrbMesh({ color = '#D4AF37', shape = 'icosahedron', speed = 1 }) {
  const meshRef = useRef(null);
  const wireRef = useRef(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * speed * 0.28;
    meshRef.current.rotation.y = t * speed * 0.44;
    if (wireRef.current) {
      wireRef.current.rotation.x = -t * speed * 0.2;
      wireRef.current.rotation.y = -t * speed * 0.35;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <group>
        {/* Core Distorted Metallic Mesh */}
        <mesh ref={meshRef}>
          {shape === 'icosahedron' && <icosahedronGeometry args={[0.8, 1]} />}
          {shape === 'octahedron' && <octahedronGeometry args={[0.8, 0]} />}
          {shape === 'torus' && <torusGeometry args={[0.7, 0.2, 12, 30]} />}
          <MeshDistortMaterial
            color={color}
            metalness={1}
            roughness={0.05}
            distort={0.3}
            speed={2}
            transparent
            opacity={0.65}
          />
        </mesh>

        {/* Outer Wireframe Hull */}
        <mesh ref={wireRef}>
          {shape === 'icosahedron' && <icosahedronGeometry args={[1.05, 1]} />}
          {shape === 'octahedron' && <octahedronGeometry args={[1.05, 0]} />}
          {shape === 'torus' && <torusGeometry args={[0.9, 0.25, 8, 24]} />}
          <meshStandardMaterial
            color={color}
            metalness={0.8}
            roughness={0.15}
            wireframe
            transparent
            opacity={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
}

export function ThreeSectionOrb({ size = 180, color = '#D4AF37', shape = 'icosahedron', speed = 0.8, style }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        width: size,
        height: size,
        pointerEvents: 'none',
        opacity: 0.8,
        ...style,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 46 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[3, 3, 3]} intensity={6} color="#D4AF37" />
        <pointLight position={[-2, -2, 1]} intensity={2} color="#F3E5AB" />
        <OrbMesh color={color} shape={shape} speed={speed} />
      </Canvas>
    </div>
  );
}

export default ThreeSectionOrb;
