/* eslint-disable @typescript-eslint/no-require-imports */
const db = require("better-sqlite3")("blog.db");

try {
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `
  ).run();
  console.log("Successfully created subscribers table.");
} catch (error) {
  console.error("Error creating table:", error.message);
}
