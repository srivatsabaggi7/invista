const BASE_URL = "/api";

export async function fetchForecast(sku, horizon) {
  const res = await fetch(`${BASE_URL}/forecast/${sku}/${horizon}`);
  return res.json();
}

export async function fetchEOQ(sku) {
  const res = await fetch(`${BASE_URL}/eoq/${sku}`);
  return res.json();
}

export async function fetchAgent(sku) {
  const res = await fetch(`${BASE_URL}/agent/${sku}`);
  return res.json();
}
