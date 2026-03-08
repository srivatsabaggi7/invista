import { readData, writeData } from "./dataStore.service.js";

export function applyDecision({ sku, decision, quantity }) {
  const inventory = readData("inventory", "inventory.json");
  const item = inventory.find(i => i.sku === sku);
  if (!item) throw new Error("SKU not found");

  if (decision === "ORDER" || decision === "ORDER_SMALL_URGENT") {
    item.current_stock += Math.round(quantity || 0);
  }

  item.last_updated = new Date().toISOString();
  writeData("inventory", "inventory.json", inventory);
  return item;
}
