import { CreatePostForm } from "@/components/admin/create-post-form";
import { getCategories } from "@/lib/db/queries";

export default async function NewPostPage() {
  const categories = await getCategories();
  const categoryNames = categories.map((c) => c.name);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Create New Post</h2>
        <p className="text-muted-foreground">
          Write and publish a new blog post
        </p>
      </div>

      <CreatePostForm categories={categoryNames} />
    </div>
  );
}
