"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createTagAction } from "@/app/actions";
import { useTransition, useRef } from "react";

export function CreateTagForm() {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Tag</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          ref={formRef}
          action={(formData) => {
            startTransition(async () => {
              await createTagAction(formData);
              formRef.current?.reset();
            });
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Tag Name</Label>
            <Input id="name" name="name" placeholder="e.g. React" required />
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create Tag"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
