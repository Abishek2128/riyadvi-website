import Link from "next/link";
import type { Metadata } from "next";
import JobList from "@/components/JobList";
import { getAllJobs } from "@/data/jobs";

export const metadata: Metadata = {
  title: "Careers | Riyadvi",
  description: "Join Riyadvi and build digital products for growing businesses.",
};

export default async function CareersPage() {
  const jobs = await getAllJobs();
  return (
    <main className="mx-auto max-w-5xl px-6 pb-24 pt-32">
      <p className="mb-3 text-sm uppercase tracking-widest text-gold">Careers</p>
      <h1 className="text-4xl font-bold md:text-6xl">
        Build the future <span className="text-gold">with us</span>
      </h1>
      <p className="mt-5 max-w-xl text-white/70">
        We are a friendly team that cares about quality and about our clients. Find a role that
        fits you.
      </p>
      <div className="mt-12">
        <JobList jobs={jobs} />
      </div>
      <div className="mt-16 rounded-2xl border border-gold/20 bg-white/5 p-8 text-center">
        <h2 className="text-xl font-semibold">Do not see your role?</h2>
        <p className="mt-2 text-white/60">Tell us about yourself and we will keep you in mind.</p>
        <Link
          href="/contact"
          className="mt-5 inline-block rounded-full border border-gold/60 px-7 py-2.5 text-gold transition hover:bg-gold/10"
        >
          Get in touch
        </Link>
      </div>
    </main>
  );
}