const { Pool } = require("pg");
require("dotenv").config({ path: ".env.local" });

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
});

async function resetCategories() {
  const client = await pool.connect();
  try {
    await client.query(
      "INSERT INTO categories (name) VALUES ('General') ON CONFLICT DO NOTHING"
    );
    const res = await client.query(
      "SELECT id FROM categories WHERE name = 'General'"
    );
    const generalId = res.rows[0].id;

    await client.query("UPDATE posts SET category_id = $1", [generalId]);
    console.log("Categories reset.");
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
    await pool.end();
  }
}

resetCategories();
