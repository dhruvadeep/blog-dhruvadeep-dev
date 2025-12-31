const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: ".env.local" });

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
});

async function initDb() {
  const client = await pool.connect();
  try {
    const migrationPath = path.join(process.cwd(), "migrations", "init_pg.sql");
    const migration = fs.readFileSync(migrationPath, "utf-8");

    console.log("Running migration...");
    await client.query(migration);
    console.log("Migration complete.");
  } catch (err) {
    console.error("Error running migration:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

initDb();
