"use client";

import { motion } from "framer-motion";
import { Clock, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/types/blog";

interface PostCardProps {
  post: Post;
  index: number;
}

export function PostCard({ post, index }: PostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="h-full flex flex-col overflow-hidden border-0 shadow-none hover:bg-accent/5 transition-colors group py-0 gap-0">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-4">
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <Badge className="absolute top-3 left-3 bg-background/80 text-foreground backdrop-blur-sm hover:bg-background/90">
            {post.category}
          </Badge>
        </div>
        <CardHeader className="mb-2">
          <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="mb-4 flex-grow">
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {post.excerpt}
          </p>
        </CardContent>
        <CardFooter className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="h-3 w-3" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3" />
            <span>{post.readTime}</span>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
