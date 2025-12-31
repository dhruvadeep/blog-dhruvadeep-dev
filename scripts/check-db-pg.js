const { Pool } = require("pg");
require("dotenv").config({ path: ".env.local" });

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
});

async function checkDb() {
  const client = await pool.connect();
  try {
    const res = await client.query(
      "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'posts'"
    );
    console.log(res.rows);
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
    await pool.end();
  }
}

checkDb();
