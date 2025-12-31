import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getAllPosts,
  getSubscriberCount,
  getEngagementRate,
  getRecentActivity,
  getTotalViews,
} from "@/lib/db/queries";
import { Eye, Users, FileText, TrendingUp } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardOverview() {
  const posts = await getAllPosts();
  const totalViews = await getTotalViews();
  const subscriberCount = await getSubscriberCount();
  const engagementRate = await getEngagementRate();
  const recentActivity = await getRecentActivity();

  const stats = [
    {
      title: "Total Posts",
      value: posts.length,
      icon: FileText,
      description: "All time",
    },
    {
      title: "Total Views",
      value: totalViews.toLocaleString(),
      icon: Eye,
      description: "All time",
    },
    {
      title: "Subscribers",
      value: subscriberCount.toLocaleString(),
      icon: Users,
      description: "Total subscribers",
    },
    {
      title: "Avg. Views/Post",
      value: engagementRate.toString(),
      icon: TrendingUp,
      description: "Engagement metric",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your blog&apos;s performance
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentActivity.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No recent activity.
                </p>
              ) : (
                recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Visit from {activity.city || "Unknown City"},{" "}
                        {activity.country || "Unknown Country"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.created_at.toLocaleString()} - IP:{" "}
                        {activity.ip}
                      </p>
                    </div>
                    <div className="ml-auto font-medium text-xs text-muted-foreground">
                      {activity.path}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Popular Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {posts.slice(0, 3).map((post) => (
                <div key={post.id} className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {post.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {post.read_time}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">{post.views} views</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
