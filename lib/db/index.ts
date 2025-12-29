import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dbPath = path.join(process.cwd(), "blog.db");
const db = new Database(dbPath);

// Enable WAL mode for better concurrency
db.pragma("journal_mode = WAL");

export default db;

export function initDb() {
  const migrationPath = path.join(process.cwd(), "migrations", "init.sql");
  const migration = fs.readFileSync(migrationPath, "utf-8");
  db.exec(migration);
  console.log("Database initialized");
}
