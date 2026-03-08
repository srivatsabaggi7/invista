import { applyDecision } from "../services/inventory.service.js";
import { readData, writeData } from "../services/dataStore.service.js";

export function approveDecisionHandler(req, res) {
  try {
    const { sku, decision, quantity, approvedBy } = req.body;

    const updatedInventory = applyDecision({ sku, decision, quantity });

    const logs = readData("logs", "system_logs.json");
    logs.push({
      event_type: "DECISION_APPROVED",
      message: `APPROVED: ${decision} (${quantity} units) for ${sku}`,
      approvedBy: approvedBy || "AI_MANAGER",
      timestamp: new Date().toISOString()
    });
    writeData("logs", "system_logs.json", logs);

    res.json({ status: "APPROVED", inventory: updatedInventory });
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
}

export function rejectDecisionHandler(req, res) {
  try {
    const { sku, reason, rejectedBy } = req.body;

    const logs = readData("logs", "system_logs.json");
    logs.push({
      event_type: "DECISION_REJECTED",
      message: `Decision rejected for ${sku}: ${reason}`,
      rejectedBy,
      timestamp: new Date().toISOString()
    });
    writeData("logs", "system_logs.json", logs);

    res.json({ status: "REJECTED" });
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
}
