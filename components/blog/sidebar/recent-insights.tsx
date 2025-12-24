import { TrendingUp } from "lucide-react";
import Image from "next/image";
import { RecentInsight } from "@/types/blog";

interface RecentInsightsProps {
  insights: RecentInsight[];
}

export function RecentInsights({ insights }: RecentInsightsProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-primary" />
        Recent Insights
      </h3>
      <div className="space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="group flex items-start gap-4 cursor-pointer"
          >
            <div className="relative h-16 w-16 rounded-lg bg-muted overflow-hidden flex-shrink-0">
              <Image
                src={insight.image}
                alt={insight.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform"
              />
            </div>
            <div>
              <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                {insight.title}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                {insight.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
