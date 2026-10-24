"use client";
import dynamic from "next/dynamic";

const TechScene = dynamic(() => import("./three/TechScene"), { ssr: false });

export default function TechEcosystem() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl font-bold md:text-5xl">
          Our Technology <span className="text-gold">Ecosystem</span>
        </h2>
        <p className="mt-4 max-w-xl text-white/60">
          Move your cursor to explore the stack we build with.
        </p>
      </div>
      <div className="h-[520px] w-full">
        <TechScene />
      </div>
    </section>
  );
}