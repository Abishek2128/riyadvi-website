import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllJobs, getJobBySlug } from "@/data/jobs";
import ApplicationForm from "@/components/ApplicationForm";

export async function generateStaticParams() {
  const jobs = await getAllJobs();
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  return {
    title: job ? `${job.title} | Careers | Riyadvi` : "Job | Riyadvi",
    description: job?.summary,
  };
}

async function JobContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) notFound();

  return (
    <main className="mx-auto max-w-4xl px-6 pb-24 pt-32">
      <Link href="/careers" className="text-sm text-gold hover:underline">
        ← All roles
      </Link>
      <h1 className="mt-4 text-4xl font-bold md:text-5xl">{job.title}</h1>
      <div className="mt-5 flex flex-wrap gap-2 text-sm">
        {[job.department, job.designation, job.experience, job.location, job.type].map((t) => (
          <span key={t} className="rounded-full border border-gold/40 px-4 py-1 text-white/80">
            {t}
          </span>
        ))}
      </div>
      <p className="mt-8 text-lg text-white/70">{job.summary}</p>
      <a
        href="#apply"
        className="mt-6 inline-block rounded-full bg-gold px-7 py-3 font-semibold text-black transition hover:bg-gold-soft"
      >
        Apply now
      </a>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-7">
          <h2 className="mb-4 text-xl font-semibold text-gold">Responsibilities</h2>
          <ul className="space-y-2 text-white/75">
            {job.responsibilities.map((r) => (
              <li key={r}>
                <span className="mr-2 text-gold">◆</span>
                {r}
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl border border-white/10 bg-white/5 p-7">
          <h2 className="mb-4 text-xl font-semibold text-gold">Requirements</h2>
          <ul className="space-y-2 text-white/75">
            {job.requirements.map((r) => (
              <li key={r}>
                <span className="mr-2 text-gold">◆</span>
                {r}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section id="apply" className="mt-16 scroll-mt-28 rounded-2xl border border-gold/20 bg-white/5 p-8">
        <h2 className="mb-6 text-2xl font-bold">
          Apply for <span className="text-gold">{job.title}</span>
        </h2>
        <ApplicationForm position={job.title} />
      </section>
    </main>
  );
}

export default function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <JobContent params={params} />
    </Suspense>
  );
}