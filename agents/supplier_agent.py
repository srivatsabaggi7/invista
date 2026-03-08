from typing import Dict, Any
from agents.base_agent import BaseAgent

class SupplierRiskAgent(BaseAgent):
    """
    Supplier Intelligence Agent evaluating risk factors, lead time reliability,
    and historical performance metrics.
    """
    def __init__(self):
        super().__init__("SupplierRiskAgent", version="1.1.0")

    def run(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Calculates risk scores based on supplier performance and lead times.
        """
        try:
            lead_time = context.get("lead_time_days", 3)
            performance_score = context.get("supplier_performance", 0.95)

            # Risk classification logic
            if lead_time > 10:
                risk = "HIGH"
                confidence = 0.7
            elif lead_time > 5:
                risk = "MODERATE"
                confidence = 0.85
            else:
                risk = "LOW"
                confidence = 0.95

            return self.respond(
                output={"risk_level": risk, "performance_score": performance_score},
                confidence=confidence,
                explanation=(
                    f"Supplier risk is categorized as {risk} based on current lead time ({lead_time} days) "
                    f"and performance stability ({performance_score*100}%)."
                ),
                metadata={
                    "risk_metrics": ["LeadTime", "Reliability"],
                    "alert_threshold": 0.8
                }
            )
        except Exception as e:
            return self.error(f"Supplier risk analysis failed: {str(e)}")
