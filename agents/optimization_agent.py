from typing import Dict, Any
import math
from agents.base_agent import BaseAgent

class InventoryOptimizationAgent(BaseAgent):
    """
    Optimization Agent responsible for calculating economic reorder quantities (EOQ)
    and dynamic reorder points (ROP) using supply chain optimization models.
    """
    def __init__(self):
        super().__init__("OptimizationAgent", version="1.1.0")

    def run(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Calculates optimal inventory parameters based on forecast and lead time.
        """
        try:
            forecast_summary = context.get("forecast_summary", {})
            avg_demand = forecast_summary.get("avg_daily_demand", 0)
            demand_std = forecast_summary.get("uncertainty", avg_demand * 0.15)
            
            # Constraints and parameters
            lead_time = min(context.get("lead_time_days", 3), 5)
            service_level = context.get("service_level", 0.95)
            
            # Service level mapping (z-score)
            z_map = {0.90: 1.28, 0.95: 1.65, 0.99: 2.33}
            z = z_map.get(service_level, 1.65)
            
            # Calculate safety stock
            safety_stock = z * demand_std * math.sqrt(lead_time)
            
            # Calculate reorder point (demand during lead time + safety stock)
            reorder_point = (avg_demand * lead_time) + safety_stock
            
            # Economic Order Quantity (Simulated for Demo)
            eoq = avg_demand * 14 # 2-week supply

            return self.respond(
                output={
                    "EOQ": round(float(eoq), 2),
                    "reorder_point": round(float(reorder_point), 2),
                    "safety_stock": round(float(safety_stock), 2),
                    "lead_time_days": lead_time
                },
                confidence=service_level,
                explanation=(
                    f"Optimized reorder point ({reorder_point:.1f}) maintains {service_level*100}% "
                    f"service level based on demand variability during lead time ({lead_time} days)."
                ),
                metadata={
                    "service_factor_z": z,
                    "model": "Wilson-EOQ-Stochastic"
                }
            )
        except Exception as e:
            return self.error(f"Optimization analysis failed: {str(e)}")
