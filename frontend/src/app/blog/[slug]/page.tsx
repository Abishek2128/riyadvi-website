import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  readingMinutes,
  formatDate,
} from "@/data/posts";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return {
    title: post ? `${post.title} | Riyadvi` : "Article | Riyadvi",
    description: post?.excerpt,
  };
}

async function ArticleContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const related = await getRelatedPosts(post.slug);

  return (
    <main>
      <article className="mx-auto max-w-3xl px-6 pb-16 pt-32">
        <Link href="/blog" className="text-sm text-gold hover:underline">
          ← All articles
        </Link>
        <p className="mt-6 text-xs uppercase tracking-widest text-gold">{post.category}</p>
        <h1 className="mt-3 text-3xl font-bold md:text-5xl">{post.title}</h1>
        <p className="mt-4 text-sm text-white/50">
          {post.author} · {formatDate(post.date)} · {readingMinutes(post)} min read
        </p>
        <p className="mt-8 text-lg text-white/70">{post.excerpt}</p>

        <div className="mt-10 space-y-8">
          {post.body.map((s, i) => (
            <section key={i}>
              {s.h && <h2 className="mb-3 text-2xl font-semibold">{s.h}</h2>}
              <p className="leading-relaxed text-white/75">{s.p}</p>
            </section>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span key={t} className="rounded-full border border-white/15 px-3 py-1 text-sm text-white/60">
              #{t}
            </span>
          ))}
        </div>
      </article>

      {related.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 py-12">
          <h2 className="mb-6 text-2xl font-bold">
            Related <span className="text-gold">articles</span>
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="rounded-xl border border-gold/20 bg-white/5 p-5 transition hover:border-gold"
              >
                <p className="text-xs uppercase tracking-widest text-gold">{r.category}</p>
                <h3 className="mt-2 font-semibold">{r.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <h2 className="text-2xl font-bold md:text-3xl">
          Need help with your <span className="text-gold">project?</span>
        </h2>
        <Link
          href="/contact"
          className="mt-6 inline-block rounded-full bg-gold px-8 py-3 font-semibold text-black transition hover:bg-gold-soft"
        >
          Book a Free Consultation
        </Link>
      </section>
    </main>
  );
}

export default function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ArticleContent params={params} />
    </Suspense>
  );
}