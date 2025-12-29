"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createPostAction } from "@/app/actions";

interface CreatePostFormProps {
  categories: string[];
}

export function CreatePostForm({ categories }: CreatePostFormProps) {
  const router = useRouter();
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    formData.append("content", content);
    formData.append("category_id", "1"); // TODO: Map category name to ID or fix DB to use names or pass IDs
    formData.append("author_id", "1"); // TODO: Get current user ID
    formData.append("read_time", "5 min read"); // TODO: Calculate read time

    // Generate slug from title if not provided (or let backend do it)
    const title = formData.get("title") as string;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    formData.append("slug", slug);

    await createPostAction(formData);

    setIsLoading(false);
    // Redirect handled in action
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" placeholder="Post title" required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Input id="excerpt" name="excerpt" placeholder="Short description" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <Select
              name="category"
              onValueChange={(val: any) => setCategory(val || "")}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* Hidden input for form submission if needed, but we construct FormData manually mostly */}
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

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Publishing..." : "Publish Post"}
        </Button>
      </div>
    </form>
  );
}
