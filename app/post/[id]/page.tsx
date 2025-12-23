import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { POSTS, RECENT_INSIGHTS } from "@/data/blog-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import SiteHeader from "@/components/site-header";
import { BlogFooter } from "@/components/blog/blog-footer";
import { NewsletterWidget } from "@/components/blog/sidebar/newsletter-widget";
import { RecentInsights } from "@/components/blog/sidebar/recent-insights";
// This is required for static site generation with dynamic routes
export async function generateStaticParams() {
  return POSTS.map((post) => ({
    id: post.id.toString(),
  }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = POSTS.find((p) => p.id === parseInt(id));

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
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
                </div>

                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  {post.title}
                </h1>

                <div className="flex items-center justify-between border-b pb-8 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                      {/* Placeholder avatar if not available in data */}
                      <User className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{post.author}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {post.date}
                      </p>
                    </div>
                  </div>
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

                {/* Mock Content since we don't have full content in data */}
                <div className="mt-8 space-y-6">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <h2>The Core Concept</h2>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                  <blockquote>
                    &quot;The best way to predict the future is to invent
                    it.&quot;
                  </blockquote>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo.
                  </p>
                  <h3>Why This Matters</h3>
                  <p>
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                    odit aut fugit, sed quia consequuntur magni dolores eos qui
                    ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                    qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
                    velit.
                  </p>
                </div>
              </div>
            </article>
          </div>

          <aside className="lg:col-span-4 pl-0 lg:pl-8">
            <div className="sticky top-24 space-y-8">
              <RecentInsights insights={RECENT_INSIGHTS} />
              <NewsletterWidget />
            </div>
          </aside>
        </div>
      </main>
      <BlogFooter />
    </div>
  );
}
