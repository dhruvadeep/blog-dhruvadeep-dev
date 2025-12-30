import db from "./index";

export interface DbPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author_id: number;
  category_id: number;
  read_time: string;
  published: number;
  created_at: string;
  author_name: string;
  author_avatar: string;
  category_name: string;
  views: number;
  is_featured: number;
}

export interface DbCategory {
  id: number;
  name: string;
  slug: string;
}

export interface DbTag {
  id: number;
  name: string;
}

export interface DbSubscriber {
  id: number;
  email: string;
  created_at: string;
}

export function getFeaturedPost(): DbPost | undefined {
  const stmt = db.prepare(`
    SELECT 
      p.*, 
      a.name as author_name, 
      a.avatar as author_avatar,
      c.name as category_name,
      an.views
    FROM posts p
    LEFT JOIN authors a ON p.author_id = a.id
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN analytics an ON p.id = an.post_id
    WHERE p.is_featured = 1
    LIMIT 1
  `);
  return stmt.get() as DbPost | undefined;
}

export function setFeaturedPost(id: number) {
  const transaction = db.transaction(() => {
    db.prepare("UPDATE posts SET is_featured = 0").run();
    db.prepare("UPDATE posts SET is_featured = 1 WHERE id = ?").run(id);
  });
  transaction();
}

export function getAllPosts(
  search?: string,
  limit?: number,
  offset?: number
): DbPost[] {
  let query = `
    SELECT 
      p.*, 
      a.name as author_name, 
      a.avatar as author_avatar,
      c.name as category_name,
      an.views
    FROM posts p
    LEFT JOIN authors a ON p.author_id = a.id
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN analytics an ON p.id = an.post_id
  `;

  if (search) {
    query += ` WHERE p.title LIKE @search OR p.excerpt LIKE @search OR p.content LIKE @search`;
  }

  query += ` ORDER BY p.created_at DESC`;

  if (limit !== undefined && offset !== undefined) {
    query += ` LIMIT @limit OFFSET @offset`;
  }

  const stmt = db.prepare(query);

  const params: Record<string, string | number> = {};
  if (search) params.search = `%${search}%`;
  if (limit !== undefined) params.limit = limit;
  if (offset !== undefined) params.offset = offset;

  return stmt.all(params) as DbPost[];
}

export function getRecentPosts(limit: number = 3): DbPost[] {
  const stmt = db.prepare(`
    SELECT 
      p.*, 
      a.name as author_name, 
      a.avatar as author_avatar,
      c.name as category_name,
      an.views
    FROM posts p
    LEFT JOIN authors a ON p.author_id = a.id
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN analytics an ON p.id = an.post_id
    ORDER BY p.created_at DESC
    LIMIT ?
  `);
  return stmt.all(limit) as DbPost[];
}

export function searchPosts(query: string): DbPost[] {
  const stmt = db.prepare(`
    SELECT 
      p.*, 
      a.name as author_name, 
      a.avatar as author_avatar,
      c.name as category_name,
      an.views
    FROM posts p
    LEFT JOIN authors a ON p.author_id = a.id
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN analytics an ON p.id = an.post_id
    WHERE p.title LIKE ? OR p.excerpt LIKE ? OR p.content LIKE ?
    ORDER BY p.created_at DESC
  `);
  const searchPattern = `%${query}%`;
  return stmt.all(searchPattern, searchPattern, searchPattern) as DbPost[];
}

export function getPostBySlug(slug: string): DbPost | undefined {
  const stmt = db.prepare(`
    SELECT 
      p.*, 
      a.name as author_name, 
      a.avatar as author_avatar,
      c.name as category_name,
      an.views
    FROM posts p
    LEFT JOIN authors a ON p.author_id = a.id
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN analytics an ON p.id = an.post_id
    WHERE p.slug = ?
  `);
  return stmt.get(slug) as DbPost | undefined;
}

export function getPostById(id: number): DbPost | undefined {
  const stmt = db.prepare(`
    SELECT 
      p.*, 
      a.name as author_name, 
      a.avatar as author_avatar,
      c.name as category_name,
      an.views
    FROM posts p
    LEFT JOIN authors a ON p.author_id = a.id
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN analytics an ON p.id = an.post_id
    WHERE p.id = ?
  `);
  return stmt.get(id) as DbPost | undefined;
}

export function createPost(post: Partial<DbPost>) {
  const stmt = db.prepare(`
    INSERT INTO posts (title, slug, excerpt, content, cover_image, author_id, category_id, read_time, published)
    VALUES (@title, @slug, @excerpt, @content, @cover_image, @author_id, @category_id, @read_time, @published)
  `);
  const info = stmt.run(post);

  // Initialize analytics
  db.prepare("INSERT INTO analytics (post_id, views) VALUES (?, 0)").run(
    info.lastInsertRowid
  );

  return info.lastInsertRowid;
}

export function updatePost(id: number, post: Partial<DbPost>) {
  const sets: string[] = [];
  const params: Record<string, string | number> = { id };

  if (post.title) {
    sets.push("title = @title");
    params.title = post.title;
  }
  if (post.slug) {
    sets.push("slug = @slug");
    params.slug = post.slug;
  }
  if (post.excerpt) {
    sets.push("excerpt = @excerpt");
    params.excerpt = post.excerpt;
  }
  if (post.content) {
    sets.push("content = @content");
    params.content = post.content;
  }
  if (post.cover_image) {
    sets.push("cover_image = @cover_image");
    params.cover_image = post.cover_image;
  }
  if (post.read_time) {
    sets.push("read_time = @read_time");
    params.read_time = post.read_time;
  }

  if (sets.length === 0) return;

  const stmt = db.prepare(`UPDATE posts SET ${sets.join(", ")} WHERE id = @id`);
  return stmt.run(params);
}

