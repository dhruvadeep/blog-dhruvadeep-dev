"use client";

import { useEffect } from "react";
import { incrementViewCount } from "@/app/actions";

export function ViewCounter({ postId }: { postId: number }) {
  useEffect(() => {
    incrementViewCount(postId);
  }, [postId]);

  return null;
}
