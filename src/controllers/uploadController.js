const fs = require("fs");
const csv = require("fast-csv");
const { validateRow } = require("../services/csvParser");
const { insertProduct } = require("../models/productModel");

async function uploadCSV(req, res) {
    console.log("Upload route hit"); 
    console.log(req.file);
  if (!req.file) return res.status(400).json({ error: "File required" });

  const validRows = [];
  const failed = [];
  let rowIndex = 1;

  fs.createReadStream(req.file.path)
    .pipe(csv.parse({ headers: true }))
    .on("error", (err) => res.status(500).json({ error: err.message }))
    .on("data", (row) => {
      const { valid, errors } = validateRow(row);
      if (valid) validRows.push(row);
      else failed.push({ row: rowIndex, errors });
      rowIndex++;
    })
    .on("end", async () => {
      let stored = 0;
      for (const row of validRows) {
        try {
          await insertProduct(row);
          stored++;
        } catch (err) {
          failed.push({ row: "unknown", errors: [err.message] });
        }
      }
      res.json({ stored, failed });
    });
}

module.exports = { uploadCSV };
