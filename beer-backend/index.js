import express from 'express';
import cors from 'cors';
import products from './data/products.js';
import stockPrice from './data/stock-price.js';

const app = express();
const PORT = 3000;

app.use(cors());

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get stock and price for a specific SKU
app.get('/api/stock-price/:sku', (req, res) => {
  const sku = req.params.sku;

  // Validate SKU format
  if (!/^\d+$/.test(sku)) {
    return res
      .status(400)
      .json({ error: 'Invalid SKU format. Must be numeric.' });
  }

  const data = stockPrice[sku];

  if (!data) {
    return res.status(404).json({ error: 'SKU not found' });
  }

  res.json(data);
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
