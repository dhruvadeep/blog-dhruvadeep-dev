import pool from "./index";

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
  published: boolean;
  created_at: string;
  author_name: string;
  author_avatar: string;
  category_name: string;
  views: number;
  is_featured: boolean;
  seo_title?: string;
  seo_description?: string;
  seo_image?: string;
  seo_keywords?: string;
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

export async function getFeaturedPost(): Promise<DbPost | undefined> {
  const query = `
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
    WHERE p.is_featured = TRUE
    LIMIT 1
  `;
  const result = await pool.query(query);
  return result.rows[0] as DbPost | undefined;
}

export async function setFeaturedPost(id: number) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("UPDATE posts SET is_featured = FALSE");
    await client.query("UPDATE posts SET is_featured = TRUE WHERE id = $1", [
      id,
    ]);
    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

export async function getAllPosts(
  search?: string,
  limit?: number,
  offset?: number
): Promise<DbPost[]> {
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

  const params: (string | number)[] = [];
  let paramIndex = 1;

  if (search) {
    query += ` WHERE p.title LIKE $${paramIndex} OR p.excerpt LIKE $${paramIndex} OR p.content LIKE $${paramIndex}`;
    params.push(`%${search}%`);
    paramIndex++;
  }

  query += ` ORDER BY p.created_at DESC`;

  if (limit !== undefined) {
    query += ` LIMIT $${paramIndex}`;
    params.push(limit);
    paramIndex++;
  }

  if (offset !== undefined) {
    query += ` OFFSET $${paramIndex}`;
    params.push(offset);
    paramIndex++;
  }

  const result = await pool.query(query, params);
  return result.rows as DbPost[];
}

export async function getRecentPosts(limit: number = 3): Promise<DbPost[]> {
  const query = `
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
    LIMIT $1
  `;
  const result = await pool.query(query, [limit]);
  return result.rows as DbPost[];
}

export async function searchPosts(query: string): Promise<DbPost[]> {
  const sql = `
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
    WHERE p.title LIKE $1 OR p.excerpt LIKE $1 OR p.content LIKE $1
    ORDER BY p.created_at DESC
  `;
  const searchPattern = `%${query}%`;
  const result = await pool.query(sql, [searchPattern]);
  return result.rows as DbPost[];
}

export async function getPostBySlug(slug: string): Promise<DbPost | undefined> {
  const query = `
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
    WHERE p.slug = $1
  `;
  const result = await pool.query(query, [slug]);
  return result.rows[0] as DbPost | undefined;
}

