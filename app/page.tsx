"use client";

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
import { FEATURED_POST, POSTS, CATEGORIES } from "@/data/blog-data";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20">
      <SiteHeader />

      <main className="container mx-auto px-4 pt-28 pb-8 md:pt-32 md:pb-12">
        {/* Hero Section */}
        <BlogHero />

        {/* Featured Post */}
        <section className="mb-16">
          <FeaturedCard post={FEATURED_POST} />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-10">
            {/* Filter Tabs */}
            <BlogFilters categories={CATEGORIES} />

            {/* Post Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
              {POSTS.map((post, index) => (
                <PostCard key={post.id} post={post} index={index} />
              ))}
            </div>

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
