import { Mail } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NewsletterWidget() {
  return (
    <Card className="bg-primary text-primary-foreground border-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Newsletter
        </CardTitle>
        <CardDescription className="text-primary-foreground/80">
          Get the latest trends delivered to your inbox weekly.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Input
          placeholder="your@email.com"
          className="bg-white border-transparent text-black placeholder:text-gray-500 focus-visible:ring-white/30"
        />
        <Button variant="secondary" className="w-full font-bold">
          Subscribe
        </Button>
      </CardContent>
    </Card>
  );
}
