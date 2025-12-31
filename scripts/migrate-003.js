const Database = require("better-sqlite3");
const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../blog.db");
const migrationPath = path.join(
  __dirname,
  "../migrations/003_add_seo_fields.sql"
);

console.log(`Migrating database at: ${dbPath}`);

const db = new Database(dbPath);
const sql = fs.readFileSync(migrationPath, "utf8");

try {
  db.exec(sql);
  console.log("Migration successful");
} catch (err) {
  console.error("Migration failed:", err);
}
db.close();
