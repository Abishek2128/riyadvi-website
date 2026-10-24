"use client";
import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const rings = [
  { radius: 1.8, speed: 0.4, tilt: 0.3, items: ["React", "Next.js", "Node.js", "MongoDB"] },
  { radius: 2.8, speed: -0.3, tilt: -0.4, items: ["MySQL", "JavaScript", "Three.js", "R3F"] },
  { radius: 3.8, speed: 0.2, tilt: 0.6, items: ["WordPress", "TypeScript", "Tailwind", "Express"] },
];

function makeLabelTexture(text: string, active: boolean) {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 64;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = active ? "#D4AF37" : "rgba(0,0,0,0.75)";
  ctx.strokeStyle = active ? "#D4AF37" : "rgba(212,175,55,0.5)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(4, 4, 248, 56, 28);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = active ? "#000000" : "#FFFFFF";
  ctx.font = "600 28px Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 128, 34);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function Tech({ name, position }: { name: string; position: [number, number, number] }) {
  const [hover, setHover] = useState(false);
  const normal = useMemo(() => makeLabelTexture(name, false), [name]);
  const active = useMemo(() => makeLabelTexture(name, true), [name]);

  return (
    <group position={position}>
      <mesh
        scale={hover ? 1.8 : 1}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color="#D4AF37"
          emissive="#D4AF37"
          emissiveIntensity={hover ? 1.5 : 0.5}
        />
      </mesh>
      <sprite position={[0, 0.4, 0]} scale={[1.1, 0.275, 1]}>
        <spriteMaterial map={hover ? active : normal} transparent depthWrite={false} />
      </sprite>
    </group>
  );
}

function Ring({ radius, speed, tilt, items }: (typeof rings)[number]) {
  const spin = useRef<THREE.Group>(null!);
  useFrame((_, d) => {
    spin.current.rotation.y += d * speed;
  });
  return (
    <group rotation={[tilt, 0, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.004, 8, 128]} />
        <meshBasicMaterial color="#D4AF37" transparent opacity={0.3} />
      </mesh>
      <group ref={spin}>
        {items.map((n, i) => {
          const a = (i / items.length) * Math.PI * 2;
          return (
            <Tech key={n} name={n} position={[Math.cos(a) * radius, 0, Math.sin(a) * radius]} />
          );
        })}
      </group>
    </group>
  );
}

function Scene() {
  const g = useRef<THREE.Group>(null!);
  useFrame((s) => {
    g.current.rotation.y = THREE.MathUtils.lerp(g.current.rotation.y, s.pointer.x * 0.6, 0.05);
    g.current.rotation.x = THREE.MathUtils.lerp(g.current.rotation.x, -s.pointer.y * 0.3, 0.05);
  });
  return (
    <group ref={g}>
      <mesh>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.6}
          roughness={0.3}
          emissive="#D4AF37"
          emissiveIntensity={0.35}
        />
      </mesh>
      {rings.map((r) => (
        <Ring key={r.radius} {...r} />
      ))}
    </group>
  );
}

export default function TechScene() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 9], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={60} color="#F1D77A" />
      <Scene />
    </Canvas>
  );
}