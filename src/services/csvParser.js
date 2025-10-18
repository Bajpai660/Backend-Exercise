function validateRow(row) {
  const errors = [];
  const { sku, name, brand, mrp, price, quantity } = row;

  if (!sku) errors.push("sku required");
  if (!name) errors.push("name required");
  if (!brand) errors.push("brand required");
  if (mrp == null || isNaN(Number(mrp))) errors.push("mrp numeric required");
  if (price == null || isNaN(Number(price))) errors.push("price numeric required");
  if (Number(price) > Number(mrp)) errors.push("price must be <= mrp");
  if (quantity && Number(quantity) < 0) errors.push("quantity >= 0");

  return { valid: errors.length === 0, errors };
}

module.exports = { validateRow };
