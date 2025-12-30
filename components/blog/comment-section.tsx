"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createCommentAction } from "@/app/actions";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Comment {
  id: number;
  author_name: string;
  content: string;
  created_at: string;
}

export function CommentSection({
  postId,
  comments,
}: {
  postId: number;
  comments: Comment[];
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    await createCommentAction(formData);
    setIsSubmitting(false);
    const form = document.getElementById("comment-form") as HTMLFormElement;
    form.reset();
  }

  return (
    <div className="space-y-8 mt-12 pt-8 border-t">
      <h3 className="text-2xl font-bold">Comments ({comments.length})</h3>

      <form id="comment-form" action={handleSubmit} className="space-y-4">
        <input type="hidden" name="postId" value={postId} />
        <div className="grid gap-2">
          <Input
            name="authorName"
            placeholder="Name (Optional - defaults to Anonymous)"
          />
        </div>
        <div className="grid gap-2">
          <Textarea name="content" placeholder="Write a comment..." required />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Posting..." : "Post Comment"}
        </Button>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <Avatar>
              <AvatarFallback>
                {comment.author_name
                  ? comment.author_name[0].toUpperCase()
                  : "A"}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{comment.author_name}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(comment.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
