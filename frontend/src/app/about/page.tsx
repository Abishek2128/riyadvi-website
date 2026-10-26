import Link from "next/link";
import type { Metadata } from "next";
import AboutTimeline from "@/components/AboutTimeline";
import { pillars, values } from "@/data/company";
import { processSteps } from "@/data/services";

export const metadata: Metadata = {
  title: "About | Riyadvi",
  description: "Riyadvi Software Technologies: founded in 2021, a technology and digital solutions partner.",
};

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pb-16 pt-32">
        <p className="mb-3 text-sm uppercase tracking-widest text-gold">About us · Since 2021</p>
        <h1 className="text-4xl font-bold md:text-6xl">
          A technology partner built on <span className="text-gold">trust</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/70">
          Riyadvi Software Technologies began in 2021 with a simple idea: give modern businesses
          complete software solutions that fit their real needs. Today we work as a long-term
          partner, helping clients transform their digital systems, streamline operations and grow.
        </p>
        <p className="mt-4 text-white/50">Based in Chennai, working with clients in India, Australia and Canada.</p>
      </section>

      {/* Mission, vision, goal */}
      <section className="mx-auto grid max-w-5xl gap-6 px-6 py-12 md:grid-cols-3">
        {pillars.map(([title, text]) => (
          <div key={title} className="rounded-2xl border border-gold/25 bg-white/5 p-7">
            <h2 className="text-xl font-semibold text-gold">{title}</h2>
            <p className="mt-3 text-white/70">{text}</p>
          </div>
        ))}
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="mb-12 text-3xl font-bold md:text-4xl">
          Our <span className="text-gold">journey</span>
        </h2>
        <AboutTimeline />
      </section>

      {/* Values */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="mb-8 text-3xl font-bold md:text-4xl">
          What we <span className="text-gold">value</span>
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {values.map(([title, text]) => (
            <div key={title} className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-semibold">
                <span className="mr-2 text-gold">◆</span>
                {title}
              </h3>
              <p className="mt-2 text-sm text-white/60">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="mb-8 text-3xl font-bold md:text-4xl">
          Our <span className="text-gold">approach</span>
        </h2>
        <div className="grid gap-4 md:grid-cols-5">
          {processSteps.map(([title, text], i) => (
            <div key={title} className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-gold text-sm font-bold text-black">
                {i + 1}
              </div>
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-white/60">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recognition */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/15 to-transparent p-8 text-center">
          <p className="text-sm uppercase tracking-widest text-gold">Recognition</p>
          <h2 className="mt-3 text-2xl font-bold md:text-3xl">Star of Excellence, 2024</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            Awarded by the National Integrity Cultural Academy for advancing digital solutions and
            ethical business practices.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">
          Let&apos;s grow your business <span className="text-gold">together</span>
        </h2>
        <Link
          href="/contact"
          className="mt-8 inline-block rounded-full bg-gold px-8 py-3 font-semibold text-black transition hover:bg-gold-soft"
        >
          Book a Free Consultation
        </Link>
      </section>
    </main>
  );
}