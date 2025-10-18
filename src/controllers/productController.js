const { getProducts, countProducts, searchProducts, countMatchingProducts } = require("../models/productModel");

function cleanProduct(product) {
  const { id, sku, name, brand, color, size, mrp, price, quantity } = product;
  return { id, sku, name, brand, color, size, mrp, price, quantity };
}

async function listProducts(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const total = await countProducts();
    const rows = await getProducts(offset, limit);

    const data = rows.map(cleanProduct);

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function search(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const filters = {
      brand: req.query.brand,
      color: req.query.color,
      minPrice: req.query.minPrice,
      maxPrice: req.query.maxPrice
    };
    const total = await countMatchingProducts(filters);

    const rows = await searchProducts(filters, offset, limit);

    const data = rows.map(({ id, sku, name, brand, color, size, mrp, price, quantity }) => ({
      id, sku, name, brand, color, size, mrp, price, quantity
    }));

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { listProducts, search };
