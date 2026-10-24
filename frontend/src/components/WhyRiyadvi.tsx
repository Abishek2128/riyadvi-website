"use client";
import { motion } from "motion/react";

// Replace the TODO lines with real milestones from the Riyadvi website
const milestones = [
  ["2021", "Riyadvi Software Technologies founded"],
  ["2022", "TODO: first major milestone"],
  ["2023", "TODO: second milestone"],
  ["2024", "TODO: third milestone"],
  ["2025", "TODO: fourth milestone"],
];

export default function WhyRiyadvi() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <h2 className="mb-12 text-3xl font-bold md:text-5xl">
        Why <span className="text-gold">Riyadvi</span>
      </h2>
      <div className="relative border-l border-gold/40 pl-8">
        {milestones.map(([year, text], i) => (
          <motion.div
            key={year}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative mb-10"
          >
            <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full bg-gold shadow-[0_0_12px_#D4AF37]" />
            <p className="font-bold text-gold">{year}</p>
            <p className="text-white/70">{text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}