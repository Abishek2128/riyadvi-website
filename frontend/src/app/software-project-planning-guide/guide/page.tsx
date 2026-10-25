import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "Software Project Planning Guide | Riyadvi",
};

const sections: [string, string, string[]][] = [
  [
    "1. Define the goal",
    "Start with the result you want, not the features. A clear goal keeps every later decision simple.",
    [
      "Write one sentence: who is this for, and what changes for them?",
      "Pick 2 or 3 numbers you will track (for example enquiries per month).",
      "Name one person who makes the final decisions.",
    ],
  ],
  [
    "2. Understand your users",
    "Software that people avoid is a wasted investment. Learn how they work today before you design anything.",
    [
      "Talk to at least 5 real users or customers.",
      "List the 3 biggest problems they face.",
      "Note what tools they already use, so you can fit in.",
    ],
  ],
  [
    "3. Scope the first version",
    "Your first release should be small enough to finish and useful enough to learn from.",
    [
      "List every feature you can think of, then sort them: must have, should have, nice to have.",
      "Build only the must-haves first.",
      "Write down what is out of scope, so nobody expects it.",
    ],
  ],
  [
    "4. Budget and timeline",
    "Cost follows scope. Plan in stages so you can adjust before money is spent.",
    [
      "Break the project into milestones of 2 to 4 weeks.",
      "Add a buffer of 15 to 20 percent for changes and testing.",
      "Agree what happens if scope changes mid-project.",
    ],
  ],
  [
    "5. Team and technology",
    "Choose tools your team can maintain after launch, not only the newest ones.",
    [
      "Prefer proven, well-supported technology.",
      "Decide who owns hosting, updates and security.",
      "Make sure you receive the source code and documentation.",
    ],
  ],
  [
    "6. Launch and measure",
    "Launching is the start of learning. Plan your first 30 days before you go live.",
    [
      "Test on real phones, browsers and slow connections.",
      "Set up analytics and error tracking before launch.",
      "Review your numbers after 30 days and plan the next improvements.",
    ],
  ],
];

export default function GuidePage() {
  return (
    <main className="guide mx-auto max-w-3xl px-6 pb-24 pt-32">
      <style>{`
        @media print {
          header, footer, .no-print { display: none !important; }
          html, body { background: #fff !important; color: #000 !important; }
          .guide, .guide * { color: #000 !important; border-color: #ccc !important; background: transparent !important; }
          .guide { padding-top: 0 !important; }
        }
      `}</style>

      <p className="mb-3 text-sm uppercase tracking-widest text-gold">Riyadvi guide</p>
      <h1 className="text-3xl font-bold md:text-5xl">
        Software Project <span className="text-gold">Planning Guide</span>
      </h1>
      <p className="mt-5 text-white/70">
        A short, practical checklist for planning a software project, from first idea to launch.
      </p>
      <div className="mt-6">
        <PrintButton />
      </div>

      <div className="mt-12 space-y-10">
        {sections.map(([title, intro, points]) => (
          <section key={title} className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold text-gold">{title}</h2>
            <p className="mt-2 text-white/70">{intro}</p>
            <ul className="mt-4 space-y-2 text-white/80">
              {points.map((p) => (
                <li key={p}>☐ {p}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="no-print mt-14 text-center">
        <p className="text-white/70">Want help planning your project?</p>
        <Link
          href="/contact"
          className="mt-4 inline-block rounded-full border border-gold/60 px-7 py-3 font-semibold text-gold transition hover:bg-gold/10"
        >
          Book a free consultation
        </Link>
      </div>
    </main>
  );
}