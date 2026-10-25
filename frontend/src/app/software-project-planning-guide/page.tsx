import type { Metadata } from "next";
import LeadMagnetForm from "@/components/LeadMagnetForm";

export const metadata: Metadata = {
  title: "Software Project Planning Guide | Riyadvi",
  description: "A practical guide to planning a software project: scope, budget, timeline and launch.",
};

const inside = [
  "How to define a goal your whole team agrees on",
  "Scope your first version with a simple priority list",
  "Estimate budget and timeline without surprises",
  "Choose the right team and technology",
  "A launch checklist you can reuse",
];

export default function GuideLandingPage() {
  return (
    <main className="mx-auto grid max-w-6xl gap-12 px-6 pb-24 pt-32 md:grid-cols-2">
      <div>
        <p className="mb-3 text-sm uppercase tracking-widest text-gold">Free guide</p>
        <h1 className="text-3xl font-bold md:text-5xl">
          Download Software Project <span className="text-gold">Planning Guide</span>
        </h1>
        <p className="mt-5 max-w-md text-white/70">
          Plan your next software project with confidence. Short, practical and free.
        </p>
        <ul className="mt-8 space-y-3 text-white/80">
          {inside.map((i) => (
            <li key={i}>
              <span className="mr-2 text-gold">◆</span>
              {i}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-gold/20 bg-white/5 p-8">
        <LeadMagnetForm />
      </div>
    </main>
  );
}