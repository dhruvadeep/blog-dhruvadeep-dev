"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deletePostAction } from "@/app/actions";
import { useTransition } from "react";

export function DeletePostButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-destructive"
      disabled={isPending}
      onClick={() => {
        if (confirm("Are you sure you want to delete this post?")) {
          startTransition(() => deletePostAction(id));
        }
      }}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
