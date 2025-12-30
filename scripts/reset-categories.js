const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "../lib/db/blog.db");
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // 1. Create 'General' category if not exists
  db.run("INSERT OR IGNORE INTO categories (name) VALUES ('General')");

  // 2. Get ID of 'General'
  db.get("SELECT id FROM categories WHERE name = 'General'", (err, row) => {
    if (err) {
      console.error(err);
      return;
    }
    const generalId = row.id;

    // 3. Update all posts to use 'General'
    db.run("UPDATE posts SET category_id = ?", [generalId], (err) => {
      if (err) {
        console.error("Error updating posts:", err);
        return;
      }
      console.log("All posts moved to 'General' category.");

      // 4. Delete other categories
      db.run("DELETE FROM categories WHERE id != ?", [generalId], (err) => {
        if (err) {
          console.error("Error deleting categories:", err);
        } else {
          console.log("Old categories deleted.");
        }
      });
    });
  });
});

db.close();
