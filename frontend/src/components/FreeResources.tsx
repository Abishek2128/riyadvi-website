import Link from "next/link";

const items: [string, string, string, string][] = [
  [
    "Business Health Checkup",
    "Answer a few questions and see where your business can grow online.",
    "/business-health-checkup",
    "Start the checkup",
  ],
  [
    "Software Project Planning Guide",
    "A practical checklist for planning your next software project.",
    "/software-project-planning-guide",
    "Get the free guide",
  ],
];

export default function FreeResources() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <h2 className="mb-10 text-3xl font-bold md:text-5xl">
        Free <span className="text-gold">resources</span>
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {items.map(([title, text, href, cta]) => (
          <Link
            key={href}
            href={href}
            className="group rounded-2xl border border-gold/20 bg-gradient-to-br from-white/10 to-transparent p-8 transition hover:border-gold"
          >
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="mt-3 text-white/60">{text}</p>
            <span className="mt-6 inline-block text-gold transition group-hover:translate-x-1">
              {cta} →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}