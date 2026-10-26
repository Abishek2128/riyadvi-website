import type { Metadata } from "next";
import BlogList from "@/components/BlogList";
import { getAllPosts } from "@/data/posts";

export const metadata: Metadata = {
  title: "Blog | Riyadvi",
  description: "Practical articles on web, apps, marketing, 3D and design.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-32">
      <p className="mb-3 text-sm uppercase tracking-widest text-gold">Blog</p>
      <h1 className="text-4xl font-bold md:text-6xl">
        Ideas for your <span className="text-gold">digital growth</span>
      </h1>
      <p className="mt-5 max-w-xl text-white/70">
        Practical articles on web, apps, marketing, 3D and design.
      </p>
      <div className="mt-10">
        <BlogList posts={posts} />
      </div>
    </main>
  );
}