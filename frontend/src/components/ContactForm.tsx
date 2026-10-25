"use client";
import { useState } from "react";
import { postForm } from "@/lib/api";
import { services } from "@/data/services";

const initial = {
  name: "",
  email: "",
  phone: "",
  company: "",
  requirement: "",
  message: "",
};

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-gold";

export default function ContactForm() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrors({});
    setFeedback("");
    const res = await postForm("/contact", values);
    if (res.success) {
      setStatus("done");
      setFeedback(res.message);
      setValues(initial);
    } else {
      setStatus("error");
      setFeedback(res.message);
      const map: Record<string, string> = {};
      res.errors?.forEach((er) => (map[er.field] = er.message));
      setErrors(map);
    }
  }

  const err = (f: string) =>
    errors[f] ? <p className="mt-1 text-sm text-red-400">{errors[f]}</p> : null;

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
          <input name="phone" value={values.phone} onChange={onChange} placeholder="Phone" className={inputClass} />
          {err("phone")}
        </div>
        <div>
          <input name="company" value={values.company} onChange={onChange} placeholder="Company" className={inputClass} />
          {err("company")}
        </div>
      </div>
      <div>
        <select name="requirement" value={values.requirement} onChange={onChange} className={inputClass}>
          <option value="" className="bg-black">What do you need?</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title} className="bg-black">{s.title}</option>
          ))}
          <option value="Other" className="bg-black">Other</option>
        </select>
        {err("requirement")}
      </div>
      <div>
        <textarea name="message" value={values.message} onChange={onChange} rows={5} placeholder="Tell us about your project *" className={inputClass} />
        {err("message")}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-gold px-8 py-3 font-semibold text-black transition hover:bg-gold-soft disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send message"}
      </button>

      {feedback && (
        <p className={status === "done" ? "text-gold" : "text-red-400"}>{feedback}</p>
      )}
    </form>
  );
}