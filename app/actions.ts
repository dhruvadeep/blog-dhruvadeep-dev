"use server";

import { queueView } from "@/lib/analytics";
import {
  saveImage,
  createPost,
  updatePost,
  deletePost,
  setFeaturedPost,
  addSubscriber,
  createTag,
  deleteTag,
  createCategory,
  createComment,
} from "@/lib/db/queries";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function incrementViewCount(postId: number) {
  queueView(postId);
}

export async function uploadImage(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) {
    throw new Error("No file uploaded");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${Date.now()}-${file.name}`;
  const mimeType = file.type;

  saveImage(filename, mimeType, buffer);

  // Return the URL to access the image
  return { url: `/api/images/${filename}` };
}

export async function createPostAction(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const cover_image = formData.get("cover_image") as string;
  const author_id = parseInt(formData.get("author_id") as string);
  // const category_id = parseInt(formData.get("category_id") as string);
  const category_name = formData.get("category") as string;
  const read_time = formData.get("read_time") as string;

  let category_id = 1; // Default
  if (category_name) {
    const result = createCategory(category_name);
    category_id = typeof result === "bigint" ? Number(result) : result;
  }

  createPost({
    title,
    slug,
    excerpt,
    content,
    cover_image,
    author_id,
    category_id,
    read_time,
    published: 1, // Default to published for now
  });

  revalidatePath("/");
  revalidatePath("/admin/dashboard");
  redirect("/admin/dashboard");
}

export async function createCommentAction(formData: FormData) {
  const postId = parseInt(formData.get("postId") as string);
  const content = formData.get("content") as string;
  // Allow anonymous/random names if not provided
  const authorName =
    (formData.get("authorName") as string) ||
    `Anonymous-${Math.floor(Math.random() * 10000)}`;

  if (!postId || !content) {
    return { error: "Missing required fields" };
  }

  createComment(postId, authorName, content);
  revalidatePath(`/post/${postId}`); // We might need to revalidate slug path too if we change routing
}

export async function updatePostAction(id: number, formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const cover_image = formData.get("cover_image") as string;

  updatePost(id, {
    title,
    slug,
    excerpt,
    content,
    cover_image,
  });

  revalidatePath(`/post/${id}`); // Assuming route is /post/[id] or /post/[slug]
  revalidatePath("/admin/dashboard");
}

export async function deletePostAction(id: number) {
  deletePost(id);
  revalidatePath("/admin/dashboard");
}

export async function setFeaturedPostAction(id: number) {
  setFeaturedPost(id);
  revalidatePath("/");
  revalidatePath("/admin/dashboard");
}

export async function subscribeAction(formData: FormData) {
  const email = formData.get("email") as string;
  if (!email) return { error: "Email is required" };

  try {
    addSubscriber(email);
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      error.message === "Email already subscribed"
    ) {
      return { error: "You are already subscribed!" };
    }
    return { error: "Something went wrong" };
  }
}

export async function createTagAction(formData: FormData) {
  const name = formData.get("name") as string;
  if (!name) return { error: "Tag name is required" };

  try {
    createTag(name);
    revalidatePath("/admin/dashboard/tags");
    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Tag already exists") {
      return { error: "Tag already exists" };
    }
    return { error: "Failed to create tag" };
  }
}

export async function deleteTagAction(id: number) {
  try {
    deleteTag(id);
    revalidatePath("/admin/dashboard/tags");
    return { success: true };
  } catch {
    return { error: "Failed to delete tag" };
  }
}
