import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Riyadvi",
  description: "Tell us about your project and we will get back to you.",
};

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP;
const calendly = process.env.NEXT_PUBLIC_CALENDLY_URL;

export default function ContactPage() {
  return (
    <main className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-32 md:grid-cols-2">
      <div>
        <p className="mb-3 text-sm uppercase tracking-widest text-gold">Contact</p>
        <h1 className="text-4xl font-bold md:text-5xl">
          Let&apos;s build your <span className="text-gold">next step</span>
        </h1>
        <p className="mt-6 max-w-md text-white/70">
          Tell us what you need and we will reply with a clear plan, timeline and quote.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          {whatsapp && (
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-gold/60 px-6 py-2.5 text-gold transition hover:bg-gold/10"
            >
              Chat on WhatsApp
            </a>
          )}
          {calendly && (
            <a
              href={calendly}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-gold/60 px-6 py-2.5 text-gold transition hover:bg-gold/10"
            >
              Book a call
            </a>
          )}
        </div>
      </div>
      <div className="rounded-2xl border border-gold/20 bg-white/5 p-8">
        <ContactForm />
      </div>
    </main>
  );
}