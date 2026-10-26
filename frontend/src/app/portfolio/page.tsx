import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Portfolio | Riyadvi",
  description: "A selection of projects we have built for our clients.",
};

export default function PortfolioPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-32">
      <p className="mb-3 text-sm uppercase tracking-widest text-gold">Portfolio</p>
      <h1 className="text-4xl font-bold md:text-6xl">
        Work we are <span className="text-gold">proud of</span>
      </h1>
      <p className="mt-5 max-w-xl text-white/70">
        A selection of projects across web, apps, 3D and marketing.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/portfolio/${p.slug}`}
            className="group overflow-hidden rounded-2xl border border-gold/20 bg-white/5 transition hover:border-gold"
          >
            <div className="flex h-44 items-center justify-center bg-gradient-to-br from-gold/30 via-black to-black">
              <span className="text-6xl font-bold text-gold/80 transition group-hover:scale-110">
                {p.client.charAt(0)}
              </span>
            </div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-widest text-gold">{p.industry}</p>
              <h2 className="mt-2 text-xl font-semibold">{p.client}</h2>
              <p className="mt-2 text-sm text-white/60">{p.summary}</p>
              <span className="mt-4 inline-block text-sm text-gold">View case study →</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}