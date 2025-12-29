"use server";

import { getAllPosts } from "@/lib/db/queries";
import { Post } from "@/types/blog";

export async function fetchPosts(page: number, search?: string) {
  const limit = 6;
  const offset = (page - 1) * limit;
  const dbPosts = getAllPosts(search, limit, offset);

  const posts: Post[] = dbPosts.map((p) => ({
    id: p.id,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category_name,
    author: p.author_name,
    date: new Date(p.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    readTime: p.read_time,
    image: p.cover_image,
  }));

  return posts;
}
