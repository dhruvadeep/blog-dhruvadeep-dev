import { SearchWidget } from "./search-widget";
import { TrendingTopics } from "./trending-topics";
import { NewsletterWidget } from "./newsletter-widget";
import { RecentInsights } from "./recent-insights";
import { TRENDING_TAGS, RECENT_INSIGHTS } from "@/data/blog-data";

export function Sidebar() {
  return (
    <div className="space-y-8">
      <SearchWidget />
      <TrendingTopics tags={TRENDING_TAGS} />
      <NewsletterWidget />
      <RecentInsights insights={RECENT_INSIGHTS} />
    </div>
  );
}
