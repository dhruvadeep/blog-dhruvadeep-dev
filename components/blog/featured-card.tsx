"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FeaturedPost } from "@/types/blog";

interface FeaturedCardProps {
  post: FeaturedPost;
}

export function FeaturedCard({ post }: FeaturedCardProps) {
  return (
    <Link href={`/post/${post.slug || post.id}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full overflow-hidden rounded-3xl bg-card border shadow-sm group cursor-pointer"
      >
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative h-64 md:h-auto overflow-hidden">
            <Image
              src={post.image}
              alt="Featured"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-4 right-4 md:hidden">
              <ArrowUpRight className="h-6 w-6 text-white drop-shadow-md" />
            </div>
          </div>
          <div className="flex flex-col justify-center p-6 md:p-10 lg:p-12 relative">
            <ArrowUpRight className="absolute top-6 right-6 h-6 w-6 text-muted-foreground hidden md:block transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />

            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="rounded-full px-3"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-card-foreground group-hover:text-primary transition-colors">
              {post.title}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 line-clamp-3">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-background">
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback>
                    {post.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-semibold leading-none">
                    {post.author.name}
                  </p>
                  <p className="text-muted-foreground flex items-center gap-1 mt-1">
                    <Calendar className="h-3 w-3" /> {post.date}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
