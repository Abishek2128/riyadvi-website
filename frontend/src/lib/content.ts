import { cacheLife } from "next/cache";
import { services as localServices, type Service } from "@/data/services";
import { projects as localProjects, type Project } from "@/data/projects";
import { getAllPosts as localAllPosts, type Post } from "@/data/posts";
import { getAllJobs as localAllJobs, type Job } from "@/data/jobs";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Reads a list from the Riyadvi API. Returns null when the API is slow, down or empty,
// so the site can fall back to the built-in data and never breaks.
async function fetchList<T>(path: string): Promise<T[] | null> {
  "use cache";
  cacheLife("minutes");
  try {
    const res = await fetch(`${API}/api${path}`, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    const json = await res.json();
    return Array.isArray(json.data) && json.data.length > 0 ? (json.data as T[]) : null;
  } catch {
    return null;
  }
}

export async function getServices(): Promise<Service[]> {
  return (await fetchList<Service>("/services")) ?? localServices;
}

export async function getService(slug: string): Promise<Service | undefined> {
  return (await getServices()).find((s) => s.slug === slug);
}

export async function getProjects(): Promise<Project[]> {
  return (await fetchList<Project>("/projects")) ?? localProjects;
}

export async function getProject(slug: string): Promise<Project | undefined> {
  return (await getProjects()).find((p) => p.slug === slug);
}

export async function getPosts(): Promise<Post[]> {
  const remote = await fetchList<Post>("/posts");
  const list = remote ?? (await localAllPosts());
  return [...list].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return (await getPosts()).find((p) => p.slug === slug);
}

export async function getRelatedPosts(slug: string, limit = 3): Promise<Post[]> {
  const all = await getPosts();
  const current = all.find((p) => p.slug === slug);
  if (!current) return [];
  return all
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      p,
      score:
        (p.category === current.category ? 2 : 0) +
        p.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}

export async function getJobs(): Promise<Job[]> {
  return (await fetchList<Job>("/jobs")) ?? (await localAllJobs());
}

export async function getJob(slug: string): Promise<Job | undefined> {
  return (await getJobs()).find((j) => j.slug === slug);
}