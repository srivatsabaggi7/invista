const BASE_URL = "http://localhost:3001/api";

export async function fetchProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  return res.json();
}
