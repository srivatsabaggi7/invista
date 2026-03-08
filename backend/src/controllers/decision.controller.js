import { runDecision } from "../services/decision.service.js";
import { readData } from "../services/dataStore.service.js";

export async function runDecisionHandler(req, res) {
  try {
    const { sku, current_stock, lead_time_days, service_level } = req.body;

    const inventory = readData("inventory", "inventory.json")
      .find(i => i.sku === sku);

    // Generate a synthetic but plausible forecast ensemble
    const baseDemand = 30 + Math.floor(Math.random() * 10);
    const forecast = Array.from({ length: 30 }, () => baseDemand + Math.floor(Math.random() * 5));

    const context = {
      sku,
      inventory: { current_stock: Number(current_stock) || 0 },
      forecast,
      lead_time_days: Number(lead_time_days) || 7,
      service_level: Number(service_level) || 0.95,
      anomaly: Math.random() > 0.8
    };

    const result = await runDecision(context);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
