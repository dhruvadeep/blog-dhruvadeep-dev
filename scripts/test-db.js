const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "../blog.db");
const db = new Database(dbPath);

try {
  console.log("Querying visits table...");
  const visits = db
    .prepare("SELECT * FROM visits ORDER BY created_at DESC LIMIT 5")
    .all();
  console.log("Visits table exists. Row count:", visits.length);
} catch (err) {
  console.error("Error querying visits table:", err.message);
}
db.close();
