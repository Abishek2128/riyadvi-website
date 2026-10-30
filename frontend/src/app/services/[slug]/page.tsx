import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { processSteps } from "@/data/services";
import { getServices, getService, getProjects } from "@/lib/content";
import ServiceHero from "@/components/ServiceHero";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = await getService(slug);
  return {
    title: s ? `${s.title} | Riyadvi` : "Service | Riyadvi",
    description: s?.short,
  };
}

async function ServiceContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  const [services, projects] = await Promise.all([getServices(), getProjects()]);
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const matched = projects.filter((p) => p.services.includes(service.slug));
  const hasMatch = matched.length > 0;
  const shownProjects = hasMatch ? matched : projects.slice(0, 3);

  return (
    <main>
      <section className="mx-auto grid max-w-7xl items-center gap-8 px-6 pb-16 pt-32 md:grid-cols-2">
        <div>
          <p className="mb-3 text-sm uppercase tracking-widest text-gold">Our services</p>
          <h1 className="text-4xl font-bold md:text-6xl">{service.title}</h1>
          <p className="mt-6 max-w-lg text-lg text-white/70">{service.short}</p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-gold px-7 py-3 font-semibold text-black transition hover:bg-gold-soft"
          >
            Get a Quote
          </Link>
        </div>
        <div className="h-[340px] md:h-[440px]">
          <ServiceHero type={service.scene} />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-12 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
          <h2 className="mb-3 text-xl font-semibold text-gold">The problem</h2>
          <p className="text-white/70">{service.problem}</p>
        </div>
        <div className="rounded-2xl border border-gold/30 bg-white/5 p-8">
          <h2 className="mb-3 text-xl font-semibold text-gold">Our solution</h2>
          <p className="text-white/70">{service.solution}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="mb-8 text-3xl font-bold">
          Key <span className="text-gold">features</span>
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {service.features.map((f) => (
            <div key={f} className="rounded-xl border border-gold/20 bg-white/5 p-5">
              <span className="mr-2 text-gold">◆</span>
              {f}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-2">
        <div>
          <h2 className="mb-6 text-2xl font-bold">
            Industry <span className="text-gold">use cases</span>
          </h2>
          <ul className="space-y-3 text-white/70">
            {service.useCases.map((u) => (
              <li key={u}>→ {u}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-6 text-2xl font-bold">
            Technology <span className="text-gold">stack</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            {service.stack.map((t) => (
              <span key={t} className="rounded-full border border-gold/40 px-4 py-1.5 text-sm">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="mb-8 text-3xl font-bold">
          Our <span className="text-gold">process</span>
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

      <section className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="mb-6 text-3xl font-bold">
          {hasMatch ? "Related " : "More of our "}
          <span className="text-gold">work</span>
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {shownProjects.map((p) => (
            <Link
              key={p.slug}
              href={`/portfolio/${p.slug}`}
              className="rounded-xl border border-gold/20 bg-white/5 p-5 transition hover:border-gold"
            >
              <p className="text-xs uppercase tracking-widest text-gold">{p.industry}</p>
              <h3 className="mt-2 font-semibold">{p.client}</h3>
              <p className="mt-2 text-sm text-white/60">{p.summary}</p>
            </Link>
          ))}
        </div>
        <Link href="/portfolio" className="mt-4 inline-block text-gold hover:underline">
          View all projects →
        </Link>

        <h3 className="mb-4 mt-12 text-xl font-semibold">Other services</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {others.map((s) => (
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
          Ready to start with <span className="text-gold">{service.title}</span>?
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

export default function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ServiceContent params={params} />
    </Suspense>
  );
}