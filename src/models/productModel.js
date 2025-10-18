const db = require("../db");

function insertProduct(p) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO products (sku, name, brand, color, size, mrp, price, quantity)
       VALUES (?,?,?,?,?,?,?,?)`,
      [p.sku, p.name, p.brand, p.color, p.size, p.mrp, p.price, p.quantity || 0],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });
}

function getProducts(offset, limit) {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM products LIMIT ? OFFSET ?`, [limit, offset], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function countProducts() {
  return new Promise((resolve, reject) => {
    db.get(`SELECT COUNT(*) as total FROM products`, [], (err, row) => {
      if (err) reject(err);
      else resolve(row.total);
    });
  });
}

function searchProducts(filters, offset, limit) {
  const conditions = [];
  const params = [];

  if (filters.brand) {
    conditions.push("LOWER(brand)=LOWER(?)");
    params.push(filters.brand);
  }
  if (filters.color) {
    conditions.push("LOWER(color)=LOWER(?)");
    params.push(filters.color);
  }
  if (filters.minPrice) {
    conditions.push("price>=?");
    params.push(filters.minPrice);
  }
  if (filters.maxPrice) {
    conditions.push("price<=?");
    params.push(filters.maxPrice);
  }

  const where = conditions.length ? "WHERE " + conditions.join(" AND ") : "";
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM products ${where} LIMIT ? OFFSET ?`,
      [...params, limit, offset],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
}
function countMatchingProducts(filters) {
  const conditions = [];
  const params = [];

  if (filters.brand) {
    conditions.push("LOWER(brand)=LOWER(?)");
    params.push(filters.brand);
  }
  if (filters.color) {
    conditions.push("LOWER(color)=LOWER(?)");
    params.push(filters.color);
  }
  if (filters.minPrice) {
    conditions.push("price>=?");
    params.push(filters.minPrice);
  }
  if (filters.maxPrice) {
    conditions.push("price<=?");
    params.push(filters.maxPrice);
  }

  const where = conditions.length ? "WHERE " + conditions.join(" AND ") : "";
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT COUNT(*) AS total FROM products ${where}`,
      params,
      (err, row) => {
        if (err) reject(err);
        else resolve(row.total);
      }
    );
  });
}

module.exports = { insertProduct, getProducts, countProducts, searchProducts, countMatchingProducts };