export async function getPostById(id: number): Promise<DbPost | undefined> {
  const query = `
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
    WHERE p.id = $1
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0] as DbPost | undefined;
}

export async function createPost(post: Partial<DbPost>) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const query = `
      INSERT INTO posts (title, slug, excerpt, content, cover_image, author_id, category_id, read_time, published, seo_title, seo_description, seo_image, seo_keywords)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING id
    `;
    const values = [
      post.title,
      post.slug,
      post.excerpt,
      post.content,
      post.cover_image,
      post.author_id,
      post.category_id,
      post.read_time,
      post.published,
      post.seo_title,
      post.seo_description,
      post.seo_image,
      post.seo_keywords,
    ];

    const res = await client.query(query, values);
    const postId = res.rows[0].id;

    // Initialize analytics
    await client.query(
      "INSERT INTO analytics (post_id, views) VALUES ($1, 0)",
      [postId]
    );

    await client.query("COMMIT");
    return postId;
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

export async function updatePost(id: number, post: Partial<DbPost>) {
  const sets: string[] = [];
  const values: (string | number)[] = [];
  let paramIndex = 1;

  if (post.title) {
    sets.push(`title = $${paramIndex++}`);
    values.push(post.title);
  }
  if (post.slug) {
    sets.push(`slug = $${paramIndex++}`);
    values.push(post.slug);
  }
  if (post.excerpt) {
    sets.push(`excerpt = $${paramIndex++}`);
    values.push(post.excerpt);
  }
  if (post.content) {
    sets.push(`content = $${paramIndex++}`);
    values.push(post.content);
  }
  if (post.cover_image) {
    sets.push(`cover_image = $${paramIndex++}`);
    values.push(post.cover_image);
  }
  if (post.read_time) {
    sets.push(`read_time = $${paramIndex++}`);
    values.push(post.read_time);
  }
  if (post.seo_title) {
    sets.push(`seo_title = $${paramIndex++}`);
    values.push(post.seo_title);
  }
  if (post.seo_description) {
    sets.push(`seo_description = $${paramIndex++}`);
    values.push(post.seo_description);
  }
  if (post.seo_image) {
    sets.push(`seo_image = $${paramIndex++}`);
    values.push(post.seo_image);
  }
  if (post.seo_keywords) {
    sets.push(`seo_keywords = $${paramIndex++}`);
    values.push(post.seo_keywords);
  }

  if (sets.length === 0) return;

  values.push(id);
  const query = `UPDATE posts SET ${sets.join(", ")} WHERE id = $${paramIndex}`;

  await pool.query(query, values);
}

export async function deletePost(id: number) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM analytics WHERE post_id = $1", [id]);
    await client.query("DELETE FROM post_tags WHERE post_id = $1", [id]);
    await client.query("DELETE FROM posts WHERE id = $1", [id]);
    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

export async function incrementViews(postId: number, count: number = 1) {
  const query = `
    UPDATE analytics 
    SET views = views + $2, last_updated = CURRENT_TIMESTAMP 
    WHERE post_id = $1
  `;
  await pool.query(query, [postId, count]);
}

export async function saveImage(
  filename: string,
  mimeType: string,
  data: Buffer
) {
  const query =
    "INSERT INTO images (filename, mime_type, data) VALUES ($1, $2, $3) RETURNING id";
  const result = await pool.query(query, [filename, mimeType, data]);
  return result.rows[0].id;
}

export async function getImage(filename: string) {
  const query = "SELECT * FROM images WHERE filename = $1";
  const result = await pool.query(query, [filename]);
  return result.rows[0] as { mime_type: string; data: Buffer } | undefined;
}

export async function getCategories() {
  const result = await pool.query("SELECT * FROM categories");
  return result.rows as DbCategory[];
}

export async function getAuthors() {
  const result = await pool.query("SELECT * FROM authors");
  return result.rows;
}

export async function addSubscriber(email: string) {
  try {
    const query = "INSERT INTO subscribers (email) VALUES ($1)";
    await pool.query(query, [email]);
  } catch (error: any) {
    if (error.code === "23505") {
      // unique_violation
      throw new Error("Email already subscribed");
    }
    throw error;
  }
}

export async function getSubscribers() {
  const result = await pool.query(
    "SELECT * FROM subscribers ORDER BY created_at DESC"
  );
  return result.rows as DbSubscriber[];
}

export async function getTotalViews(): Promise<number> {
  const result = await pool.query("SELECT SUM(views) as total FROM analytics");
  return parseInt(result.rows[0]?.total || "0");
}

export async function getTopPosts(limit: number = 5) {
  const query = `
    SELECT p.id, p.title, p.slug, a.views 
    FROM posts p 
    JOIN analytics a ON p.id = a.post_id 
    ORDER BY a.views DESC 
    LIMIT $1
  `;
  const result = await pool.query(query, [limit]);
  return result.rows as {
    id: number;
    title: string;
    slug: string;
    views: number;
  }[];
}

export async function getTags() {
  const result = await pool.query("SELECT * FROM tags ORDER BY name ASC");
  return result.rows as DbTag[];
}

export async function createTag(name: string) {
  try {
    const query = "INSERT INTO tags (name) VALUES ($1)";
    await pool.query(query, [name]);
  } catch (error: any) {
    if (error.code === "23505") {
      throw new Error("Tag already exists");
    }
    throw error;
  }
}

export async function deleteTag(id: number) {
  await pool.query("DELETE FROM tags WHERE id = $1", [id]);
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
  created_at: Date;
}

export async function getSubscriberCount(): Promise<number> {
  const result = await pool.query("SELECT COUNT(*) as count FROM subscribers");
  return parseInt(result.rows[0].count);
}

export async function getEngagementRate(): Promise<number> {
  const totalViews = await getTotalViews();
  const result = await pool.query("SELECT COUNT(*) as count FROM posts");
  const totalPosts = parseInt(result.rows[0].count);

  if (totalPosts === 0) return 0;

  return Math.round((totalViews / totalPosts) * 10) / 10;
}

export async function getRecentActivity(
  limit: number = 10
): Promise<DbVisit[]> {
  const result = await pool.query(
    "SELECT * FROM visits ORDER BY created_at DESC LIMIT $1",
    [limit]
  );
  return result.rows as DbVisit[];
}

export async function getComments(postId: number): Promise<DbComment[]> {
  const result = await pool.query(
    "SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at DESC",
    [postId]
  );
  return result.rows as DbComment[];
}

export async function createComment(
  postId: number,
  authorName: string,
  content: string
) {
  const query =
    "INSERT INTO comments (post_id, author_name, content) VALUES ($1, $2, $3)";
  await pool.query(query, [postId, authorName, content]);
}

export async function logVisit(
  ip: string,
  city: string,
  country: string,
  path: string
) {
  const query =
    "INSERT INTO visits (ip, city, country, path) VALUES ($1, $2, $3, $4)";
  await pool.query(query, [ip, city, country, path]);
}

export async function createCategory(name: string) {
  try {
    const query = "INSERT INTO categories (name) VALUES ($1) RETURNING id";
    const result = await pool.query(query, [name]);
    return result.rows[0].id;
  } catch (error: any) {
    if (error.code === "23505") {
      const existing = await pool.query(
        "SELECT id FROM categories WHERE name = $1",
        [name]
      );
      return existing.rows[0].id;
    }
    throw error;
  }
}

export async function getDailyStats(days: number = 7) {
  const viewsQuery = `
    SELECT 
      to_char(created_at, 'Mon DD') as name,
      COUNT(*) as views
    FROM visits
    WHERE created_at >= NOW() - INTERVAL '${days} days'
    GROUP BY to_char(created_at, 'Mon DD'), DATE(created_at)
    ORDER BY DATE(created_at) ASC
  `;

  const commentsQuery = `
    SELECT 
      to_char(created_at, 'Mon DD') as name,
      COUNT(*) as comments
    FROM comments
    WHERE created_at >= NOW() - INTERVAL '${days} days'
    GROUP BY to_char(created_at, 'Mon DD'), DATE(created_at)
    ORDER BY DATE(created_at) ASC
  `;

  const [viewsRes, commentsRes] = await Promise.all([
    pool.query(viewsQuery),
    pool.query(commentsQuery),
  ]);

  return {
    views: viewsRes.rows.map((r) => ({
      name: r.name,
      views: parseInt(r.views),
    })),
    comments: commentsRes.rows.map((r) => ({
      name: r.name,
      comments: parseInt(r.comments),
    })),
  };
}
