const { Pool } = require("pg");
require("dotenv").config({ path: ".env.local" });

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
});

async function checkTypes() {
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT SUM(views) as total FROM analytics");
    console.log(
      "Total views:",
      res.rows[0].total,
      "Type:",
      typeof res.rows[0].total
    );

    const res2 = await client.query("SELECT COUNT(*) as count FROM posts");
    console.log(
      "Count posts:",
      res2.rows[0].count,
      "Type:",
      typeof res2.rows[0].count
    );
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
    await pool.end();
  }
}

checkTypes();
