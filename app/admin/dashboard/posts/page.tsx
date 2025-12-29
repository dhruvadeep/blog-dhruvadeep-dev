import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllPosts } from "@/lib/db/queries";
import { Plus, Pencil } from "lucide-react";
import { DeletePostButton } from "@/components/admin/delete-post-button";
import { FeaturePostButton } from "@/components/admin/feature-post-button";

export const dynamic = "force-dynamic";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Posts</h2>
          <p className="text-muted-foreground">Manage your blog posts</p>
        </div>
        <Link
          href="/admin/dashboard/posts/new"
          className={cn(buttonVariants())}
        >
          <Plus className="mr-2 h-4 w-4" /> New Post
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>{post.author_name}</TableCell>
                <TableCell>{post.category_name}</TableCell>
                <TableCell>
                  {new Date(post.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <FeaturePostButton
                      id={post.id}
                      isFeatured={!!post.is_featured}
                    />
                    <Link
                      href={`/admin/dashboard/posts/${post.id}`}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" })
                      )}
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <DeletePostButton id={post.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
