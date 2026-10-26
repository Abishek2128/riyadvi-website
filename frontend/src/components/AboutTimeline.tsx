"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { milestones } from "@/data/company";

export default function AboutTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.6"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative mx-auto max-w-3xl pl-10">
      <div className="absolute left-3 top-0 h-full w-px bg-white/15" />
      <motion.div
        style={{ height }}
        className="absolute left-3 top-0 w-px bg-gold shadow-[0_0_10px_#D4AF37]"
      />
      {milestones.map((m) => (
        <motion.div
          key={m.year}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="relative pb-14 last:pb-0"
        >
          <span className="absolute -left-[36px] top-1 h-4 w-4 rounded-full bg-gold shadow-[0_0_12px_#D4AF37]" />
          <p className="text-sm font-bold text-gold">{m.year}</p>
          <h3 className="mt-1 text-xl font-semibold">{m.title}</h3>
          <p className="mt-2 text-white/70">{m.text}</p>
        </motion.div>
      ))}
    </div>
  );
}