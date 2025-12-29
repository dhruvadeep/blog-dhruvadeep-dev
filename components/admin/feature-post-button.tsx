"use client";

import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { setFeaturedPostAction } from "@/app/actions";
import { useTransition } from "react";
import { cn } from "@/lib/utils";

export function FeaturePostButton({
  id,
  isFeatured,
}: {
  id: number;
  isFeatured: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={isPending}
      onClick={() => {
        startTransition(() => setFeaturedPostAction(id));
      }}
      title={isFeatured ? "Currently Featured" : "Set as Featured"}
    >
      <Star
        className={cn(
          "h-4 w-4",
          isFeatured
            ? "fill-yellow-400 text-yellow-400"
            : "text-muted-foreground"
        )}
      />
    </Button>
  );
}
