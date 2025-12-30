"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, User, Heart } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/types/blog";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: Post;
  index: number;
}

export function PostCard({ post, index }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Wrap in setTimeout to avoid synchronous state update warning
    const timer = setTimeout(() => {
      setMounted(true);
      const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}");
      if (likedPosts[post.id]) {
        setIsLiked(true);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [post.id]);

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const newState = !isLiked;
    setIsLiked(newState);

    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}");
    if (newState) {
      likedPosts[post.id] = true;
    } else {
      delete likedPosts[post.id];
    }
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
  };

  if (!mounted) {
    return (
      <div className="h-full">
        <Card className="h-full flex flex-col overflow-hidden border-border/40 bg-card/50">
          <div className="relative aspect-[16/10] bg-muted animate-pulse" />
          <CardHeader className="space-y-2 p-5">
            <div className="h-6 w-3/4 bg-muted rounded animate-pulse" />
          </CardHeader>
          <CardContent className="p-5 pt-0 flex-grow">
            <div className="h-4 w-full bg-muted rounded animate-pulse mb-2" />
            <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Link href={`/post/${post.slug || post.id}`} className="block h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        className="h-full"
      >
        <Card className="h-full flex flex-col overflow-hidden border-border/40 bg-card/50 backdrop-blur-sm hover:bg-accent/5 hover:border-primary/20 hover:shadow-xl transition-all duration-300 group p-0 gap-0">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <Badge className="absolute top-3 left-3 bg-background/80 text-foreground backdrop-blur-md hover:bg-background/90 shadow-sm border-0">
              {post.category}
            </Badge>

            <button
              onClick={toggleLike}
              className="absolute top-3 right-3 p-2.5 rounded-full bg-background/80 backdrop-blur-md hover:bg-background/90 transition-all shadow-sm group/heart z-10"
              aria-label={isLiked ? "Unlike post" : "Like post"}
            >
              <motion.div
                whileTap={{ scale: 0.8 }}
                animate={isLiked ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Heart
                  className={cn(
                    "h-4 w-4 transition-colors duration-300",
                    isLiked
                      ? "fill-red-500 text-red-500"
                      : "text-foreground/70 group-hover/heart:text-red-500"
                  )}
                />
              </motion.div>
            </button>
          </div>

          <CardHeader className="space-y-2 p-5">
            <CardTitle className="text-xl font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {post.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-5 pt-0 flex-grow">
            <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
              {post.excerpt}
            </p>
          </CardContent>

          <CardFooter className="p-5 pt-0 mt-auto flex items-center justify-between text-xs font-medium text-muted-foreground">
            <div className="flex items-center gap-2 group/author">
              <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center group-hover/author:bg-primary/20 transition-colors">
                <User className="h-3.5 w-3.5 text-primary" />
              </div>
              <span className="group-hover/author:text-foreground transition-colors">
                {post.author}
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-secondary/50 px-2.5 py-1 rounded-full">
              <Clock className="h-3 w-3" />
              <span>{post.readTime}</span>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  );
}
