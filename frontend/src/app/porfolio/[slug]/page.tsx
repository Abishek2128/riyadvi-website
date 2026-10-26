import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import ServiceHero from "@/components/ServiceHero";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return {
    title: p ? `${p.client} case study | Riyadvi` : "Case study | Riyadvi",
    description: p?.summary,
  };
}

async function CaseStudyContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const related = services.filter((s) => project.services.includes(s.slug));

  return (
    <main>
      <section className="mx-auto grid max-w-7xl items-center gap-8 px-6 pb-12 pt-32 md:grid-cols-2">
        <div>
          <Link href="/portfolio" className="text-sm text-gold hover:underline">
            ← All projects
          </Link>
          <h1 className="mt-4 text-4xl font-bold md:text-6xl">{project.client}</h1>
          <p className="mt-5 max-w-lg text-lg text-white/70">{project.summary}</p>
          <dl className="mt-8 flex gap-10 text-sm">
            <div>
              <dt className="text-white/50">Client</dt>
              <dd className="mt-1 font-semibold">{project.client}</dd>
            </div>
            <div>
              <dt className="text-white/50">Industry</dt>
              <dd className="mt-1 font-semibold">{project.industry}</dd>
            </div>
          </dl>
        </div>
        <div className="h-[340px] md:h-[420px]">
          {project.scene ? (
            <ServiceHero type={project.scene} />
          ) : (
            <div className="flex h-full items-center justify-center rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/30 via-black to-black">
              <span className="text-8xl font-bold text-gold/80">{project.client.charAt(0)}</span>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-10 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
          <h2 className="mb-3 text-xl font-semibold text-gold">The challenge</h2>
          <p className="text-white/70">{project.challenge}</p>
        </div>
        <div className="rounded-2xl border border-gold/30 bg-white/5 p-8">
          <h2 className="mb-3 text-xl font-semibold text-gold">Our solution</h2>
          <p className="text-white/70">{project.solution}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-10 md:grid-cols-2">
        <div>
          <h2 className="mb-6 text-2xl font-bold">
            Technologies <span className="text-gold">used</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((t) => (
              <span key={t} className="rounded-full border border-gold/40 px-4 py-1.5 text-sm">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-6 text-2xl font-bold">
            <span className="text-gold">Results</span>
          </h2>
          <ul className="space-y-3 text-white/70">
            {project.results.map((r) => (
              <li key={r}>
                <span className="mr-2 text-gold">◆</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <h2 className="mb-6 text-2xl font-bold">
          Related <span className="text-gold">services</span>
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {related.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="rounded-xl border border-gold/20 bg-white/5 p-5 transition hover:border-gold"
            >
              <h3 className="font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-white/60">{s.short}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">
          Want results like <span className="text-gold">this?</span>
        </h2>
        <Link
          href="/contact"
          className="mt-8 inline-block rounded-full bg-gold px-8 py-3 font-semibold text-black transition hover:bg-gold-soft"
        >
          Get a Quote
        </Link>
      </section>
    </main>
  );
}

export default function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <CaseStudyContent params={params} />
    </Suspense>
  );
}