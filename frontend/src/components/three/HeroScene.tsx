"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function Network({ count, isMobile }: { count: number; isMobile: boolean }) {
  const group = useRef<THREE.Group>(null!);
  const { viewport } = useThree();

  const { points, lines } = useMemo(() => {
    const R = 2;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      pts.push(
        new THREE.Vector3(Math.cos(golden * i) * r, y, Math.sin(golden * i) * r).multiplyScalar(R)
      );
    }
    const spacing = Math.sqrt((4 * Math.PI * R * R) / count);
    const seg: number[] = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (pts[i].distanceTo(pts[j]) < spacing * 1.5) {
          seg.push(...pts[i].toArray(), ...pts[j].toArray());
        }
      }
    }
    return {
      points: new Float32Array(pts.flatMap((p) => p.toArray())),
      lines: new Float32Array(seg),
    };
  }, [count]);

  useFrame((state, delta) => {
    const g = group.current;
    const targetX = isMobile ? 0 : viewport.width * 0.27;
    g.rotation.y += delta * 0.15;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -state.pointer.y * 0.5, 0.05);
    g.position.x = THREE.MathUtils.lerp(g.position.x, state.pointer.x * 0.4 + targetX, 0.05);
    const s = 1 + (window.scrollY / window.innerHeight) * 0.4;
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, s, 0.1));
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#D4AF37" size={0.07} sizeAttenuation />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#D4AF37" transparent opacity={0.25} />
      </lineSegments>
      <mesh>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.6}
          roughness={0.3}
          emissive="#D4AF37"
          emissiveIntensity={0.35}
        />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <Canvas
      dpr={[1, isMobile ? 1.25 : 1.5]}
      camera={{ position: [0, 0, 6.5], fov: 45 }}
      gl={{ antialias: !isMobile, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={60} color="#F1D77A" />
      <pointLight position={[-5, -3, 2]} intensity={30} />
      <Network count={isMobile ? 60 : 140} isMobile={isMobile} />
    </Canvas>
  );
}