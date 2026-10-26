"use client";
import { useState } from "react";
import { postMultipart } from "@/lib/api";

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-gold";

export default function ApplicationForm({ position }: { position: string }) {
  const [values, setValues] = useState({ name: "", email: "", phone: "", message: "" });
  const [file, setFile] = useState<File | null>(null);
  const [fileKey, setFileKey] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [feedback, setFeedback] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setFeedback("");
    if (!file) {
      setErrors({ resume: "Please attach your resume (PDF or Word, up to 2 MB)" });
      return;
    }
    setStatus("sending");
    const fd = new FormData();
    Object.entries({ ...values, position }).forEach(([k, v]) => fd.append(k, v));
    fd.append("resume", file);
    const res = await postMultipart("/applications", fd);
    if (res.success) {
      setStatus("done");
      setFeedback(res.message);
      setValues({ name: "", email: "", phone: "", message: "" });
      setFile(null);
      setFileKey((k) => k + 1);
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
        <h3 className="text-2xl font-bold">Application received</h3>
        <p className="mt-3 text-white/70">{feedback} We will review it and contact you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <input name="name" value={values.name} onChange={onChange} placeholder="Your name *" className={inputClass} />
          {err("name")}
        </div>
        <div>
          <input name="email" type="email" value={values.email} onChange={onChange} placeholder="Email *" className={inputClass} />
          {err("email")}
        </div>
        <div>
          <input name="phone" value={values.phone} onChange={onChange} placeholder="Phone *" className={inputClass} />
          {err("phone")}
        </div>
        <div>
          <input value={position} readOnly className={`${inputClass} text-white/60`} />
          {err("position")}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/60">Resume (PDF or Word, up to 2 MB) *</label>
        <input
          key={fileKey}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="block w-full text-sm text-white/70 file:mr-4 file:rounded-full file:border-0 file:bg-gold file:px-5 file:py-2 file:font-semibold file:text-black"
        />
        {err("resume")}
      </div>

      <div>
        <textarea name="message" value={values.message} onChange={onChange} rows={4} placeholder="Tell us about yourself (optional)" className={inputClass} />
        {err("message")}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-gold px-8 py-3 font-semibold text-black transition hover:bg-gold-soft disabled:opacity-60"
      >
        {status === "sending" ? "Submitting..." : "Submit application"}
      </button>
      {feedback && <p className="text-red-400">{feedback}</p>}
    </form>
  );
}