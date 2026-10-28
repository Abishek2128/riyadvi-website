"use client";
import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { postForm } from "@/lib/api";

const steps = ["Business", "Digital presence", "Marketing", "Technology", "Challenges", "Review"];

const teamSizes = ["1-5", "6-20", "21-50", "51-200", "200+"];
const websiteStatuses = ["No website yet", "Outdated", "Works but slow", "Good, want to improve"];
const marketingOptions = ["Social media", "Google Ads", "SEO", "Email marketing", "Content / blog", "No marketing yet"];
const techOptions = ["Website", "Mobile app", "CRM", "E-commerce store", "Billing software", "Mostly manual processes"];
const challengeOptions = [
  "Not enough leads",
  "Outdated website",
  "Slow or manual operations",
  "Low online visibility",
  "Hard to scale",
  "Unclear digital strategy",
];

type ListKey = "marketing" | "technology" | "challenges";

type Values = {
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  teamSize: string;
  website: string;
  websiteStatus: string;
  marketing: string[];
  marketingNotes: string;
  technology: string[];
  technologyNotes: string;
  challenges: string[];
  challengesNotes: string;
};

const initial: Values = {
  name: "",
  email: "",
  phone: "",
  company: "",
  industry: "",
  teamSize: "",
  website: "",
  websiteStatus: "",
  marketing: [],
  marketingNotes: "",
  technology: [],
  technologyNotes: "",
  challenges: [],
  challengesNotes: "",
};

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-gold";

