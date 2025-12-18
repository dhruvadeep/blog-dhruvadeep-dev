import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchWidget() {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search blog..."
        className="pl-9 rounded-full bg-secondary/50 border-transparent focus:bg-background transition-all"
      />
    </div>
  );
}
