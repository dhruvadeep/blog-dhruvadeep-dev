import { PostCard, BlogFilters, BlogFooter, Sidebar } from "@/components/blog";
import { getAllPosts, getCategories, searchPosts } from "@/lib/db/queries";
import { Post } from "@/types/blog";
import SiteHeader from "@/components/site-header";
import { Button, buttonVariants } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AllPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const params = await searchParams;
  const searchQuery = params.search;

  const dbPosts = searchQuery
    ? await searchPosts(searchQuery)
    : await getAllPosts();
  const dbCategories = await getCategories();

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

  const categories = ["All", ...dbCategories.map((c) => c.name)];

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20">
      <SiteHeader />

      <main className="container mx-auto px-4 pt-28 pb-8 md:pt-32 md:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-10">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">
                {searchQuery
                  ? `Search Results for "${searchQuery}"`
                  : "All Posts"}
              </h1>
              <p className="text-muted-foreground text-lg">
                {searchQuery
                  ? `Found ${posts.length} result${
                      posts.length === 1 ? "" : "s"
                    }`
                  : "Browse all our articles and tutorials."}
              </p>
            </div>

            {/* Filter Tabs */}
            {!searchQuery && <BlogFilters categories={categories} />}

            {/* Post Grid */}
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
                {posts.map((post, index) => (
                  <PostCard key={post.id} post={post} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">
                  No posts found matching your search.
                </p>
                <Link
                  href="/posts"
                  className={cn(buttonVariants({ variant: "link" }), "mt-4")}
                >
                  Clear Search
                </Link>
              </div>
            )}

            {/* Pagination / Load More */}
            <div className="flex justify-center pt-8">
              <Button variant="outline" className="rounded-full px-8 gap-2">
                Load More Articles
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 pl-0 lg:pl-8">
            <div className="sticky top-24">
              <Sidebar />
            </div>
          </aside>
        </div>
      </main>

      <BlogFooter />
    </div>
  );
}
