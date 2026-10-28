import type { Metadata } from "next";
import HealthCheckupForm from "@/components/HealthCheckupForm";

export const metadata: Metadata = {
  title: "Business Health Checkup | Riyadvi",
  description: "Find out how ready your business is for its next digital growth stage.",
};

export default function BusinessHealthCheckupPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      <p className="mb-3 text-sm uppercase tracking-widest text-gold">Business Health Checkup</p>
      <h1 className="text-3xl font-bold md:text-5xl">
        Is Your Business Ready for Its Next{" "}
        <span className="text-gold">Digital Growth Stage?</span>
      </h1>
      <p className="mt-5 max-w-xl text-white/70">
        Answer a few quick questions. We will review your digital presence and show you where the
        biggest opportunities are.
      </p>
      <div className="mt-10 rounded-2xl border border-gold/20 bg-white/5 p-6 md:p-8">
        <HealthCheckupForm />
      </div>
    </main>
  );
}