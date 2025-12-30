import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import SiteHeader from "@/components/site-header";
import { BlogFooter } from "@/components/blog/blog-footer";
import { NewsletterWidget } from "@/components/blog/sidebar/newsletter-widget";
import { RecentInsights } from "@/components/blog/sidebar/recent-insights";
import {
  getPostById,
  getAllPosts,
  getRecentPosts,
  getPostBySlug,
  getComments,
  logVisit,
} from "@/lib/db/queries";
import { ViewCounter } from "@/components/view-counter";
import { CommentSection } from "@/components/blog/comment-section";
import { ShareButtons } from "@/components/blog/share-buttons";
import { headers } from "next/headers";
import { Metadata } from "next";

// This is required for static site generation with dynamic routes
export async function generateStaticParams() {
  const posts = getAllPosts();
  const params = posts.map((post) => ({
    id: post.id.toString(),
  }));

  posts.forEach((post) => {
    if (post.slug) {
      params.push({ id: post.slug });
    }
  });

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  let dbPost;
  if (/^\d+$/.test(id)) {
    dbPost = getPostById(parseInt(id));
  } else {
    dbPost = getPostBySlug(id);
  }

  if (!dbPost) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: dbPost.title,
    description: dbPost.excerpt,
    openGraph: {
      title: dbPost.title,
      description: dbPost.excerpt,
      type: "article",
      publishedTime: dbPost.created_at,
      authors: [dbPost.author_name],
      images: [
        {
          url: dbPost.cover_image,
          width: 1200,
          height: 630,
          alt: dbPost.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dbPost.title,
      description: dbPost.excerpt,
      images: [dbPost.cover_image],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let dbPost;
  if (/^\d+$/.test(id)) {
    dbPost = getPostById(parseInt(id));
  } else {
    dbPost = getPostBySlug(id);
  }

  if (!dbPost) {
    notFound();
  }

  const postId = dbPost.id;
  const recentDbPosts = getRecentPosts(3);
  const comments = getComments(postId);
  const currentUrl = `https://yourblog.com/post/${dbPost.slug || dbPost.id}`; // Replace with actual domain

  // Log visit
  try {
    // In static generation, headers() might not be available or might cause dynamic usage error
    // We can skip logging during build time or handle it gracefully
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "127.0.0.1";
    logVisit(ip, "Unknown City", "Unknown Country", `/post/${id}`);
  } catch (e) {
    // console.error("Failed to log visit", e);
  }

  const post = {
    id: dbPost.id,
    title: dbPost.title,
    excerpt: dbPost.excerpt,
    content: dbPost.content,
    category: dbPost.category_name,
    author: dbPost.author_name,
    authorAvatar: dbPost.author_avatar,
    date: new Date(dbPost.created_at).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    readTime: dbPost.read_time,
    image: dbPost.cover_image,
    views: dbPost.views,
  };

  const recentInsights = recentDbPosts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    date: new Date(p.created_at).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    image: p.cover_image,
  }));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <ViewCounter postId={postId} />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <Link href="/">
              <Button
                variant="ghost"
                className="mb-8 pl-0 hover:pl-2 transition-all"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>

            <article className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="rounded-full">
                    {post.category}
                  </Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {post.readTime}
                  </span>
                  <span className="text-sm text-muted-foreground ml-2">
                    {post.views} views
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  {post.title}
                </h1>

                <div className="flex items-center justify-between border-b pb-8 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden relative">
                      {post.authorAvatar ? (
                        <Image
                          src={post.authorAvatar}
                          alt={post.author}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <User className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{post.author}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {post.date}
                      </p>
                    </div>
                  </div>
                  <ShareButtons title={post.title} url={currentUrl} />
                </div>
              </div>

              <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-muted">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="lead text-xl text-muted-foreground">
                  {post.excerpt}
                </p>

                <div
                  className="mt-8 space-y-6"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </article>

            <CommentSection postId={postId} comments={comments} />
          </div>

          <aside className="lg:col-span-4 pl-0 lg:pl-8">
            <div className="sticky top-24 space-y-8">
              <RecentInsights insights={recentInsights} />
              <NewsletterWidget />
            </div>
          </aside>
        </div>
      </main>
      <BlogFooter />
    </div>
  );
}
