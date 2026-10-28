"use client";
import { MotionConfig, motion } from "motion/react";
import type { SceneType } from "@/data/services";

function Web() {
  return (
    <div className="w-40 rounded-md border border-gold/50 p-2">
      <div className="mb-2 flex gap-1">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-gold/70" />
        ))}
      </div>
      {[60, 90, 40].map((w, i) => (
        <motion.div
          key={i}
          className="mb-1.5 h-2 rounded bg-gold/60"
          initial={{ width: "10%" }}
          animate={{ width: `${w}%` }}
          transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function App() {
  return (
    <motion.div
      className="h-24 w-14 rounded-xl border-2 border-gold/70 p-1.5"
      style={{ transformPerspective: 400 }}
      animate={{ rotateY: [-25, 25, -25] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="mx-auto mb-2 h-1.5 w-6 rounded bg-gold/60" />
      <div className="mb-1.5 h-8 rounded bg-gold/30" />
      <div className="mb-1.5 h-2 rounded bg-gold/50" />
      <div className="h-2 w-2/3 rounded bg-gold/50" />
    </motion.div>
  );
}

function Marketing() {
  return (
    <div className="flex h-20 items-end gap-2">
      {[30, 45, 40, 65, 80, 100].map((h, i) => (
        <motion.div
          key={i}
          className="w-4 rounded-t bg-gold"
          animate={{ height: [`${h * 0.5}%`, `${h}%`, `${h * 0.5}%`] }}
          transition={{ duration: 2.4, delay: i * 0.15, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function ArVr() {
  return (
    <div className="grid h-20 w-20 place-items-center">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="col-start-1 row-start-1 rounded-full border-2 border-gold/70"
          style={{ width: 80 - i * 22, height: 80 - i * 22, transformPerspective: 300 }}
          animate={{
            rotateX: i === 0 ? 360 : 0,
            rotateY: i === 1 ? 360 : 0,
            rotateZ: i === 2 ? 360 : 0,
          }}
          transition={{ duration: 6 + i * 2, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}

function Model() {
  return (
    <motion.div
      className="h-14 w-14 rounded-md border-2 border-gold/80 bg-gold/20"
      style={{ transformPerspective: 400 }}
      animate={{ rotateX: 360, rotateY: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    />
  );
}

function UiUx() {
  const cards = [
    { x: 0, y: 8, w: 60, h: 36 },
    { x: 70, y: 0, w: 60, h: 44 },
    { x: 40, y: 44, w: 70, h: 30 },
  ];
  return (
    <div className="relative h-20 w-40">
      {cards.map((c, i) => (
        <motion.div
          key={i}
          className="absolute rounded-md border border-gold/60 bg-gold/20"
          style={{ left: c.x, top: c.y, width: c.w, height: c.h }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.5, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function ServiceVisual({ type }: { type: SceneType }) {
  return (
    <MotionConfig reducedMotion="user">
      <div
        className="mb-6 flex h-28 items-center justify-center overflow-hidden rounded-xl bg-black/40"
        aria-hidden="true"
      >
        {type === "web" && <Web />}
        {type === "app" && <App />}
        {type === "marketing" && <Marketing />}
        {type === "arvr" && <ArVr />}
        {type === "model" && <Model />}
        {type === "uiux" && <UiUx />}
      </div>
    </MotionConfig>
  );
}