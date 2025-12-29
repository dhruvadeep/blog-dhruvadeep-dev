"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteTagAction } from "@/app/actions";
import { useTransition } from "react";

export function DeleteTagButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-destructive"
      disabled={isPending}
      onClick={() => {
        if (confirm("Are you sure you want to delete this tag?")) {
          startTransition(async () => {
            await deleteTagAction(id);
          });
        }
      }}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
