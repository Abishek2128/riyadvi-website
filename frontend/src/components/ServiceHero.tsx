"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { SceneType } from "./three/ServiceScene";

const ServiceScene = dynamic(() => import("./three/ServiceScene"), { ssr: false });

function Poster() {
  return (
    <div className="flex h-full items-center justify-center rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/30 via-black to-black">
      <div className="h-24 w-24 animate-pulse rounded-full border-2 border-gold/60" />
    </div>
  );
}

export default function ServiceHero({ type }: { type: SceneType }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [lite, setLite] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nav = navigator as Navigator & { deviceMemory?: number };
    const weak = (nav.hardwareConcurrency ?? 8) <= 2 || (nav.deviceMemory ?? 8) <= 2;
    setLite(reduced || weak);

    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { rootMargin: "100px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-full w-full">
      {lite ? <Poster /> : visible ? <ServiceScene type={type} /> : null}
    </div>
  );
}