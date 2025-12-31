import { notFound } from "next/navigation";
import { EditPostForm } from "@/components/admin/edit-post-form";
import { getPostById, getCategories } from "@/lib/db/queries";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = parseInt(id);
  const post = await getPostById(postId);
  const categories = await getCategories();

  if (!post) {
    notFound();
  }

  const formattedPost = {
    id: post.id,
    title: post.title,
    content: post.content || "",
    category: post.category_name || "",
    image: post.cover_image || "",
    excerpt: post.excerpt || "",
    slug: post.slug,
    seo_title: post.seo_title || "",
    seo_description: post.seo_description || "",
    seo_image: post.seo_image || "",
    seo_keywords: post.seo_keywords || "",
  };

  const categoryNames = categories.map((c) => c.name);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Edit Post</h2>
        <p className="text-muted-foreground">Edit your blog post</p>
      </div>

      <EditPostForm post={formattedPost} categories={categoryNames} />
    </div>
  );
}
