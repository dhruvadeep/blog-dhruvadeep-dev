import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { POSTS } from "@/data/blog-data";
import { Eye, Users, FileText, TrendingUp } from "lucide-react";

export default function DashboardOverview() {
  const stats = [
    {
      title: "Total Posts",
      value: POSTS.length,
      icon: FileText,
      description: "+2 from last month",
    },
    {
      title: "Total Views",
      value: "45.2k",
      icon: Eye,
      description: "+12% from last month",
    },
    {
      title: "Subscribers",
      value: "2,350",
      icon: Users,
      description: "+180 new subscribers",
    },
    {
      title: "Engagement Rate",
      value: "12.5%",
      icon: TrendingUp,
      description: "+2.4% from last month",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your blog's performance
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
              {/* Mock activity feed */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      New comment on "Minimalism is dead"
                    </p>
                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                  </div>
                  <div className="ml-auto font-medium">+1 Comment</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Popular Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {POSTS.slice(0, 3).map((post) => (
                <div key={post.id} className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {post.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {post.readTime}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    {Math.floor(Math.random() * 5000) + 1000} views
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
