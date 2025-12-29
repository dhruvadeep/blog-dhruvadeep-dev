import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { getTopPosts } from "@/lib/db/queries";

export async function TrendingTopics() {
  const topPosts = getTopPosts(5);

  return (
    <Card className="bg-card border-border/50 shadow-sm rounded-3xl overflow-hidden">
      <CardHeader className="p-6 pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          Blog Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-4 space-y-6">
        <div className="space-y-4">
          {topPosts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No insights yet.</p>
          ) : (
            topPosts.map((post, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium line-clamp-1 flex-1 mr-4">
                  {post.title}
                </span>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {post.views} views
                </span>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
