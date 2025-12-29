"use client";

import { Mail, CheckCircle2, AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { subscribeAction } from "@/app/actions";
import { useState, useTransition } from "react";

export function NewsletterWidget() {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<{
    success?: boolean;
    error?: string;
  } | null>(null);

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await subscribeAction(formData);
      setState(result);
    });
  }

  return (
    <Card className="bg-primary text-primary-foreground border-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Newsletter
        </CardTitle>
        <CardDescription className="text-primary-foreground/80">
          Get the latest posts delivered right to your inbox.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {state?.success ? (
          <div className="flex flex-col items-center justify-center py-4 text-center space-y-2 animate-in fade-in slide-in-from-bottom-4">
            <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <p className="font-medium">Thanks for subscribing!</p>
            <p className="text-sm text-primary-foreground/80">
              You&apos;ll hear from us soon.
            </p>
          </div>
        ) : (
          <form action={handleSubmit} className="space-y-2">
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-primary-foreground/30"
            />
            {state?.error && (
              <div className="flex items-center gap-2 text-sm text-red-200 bg-red-900/20 p-2 rounded">
                <AlertCircle className="h-4 w-4" />
                {state.error}
              </div>
            )}
            <Button
              type="submit"
              variant="secondary"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
