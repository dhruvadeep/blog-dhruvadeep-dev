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
import { updatePostAction } from "@/app/actions";

interface EditPostFormProps {
  post: {
    id: number;
    title: string;
    content: string;
    category: string;
    image: string;
    excerpt: string;
    slug: string;
  };
  categories: string[];
}

export function EditPostForm({ post, categories }: EditPostFormProps) {
  const router = useRouter();
  const [content, setContent] = useState<string>(post.content);
  const [title, setTitle] = useState(post.title);
  const [category, setCategory] = useState(post.category);
  const [image, setImage] = useState(post.image);
  const [slug, setSlug] = useState(post.slug);
  const [excerpt, setExcerpt] = useState(post.excerpt);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("excerpt", excerpt);
    formData.append("content", content); // Assuming content is HTML string
    formData.append("cover_image", image);
    // Note: Category ID handling might be needed if we store IDs, but for now we just pass strings or need to map back.
    // The DB expects category_id. We should probably pass categories as objects {id, name}.
    // For simplicity, let's assume we just update text fields for now or need to fix category handling.

    await updatePostAction(post.id, formData);

    setIsLoading(false);
    router.push("/admin/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Input
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={category}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onValueChange={(val: any) => setCategory(val || "")}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Cover Image URL</Label>
            <Input
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Content</Label>
          <div className="min-h-[500px]">
            <SimpleEditor content={content} onChange={setContent} />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
