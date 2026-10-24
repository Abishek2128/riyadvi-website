"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type SceneType = "web" | "app" | "marketing" | "arvr" | "model" | "uiux";

const GOLD = "#D4AF37";

function Gold({ glow = 0.3 }: { glow?: number }) {
  return (
    <meshStandardMaterial
      color={GOLD}
      metalness={0.6}
      roughness={0.35}
      emissive={GOLD}
      emissiveIntensity={glow}
    />
  );
}

function Dark() {
  return <meshStandardMaterial color="#141414" metalness={0.5} roughness={0.5} />;
}

/* Web: floating browser windows */
function Web() {
  const refs = useRef<(THREE.Group | null)[]>([]);
  useFrame((s) => {
    refs.current.forEach((g, i) => {
      if (g) g.position.y = Math.sin(s.clock.elapsedTime * 0.8 + i * 1.5) * 0.18;
    });
  });
  return (
    <group rotation={[0, -0.35, 0]}>
      {[0, 1, 2].map((i) => (
        <group
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          position={[i * 0.8 - 0.8, 0, 0.9 - i * 0.9]}
        >
          <mesh>
            <boxGeometry args={[3, 2, 0.06]} />
            <Dark />
          </mesh>
          <mesh position={[0, 0.88, 0.04]}>
            <boxGeometry args={[3, 0.22, 0.04]} />
            <Gold />
          </mesh>
          <mesh position={[-0.7, 0.1, 0.04]}>
            <boxGeometry args={[1.2, 0.8, 0.02]} />
            <Gold glow={0.15} />
          </mesh>
          <mesh position={[0.6, 0.3, 0.04]}>
            <boxGeometry args={[1.1, 0.14, 0.02]} />
            <Gold glow={0.1} />
          </mesh>
          <mesh position={[0.6, -0.05, 0.04]}>
            <boxGeometry args={[1.1, 0.14, 0.02]} />
            <Gold glow={0.1} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* App: rotating phone */
function App() {
  const phone = useRef<THREE.Group>(null!);
  useFrame((_, d) => {
    phone.current.rotation.y += d * 0.5;
  });
  return (
    <group ref={phone}>
      <mesh>
        <boxGeometry args={[1.5, 3, 0.16]} />
        <Dark />
      </mesh>
      <mesh position={[0, 0, 0.09]}>
        <boxGeometry args={[1.3, 2.7, 0.01]} />
        <Gold glow={0.45} />
      </mesh>
      <mesh position={[0, 0.8, 0.11]}>
        <boxGeometry args={[1, 0.5, 0.01]} />
        <Dark />
      </mesh>
      <mesh position={[0, -0.1, 0.11]}>
        <boxGeometry args={[1, 0.35, 0.01]} />
        <Dark />
      </mesh>
      <mesh position={[0, -0.7, 0.11]}>
        <boxGeometry args={[1, 0.35, 0.01]} />
        <Dark />
      </mesh>
    </group>
  );
}

/* Marketing: animated growth bars */
function Marketing() {
  const bars = useRef<(THREE.Mesh | null)[]>([]);
  const base = [0.8, 1.1, 1.0, 1.6, 2.0, 2.6];
  useFrame((s) => {
    bars.current.forEach((m, i) => {
      if (!m) return;
      const h = base[i] * (0.85 + 0.15 * Math.sin(s.clock.elapsedTime * 1.2 + i));
      m.scale.y = h;
      m.position.y = h / 2 - 1.3;
    });
  });
  return (
    <group rotation={[0, -0.4, 0]}>
      {base.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            bars.current[i] = el;
          }}
          position={[i * 0.65 - 1.6, 0, 0]}
        >
          <boxGeometry args={[0.4, 1, 0.4]} />
          <Gold glow={0.25 + i * 0.05} />
        </mesh>
      ))}
      <mesh position={[0, -1.32, 0]}>
        <boxGeometry args={[4.2, 0.04, 0.6]} />
        <Dark />
      </mesh>
    </group>
  );
}

/* AR/VR: immersive portal */
function ArVr() {
  const r1 = useRef<THREE.Mesh>(null!);
  const r2 = useRef<THREE.Mesh>(null!);
  const r3 = useRef<THREE.Mesh>(null!);
  useFrame((_, d) => {
    r1.current.rotation.x += d * 0.5;
    r2.current.rotation.y += d * 0.7;
    r3.current.rotation.z += d * 0.4;
  });
  return (
    <group>
      <mesh ref={r1}>
        <torusGeometry args={[1.9, 0.03, 12, 100]} />
        <Gold glow={0.5} />
      </mesh>
      <mesh ref={r2}>
        <torusGeometry args={[1.4, 0.03, 12, 100]} />
        <Gold glow={0.5} />
      </mesh>
      <mesh ref={r3}>
        <torusGeometry args={[0.9, 0.03, 12, 100]} />
        <Gold glow={0.5} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.35, 24, 24]} />
        <Gold glow={0.8} />
      </mesh>
    </group>
  );
}

