# Backend Exercise

## Project Description
This is a simple backend API for product management. Users can:
- **Upload products via CSV** (validated and stored in SQLite)
- **List all products** with pagination
- **Search products** by brand, color, and price range

Built with **Node.js, Express, SQLite, Multer, fast-csv**.

---

## Setup

```bash
git clone https://github.com/your-username/backend-exercise.git
cd backend-exercise
npm install
npm run dev
```
Server runs at `http://localhost:8000`

---

## API Endpoints

### 1. Upload CSV
- **POST** `/upload`
- Form Data: `file` (CSV file)
- **Response Example:**
```json
{
  "stored": 10,
  "failed": [{ "row": 3, "errors": ["price must be <= mrp"] }]
}
```

### 2. List Products
- **GET** `/products?page=1&limit=20`
- **Response Example:**
```json
{
  "page":1, "limit":20, "total":50, "totalPages":3,
  "data":[
    {"id":1,"sku":"SKU1","name":"T-Shirt","brand":"StreamThreads","color":"Red","size":"M","mrp":1200,"price":1000,"quantity":10}
  ]
}
```

### 3. Search Products
- **GET** `/products/search?brand=StreamThreads&color=Red&minPrice=500&maxPrice=2000&page=1&limit=20`
- **Response Example:**
```json
{
  "page":1, "limit":20, "total":5, "totalPages":1,
  "data":[
    {"id":2,"sku":"SKU2","name":"Cap","brand":"StreamThreads","color":"Red","size":"L","mrp":500,"price":450,"quantity":8}
  ]
}
```

---

## Notes
- Database: SQLite (`products.db`) created automatically
- Temporary CSV uploads: `uploads/` folder
- Pagination: Use `page` and `limit` query params
