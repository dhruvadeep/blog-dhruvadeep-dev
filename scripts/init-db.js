/* eslint-disable @typescript-eslint/no-require-imports */
const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

const dbPath = path.join(process.cwd(), "blog.db");
const db = new Database(dbPath);

const migrationPath = path.join(process.cwd(), "migrations", "init.sql");
const migration = fs.readFileSync(migrationPath, "utf-8");

console.log("Running migration...");
db.exec(migration);
console.log("Migration complete.");
