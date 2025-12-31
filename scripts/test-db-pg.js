const { Pool } = require("pg");
require("dotenv").config({ path: ".env.local" });

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
});

async function testDb() {
  const client = await pool.connect();
  try {
    console.log("Querying visits table...");
    const res = await client.query(
      "SELECT * FROM visits ORDER BY created_at DESC LIMIT 5"
    );
    console.log("Visits table exists. Row count:", res.rows.length);
  } catch (err) {
    console.error("Error querying visits table:", err.message);
  } finally {
    client.release();
    await pool.end();
  }
}

testDb();
