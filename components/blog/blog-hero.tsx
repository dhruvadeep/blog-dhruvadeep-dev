"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export function BlogHero() {
  return (
    <section className="mb-12 space-y-2">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Badge
          variant="outline"
          className="mb-4 text-primary border-primary/30 bg-primary/5"
        >
          Read Our Blog
        </Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight lg:text-6xl">
          Browse Our Resources
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mt-4">
          We provide tips and resources from industry leaders. For real. Dive
          into articles, tutorials, and tips to enhance your coding journey.
        </p>
      </motion.div>
    </section>
  );
}
