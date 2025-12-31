const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "../blog.db");
const db = new Database(dbPath);

const info = db.pragma("table_info(posts)");
console.log(info);
db.close();
