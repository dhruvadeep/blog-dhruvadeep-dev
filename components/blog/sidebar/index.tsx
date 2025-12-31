import { SearchWidget } from "./search-widget";
import { TrendingTopics } from "./trending-topics";
import { NewsletterWidget } from "./newsletter-widget";
import { RecentInsights } from "./recent-insights";
import { getRecentPosts } from "@/lib/db/queries";

export async function Sidebar() {
  const recentDbPosts = await getRecentPosts(3);

  const recentInsights = recentDbPosts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    date: new Date(p.created_at).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    image: p.cover_image,
  }));

  return (
    <div className="space-y-8">
      <SearchWidget />
      <TrendingTopics />
      <NewsletterWidget />
      <RecentInsights insights={recentInsights} />
    </div>
  );
}
