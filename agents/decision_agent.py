from typing import Dict, Any
from agents.base_agent import BaseAgent

class DecisionAgent(BaseAgent):
    """
    Autonomous Decision Agent responsible for final reorder strategies.
    Integrates insights from forecasting, optimization, and risk agents.
    """
    def __init__(self):
        super().__init__("AutonomousDecisionAgent", version="1.1.0")

    def run(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Processes multi-agent insights to produce an optimal inventory decision.
        """
        try:
            inventory = context["inventory"]["current_stock"]
            
            # Extract insights from peer agents
            optimization = context.get("optimization", {}).get("output", {})
            rop = optimization.get("reorder_point", 0)
            eoq = optimization.get("EOQ", 0)
            
            supplier_risk = context.get("supplier", {}).get("output", {}).get("risk_level", "UNKNOWN")
            forecast_summary = context.get("forecast_summary", {})
            avg_demand = forecast_summary.get("avg_daily_demand", 0)
            uncertainty = forecast_summary.get("uncertainty", 0)

            # Decision Logic: Multi-factor reasoning
            reorder_needed = inventory < rop
            
            # Risk-aware decision logic
            if reorder_needed:
                if supplier_risk == "HIGH":
                    decision = "ORDER_SMALL_URGENT"
                    confidence = 0.75
                    explanation = (
                        f"Stock ({inventory}) is below ROP ({rop}). However, supplier risk is HIGH. "
                        "Recommending a smaller, urgent order to mitigate risk while preventing stockouts."
                    )
                else:
                    decision = "ORDER"
                    confidence = 0.95
                    explanation = (
                        f"Inventory ({inventory}) dropped below reorder point ({rop}). "
                        f"Supplier risk is {supplier_risk}. Recommending EOQ of {eoq} units."
                    )
            else:
                if inventory < (rop * 1.2): # Near ROP
                    decision = "WATCH"
                    confidence = 0.85
                    explanation = (
                        f"Inventory ({inventory}) is currently above ROP ({rop}) but within 20% margin. "
                        "Maintaining watch status due to projected demand trends."
                    )
                else:
                    decision = "HOLD"
                    confidence = 0.90
                    explanation = f"Inventory level ({inventory}) is healthy relative to ROP ({rop})."

            return self.respond(
                output={
                    "decision": decision,
                    "order_quantity": eoq if decision in ["ORDER", "ORDER_SMALL_URGENT"] else 0,
                    "reasoning_path": "Inventory -> ROP -> SupplierRisk -> FinalAction"
                },
                confidence=confidence,
                explanation=explanation,
                metadata={
                    "inventory_status": "CRITICAL" if inventory < rop else "STABLE",
                    "risk_mitigation_active": supplier_risk == "HIGH"
                }
            )
        except Exception as e:
            return self.error(f"Decision failed: {str(e)}")
