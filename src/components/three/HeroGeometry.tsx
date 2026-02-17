"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import type { Mesh } from "three";

function DistortedSphere() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.8, 8]} />
        <MeshDistortMaterial
          color="#0a0a0f"
          emissive="#00ffff"
          emissiveIntensity={0.15}
          wireframe
          distort={0.3}
          speed={2}
          roughness={0.2}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.82, 8]} />
        <MeshDistortMaterial
          color="#00ffff"
          transparent
          opacity={0.03}
          distort={0.3}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

export function HeroGeometry() {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none opacity-60">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#00ffff" />
        <pointLight position={[-5, -5, 5]} intensity={0.3} color="#7b61ff" />
        <DistortedSphere />
      </Canvas>
    </div>
  );
}
