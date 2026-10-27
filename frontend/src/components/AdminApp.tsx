"use client";
import { useCallback, useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const TOKEN_KEY = "riyadvi_admin_token";

type Row = { _id: string; status?: string; createdAt?: string; [key: string]: unknown };

const tabs = [
  { key: "overview", label: "Overview", columns: [] as [string, string][] },
  {
    key: "contacts",
    label: "Enquiries",
    columns: [["name", "Name"], ["email", "Email"], ["phone", "Phone"], ["company", "Company"], ["requirement", "Requirement"], ["message", "Message"]] as [string, string][],
  },
  {
    key: "consultations",
    label: "Consultations",
    columns: [["name", "Name"], ["email", "Email"], ["phone", "Phone"], ["company", "Company"], ["preferredDate", "Preferred date"]] as [string, string][],
  },
  {
    key: "health-checkups",
    label: "Health checkups",
    columns: [["name", "Name"], ["email", "Email"], ["company", "Company"], ["industry", "Industry"], ["teamSize", "Team size"]] as [string, string][],
  },
  {
    key: "lead-magnets",
    label: "Guide downloads",
    columns: [["name", "Name"], ["company", "Company"], ["email", "Email"], ["phone", "Phone"]] as [string, string][],
  },
  {
    key: "applications",
    label: "Applications",
    columns: [["name", "Name"], ["email", "Email"], ["phone", "Phone"], ["position", "Position"]] as [string, string][],
  },
];

const statusOptions = ["new", "in-progress", "closed"];
const noStatus = ["lead-magnets"];

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-gold";

function formatDate(iso?: string) {
  if (!iso) return "-";
  return new Date(iso).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });
}

function Login({ onLogin }: { onLogin: (token: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`${API}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (json.success) onLogin(json.data.token);
      else setError(json.message || "Login failed");
    } catch {
      setError("Could not reach the server. Please try again.");
    }
    setBusy(false);
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-sm space-y-5 rounded-2xl border border-gold/20 bg-white/5 p-8">
      <h1 className="text-2xl font-bold">
        Admin <span className="text-gold">login</span>
      </h1>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className={inputClass} autoComplete="username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className={inputClass} autoComplete="current-password" />
      <button type="submit" disabled={busy} className="w-full rounded-full bg-gold px-6 py-3 font-semibold text-black transition hover:bg-gold-soft disabled:opacity-60">
        {busy ? "Signing in..." : "Sign in"}
      </button>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </form>
  );
}

function Dashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [tab, setTab] = useState("overview");
  const [stats, setStats] = useState<Record<string, number> | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const call = useCallback(
    async (path: string, init?: RequestInit) => {
      const res = await fetch(`${API}/api/admin${path}`, {
        ...init,
        headers: { ...(init?.headers ?? {}), Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        onLogout();
        throw new Error("Session expired. Please sign in again.");
      }
      return res;
    },
    [token, onLogout]
  );

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        if (tab === "overview") {
          const json = await (await call("/stats")).json();
          if (!cancelled) setStats(json.data);
        } else {
          const json = await (await call(`/list/${tab}`)).json();
          if (!cancelled) setRows(json.data ?? []);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error && e.message.startsWith("Session") ? e.message : "Could not load data. The server may be waking up, so try again.");
      }
      if (!cancelled) setLoading(false);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [tab, call]);

  async function changeStatus(id: string, status: string) {
    try {
      const res = await call(`/status/${tab}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const json = await res.json();
      if (json.success) setRows((r) => r.map((x) => (x._id === id ? { ...x, status } : x)));
      else setError(json.message || "Could not update status");
    } catch {
      /* handled in call() */
    }
  }

  async function downloadResume(row: Row) {
    try {
      const res = await call(`/applications/${row._id}/resume`);
      if (!res.ok) {
        setError("Resume not found");
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = String((row.resume as { filename?: string } | undefined)?.filename ?? "resume");
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      /* handled in call() */
    }
  }

  const active = tabs.find((t) => t.key === tab)!;
  const cards: [string, string][] = [
    ["contacts", "Total enquiries"],
    ["consultations", "Consultation requests"],
    ["healthCheckups", "Health checkup leads"],
    ["leadMagnets", "Guide downloads"],
    ["applications", "Job applications"],
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold md:text-4xl">
          Admin <span className="text-gold">dashboard</span>
        </h1>
        <button type="button" onClick={onLogout} className="rounded-full border border-white/20 px-5 py-2 text-sm text-white/80 transition hover:border-gold">
          Sign out
        </button>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`rounded-full border px-4 py-1.5 text-sm transition ${
              tab === t.key ? "border-gold bg-gold text-black" : "border-white/20 text-white/80 hover:border-gold"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {error && <p className="mt-6 text-red-400">{error}</p>}
      {loading && <p className="mt-6 text-white/50">Loading...</p>}

      {tab === "overview" && stats && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-5">
          {cards.map(([key, label]) => (
            <div key={key} className="rounded-2xl border border-gold/25 bg-white/5 p-6">
              <p className="text-4xl font-bold text-gold">{stats[key] ?? 0}</p>
              <p className="mt-2 text-sm text-white/60">{label}</p>
            </div>
          ))}
        </div>
      )}

      {tab !== "overview" && !loading && (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-white/5 text-white/60">
              <tr>
                {active.columns.map(([, label]) => (
                  <th key={label} className="px-4 py-3 font-medium">{label}</th>
                ))}
                <th className="px-4 py-3 font-medium">Date</th>
                {!noStatus.includes(tab) && <th className="px-4 py-3 font-medium">Status</th>}
                {tab === "applications" && <th className="px-4 py-3 font-medium">Resume</th>}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-white/50" colSpan={active.columns.length + 3}>
                    Nothing here yet.
                  </td>
                </tr>
              )}
              {rows.map((r) => (
                <tr key={r._id} className="border-t border-white/10 align-top">
                  {active.columns.map(([field]) => (
                    <td key={field} className="max-w-[220px] truncate px-4 py-3 text-white/80" title={String(r[field] ?? "")}>
                      {String(r[field] ?? "") || "-"}
                    </td>
                  ))}
                  <td className="whitespace-nowrap px-4 py-3 text-white/60">{formatDate(r.createdAt)}</td>
                  {!noStatus.includes(tab) && (
                    <td className="px-4 py-3">
                      <select
                        value={r.status ?? "new"}
                        onChange={(e) => changeStatus(r._id, e.target.value)}
                        className="rounded-lg border border-white/15 bg-black px-2 py-1 text-white"
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  )}
                  {tab === "applications" && (
                    <td className="px-4 py-3">
                      <button type="button" onClick={() => downloadResume(r)} className="text-gold hover:underline">
                        Download
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function AdminApp() {
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setToken(sessionStorage.getItem(TOKEN_KEY));
    } catch {
      setToken(null);
    }
    setReady(true);
  }, []);

  const login = (t: string) => {
    try {
      sessionStorage.setItem(TOKEN_KEY, t);
    } catch {
      /* storage unavailable */
    }
    setToken(t);
  };

  const logout = useCallback(() => {
    try {
      sessionStorage.removeItem(TOKEN_KEY);
    } catch {
      /* storage unavailable */
    }
    setToken(null);
  }, []);

  if (!ready) return null;
  return token ? <Dashboard token={token} onLogout={logout} /> : <Login onLogin={login} />;
}