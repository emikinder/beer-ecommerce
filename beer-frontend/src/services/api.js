const API_BASE = 'http://localhost:3000/api';

// Get all products
export async function getProducts() {
  const res = await fetch(`${API_BASE}/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

// Get stock and price by SKU
export async function getStockPrice(sku) {
  const res = await fetch(`${API_BASE}/stock-price/${sku}`);
  if (!res.ok) throw new Error(res.error);
  return res.json();
}