export function deletePost(id: number) {
  db.prepare("DELETE FROM analytics WHERE post_id = ?").run(id);
  db.prepare("DELETE FROM post_tags WHERE post_id = ?").run(id);
  return db.prepare("DELETE FROM posts WHERE id = ?").run(id);
}

export function incrementViews(postId: number) {
  const stmt = db.prepare(`
    UPDATE analytics 
    SET views = views + 1, last_updated = CURRENT_TIMESTAMP 
    WHERE post_id = ?
  `);
  return stmt.run(postId);
}

export function saveImage(filename: string, mimeType: string, data: Buffer) {
  const stmt = db.prepare(
    "INSERT INTO images (filename, mime_type, data) VALUES (?, ?, ?)"
  );
  const info = stmt.run(filename, mimeType, data);
  return info.lastInsertRowid;
}

export function getImage(filename: string) {
  const stmt = db.prepare("SELECT * FROM images WHERE filename = ?");
  return stmt.get(filename) as { mime_type: string; data: Buffer } | undefined;
}

export function getCategories() {
  return db.prepare("SELECT * FROM categories").all() as DbCategory[];
}

export function getAuthors() {
  return db.prepare("SELECT * FROM authors").all();
}

export function addSubscriber(email: string) {
  try {
    const stmt = db.prepare("INSERT INTO subscribers (email) VALUES (?)");
    return stmt.run(email);
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      (error as { code: string }).code === "SQLITE_CONSTRAINT_UNIQUE"
    ) {
      throw new Error("Email already subscribed");
    }
    throw error;
  }
}

export function getSubscribers() {
  return db
    .prepare("SELECT * FROM subscribers ORDER BY created_at DESC")
    .all() as DbSubscriber[];
}

export function getTotalViews() {
  const result = db
    .prepare("SELECT SUM(views) as total FROM analytics")
    .get() as { total: number };
  return result.total || 0;
}

export function getTopPosts(limit: number = 5) {
  return db
    .prepare(
      `
    SELECT p.id, p.title, p.slug, a.views 
    FROM posts p 
    JOIN analytics a ON p.id = a.post_id 
    ORDER BY a.views DESC 
    LIMIT ?
  `
    )
    .all(limit) as { id: number; title: string; slug: string; views: number }[];
}

export function getTags() {
  return db.prepare("SELECT * FROM tags ORDER BY name ASC").all() as DbTag[];
}

export function createTag(name: string) {
  try {
    const stmt = db.prepare("INSERT INTO tags (name) VALUES (?)");
    return stmt.run(name);
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      (error as { code: string }).code === "SQLITE_CONSTRAINT_UNIQUE"
    ) {
      throw new Error("Tag already exists");
    }
    throw error;
  }
}

export function deleteTag(id: number) {
  return db.prepare("DELETE FROM tags WHERE id = ?").run(id);
}

export interface DbComment {
  id: number;
  post_id: number;
  author_name: string;
  content: string;
  created_at: string;
}

export interface DbVisit {
  id: number;
  ip: string;
  city: string;
  country: string;
  path: string;
  created_at: string;
}

export function getSubscriberCount(): number {
  const result = db
    .prepare("SELECT COUNT(*) as count FROM subscribers")
    .get() as { count: number };
  return result.count;
}

export function getEngagementRate(): number {
  // Simple engagement rate: (Total Views / Total Posts) / 100 (just a placeholder logic)
  // Or maybe (Total Comments + Total Views) / Total Posts?
  // Let's do: Total Views / Total Posts (Average Views per Post)
  const totalViews = getTotalViews();
  const totalPosts = db
    .prepare("SELECT COUNT(*) as count FROM posts")
    .get() as { count: number };

  if (totalPosts.count === 0) return 0;

  // Return average views per post as a "rate" or score
  return Math.round((totalViews / totalPosts.count) * 10) / 10;
}

export function getRecentActivity(limit: number = 10): DbVisit[] {
  return db
    .prepare("SELECT * FROM visits ORDER BY created_at DESC LIMIT ?")
    .all(limit) as DbVisit[];
}

export function getComments(postId: number): DbComment[] {
  return db
    .prepare(
      "SELECT * FROM comments WHERE post_id = ? ORDER BY created_at DESC"
    )
    .all(postId) as DbComment[];
}

export function createComment(
  postId: number,
  authorName: string,
  content: string
) {
  const stmt = db.prepare(
    "INSERT INTO comments (post_id, author_name, content) VALUES (?, ?, ?)"
  );
  return stmt.run(postId, authorName, content);
}

export function logVisit(
  ip: string,
  city: string,
  country: string,
  path: string
) {
  const stmt = db.prepare(
    "INSERT INTO visits (ip, city, country, path) VALUES (?, ?, ?, ?)"
  );
  return stmt.run(ip, city, country, path);
}

export function createCategory(name: string) {
  try {
    const stmt = db.prepare("INSERT INTO categories (name) VALUES (?)");
    const info = stmt.run(name);
    return info.lastInsertRowid;
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      (error as { code: string }).code === "SQLITE_CONSTRAINT_UNIQUE"
    ) {
      // If it exists, return the existing ID
      const existing = db
        .prepare("SELECT id FROM categories WHERE name = ?")
        .get(name) as { id: number };
      return existing.id;
    }
    throw error;
  }
}
