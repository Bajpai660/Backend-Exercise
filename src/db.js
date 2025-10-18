const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./products.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sku TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    color TEXT,
    size TEXT,
    mrp INTEGER NOT NULL,
    price INTEGER NOT NULL,
    quantity INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

module.exports = db;
