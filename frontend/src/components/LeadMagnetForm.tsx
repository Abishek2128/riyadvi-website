"use client";
import { useState } from "react";
import Link from "next/link";
import { postForm } from "@/lib/api";

const initial = { name: "", company: "", email: "", phone: "" };

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-gold";

export default function LeadMagnetForm() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [feedback, setFeedback] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrors({});
    setFeedback("");
    const res = await postForm("/lead-magnet", values);
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
  }

  const err = (f: string) =>
    errors[f] ? <p className="mt-1 text-sm text-red-400">{errors[f]}</p> : null;

  if (status === "done") {
    return (
      <div className="py-6 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-2xl text-black">
          ✓
        </div>
        <h2 className="text-2xl font-bold">Thank you, {values.name.split(" ")[0]}!</h2>
        <p className="mt-3 text-white/70">{feedback}</p>
        <Link
          href="/software-project-planning-guide/guide"
          className="mt-8 inline-block rounded-full bg-gold px-7 py-3 font-semibold text-black transition hover:bg-gold-soft"
        >
          Open the guide
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div>
        <input name="name" value={values.name} onChange={onChange} placeholder="Your name *" className={inputClass} />
        {err("name")}
      </div>
      <div>
        <input name="company" value={values.company} onChange={onChange} placeholder="Company *" className={inputClass} />
        {err("company")}
      </div>
      <div>
        <input name="email" type="email" value={values.email} onChange={onChange} placeholder="Email *" className={inputClass} />
        {err("email")}
      </div>
      <div>
        <input name="phone" value={values.phone} onChange={onChange} placeholder="Phone *" className={inputClass} />
        {err("phone")}
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-gold px-8 py-3 font-semibold text-black transition hover:bg-gold-soft disabled:opacity-60"
      >
        {status === "sending" ? "Please wait..." : "Get the guide"}
      </button>
      {feedback && <p className="text-red-400">{feedback}</p>}
    </form>
  );
}