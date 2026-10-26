"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import type { Job } from "@/data/jobs";

const selectClass =
  "rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-gold";

export default function JobList({ jobs }: { jobs: Job[] }) {
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [experience, setExperience] = useState("");

  const options = useMemo(
    () => ({
      departments: Array.from(new Set(jobs.map((j) => j.department))),
      designations: Array.from(new Set(jobs.map((j) => j.designation))),
      experiences: Array.from(new Set(jobs.map((j) => j.experience))),
    }),
    [jobs]
  );

  const filtered = jobs.filter(
    (j) =>
      (!department || j.department === department) &&
      (!designation || j.designation === designation) &&
      (!experience || j.experience === experience)
  );

  const filtering = Boolean(department || designation || experience);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-4">
        <select value={department} onChange={(e) => setDepartment(e.target.value)} className={selectClass}>
          <option value="" className="bg-black">All departments</option>
          {options.departments.map((d) => (
            <option key={d} value={d} className="bg-black">{d}</option>
          ))}
        </select>
        <select value={designation} onChange={(e) => setDesignation(e.target.value)} className={selectClass}>
          <option value="" className="bg-black">All designations</option>
          {options.designations.map((d) => (
            <option key={d} value={d} className="bg-black">{d}</option>
          ))}
        </select>
        <select value={experience} onChange={(e) => setExperience(e.target.value)} className={selectClass}>
          <option value="" className="bg-black">Any experience</option>
          {options.experiences.map((d) => (
            <option key={d} value={d} className="bg-black">{d}</option>
          ))}
        </select>
        {filtering && (
          <button
            type="button"
            onClick={() => {
              setDepartment("");
              setDesignation("");
              setExperience("");
            }}
            className="text-left text-gold hover:underline md:py-3"
          >
            Clear filters
          </button>
        )}
      </div>

      <p className="mt-6 text-sm text-white/50">
        {filtered.length} open {filtered.length === 1 ? "role" : "roles"}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-8 text-white/60">No roles match these filters.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {filtered.map((j) => (
            <Link
              key={j.slug}
              href={`/careers/${j.slug}`}
              className="flex flex-col gap-3 rounded-2xl border border-gold/20 bg-white/5 p-6 transition hover:border-gold md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold">{j.title}</h3>
                <p className="mt-1 text-sm text-white/60">{j.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  {[j.department, j.experience, j.location, j.type].map((t) => (
                    <span key={t} className="rounded-full border border-white/15 px-3 py-1 text-white/70">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-gold">View role →</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}