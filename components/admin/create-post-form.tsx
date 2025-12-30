"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { createPostAction } from "@/app/actions";

interface CreatePostFormProps {
  categories: string[];
}

export function CreatePostForm({ categories }: CreatePostFormProps) {
  const router = useRouter();
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  // Auto-generate slug from title
  useEffect(() => {
    const generatedSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setSlug(generatedSlug);
  }, [title]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    formData.append("content", content);
    formData.append("author_id", "1"); // TODO: Get current user ID
    formData.append("read_time", "5 min read"); // TODO: Calculate read time
    // Slug is already in the form input, so it's in formData

    await createPostAction(formData);

    setIsLoading(false);
    // Redirect handled in action
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="Post title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="slug">Slug (URL)</Label>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm">/post/</span>
            <Input
              id="slug"
              name="slug"
              placeholder="post-url-slug"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Input id="excerpt" name="excerpt" placeholder="Short description" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Input
              list="categories"
              name="category"
              placeholder="Select or type a category"
              required
            />
            <datalist id="categories">
              {categories.map((cat) => (
                <option key={cat} value={cat} />
              ))}
            </datalist>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Cover Image URL</Label>
            <Input id="image" name="cover_image" placeholder="https://..." />
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Content</Label>
          <div className="min-h-[500px]">
            <SimpleEditor content="" onChange={setContent} />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Post"}
        </Button>
      </div>
    </form>
  );
}
