"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function BlogHero() {
  return (
    <section className="mb-12 space-y-2 ">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Badge
          variant="outline"
          className="mb-4 text-primary border-primary/30 bg-primary/5"
        >
          Echo of Lifes · Personal blog
        </Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight lg:text-6xl">
          Echoes of code, life, and learning
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mt-4">
          Notes, stories, and experiments from a developer figuring things out
          in public. Read along as ideas, projects, and reflections grow over
          time.
        </p>
        <Button
          variant="outline"
          className="mt-2"
          onClick={() => {
            window.open("https://dhruvadeep.dev", "_blank");
          }}
        >
          Dhruvadeep Malakar
        </Button>
      </motion.div>
    </section>
  );
}
