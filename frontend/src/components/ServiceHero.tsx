"use client";
import dynamic from "next/dynamic";
import type { SceneType } from "./three/ServiceScene";

const ServiceScene = dynamic(() => import("./three/ServiceScene"), { ssr: false });

export default function ServiceHero({ type }: { type: SceneType }) {
  return <ServiceScene type={type} />;
}