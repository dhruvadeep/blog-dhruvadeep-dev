import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BlogFiltersProps {
  categories: string[];
}

export function BlogFilters({ categories }: BlogFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <Tabs defaultValue="All" className="w-full sm:w-auto">
        <TabsList className="bg-transparent p-0 h-auto flex flex-wrap justify-start gap-2">
          {categories.map((cat) => (
            <TabsTrigger
              key={cat}
              value={cat}
              className="rounded-full border bg-background px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground shadow-sm transition-all"
            >
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="relative w-full sm:w-64">
        <Input
          placeholder="Search articles..."
          className="rounded-full bg-secondary/30"
        />
        <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
}
