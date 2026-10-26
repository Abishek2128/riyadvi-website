"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { formatDate, readingMinutes, type Post } from "@/data/posts";

function Card({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-gold/20 bg-white/5 p-6 transition hover:border-gold"
    >
      <p className="text-xs uppercase tracking-widest text-gold">{post.category}</p>
      <h3 className="mt-3 text-lg font-semibold">{post.title}</h3>
      <p className="mt-2 flex-1 text-sm text-white/60">{post.excerpt}</p>
      <p className="mt-4 text-xs text-white/40">
        {formatDate(post.date)} · {readingMinutes(post)} min read
      </p>
    </Link>
  );
}

export default function BlogList({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [tag, setTag] = useState("");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((p) => p.category)))],
    [posts]
  );
  const tags = useMemo(
    () => Array.from(new Set(posts.flatMap((p) => p.tags))).sort(),
    [posts]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (!tag || p.tags.includes(tag)) &&
        (!q || `${p.title} ${p.excerpt} ${p.tags.join(" ")}`.toLowerCase().includes(q))
    );
  }, [posts, query, category, tag]);

  const filtering = Boolean(query || tag || category !== "All");
  const featured = !filtering ? filtered.find((p) => p.featured) : undefined;
  const rest = featured ? filtered.filter((p) => p.slug !== featured.slug) : filtered;

  function clear() {
    setQuery("");
    setCategory("All");
    setTag("");
  }

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search articles..."
        className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-gold md:max-w-md"
      />

      <div className="mt-6 flex flex-wrap gap-3">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={`rounded-full border px-4 py-1.5 text-sm transition ${
              category === c
                ? "border-gold bg-gold text-black"
                : "border-white/20 text-white/80 hover:border-gold"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-white/40">Tags:</span>
        {tags.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTag(tag === t ? "" : t)}
            className={`rounded-full px-3 py-1 transition ${
              tag === t ? "bg-gold/20 text-gold" : "text-white/60 hover:text-gold"
            }`}
          >
            #{t}
          </button>
        ))}
        {filtering && (
          <button type="button" onClick={clear} className="ml-2 text-gold hover:underline">
            Clear filters
          </button>
        )}
      </div>

      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="mt-10 block rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/20 via-black to-black p-8 transition hover:border-gold md:p-12"
        >
          <p className="text-xs uppercase tracking-widest text-gold">Featured · {featured.category}</p>
          <h2 className="mt-3 max-w-2xl text-2xl font-bold md:text-4xl">{featured.title}</h2>
          <p className="mt-4 max-w-xl text-white/70">{featured.excerpt}</p>
          <p className="mt-5 text-sm text-white/50">
            {formatDate(featured.date)} · {readingMinutes(featured)} min read
          </p>
        </Link>
      )}

      {filtered.length === 0 ? (
        <p className="mt-12 text-white/60">No articles match your search.</p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {rest.map((p) => (
            <Card key={p.slug} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}