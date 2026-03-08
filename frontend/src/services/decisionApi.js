export async function runDecision(payload) {
  const res = await fetch("/api/decision/run", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sku: payload.sku,
      current_stock: payload.current_stock,
      lead_time_days: payload.lead_time_days,
      service_level: payload.service_level || 0.95
    })
  });

  return res.json();
}
