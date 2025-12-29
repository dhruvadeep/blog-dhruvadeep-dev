"use client";

import { useState } from "react";
import { Post } from "@/types/blog";
import { PostCard } from "./post-card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Loader2 } from "lucide-react";
import { fetchPosts } from "@/app/actions/posts";

interface PostListProps {
  initialPosts: Post[];
  search?: string;
}

export function PostList({ initialPosts, search }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialPosts.length === 6); // Assuming limit is 6

  const loadMore = async () => {
    setLoading(true);
    const nextPage = page + 1;
    try {
      const newPosts = await fetchPosts(nextPage, search);
      if (newPosts.length < 6) {
        setHasMore(false);
      }
      setPosts([...posts, ...newPosts]);
      setPage(nextPage);
    } catch (error) {
      console.error("Failed to load more posts", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
        {posts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-8">
          <Button
            variant="outline"
            className="rounded-full px-8 gap-2"
            onClick={loadMore}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                Load More Articles
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