function Chips({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (o: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((o) => {
        const on = selected.includes(o);
        return (
          <button
            key={o}
            type="button"
            onClick={() => onToggle(o)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              on
                ? "border-gold bg-gold text-black"
                : "border-white/20 text-white/80 hover:border-gold"
            }`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

const joinList = (list: string[], notes: string) =>
  [
    list.length ? `Selected: ${list.join(", ")}` : "",
    notes.trim() ? `Notes: ${notes.trim()}` : "",
  ]
    .filter(Boolean)
    .join("\n");

export default function HealthCheckupForm() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [localError, setLocalError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [feedback, setFeedback] = useState("");

  const set =
    (key: keyof Values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setValues((v) => ({ ...v, [key]: e.target.value }));

  const toggle = (key: ListKey, option: string) =>
    setValues((v) => ({
      ...v,
      [key]: v[key].includes(option) ? v[key].filter((x) => x !== option) : [...v[key], option],
    }));

  function next() {
    if (step === 0) {
      const okName = values.name.trim().length >= 2;
      const okEmail = /^\S+@\S+\.\S+$/.test(values.email.trim());
      if (!okName || !okEmail) {
        setLocalError("Please enter your name and a valid email to continue.");
        return;
      }
    }
    setLocalError("");
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  async function submit() {
    setStatus("sending");
    setErrors({});
    setFeedback("");
    const res = await postForm("/health-checkup", {
      name: values.name,
      email: values.email,
      phone: values.phone,
      company: values.company,
      industry: values.industry,
      teamSize: values.teamSize,
      website: [values.website.trim(), values.websiteStatus].filter(Boolean).join(" | "),
      marketing: joinList(values.marketing, values.marketingNotes),
      technology: joinList(values.technology, values.technologyNotes),
      challenges: joinList(values.challenges, values.challengesNotes),
    });
    if (res.success) {
      setStatus("done");
      setFeedback(res.message);
      return;
    }
    setStatus("idle");
    setFeedback(res.message);
    const map: Record<string, string> = {};
    res.errors?.forEach((er) => (map[er.field] = er.message));
    setErrors(map);
    if (["name", "email", "phone", "company", "industry", "teamSize"].some((f) => map[f])) {
      setStep(0);
    }
  }

  const err = (f: string) =>
    errors[f] ? <p className="mt-1 text-sm text-red-400">{errors[f]}</p> : null;

  if (status === "done") {
    return (
      <div className="py-10 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-2xl text-black">
          ✓
        </div>
        <h2 className="text-2xl font-bold">Thank you, {values.name.split(" ")[0]}!</h2>
        <p className="mt-3 text-white/70">{feedback}</p>
        <p className="mt-2 text-white/60">We will review your answers and get back to you soon.</p>
        <Link
          href="/contact"
          className="mt-8 inline-block rounded-full bg-gold px-7 py-3 font-semibold text-black transition hover:bg-gold-soft"
        >
          Book a consultation
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-2 flex justify-between text-xs text-white/50">
        {steps.map((s, i) => (
          <span key={s} className={i <= step ? "text-gold" : ""}>
            {i + 1}
            <span className="hidden sm:inline"> {s}</span>
          </span>
        ))}
      </div>
      <div className="mb-8 h-1 w-full rounded bg-white/10">
        <div
          className="h-1 rounded bg-gold transition-all duration-300"
          style={{ width: `${((step + 1) / steps.length) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
          className="min-h-[300px] space-y-5"
        >
          {step === 0 && (
            <>
              <h2 className="text-xl font-semibold">Business information</h2>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <input value={values.name} onChange={set("name")} placeholder="Your name *" className={inputClass} />
                  {err("name")}
                </div>
                <div>
                  <input type="email" value={values.email} onChange={set("email")} placeholder="Email *" className={inputClass} />
                  {err("email")}
                </div>
                <div>
                  <input value={values.phone} onChange={set("phone")} placeholder="Phone" className={inputClass} />
                  {err("phone")}
                </div>
                <div>
                  <input value={values.company} onChange={set("company")} placeholder="Company" className={inputClass} />
                  {err("company")}
                </div>
                <div>
                  <input value={values.industry} onChange={set("industry")} placeholder="Industry" className={inputClass} />
                  {err("industry")}
                </div>
                <div>
                  <select value={values.teamSize} onChange={set("teamSize")} className={inputClass}>
                    <option value="" className="bg-black">Team size</option>
                    {teamSizes.map((t) => (
                      <option key={t} value={t} className="bg-black">{t}</option>
                    ))}
                  </select>
                  {err("teamSize")}
                </div>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h2 className="text-xl font-semibold">Website and digital presence</h2>
              <div>
                <input value={values.website} onChange={set("website")} placeholder="Your website address (if any)" className={inputClass} />
                {err("website")}
              </div>
              <div>
                <p className="mb-3 text-sm text-white/60">How is your website doing today?</p>
                <Chips
                  options={websiteStatuses}
                  selected={values.websiteStatus ? [values.websiteStatus] : []}
                  onToggle={(o) =>
                    setValues((v) => ({ ...v, websiteStatus: v.websiteStatus === o ? "" : o }))
                  }
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-xl font-semibold">Marketing</h2>
              <p className="text-sm text-white/60">Which channels do you use today?</p>
              <Chips options={marketingOptions} selected={values.marketing} onToggle={(o) => toggle("marketing", o)} />
              <textarea value={values.marketingNotes} onChange={set("marketingNotes")} rows={3} placeholder="Anything else about your marketing? (optional)" className={inputClass} />
              {err("marketing")}
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-xl font-semibold">Technology</h2>
              <p className="text-sm text-white/60">What technology do you use today?</p>
              <Chips options={techOptions} selected={values.technology} onToggle={(o) => toggle("technology", o)} />
              <textarea value={values.technologyNotes} onChange={set("technologyNotes")} rows={3} placeholder="Tools or systems you rely on (optional)" className={inputClass} />
              {err("technology")}
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="text-xl font-semibold">Business challenges</h2>
              <p className="text-sm text-white/60">What is holding your growth back?</p>
              <Chips options={challengeOptions} selected={values.challenges} onToggle={(o) => toggle("challenges", o)} />
              <textarea value={values.challengesNotes} onChange={set("challengesNotes")} rows={4} placeholder="Describe your biggest challenge (optional)" className={inputClass} />
              {err("challenges")}
            </>
          )}

          {step === 5 && (
            <>
              <h2 className="text-xl font-semibold">Review and submit</h2>
              <dl className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-5 text-sm">
                {[
                  ["Name", values.name],
                  ["Email", values.email],
                  ["Company", values.company],
                  ["Website", values.website],
                  ["Marketing", values.marketing.join(", ")],
                  ["Technology", values.technology.join(", ")],
                  ["Challenges", values.challenges.join(", ")],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-3">
                    <dt className="w-28 shrink-0 text-white/50">{k}</dt>
                    <dd className="text-white/90">{v || "-"}</dd>
                  </div>
                ))}
              </dl>
              {feedback && <p className="text-red-400">{feedback}</p>}
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {localError && <p className="mt-4 text-sm text-red-400">{localError}</p>}

      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(s - 1, 0))}
          disabled={step === 0}
          className="rounded-full border border-white/20 px-6 py-2.5 text-white/80 transition hover:border-gold disabled:opacity-30"
        >
          Back
        </button>
        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={next}
            className="rounded-full bg-gold px-7 py-2.5 font-semibold text-black transition hover:bg-gold-soft"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={status === "sending"}
            className="rounded-full bg-gold px-7 py-2.5 font-semibold text-black transition hover:bg-gold-soft disabled:opacity-60"
          >
            {status === "sending" ? "Submitting..." : "Submit checkup"}
          </button>
        )}
      </div>
    </div>
  );
}