import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TrendingTopicsProps {
  tags: string[];
}

export function TrendingTopics({ tags }: TrendingTopicsProps) {
  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-lg">Trending Topics</CardTitle>
      </CardHeader>
      <CardContent className="px-0 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="cursor-pointer hover:bg-secondary transition-colors py-1.5 px-3"
          >
            #{tag}
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
}
