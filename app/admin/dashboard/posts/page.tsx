import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { POSTS } from "@/data/blog-data";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function PostsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Posts</h2>
          <p className="text-muted-foreground">Manage your blog posts</p>
        </div>
        <Link href="/admin/dashboard/posts/new" className={cn(buttonVariants())}>
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
            {POSTS.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell>{post.date}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/dashboard/posts/${post.id}`}
                      className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
