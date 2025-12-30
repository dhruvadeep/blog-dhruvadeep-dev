import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/site-header";
import {
  FeaturedCard,
  PostCard,
  BlogHero,
  BlogFilters,
  BlogFooter,
  Sidebar,
} from "@/components/blog";
import { getAllPosts, getCategories, getFeaturedPost } from "@/lib/db/queries";
import { Post, FeaturedPost } from "@/types/blog";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface BlogPageProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { search } = await searchParams;
  const dbPosts = getAllPosts(search);
  const dbCategories = getCategories();
  const dbFeaturedPost = getFeaturedPost();

  const posts: Post[] = dbPosts.map((p) => ({
    id: p.id,
    slug: p.slug,
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

  // Use the explicitly featured post, or fallback to the most recent one
  const featuredDbPost = dbFeaturedPost || dbPosts[0];

  const featuredPost: FeaturedPost | null = featuredDbPost
    ? {
        id: featuredDbPost.id,
        slug: featuredDbPost.slug,
        title: featuredDbPost.title,
        excerpt: featuredDbPost.excerpt,
        author: {
          name: featuredDbPost.author_name,
          avatar: featuredDbPost.author_avatar,
        },
        date: new Date(featuredDbPost.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        tags: ["Web Development", "Design System"], // TODO: Fetch tags
        image: featuredDbPost.cover_image,
      }
    : null;

  // Filter out the featured post from the list if needed, or just show all
  const displayPosts = posts.filter((p) => p.id !== featuredDbPost?.id);

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20">
      <SiteHeader />

      <main className="container mx-auto px-4 pt-28 pb-8 md:pt-32 md:pb-12">
        {/* Hero Section */}
        <BlogHero />

        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-16">
            <FeaturedCard post={featuredPost} />
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-10">
            {/* Filter Tabs */}
            <BlogFilters categories={categories} />

            {/* Post Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
              {displayPosts.map((post, index) => (
                <PostCard key={post.id} post={post} index={index} />
              ))}
            </div>

            {/* Pagination / Load More */}
            <div className="flex justify-center pt-8">
              <Link href="/posts">
                <Button variant="outline" className="rounded-full px-8 gap-2">
                  Load More Articles
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
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
