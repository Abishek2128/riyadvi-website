"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "motion/react";

const HeroScene = dynamic(() => import("./three/HeroScene"), { ssr: false });

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">
      <div className="absolute inset-0">
        <HeroScene />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
      <div className="pointer-events-none relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl"
        >
          Custom Software &amp; Digital Solutions to{" "}
          <span className="text-gold">Grow Your Business</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-xl text-lg text-white/70"
        >
          Web &amp; App Development, UI/UX Design, and Business Strategy – all tailored to your needs.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pointer-events-auto mt-10 flex flex-wrap gap-4"
        >
          <Link
            href="/contact"
            className="rounded-full bg-gold px-7 py-3 font-semibold text-black transition hover:bg-gold-soft"
          >
            Book a Free Consultation
          </Link>
          <Link
            href="/#services"
            className="rounded-full border border-gold/60 px-7 py-3 font-semibold text-gold transition hover:bg-gold/10"
          >
            Explore Our Solutions
          </Link>
        </motion.div>
      </div>
    </section>
  );
}