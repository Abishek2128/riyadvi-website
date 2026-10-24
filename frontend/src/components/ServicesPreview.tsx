"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { services } from "@/data/services";

export default function ServicesPreview() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-6 py-24">
      <h2 className="mb-12 text-3xl font-bold md:text-5xl">
        Our <span className="text-gold">Services</span>
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((s, i) => (
          <motion.div
            key={s.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -8, rotateX: 4, rotateY: -4 }}
            style={{ transformPerspective: 800 }}
          >
            <Link
              href={`/services/${s.slug}`}
              className="block h-full rounded-2xl border border-gold/20 bg-gradient-to-br from-white/10 to-transparent p-8 transition hover:border-gold"
            >
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-white/60">{s.short}</p>
              <span className="mt-6 inline-block text-sm text-gold">Learn more →</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}