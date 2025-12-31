import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTags } from "@/lib/db/queries";
import { CreateTagForm } from "@/components/admin/create-tag-form";
import { DeleteTagButton } from "@/components/admin/delete-tag-button";

export const dynamic = "force-dynamic";

export default async function TagsPage() {
  const tags = await getTags();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tags</h2>
          <p className="text-muted-foreground">Manage your blog tags</p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tags.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={2}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No tags yet
                  </TableCell>
                </TableRow>
              ) : (
                tags.map((tag) => (
                  <TableRow key={tag.id}>
                    <TableCell className="font-medium">{tag.name}</TableCell>
                    <TableCell className="text-right">
                      <DeleteTagButton id={tag.id} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div>
          <CreateTagForm />
        </div>
      </div>
    </div>
  );
}
