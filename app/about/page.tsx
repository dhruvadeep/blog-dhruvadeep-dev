"use client";

import SiteHeader from "@/components/site-header";
import { BlogFooter } from "@/components/blog/blog-footer";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Heart, Zap, Globe } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="container px-4 mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-3xl mx-auto text-center space-y-6"
            >
              <Badge
                variant="outline"
                className="px-4 py-1 text-sm rounded-full"
              >
                About Us
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                We tell stories that matter.
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Exploring the frontiers of technology, design, and culture. We
                believe in the power of words to inspire change and spark
                innovation.
              </p>
            </motion.div>
          </div>

          {/* Background decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4 mx-auto">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                {
                  icon: Code,
                  title: "Tech First",
                  desc: "Deep dives into the latest technologies and frameworks.",
                },
                {
                  icon: Heart,
                  title: "Passion Led",
                  desc: "Written by developers who love what they do.",
                },
                {
                  icon: Zap,
                  title: "Fast Paced",
                  desc: "Keeping up with the rapidly evolving tech landscape.",
                },
                {
                  icon: Globe,
                  title: "Global View",
                  desc: "Connecting ideas from around the world.",
                },
              ].map((feature, index) => (
                <motion.div key={index} variants={item}>
                  <Card className="h-full border-none shadow-none bg-background/50 backdrop-blur-sm hover:bg-background transition-colors">
                    <CardContent className="p-6 space-y-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <feature.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-semibold">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Team/Story Section */}
        <section className="py-20">
          <div className="container px-4 mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative aspect-square rounded-2xl overflow-hidden bg-muted"
              >
                {/* Placeholder for team image */}
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  Team Image
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold tracking-tight">
                  Our Mission
                </h2>
                <p className="text-lg text-muted-foreground">
                  Founded in 2024, we started with a simple idea: make tech
                  knowledge accessible and engaging. What began as a small
                  personal blog has grown into a community of thinkers and
                  makers.
                </p>
                <p className="text-lg text-muted-foreground">
                  We're committed to quality content, open source, and fostering
                  a welcoming community for everyone.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <BlogFooter />
    </div>
  );
}