/* 3D modeling: rotatable object */
function Model() {
  const m = useRef<THREE.Group>(null!);
  useFrame((_, d) => {
    m.current.rotation.y += d * 0.4;
    m.current.rotation.x += d * 0.15;
  });
  return (
    <group ref={m}>
      <mesh>
        <torusKnotGeometry args={[1, 0.32, 160, 20]} />
        <Gold glow={0.25} />
      </mesh>
      <mesh scale={1.04}>
        <torusKnotGeometry args={[1, 0.32, 40, 8]} />
        <meshBasicMaterial color={GOLD} wireframe transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

/* UI/UX: floating interface panels */
function UiUx() {
  const refs = useRef<(THREE.Group | null)[]>([]);
  const panels: [number, number, number, number, number][] = [
    [-1.3, 0.9, 0, 1.8, 1.1],
    [1.1, 0.5, 0.5, 1.6, 1.4],
    [-0.4, -0.8, 0.9, 2.0, 0.9],
    [1.5, -1.0, -0.4, 1.2, 0.8],
  ];
  useFrame((s) => {
    refs.current.forEach((g, i) => {
      if (g) g.position.y = panels[i][1] + Math.sin(s.clock.elapsedTime + i * 1.3) * 0.15;
    });
  });
  return (
    <group>
      {panels.map(([x, y, z, w, h], i) => (
        <group
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          position={[x, y, z]}
        >
          <mesh>
            <boxGeometry args={[w, h, 0.05]} />
            <Dark />
          </mesh>
          <mesh position={[0, h / 2 - 0.12, 0.04]}>
            <boxGeometry args={[w - 0.2, 0.1, 0.02]} />
            <Gold />
          </mesh>
          <mesh position={[0, -0.05, 0.04]}>
            <boxGeometry args={[w - 0.4, h / 3, 0.02]} />
            <Gold glow={0.12} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const g = useRef<THREE.Group>(null!);
  useFrame((s) => {
    g.current.rotation.y = THREE.MathUtils.lerp(g.current.rotation.y, s.pointer.x * 0.5, 0.05);
    g.current.rotation.x = THREE.MathUtils.lerp(g.current.rotation.x, -s.pointer.y * 0.3, 0.05);
  });
  return <group ref={g}>{children}</group>;
}

export default function ServiceScene({ type }: { type: SceneType }) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6.5], fov: 45 }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={60} color="#F1D77A" />
      <pointLight position={[-5, -3, 2]} intensity={25} />
      <Rig>
        {type === "web" && <Web />}
        {type === "app" && <App />}
        {type === "marketing" && <Marketing />}
        {type === "arvr" && <ArVr />}
        {type === "model" && <Model />}
        {type === "uiux" && <UiUx />}
      </Rig>
    </Canvas>
  );
}