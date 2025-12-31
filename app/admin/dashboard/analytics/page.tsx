import { getDailyStats } from "@/lib/db/queries";
import { AnalyticsCharts } from "@/components/admin/analytics-charts";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const { views, comments } = await getDailyStats();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">
          Detailed insights about your blog&apos;s performance
        </p>
      </div>

      <AnalyticsCharts viewsData={views} commentsData={comments} />
    </div>
  );
}
